import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService, VendorQueryParams, VendorListResponse } from '../../services/vendor.service';
import { Vendor, VendorStats, VENDOR_CATEGORIES, VENDOR_KYC_STATUSES } from '../../models/vendor.model';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html'
})
export class VendorsComponent implements OnInit {
  loading = true;
  error: string | null = null;

  vendors: Vendor[] = [];
  stats: VendorStats | null = null;

  activeVendors = 0;
  avgPerformance = 0;
  totalVendors = 0;
  pendingVendorsCount = 0;
  activeContracts = 0;

  activeTab = 'registry';

  currentPage = 1;
  perPage = 20;
  totalPages = 1;

  searchTerm = '';
  selectedCategory = '';
  selectedStatus = '';
  selectedKycStatus = '';

  categories = VENDOR_CATEGORIES;
  kycStatuses = VENDOR_KYC_STATUSES;

  constructor(
    private vendorService: VendorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  setTab(tab: string): void {
    this.activeTab = tab;
  }

  loadData(): void {
    this.loading = true;
    this.error = null;

    this.vendorService.getVendorStats().subscribe({
      next: (stats) => {
        this.stats = stats;
        this.activeVendors = stats.active;
        this.avgPerformance = stats.avg_performance;
        this.totalVendors = stats.total;
        this.pendingVendorsCount = stats.pending;
        this.activeContracts = stats.active_contracts;
      },
      error: (err) => {
        console.error('Failed to load vendor stats:', err);
      }
    });

    this.loadVendors();
  }

  loadVendors(): void {
    this.loading = true;
    const params: Record<string, string | number> = {
      page: this.currentPage,
      per_page: this.perPage
    };
    
    if (this.searchTerm) params['search'] = this.searchTerm;
    if (this.selectedCategory) params['category'] = this.selectedCategory;
    if (this.selectedStatus) params['status'] = this.selectedStatus;
    if (this.selectedKycStatus) params['kyc_status'] = this.selectedKycStatus;

    this.vendorService.getVendors(params).subscribe({
      next: (response: VendorListResponse) => {
        this.vendors = response.vendors;
        this.totalPages = response.total_pages;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load vendors:', err);
        this.error = err.message || 'Failed to load vendors';
        this.loading = false;
      }
    });
  }

  search(): void {
    this.currentPage = 1;
    this.loadVendors();
  }

  filter(): void {
    this.currentPage = 1;
    this.loadVendors();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedStatus = '';
    this.selectedKycStatus = '';
    this.currentPage = 1;
    this.loadVendors();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadVendors();
    }
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  viewVendorDetail(id: number): void {
    this.router.navigate(['/vendors', id]);
  }
}