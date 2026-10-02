import { Order } from '../types';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-2026-019',
    quotationId: 'QT-2026-038',
    customerId: 'cust-101',
    businessName: 'Tirupati Grand Hotel & Resorts',
    contactPerson: 'Kalyan Ram',
    phone: '+91 9876543210',
    deliveryAddress: 'Main Resort Gate, Renigunta Road, Tirupati - 517501',
    orderDate: '2026-09-12',
    estimatedDelivery: '2026-10-04',
    trackingNumber: 'SAI-TPT-998241',
    status: 'Dispatched',
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
    taxAmount: 3888,
    deliveryCharge: 350,
    discount: 1000,
    grandTotal: 24838,
    timeline: [
      { title: 'Confirmed', date: '12 Sep 2026', completed: true },
      { title: 'Processing', date: '14 Sep 2026', completed: true },
      { title: 'Packed', date: '28 Sep 2026', completed: true },
      { title: 'Dispatched', date: '01 Oct 2026', completed: true, current: true },
      { title: 'Delivered', date: 'Expected 04 Oct', completed: false }
    ]
  },
  {
    id: 'ORD-2026-014',
    quotationId: 'QT-2026-022',
    customerId: 'cust-101',
    businessName: 'Tirupati Grand Hotel & Resorts',
    contactPerson: 'Kalyan Ram',
    phone: '+91 9876543210',
    deliveryAddress: 'Main Resort Gate, Renigunta Road, Tirupati - 517501',
    orderDate: '2026-08-15',
    estimatedDelivery: '2026-08-18',
    trackingNumber: 'SAI-TPT-881204',
    status: 'Delivered',
    items: [
      {
        productId: 'prod-1',
        productName: 'Heavy-Duty Industrial Floor Cleaner & Disinfectant',
        packSize: '5 Litres Can',
        quantity: 10,
        unitPrice: 480,
        amount: 4800
      },
      {
        productId: 'prod-13',
        productName: 'Double Bucket Mop Wringer Trolley (36 Litre)',
        packSize: '1 Set',
        quantity: 2,
        unitPrice: 3800,
        amount: 7600
      }
    ],
    subtotal: 12400,
    taxAmount: 2232,
    deliveryCharge: 0,
    discount: 500,
    grandTotal: 14132,
    timeline: [
      { title: 'Confirmed', date: '15 Aug 2026', completed: true },
      { title: 'Processing', date: '16 Aug 2026', completed: true },
      { title: 'Packed', date: '16 Aug 2026', completed: true },
      { title: 'Dispatched', date: '17 Aug 2026', completed: true },
      { title: 'Delivered', date: '18 Aug 2026', completed: true, current: true }
    ]
  }
];
