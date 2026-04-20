import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { Services } from '../../../core/Services';
import { Vendor } from '../../../models/vendor.model';

interface Quote {
  id: string;
  carrier: string;
  carrierLogo: string;
  mode: string;
  transitDays: number;
  price: number;
  currency: string;
  departure: Date;
  arrival: Date;
  service: string;
  reliability: number;
  co2Kg: number;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  quotes: Quote[] = [];
  showQuotes = false;
  isLoadingQuotes = false;
  selectedQuote: Quote | null = null;
  bookingConfirmed = false;

  vendors: Vendor[] = [];
  isLoadingVendors = false;

  modes = [
    { value: 'ocean', label: 'Ocean Freight', icon: '🚢' },
    { value: 'air', label: 'Air Freight', icon: '✈️' },
    { value: 'road', label: 'Road Freight', icon: '🚛' },
    { value: 'rail', label: 'Rail Freight', icon: '🚂' },
  ];

  cargoTypes = [
    { value: 'general', label: 'General Cargo' },
    { value: 'perishable', label: 'Perishable Goods' },
    { value: 'hazmat', label: 'Hazardous Materials' },
    { value: 'oversized', label: 'Oversized / Heavy Lift' },
    { value: 'fcl', label: 'Full Container (FCL)' },
    { value: 'lcl', label: 'Less than Container (LCL)' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      mode: ['ocean', Validators.required],
      cargoType: ['', Validators.required],
      weight: [null, [Validators.required, Validators.min(1)]],
      dimensions: [''],
      description: [''],
      hazardous: [false],
      insurance: [false],
      pickupDate: [''],
      vendor_id: ['', Validators.required],
    });

    this.loadVendors();
  }

  loadVendors(): void {
    this.isLoadingVendors = true;
    this.httpService.sendRequest<any>(Services.VENDORS, undefined, 'GET', { per_page: 100 }).subscribe({
      next: (response) => {
        this.vendors = response.vendors || [];
        this.isLoadingVendors = false;
      },
      error: (err) => {
        console.error('Failed to load vendors:', err);
        this.isLoadingVendors = false;
      }
    });
  }

  get f() {
    return this.bookingForm.controls;
  }

  getQuotes(): void {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    this.isLoadingQuotes = true;
    this.showQuotes = false;
    this.selectedQuote = null;

    setTimeout(() => {
      this.quotes = this.generateMockQuotes();
      this.showQuotes = true;
      this.isLoadingQuotes = false;
    }, 1200);
  }

  private generateMockQuotes(): Quote[] {
    const mode = this.bookingForm.value.mode;
    const carriers: Record<string, Quote[]> = {
      ocean: [
        {
          id: 'q1', carrier: 'Maersk Line', carrierLogo: '🚢', mode: 'Ocean',
          transitDays: 18, price: 4250, currency: 'USD', departure: new Date('2026-04-05'),
          arrival: new Date('2026-04-23'), service: 'Standard Container', reliability: 96,
          co2Kg: 1840,
        },
        {
          id: 'q2', carrier: 'MSC', carrierLogo: '🚢', mode: 'Ocean',
          transitDays: 21, price: 3680, currency: 'USD', departure: new Date('2026-04-07'),
          arrival: new Date('2026-04-28'), service: 'Economy Container', reliability: 92,
          co2Kg: 2100,
        },
        {
          id: 'q3', carrier: 'CMA CGM', carrierLogo: '🚢', mode: 'Ocean',
          transitDays: 16, price: 5100, currency: 'USD', departure: new Date('2026-04-04'),
          arrival: new Date('2026-04-20'), service: 'Express Service', reliability: 97,
          co2Kg: 1620,
        },
        {
          id: 'q4', carrier: 'Hapag-Lloyd', carrierLogo: '🚢', mode: 'Ocean',
          transitDays: 19, price: 4500, currency: 'USD', departure: new Date('2026-04-06'),
          arrival: new Date('2026-04-25'), service: 'Premium Container', reliability: 95,
          co2Kg: 1950,
        },
      ],
      air: [
        {
          id: 'q5', carrier: 'Ethiopian Airlines Cargo', carrierLogo: '✈️', mode: 'Air',
          transitDays: 2, price: 8900, currency: 'USD', departure: new Date('2026-04-02'),
          arrival: new Date('2026-04-04'), service: 'Express Air Freight', reliability: 94,
          co2Kg: 4200,
        },
        {
          id: 'q6', carrier: 'Kenya Airways Cargo', carrierLogo: '✈️', mode: 'Air',
          transitDays: 3, price: 7500, currency: 'USD', departure: new Date('2026-04-03'),
          arrival: new Date('2026-04-06'), service: 'Standard Air Freight', reliability: 91,
          co2Kg: 4500,
        },
        {
          id: 'q7', carrier: 'Emirates SkyCargo', carrierLogo: '✈️', mode: 'Air',
          transitDays: 1, price: 12400, currency: 'USD', departure: new Date('2026-04-01'),
          arrival: new Date('2026-04-02'), service: 'Priority Air Freight', reliability: 98,
          co2Kg: 5100,
        },
      ],
      road: [
        {
          id: 'q8', carrier: 'Imperial Logistics', carrierLogo: '🚛', mode: 'Road',
          transitDays: 5, price: 2200, currency: 'USD', departure: new Date('2026-04-02'),
          arrival: new Date('2026-04-07'), service: 'Full Truck Load', reliability: 88,
          co2Kg: 680,
        },
        {
          id: 'q9', carrier: 'Bollore Logistics', carrierLogo: '🚛', mode: 'Road',
          transitDays: 4, price: 2800, currency: 'USD', departure: new Date('2026-04-01'),
          arrival: new Date('2026-04-05'), service: 'Express Road', reliability: 92,
          co2Kg: 720,
        },
        {
          id: 'q10', carrier: 'Cargo Carriers', carrierLogo: '🚛', mode: 'Road',
          transitDays: 6, price: 1850, currency: 'USD', departure: new Date('2026-04-03'),
          arrival: new Date('2026-04-09'), service: 'Shared Truck Load', reliability: 85,
          co2Kg: 540,
        },
      ],
      rail: [
        {
          id: 'q11', carrier: 'Transnet Freight Rail', carrierLogo: '🚂', mode: 'Rail',
          transitDays: 7, price: 1950, currency: 'USD', departure: new Date('2026-04-03'),
          arrival: new Date('2026-04-10'), service: 'Standard Rail', reliability: 82,
          co2Kg: 320,
        },
        {
          id: 'q12', carrier: 'SADC Rail Corridor', carrierLogo: '🚂', mode: 'Rail',
          transitDays: 5, price: 2600, currency: 'USD', departure: new Date('2026-04-02'),
          arrival: new Date('2026-04-07'), service: 'Express Rail', reliability: 87,
          co2Kg: 280,
        },
      ],
    };

    return carriers[mode] || carriers['ocean'];
  }

  selectQuote(quote: Quote): void {
    this.selectedQuote = this.selectedQuote?.id === quote.id ? null : quote;
  }

  confirmBooking(): void {
    if (!this.selectedQuote) return;

    this.bookingConfirmed = true;
    setTimeout(() => {
      this.bookingConfirmed = false;
      this.selectedQuote = null;
      this.showQuotes = false;
      this.quotes = [];
      this.bookingForm.reset({ mode: 'ocean', hazardous: false, insurance: false });
    }, 3000);
  }

  goBack(): void {
    this.router.navigate(['/logistics']);
  }

  formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(amount);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'short',
    });
  }
}
