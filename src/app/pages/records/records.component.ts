import { Component } from '@angular/core';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html'
})
export class RecordsComponent {
storageUsed: any;
legalHolds: any;
retentionPolicies: any;
totalRecords: any;
expiringRecords: any;
}