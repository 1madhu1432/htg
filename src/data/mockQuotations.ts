import { Quotation } from '../types';

export const INITIAL_QUOTATIONS: Quotation[] = [
  {
    id: 'QT-2026-042',
    requirementId: 'REQ-2026-089',
    customerId: 'cust-101',
    customerName: 'Kalyan Ram',
    businessName: 'Tirupati Grand Hotel & Resorts',
    gstNumber: '37AAAAA0000A1Z5',
    email: 'demo@business.com',
    phone: '+91 9876543210',
    date: '2026-09-29',
    validUntil: '2026-10-15',
    status: 'Sent',
    notes: 'Bulk institutional rate applied. Free doorstep delivery in Tirupati limits for orders above ₹10,000.',
    items: [
      {
        productId: 'prod-1',
        productName: 'Heavy-Duty Industrial Floor Cleaner & Disinfectant (5L)',
        packSize: '5 Litres Can',
        quantity: 15,
        unitPrice: 480,
        amount: 7200
      },
      {
        productId: 'prod-7',
        productName: 'Premium 2-Ply Virgin Paper C-Fold Hand Towels (Box)',
        packSize: 'Box of 20 Packs',
        quantity: 25,
        unitPrice: 650,
        amount: 16250
      },
      {
        productId: 'prod-16',
        productName: 'Commercial Black Trash Bags - Heavy Duty LDPE',
        packSize: 'Bundle of 100 Bags',
        quantity: 30,
        unitPrice: 380,
        amount: 11400
      },
      {
        productId: 'prod-22',
        productName: 'Ultra-Fine Color-Coded Microfiber Cleaning Cloths',
        packSize: 'Pack of 20 Cloths',
        quantity: 10,
        unitPrice: 520,
        amount: 5200
      }
    ],
    subtotal: 40050,
    taxRate: 18,
    taxAmount: 7209,
    deliveryCharge: 0,
    discount: 2050,
    grandTotal: 45209
  },
  {
    id: 'QT-2026-038',
    customerId: 'cust-101',
    customerName: 'Kalyan Ram',
    businessName: 'Tirupati Grand Hotel & Resorts',
    gstNumber: '37AAAAA0000A1Z5',
    email: 'demo@business.com',
    phone: '+91 9876543210',
    date: '2026-09-10',
    validUntil: '2026-09-25',
    status: 'Accepted',
    notes: 'Quotation accepted. Converted to Order #ORD-2026-019.',
    items: [
      {
        productId: 'prod-9',
        productName: 'Automatic Touchless Sensor Soap Dispenser',
        packSize: '1 Unit',
        quantity: 12,
        unitPrice: 1450,
        amount: 17400
      },
      {
        productId: 'prod-4',
        productName: 'Institutional Hand Hygiene Liquid Soap 5L',
        packSize: '5 Litres Can',
        quantity: 10,
        unitPrice: 420,
        amount: 4200
      }
    ],
    subtotal: 21600,
    taxRate: 18,
    taxAmount: 3888,
    deliveryCharge: 350,
    discount: 1000,
    grandTotal: 24838
  }
];
