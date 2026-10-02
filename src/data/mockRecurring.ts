import { RecurringSupply } from '../types';

export const INITIAL_RECURRING: RecurringSupply[] = [
  {
    id: 'REC-2026-004',
    customerId: 'cust-101',
    businessName: 'Tirupati Grand Hotel & Resorts',
    frequency: '15 Days',
    nextSupplyDate: '2026-10-15',
    deliveryAddress: 'Main Resort Gate, Renigunta Road, Tirupati - 517501',
    status: 'Active',
    createdDate: '2026-08-01',
    items: [
      { productName: 'Heavy-Duty Industrial Floor Cleaner 5L', quantity: 8, packSize: '5L Can' },
      { productName: 'Premium 2-Ply Virgin Paper C-Fold Hand Towels', quantity: 12, packSize: 'Box 20s' },
      { productName: 'Commercial Black Trash Bags', quantity: 15, packSize: 'Bundle 100s' }
    ]
  },
  {
    id: 'REC-2026-009',
    customerId: 'cust-101',
    businessName: 'Tirupati Grand Hotel & Resorts',
    frequency: 'Monthly',
    nextSupplyDate: '2026-11-01',
    deliveryAddress: 'Main Resort Gate, Renigunta Road, Tirupati - 517501',
    status: 'Active',
    createdDate: '2026-09-01',
    items: [
      { productName: 'Enzymatic Anti-Splash Urinal Screen Mats', quantity: 4, packSize: 'Box of 10' },
      { productName: 'Institutional Hand Hygiene Liquid Soap 5L', quantity: 6, packSize: '5L Can' }
    ]
  }
];
