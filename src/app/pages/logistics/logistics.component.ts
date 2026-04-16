import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Shipment {
  trackingNumber: string;
  origin: string;
  destination: string;
  mode: string;
  status: string;
  eta: Date;
  progress: number;
}

@Component({
  selector: 'app-logistics',
  templateUrl: './logistics.component.html',
  styleUrls: ['./logistics.component.css']
})
export class LogisticsComponent implements OnInit {
  activeTab = 'overview';
  trackingNumber = '';
  
  inTransitCount = 8;
  pendingPickupCount = 3;
  delayedCount = 1;
  deliveredCount = 124;
  
  quickBooking = {
    origin: '',
    destination: '',
    cargoType: '',
    weight: 0
  };
  
  activeShipments: Shipment[] = [
    {
      trackingNumber: 'ATR-2026-00147',
      origin: 'Shanghai, China',
      destination: 'Johannesburg, SA',
      mode: 'Ocean',
      status: 'In Transit',
      eta: new Date('2026-04-20'),
      progress: 65
    },
    {
      trackingNumber: 'ATR-2026-00148',
      origin: 'Durban, SA',
      destination: 'Cape Town, SA',
      mode: 'Road',
      status: 'In Transit',
      eta: new Date('2026-04-18'),
      progress: 45
    },
    {
      trackingNumber: 'ATR-2026-00149',
      origin: 'Hong Kong',
      destination: 'Johannesburg, SA',
      mode: 'Air',
      status: 'Pending Pickup',
      eta: new Date('2026-04-22'),
      progress: 10
    },
    {
      trackingNumber: 'ATR-2026-00150',
      origin: 'Johannesburg, SA',
      destination: 'Lusaka, Zambia',
      mode: 'Road',
      status: 'Delayed',
      eta: new Date('2026-04-19'),
      progress: 30
    },
    {
      trackingNumber: 'ATR-2026-00151',
      origin: 'Mombasa, Kenya',
      destination: 'Kigali, Rwanda',
      mode: 'Rail',
      status: 'In Transit',
      eta: new Date('2026-04-21'),
      progress: 55
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Load any initial data if needed
  }

  setTab(tab: string): void {
    this.activeTab = tab;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  onSearchTracking(): void {
    if (this.trackingNumber) {
      this.router.navigate(['/logistics/tracking', this.trackingNumber]);
    }
  }

  getModeIcon(mode: string): string {
    switch (mode) {
      case 'Ocean': return '🚢';
      case 'Air': return '✈️';
      case 'Road': return '🚚';
      case 'Rail': return '🚂';
      default: return '📦';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'In Transit': return 'bg-blue-500/20 text-blue-400';
      case 'Pending Pickup': return 'bg-yellow-500/20 text-yellow-400';
      case 'Delayed': return 'bg-red-500/20 text-red-400';
      case 'Delivered': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}