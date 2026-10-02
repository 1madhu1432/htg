import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, Requirement, SupplyBooking, Quotation, Order, RecurringSupply, RequirementItem, ToastMessage } from '../types';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { MOCK_CATEGORIES } from '../data/mockCategories';
import { INITIAL_REQUIREMENTS } from '../data/mockRequirements';
import { INITIAL_BOOKINGS } from '../data/mockBookings';
import { INITIAL_QUOTATIONS } from '../data/mockQuotations';
import { INITIAL_ORDERS } from '../data/mockOrders';
import { INITIAL_RECURRING } from '../data/mockRecurring';

interface DataContextType {
  products: Product[];
  categories: Category[];
  requirements: Requirement[];
  bookings: SupplyBooking[];
  quotations: Quotation[];
  orders: Order[];
  recurring: RecurringSupply[];
  draftRequirement: RequirementItem[];
  toasts: ToastMessage[];
  quoteModalOpen: boolean;
  selectedQuoteProduct: Product | null;

  // Actions
  addToDraftRequirement: (product: Product, quantity?: number, packSize?: string, notes?: string) => void;
  removeFromDraftRequirement: (productId: string) => void;
  updateDraftQuantity: (productId: string, quantity: number) => void;
  clearDraftRequirement: () => void;
  submitRequirement: (customerInfo: any, notes?: string) => Requirement;
  
  createBooking: (bookingData: any) => SupplyBooking;
  updateBookingStatus: (bookingId: string, status: SupplyBooking['status']) => void;

  acceptQuotation: (quotationId: string) => void;
  requestQuotationRevision: (quotationId: string, notes: string) => void;
  createQuotation: (quotationData: Partial<Quotation>) => Quotation;

  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  createRecurringSupply: (data: Partial<RecurringSupply>) => RecurringSupply;
  toggleRecurringStatus: (id: string) => void;

  // Admin Product Actions
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Toast System
  addToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;

  // Quote Modal Trigger
  openQuoteModal: (product?: Product) => void;
  closeQuoteModal: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const s = localStorage.getItem('sai_products');
    return s ? JSON.parse(s) : MOCK_PRODUCTS;
  });

  const [categories] = useState<Category[]>(MOCK_CATEGORIES);

  const [requirements, setRequirements] = useState<Requirement[]>(() => {
    const s = localStorage.getItem('sai_requirements');
    return s ? JSON.parse(s) : INITIAL_REQUIREMENTS;
  });

  const [bookings, setBookings] = useState<SupplyBooking[]>(() => {
    const s = localStorage.getItem('sai_bookings');
    return s ? JSON.parse(s) : INITIAL_BOOKINGS;
  });

  const [quotations, setQuotations] = useState<Quotation[]>(() => {
    const s = localStorage.getItem('sai_quotations');
    return s ? JSON.parse(s) : INITIAL_QUOTATIONS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const s = localStorage.getItem('sai_orders');
    return s ? JSON.parse(s) : INITIAL_ORDERS;
  });

  const [recurring, setRecurring] = useState<RecurringSupply[]>(() => {
    const s = localStorage.getItem('sai_recurring');
    return s ? JSON.parse(s) : INITIAL_RECURRING;
  });

  const [draftRequirement, setDraftRequirement] = useState<RequirementItem[]>(() => {
    const s = localStorage.getItem('sai_draft_req');
    return s ? JSON.parse(s) : [];
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedQuoteProduct, setSelectedQuoteProduct] = useState<Product | null>(null);

  // Sync to local storage
  useEffect(() => { localStorage.setItem('sai_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('sai_requirements', JSON.stringify(requirements)); }, [requirements]);
  useEffect(() => { localStorage.setItem('sai_bookings', JSON.stringify(bookings)); }, [bookings]);
  useEffect(() => { localStorage.setItem('sai_quotations', JSON.stringify(quotations)); }, [quotations]);
  useEffect(() => { localStorage.setItem('sai_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('sai_recurring', JSON.stringify(recurring)); }, [recurring]);
  useEffect(() => { localStorage.setItem('sai_draft_req', JSON.stringify(draftRequirement)); }, [draftRequirement]);

  const addToast = (title: string, message: string, type: ToastMessage['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const openQuoteModal = (product?: Product) => {
    setSelectedQuoteProduct(product || null);
    setQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setQuoteModalOpen(false);
    setSelectedQuoteProduct(null);
  };

  const addToDraftRequirement = (product: Product, quantity: number = 1, packSize?: string, notes?: string) => {
    setDraftRequirement(prev => {
      const existingIndex = prev.findIndex(item => item.productId === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (notes) updated[existingIndex].notes = notes;
        return updated;
      }
      return [
        ...prev,
        {
          productId: product.id,
          productName: product.name,
          category: product.category,
          quantity,
          packSize: packSize || product.packSize,
          notes
        }
      ];
    });
    addToast('Product Added', `${product.name} added to your Requirement list.`);
  };

  const removeFromDraftRequirement = (productId: string) => {
    setDraftRequirement(prev => prev.filter(item => item.productId !== productId));
    addToast('Item Removed', 'Product removed from requirement draft.', 'info');
  };

  const updateDraftQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromDraftRequirement(productId);
      return;
    }
    setDraftRequirement(prev =>
      prev.map(item => item.productId === productId ? { ...item, quantity } : item)
    );
  };

  const clearDraftRequirement = () => {
    setDraftRequirement([]);
  };

  const submitRequirement = (customerInfo: any, notes?: string): Requirement => {
    const newReq: Requirement = {
      id: `REQ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      customerId: customerInfo.id || 'cust-101',
      customerName: customerInfo.contactPerson || customerInfo.name || 'Business Customer',
      businessName: customerInfo.businessName || 'Tirupati Enterprise',
      phone: customerInfo.phone || '+91 9391843752',
      email: customerInfo.email || 'demo@business.com',
      date: new Date().toISOString().split('T')[0],
      items: [...draftRequirement],
      notes: notes || 'Submitted via Customer Portal',
      status: 'Pending Review'
    };

    setRequirements(prev => [newReq, ...prev]);
    clearDraftRequirement();
    addToast('Requirement Submitted', `Requirement #${newReq.id} created successfully! We will issue a quotation shortly.`);
    return newReq;
  };

  const createBooking = (bookingData: any): SupplyBooking => {
    const newBooking: SupplyBooking = {
      id: `BK-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      customerId: bookingData.customerId || 'cust-101',
      businessName: bookingData.businessName || 'Tirupati Grand Hotel & Resorts',
      phone: bookingData.phone || '+91 9391843752',
      deliveryAddress: bookingData.deliveryAddress || 'Tirupati, AP',
      preferredDate: bookingData.preferredDate || new Date().toISOString().split('T')[0],
      preferredTime: bookingData.preferredTime || '10:00 AM - 02:00 PM',
      orderType: bookingData.orderType || 'One-time Supply',
      items: bookingData.items || [],
      notes: bookingData.notes || '',
      status: 'Requested',
      createdDate: new Date().toISOString().split('T')[0]
    };

    setBookings(prev => [newBooking, ...prev]);
    addToast('Booking Submitted', `Supply booking #${newBooking.id} recorded. Our logistics team will confirm shortly.`);
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: SupplyBooking['status']) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
    addToast('Booking Updated', `Booking #${bookingId} status updated to ${status}.`);
  };

  const acceptQuotation = (quotationId: string) => {
    setQuotations(prev => prev.map(q => q.id === quotationId ? { ...q, status: 'Accepted' } : q));
    const quote = quotations.find(q => q.id === quotationId);

    // Create corresponding order automatically!
    if (quote) {
      const newOrder: Order = {
        id: `ORD-${new Date().getFullYear()}-${Math.floor(10 + Math.random() * 90)}`,
        quotationId: quote.id,
        customerId: quote.customerId,
        businessName: quote.businessName,
        contactPerson: quote.customerName,
        phone: quote.phone,
        deliveryAddress: 'Main Resort Gate, Renigunta Road, Tirupati - 517501',
        items: quote.items,
        subtotal: quote.subtotal,
        taxAmount: quote.taxAmount,
        deliveryCharge: quote.deliveryCharge,
        discount: quote.discount,
        grandTotal: quote.grandTotal,
        status: 'Confirmed',
        orderDate: new Date().toISOString().split('T')[0],
        estimatedDelivery: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
        trackingNumber: `SAI-TPT-${Math.floor(100000 + Math.random() * 900000)}`,
        timeline: [
          { title: 'Confirmed', date: new Date().toISOString().split('T')[0], completed: true, current: true },
          { title: 'Processing', completed: false },
          { title: 'Packed', completed: false },
          { title: 'Dispatched', completed: false },
          { title: 'Delivered', completed: false }
        ]
      };
      setOrders(prev => [newOrder, ...prev]);
      addToast('Quotation Accepted', `Quotation #${quotationId} accepted! Order #${newOrder.id} generated.`);
    }
  };

  const requestQuotationRevision = (quotationId: string, notes: string) => {
    setQuotations(prev => prev.map(q => q.id === quotationId ? { ...q, status: 'Revision Requested', notes: `Revision requested: ${notes}` } : q));
    addToast('Revision Requested', `Revision request sent for Quotation #${quotationId}.`, 'info');
  };

  const createQuotation = (quotationData: Partial<Quotation>): Quotation => {
    const newQuote: Quotation = {
      id: `QT-${new Date().getFullYear()}-${Math.floor(10 + Math.random() * 90)}`,
      requirementId: quotationData.requirementId,
      customerId: quotationData.customerId || 'cust-101',
      customerName: quotationData.customerName || 'Sai Yadav',
      businessName: quotationData.businessName || 'Tirupati Enterprise',
      gstNumber: quotationData.gstNumber || '37AAAAA0000A1Z5',
      email: quotationData.email || 'demo@business.com',
      phone: quotationData.phone || '+91 9876543210',
      date: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      items: quotationData.items || [],
      subtotal: quotationData.subtotal || 0,
      taxRate: 18,
      taxAmount: quotationData.taxAmount || 0,
      deliveryCharge: quotationData.deliveryCharge || 0,
      discount: quotationData.discount || 0,
      grandTotal: quotationData.grandTotal || 0,
      status: 'Sent',
      notes: quotationData.notes || 'Generated by Admin'
    };

    setQuotations(prev => [newQuote, ...prev]);
    
    // Update requirement status if linked
    if (quotationData.requirementId) {
      setRequirements(prev => prev.map(r => r.id === quotationData.requirementId ? { ...r, status: 'Quoted', quotationId: newQuote.id } : r));
    }

    addToast('Quotation Issued', `Quotation #${newQuote.id} created and sent to customer.`);
    return newQuote;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id !== orderId) return ord;
      
      const newTimeline = ord.timeline.map(step => {
        if (step.title.toLowerCase() === status.toLowerCase()) {
          return { ...step, completed: true, current: true, date: new Date().toISOString().split('T')[0] };
        }
        return { ...step, current: false };
      });

      return {
        ...ord,
        status,
        timeline: newTimeline
      };
    }));
    addToast('Order Status Updated', `Order #${orderId} marked as ${status}.`);
  };

  const createRecurringSupply = (data: Partial<RecurringSupply>): RecurringSupply => {
    const newRec: RecurringSupply = {
      id: `REC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      customerId: data.customerId || 'cust-101',
      businessName: data.businessName || 'Tirupati Grand Hotel & Resorts',
      frequency: data.frequency || 'Monthly',
      nextSupplyDate: data.nextSupplyDate || new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      deliveryAddress: data.deliveryAddress || 'Tirupati, AP',
      status: 'Active',
      createdDate: new Date().toISOString().split('T')[0],
      items: data.items || []
    };

    setRecurring(prev => [newRec, ...prev]);
    addToast('Recurring Order Scheduled', `Recurring supply #${newRec.id} active on ${newRec.frequency} schedule.`);
    return newRec;
  };

  const toggleRecurringStatus = (id: string) => {
    setRecurring(prev => prev.map(r => {
      if (r.id === id) {
        const nextStatus = r.status === 'Active' ? 'Paused' : 'Active';
        addToast('Recurring Supply', `Subscription #${id} is now ${nextStatus}.`, 'info');
        return { ...r, status: nextStatus };
      }
      return r;
    }));
  };

  // Product CRUD for Admin
  const addProduct = (p: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...p,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [newProduct, ...prev]);
    addToast('Product Added', `${p.name} added to catalog.`);
  };

  const updateProduct = (id: string, p: Partial<Product>) => {
    setProducts(prev => prev.map(prod => prod.id === id ? { ...prod, ...p } : prod));
    addToast('Product Updated', 'Product details saved successfully.');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(prod => prod.id !== id));
    addToast('Product Removed', 'Product deleted from inventory catalog.', 'warning');
  };

  return (
    <DataContext.Provider value={{
      products,
      categories,
      requirements,
      bookings,
      quotations,
      orders,
      recurring,
      draftRequirement,
      toasts,
      quoteModalOpen,
      selectedQuoteProduct,

      addToDraftRequirement,
      removeFromDraftRequirement,
      updateDraftQuantity,
      clearDraftRequirement,
      submitRequirement,

      createBooking,
      updateBookingStatus,

      acceptQuotation,
      requestQuotationRevision,
      createQuotation,

      updateOrderStatus,

      createRecurringSupply,
      toggleRecurringStatus,

      addProduct,
      updateProduct,
      deleteProduct,

      addToast,
      removeToast,

      openQuoteModal,
      closeQuoteModal
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
