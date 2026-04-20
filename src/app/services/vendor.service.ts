import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Services } from '../core/Services';
import { Vendor, VendorStats } from '../models/vendor.model';

export interface VendorQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  category?: string;
  status?: string;
  kyc_status?: string;
}

export interface VendorListResponse {
  vendors: Vendor[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  constructor(private http: HttpService) {}

  getVendors(params?: VendorQueryParams): Observable<VendorListResponse> {
    const cleanParams = params ? Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== '')
    ) : undefined;
    return this.http.sendRequest<VendorListResponse>(Services.VENDORS, undefined, 'GET', cleanParams as Record<string, string | number | boolean>);
  }

  getVendorStats(): Observable<VendorStats> {
    return this.http.sendRequest<VendorStats>(Services.VENDOR_STATS);
  }

  getVendorById(id: number): Observable<Vendor> {
    return this.http.sendRequest<Vendor>(`${Services.VENDORS}/${id}`);
  }

  registerVendor(vendor: Partial<Vendor>): Observable<Vendor> {
    return this.http.sendRequest<Vendor>(Services.VENDORS, { vendor }, 'POST');
  }

  updateVendor(id: number, vendor: Partial<Vendor>): Observable<Vendor> {
    return this.http.sendRequest<Vendor>(`${Services.VENDORS}/${id}`, { vendor }, 'PUT');
  }

  deleteVendor(id: number): Observable<void> {
    return this.http.sendRequest<void>(`${Services.VENDORS}/${id}`, undefined, 'DELETE');
  }
}