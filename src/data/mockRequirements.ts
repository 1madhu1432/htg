import { Requirement } from '../types';

export const INITIAL_REQUIREMENTS: Requirement[] = [
  {
    id: 'REQ-2026-089',
    customerId: 'cust-101',
    customerName: 'Kalyan Ram',
    businessName: 'Tirupati Grand Hotel & Resorts',
    phone: '+91 9876543210',
    email: 'demo@business.com',
    date: '2026-09-28',
    status: 'Quoted',
    notes: 'Urgent requirement for upcoming holiday festival season rush.',
    quotationId: 'QT-2026-042',
    items: [
      {
        productId: 'prod-1',
        productName: 'Heavy-Duty Industrial Floor Cleaner & Disinfectant',
        category: 'Cleaning Chemicals',
        quantity: 15,
        packSize: '5 Litres Can',
        notes: 'Pine fragrance preferred'
      },
      {
        productId: 'prod-7',
        productName: 'Premium 2-Ply Virgin Paper C-Fold Hand Towels',
        category: 'Tissue Products',
        quantity: 25,
        packSize: 'Box of 20 Packs',
        notes: 'White virgin pulp'
      },
      {
        productId: 'prod-16',
        productName: 'Commercial Black Trash Bags - Heavy Duty LDPE',
        category: 'Garbage Bags',
        quantity: 30,
        packSize: 'Bundle of 100 Bags',
        notes: '36x48 inch heavy duty'
      },
      {
        productId: 'prod-22',
        productName: 'Ultra-Fine Color-Coded Microfiber Cleaning Cloths 300 GSM',
        category: 'Cleaning Cloths',
        quantity: 10,
        packSize: 'Pack of 20 Cloths',
        notes: 'Blue and Yellow colors'
      }
    ]
  },
  {
    id: 'REQ-2026-092',
    customerId: 'cust-101',
    customerName: 'Kalyan Ram',
    businessName: 'Tirupati Grand Hotel & Resorts',
    phone: '+91 9876543210',
    email: 'demo@business.com',
    date: '2026-10-01',
    status: 'Pending Review',
    notes: 'Monthly housekeeping room maintenance supplies',
    items: [
      {
        productId: 'prod-4',
        productName: 'Institutional Hand Hygiene Liquid Soap Concentrate',
        category: 'Cleaning Chemicals',
        quantity: 10,
        packSize: '5 Litres Can',
      },
      {
        productId: 'prod-21',
        productName: 'Enzymatic Anti-Splash Urinal Screen Mats (Ocean Scent)',
        category: 'Urinal Mats',
        quantity: 5,
        packSize: 'Box of 10 Mats',
      }
    ]
  }
];
