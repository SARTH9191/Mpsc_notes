import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { LanguageProvider } from "./context/LanguageContext";

// Layouts
import { RootLayout } from "./layouts/RootLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";

// Student Pages
import { HomePage } from "./pages/HomePage";
import { ExamsPage } from "./pages/ExamsPage";
import { ExamDetailPage } from "./pages/ExamDetailPage";
import { NotesPage } from "./pages/NotesPage";
import { NoteDetailPage } from "./pages/NoteDetailPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { PaymentSuccessPage } from "./pages/PaymentSuccessPage";
import { DownloadPage } from "./pages/DownloadPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";

// Student Dashboard Subpages
import { 
  DashboardOverview, 
  DashboardPurchases, 
  DashboardDownloads, 
  DashboardProfile 
} from "./pages/DashboardPages";

// Static SEO & Business Pages
import { 
  AboutPage, 
  ContactPage, 
  FAQPage, 
  PrivacyPage, 
  TermsPage, 
  RefundPolicyPage, 
  NotFoundPage 
} from "./pages/StaticPages";

// Admin Suite Subpages
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminNotesPage } from "./pages/admin/AdminNotesPage";
import { AdminCategoriesPage } from "./pages/admin/AdminCategoriesPage";
import { AdminOrdersPage } from "./pages/admin/AdminOrdersPage";
import { AdminUsersPage, AdminPaymentsPage } from "./pages/admin/AdminUsersPage";
import { AdminAdManagementPage } from "./pages/admin/AdminAdManagementPage";
import { AdminAnalyticsPage } from "./pages/admin/AdminAnalyticsPage";
import { AdminSettingsPage } from "./pages/admin/AdminSettingsPage";

// ScrollToTop Helper Component to ensure top scroll on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// FirstVisitRedirect Component ensures that when a user opens the web app URL for the first time in a session, it always opens the Homepage (/)
function FirstVisitRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("examvault_session_started");
    if (!hasVisited) {
      sessionStorage.setItem("examvault_session_started", "true");
      if (location.pathname !== "/") {
        navigate("/", { replace: true });
      }
    }
  }, [location, navigate]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <LanguageProvider>
          <BrowserRouter>
            <ScrollToTop />
            <FirstVisitRedirect />
            <Routes>
              {/* Student Facing Public Routes - Index is HomePage */}
              <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="exams" element={<ExamsPage />} />
                <Route path="exams/:examId" element={<ExamDetailPage />} />
                <Route path="notes" element={<NotesPage />} />
                <Route path="notes/:noteId" element={<NoteDetailPage />} />
                <Route path="checkout/:noteId" element={<CheckoutPage />} />
                <Route path="payment-success" element={<PaymentSuccessPage />} />
                <Route path="download/:noteId" element={<DownloadPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />

                {/* Student Dashboard Subroutes */}
                <Route path="dashboard" element={<DashboardLayout />}>
                  <Route index element={<DashboardOverview />} />
                  <Route path="purchases" element={<DashboardPurchases />} />
                  <Route path="downloads" element={<DashboardDownloads />} />
                  <Route path="profile" element={<DashboardProfile />} />
                </Route>

                {/* Static Pages */}
                <Route path="about" element={<AboutPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="faq" element={<FAQPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
                <Route path="terms" element={<TermsPage />} />
                <Route path="refund-policy" element={<RefundPolicyPage />} />
                <Route path="404" element={<NotFoundPage />} />
              </Route>

              {/* Admin Dashboard Suite Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="notes" element={<AdminNotesPage />} />
                <Route path="categories" element={<AdminCategoriesPage />} />
                <Route path="orders" element={<AdminOrdersPage />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="payments" element={<AdminPaymentsPage />} />
                <Route path="advertisements" element={<AdminAdManagementPage />} />
                <Route path="analytics" element={<AdminAnalyticsPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
              </Route>

              {/* Catch-all unknown routes redirect directly to Homepage */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </DataProvider>
    </AuthProvider>
  );
}
