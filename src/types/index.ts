export type UserRole = 'customer' | 'admin' | 'guest';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  businessName?: string;
  contactPerson?: string;
  phone?: string;
  gstNumber?: string;
  businessType?: string;
  billingAddress?: string;
  deliveryAddress?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  iconName?: string;
  itemCount: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  image: string;
  gallery?: string[];
  packSize: string;
  availability: 'In Stock' | 'Bulk Order Available' | 'Out of Stock';
  price?: number;
  priceDisplay: string; // "Price on Request" or formatted price
  specifications?: Record<string, string>;
  isFeatured?: boolean;
}

export interface RequirementItem {
  productId: string;
  productName: string;
  category: string;
  quantity: number;
  packSize: string;
  notes?: string;
}

export type RequirementStatus = 'Pending Review' | 'Under Review' | 'Quoted' | 'Approved' | 'Rejected';

export interface Requirement {
  id: string;
  customerId: string;
  customerName: string;
  businessName: string;
  phone: string;
  email: string;
  date: string;
  items: RequirementItem[];
  notes?: string;
  status: RequirementStatus;
  quotationId?: string;
}

export type BookingStatus = 'Requested' | 'Reviewed' | 'Quoted' | 'Confirmed' | 'Processing' | 'Dispatched' | 'Delivered';

export interface SupplyBooking {
  id: string;
  customerId: string;
  businessName: string;
  phone: string;
  deliveryAddress: string;
  preferredDate: string;
  preferredTime: string;
  orderType: 'One-time Supply' | 'Recurring Supply';
  items: { productName: string; quantity: number; packSize: string }[];
  notes?: string;
  status: BookingStatus;
  createdDate: string;
}

export interface QuotationItem {
  productId: string;
  productName: string;
  packSize: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export type QuotationStatus = 'Pending' | 'Sent' | 'Accepted' | 'Rejected' | 'Revision Requested';

export interface Quotation {
  id: string;
  requirementId?: string;
  customerId: string;
  customerName: string;
  businessName: string;
  gstNumber?: string;
  email: string;
  phone: string;
  date: string;
  validUntil: string;
  items: QuotationItem[];
  subtotal: number;
  taxAmount: number; // 18% GST typically
  taxRate: number; // 18
  deliveryCharge: number;
  discount: number;
  grandTotal: number;
  status: QuotationStatus;
  notes?: string;
}

export type OrderStatus = 'Confirmed' | 'Processing' | 'Packed' | 'Dispatched' | 'Delivered' | 'Cancelled';

export interface OrderTimelineStep {
  title: string;
  date?: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  quotationId: string;
  customerId: string;
  businessName: string;
  contactPerson: string;
  phone: string;
  deliveryAddress: string;
  items: QuotationItem[];
  subtotal: number;
  taxAmount: number;
  deliveryCharge: number;
  discount: number;
  grandTotal: number;
  status: OrderStatus;
  orderDate: string;
  estimatedDelivery: string;
  trackingNumber?: string;
  timeline: OrderTimelineStep[];
}

export type RecurringFrequency = 'Weekly' | '15 Days' | 'Monthly' | 'Custom';

export interface RecurringSupply {
  id: string;
  customerId: string;
  businessName: string;
  frequency: RecurringFrequency;
  items: { productName: string; quantity: number; packSize: string }[];
  deliveryAddress: string;
  nextSupplyDate: string;
  status: 'Active' | 'Paused' | 'Cancelled';
  createdDate: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}
