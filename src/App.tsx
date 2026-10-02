import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Layouts
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// UI Overlays
import { ToastContainer } from './components/ui/ToastContainer';
import { QuoteModal } from './components/ui/QuoteModal';
import { WhatsAppFloat } from './components/ui/WhatsAppFloat';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { AboutPage } from './pages/public/AboutPage';
import { ProductsPage } from './pages/public/ProductsPage';
import { ProductDetailPage } from './pages/public/ProductDetailPage';
import { B2BSolutionsPage } from './pages/public/B2BSolutionsPage';
import { IndustriesPage } from './pages/public/IndustriesPage';
import { ContactPage } from './pages/public/ContactPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Customer Portal Pages
import { DashboardHome } from './pages/customer/DashboardHome';
import { CustomerProductsPage } from './pages/customer/CustomerProductsPage';
import { RequirementBuilderPage } from './pages/customer/RequirementBuilderPage';
import { MyRequirementsPage } from './pages/customer/MyRequirementsPage';
import { BookingSupplyPage } from './pages/customer/BookingSupplyPage';
import { BookingsListPage } from './pages/customer/BookingsListPage';
import { QuotationsListPage } from './pages/customer/QuotationsListPage';
import { OrdersListPage } from './pages/customer/OrdersListPage';
import { RecurringSupplyPage } from './pages/customer/RecurringSupplyPage';
import { ProfilePage } from './pages/customer/ProfilePage';

// Admin Portal Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage';
import { AdminRequirementsPage } from './pages/admin/AdminRequirementsPage';
import { AdminQuotationBuilderPage } from './pages/admin/AdminQuotationBuilderPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminRecurringPage } from './pages/admin/AdminRecurringPage';

// Route Guards
const CustomerRouteGuard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <DashboardLayout />;
};

const AdminRouteGuard: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated || !isAdmin) return <Navigate to="/admin/login" replace />;
  return <AdminLayout />;
};

const PublicLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:category" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/b2b" element={<B2BSolutionsPage />} />
              <Route path="/industries" element={<IndustriesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Customer Dashboard Routes */}
            <Route path="/dashboard" element={<CustomerRouteGuard />}>
              <Route index element={<DashboardHome />} />
              <Route path="products" element={<CustomerProductsPage />} />
              <Route path="requirements" element={<MyRequirementsPage />} />
              <Route path="requirements/new" element={<RequirementBuilderPage />} />
              <Route path="bookings" element={<BookingsListPage />} />
              <Route path="bookings/new" element={<BookingSupplyPage />} />
              <Route path="quotations" element={<QuotationsListPage />} />
              <Route path="quotations/:id" element={<QuotationsListPage />} />
              <Route path="orders" element={<OrdersListPage />} />
              <Route path="orders/:id" element={<OrdersListPage />} />
              <Route path="recurring" element={<RecurringSupplyPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminRouteGuard />}>
              <Route index element={<AdminDashboard />} />
              <Route path="customers" element={<AdminCustomersPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="categories" element={<AdminCategoriesPage />} />
              <Route path="requirements" element={<AdminRequirementsPage />} />
              <Route path="bookings" element={<AdminBookingsPage />} />
              <Route path="quotations" element={<AdminQuotationBuilderPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
              <Route path="recurring" element={<AdminRecurringPage />} />
            </Route>

            {/* Catch-all 404 */}
            <Route path="*" element={<PublicLayout />}>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>

          {/* Persistent Floating Overlays */}
          <ToastContainer />
          <QuoteModal />
          <WhatsAppFloat />
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
