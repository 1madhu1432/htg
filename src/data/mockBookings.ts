import { SupplyBooking } from '../types';

export const INITIAL_BOOKINGS: SupplyBooking[] = [
  {
    id: 'BK-2026-112',
    customerId: 'cust-101',
    businessName: 'Tirupati Grand Hotel & Resorts',
    phone: '+91 9876543210',
    deliveryAddress: 'Main Resort Gate, Renigunta Road, Tirupati - 517501',
    preferredDate: '2026-10-05',
    preferredTime: '10:00 AM - 01:00 PM',
    orderType: 'One-time Supply',
    createdDate: '2026-09-30',
    status: 'Confirmed',
    notes: 'Please arrange gate entry pass prior to dispatch.',
    items: [
      { productName: 'Heavy-Duty Industrial Floor Cleaner 5L', quantity: 10, packSize: '5L Can' },
      { productName: 'Commercial Black Trash Bags', quantity: 20, packSize: 'Bundle 100s' },
      { productName: 'Microfiber Cleaning Cloths (Blue)', quantity: 8, packSize: 'Pack of 20' }
    ]
  },
  {
    id: 'BK-2026-118',
    customerId: 'cust-101',
    businessName: 'Tirupati Grand Hotel & Resorts',
    phone: '+91 9876543210',
    deliveryAddress: 'Main Resort Gate, Renigunta Road, Tirupati - 517501',
    preferredDate: '2026-10-12',
    preferredTime: '02:00 PM - 05:00 PM',
    orderType: 'Recurring Supply',
    createdDate: '2026-10-02',
    status: 'Requested',
    notes: 'Fortnightly scheduled bulk restocking.',
    items: [
      { productName: 'Institutional Liquid Soap 5L', quantity: 12, packSize: '5L Can' },
      { productName: 'C-Fold Hand Towels 2-Ply', quantity: 15, packSize: 'Box 20 Packs' }
    ]
  }
];
