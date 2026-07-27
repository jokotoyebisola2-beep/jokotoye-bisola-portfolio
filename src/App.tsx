import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { WhyWorkWithMe } from './components/WhyWorkWithMe';
import { ProjectShowcase } from './components/ProjectShowcase';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { FloatingWhatsappButton } from './components/FloatingWhatsappButton';
import { Project } from './types';

// Admin CMS Components (Phase 1 & Phase 2.1)
import { LoginPage } from './components/admin/LoginPage';
import { AdminLayout } from './components/admin/AdminLayout';
import { DashboardView } from './components/admin/DashboardView';
import { ProjectsView } from './components/admin/ProjectsView';
import { PhaseTwoView } from './components/admin/PhaseTwoView';

// Protected Route Guard
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-300 flex items-center justify-center text-xs font-bold tracking-wider uppercase font-sans">
        Initializing JB Studio CMS...
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Website Page Component (Unchanged)
function PublicWebsite() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-[#111827] selection:bg-[#2563EB] selection:text-white font-sans antialiased">
      {/* Navigation Header */}
      <Navbar />

      <main>
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Services */}
        <Services />

        {/* 3. Why Businesses Choose Me */}
        <WhyWorkWithMe />

        {/* 4. My Work */}
        <ProjectShowcase
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* 5. Reviews */}
        <Testimonials />

        {/* 6. Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Case Study Detail Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsappButton />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Portfolio Route */}
          <Route path="/" element={<PublicWebsite />} />

          {/* Admin CMS Login Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/login" element={<LoginPage />} />

          {/* Protected Admin CMS Dashboard Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout>
                  <DashboardView />
                </AdminLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminLayout>
                  <DashboardView />
                </AdminLayout>
              </ProtectedAdminRoute>
            }
          />

          {/* Projects Management (Phase 2.1) */}
          <Route
            path="/admin/projects"
            element={
              <ProtectedAdminRoute>
                <AdminLayout>
                  <ProjectsView />
                </AdminLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/services"
            element={
              <ProtectedAdminRoute>
                <AdminLayout>
                  <PhaseTwoView title="Services Manager" />
                </AdminLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/testimonials"
            element={
              <ProtectedAdminRoute>
                <AdminLayout>
                  <PhaseTwoView title="Testimonials Manager" />
                </AdminLayout>
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <ProtectedAdminRoute>
                <AdminLayout>
                  <PhaseTwoView title="Website Settings" />
                </AdminLayout>
              </ProtectedAdminRoute>
            }
          />

          {/* Fallback Routes */}
          <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
