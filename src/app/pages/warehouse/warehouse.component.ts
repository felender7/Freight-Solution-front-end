import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html'
})
export class WarehouseComponent implements OnInit {
  activeTab = 'inventory';
  loading = false;
  error: string | null = null;
  
  inventory: any[] = [];
  transfers: any[] = [];
  
  showAddModal = false;
  newItem = { name: '', sku: '', quantity: 0, location: '', category: '' };
warehouseStats: any;
categoriesCount: any;
monthlyMovements: any;
lowStockCount: any;
totalInventoryItems: any;
totalItems: any;
  
  constructor(private _http: HttpService) {}

  ngOnInit(): void {
    this.loadInventory();
    this.loadTransfers();
  }

  loadInventory(): void {
    this.loading = true;
    this._http.sendRequest<any[]>('/warehouse/inventory', {}, 'GET').subscribe({
      next: (data) => {
        this.inventory = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.inventory = [
          { id: 1, name: 'Steel Pipes', sku: 'SP-001', quantity: 150, location: 'Zone A', category: 'Raw Materials', last_updated: '2026-04-10' },
          { id: 2, name: 'Copper Wire', sku: 'CW-002', quantity: 45, location: 'Zone B', category: 'Raw Materials', last_updated: '2026-04-12' },
          { id: 3, name: 'Industrial Motors', sku: 'IM-003', quantity: 8, location: 'Zone A', category: 'Equipment', last_updated: '2026-04-08' },
          { id: 4, name: 'Hydraulic Pumps', sku: 'HP-004', quantity: 25, location: 'Zone C', category: 'Equipment', last_updated: '2026-04-11' },
        ];
      }
    });
  }

  loadTransfers(): void {
    this._http.sendRequest<any[]>('/warehouse/transfers', {}, 'GET').subscribe({
      next: (data) => {
        this.transfers = data;
      },
      error: () => {
        this.transfers = [
          { id: 101, item_name: 'Steel Pipes', from_location: 'Zone A', to_location: 'Zone B', quantity: 50, status: 'completed', date: '2026-04-10' },
          { id: 102, item_name: 'Copper Wire', from_location: 'Zone B', to_location: 'Zone A', quantity: 20, status: 'in_transit', date: '2026-04-13' },
          { id: 103, item_name: 'Industrial Motors', from_location: 'Zone A', to_location: 'Zone C', quantity: 5, status: 'pending', date: '2026-04-14' },
        ];
      }
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  openAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.newItem = { name: '', sku: '', quantity: 0, location: '', category: '' };
  }

  addItem(): void {
    if (!this.newItem.name || !this.newItem.sku) {
      this.error = 'Please fill in all required fields';
      return;
    }
    this._http.sendRequest<any>('/warehouse/inventory', this.newItem, 'POST').subscribe({
      next: (item) => {
        this.inventory.push(item);
        this.closeAddModal();
      },
      error: (err) => {
        this.error = err.message || 'Failed to add item';
      }
    });
  }
}