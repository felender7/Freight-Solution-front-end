import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorService } from '../../../services/vendor.service';
import { Vendor, VENDOR_CATEGORIES, VENDOR_KYC_STATUSES } from '../../../models/vendor.model';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html'
})
export class VendorDetailComponent implements OnInit {
  vendor: Vendor | null = null;
  loading = true;
  error: string | null = null;

  categories = VENDOR_CATEGORIES;
  kycStatuses = VENDOR_KYC_STATUSES;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vendorService: VendorService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadVendor(+id);
    }
  }

  loadVendor(id: number): void {
    this.loading = true;
    this.error = null;
    this.vendorService.getVendorById(id).subscribe({
      next: (vendor) => {
        this.vendor = vendor;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load vendor details';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/vendors']);
  }

  getCategoryLabel(category: string | undefined): string {
    return category || 'N/A';
  }

  getKycStatusLabel(status: string | undefined): string {
    return status ? status.replace(/_/g, ' ') : 'N/A';
  }

  getContractStatus(): string {
    if (!this.vendor?.contract_end_date) return 'No Contract';
    const endDate = new Date(this.vendor.contract_end_date);
    const today = new Date();
    if (endDate < today) return 'Expired';
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    if (endDate < thirtyDaysFromNow) return 'Expiring Soon';
    return 'Active';
  }

  calculateDuration(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    if (months < 12) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    }
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    }
    return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  }
}