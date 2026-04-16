import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

interface DashboardStats {
  employees: number;
  activeShipments: number;
  revenue: number;
  vendors: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  loading = true;
  error: string | null = null;
  stats: DashboardStats = {
    employees: 0,
    activeShipments: 0,
    revenue: 0,
    vendors: 0
  };

  recentActivity = [
    { type: 'shipment', message: 'New shipment created - Container TFSU1234567', time: '2 hours ago' },
    { type: 'vendor', message: 'New vendor registered - ABC Logistics', time: '5 hours ago' },
    { type: 'invoice', message: 'Invoice #INV-001 paid', time: '1 day ago' },
    { type: 'employee', message: 'New employee added - John Smith', time: '2 days ago' }
  ];

  constructor(private _http: HttpService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;
    this._http.sendRequest<DashboardStats>('/dashboard/stats', {}, 'GET').subscribe({
      next: (res) => {
        this.stats = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
        this.stats = {
          employees: 45,
          activeShipments: 12,
          revenue: 125000,
          vendors: 28
        };
      }
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(value);
  }
}