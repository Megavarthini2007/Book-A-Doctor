import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import PatientLayout from '../layouts/PatientLayout';
import DoctorLayout from '../layouts/DoctorLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import Spinner from '../components/common/Spinner';

// Lazy Loaded Public Pages
const Home = lazy(() => import('../pages/Home/Home'));
const Doctors = lazy(() => import('../pages/Doctors/Doctors'));
const DoctorProfile = lazy(() => import('../pages/DoctorProfile/DoctorProfile'));
const Services = lazy(() => import('../pages/Services/Services'));
const About = lazy(() => import('../pages/About/About'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const FAQ = lazy(() => import('../pages/FAQ/FAQ'));
const Privacy = lazy(() => import('../pages/Legal/Privacy'));
const Terms = lazy(() => import('../pages/Legal/Terms'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

// Auth Pages
const Login = lazy(() => import('../pages/Login/Login'));
const Register = lazy(() => import('../pages/Register/Register'));
const DoctorRegister = lazy(() => import('../pages/Register/DoctorRegister'));
const ForgotPassword = lazy(() => import('../pages/Register/ForgotPassword'));

// Patient Pages
const PatientDashboard = lazy(() => import('../pages/PatientDashboard/PatientDashboard'));
const BookAppointment = lazy(() => import('../pages/BookAppointment/BookAppointment'));
const MyAppointments = lazy(() => import('../pages/MyAppointments/MyAppointments'));
const AppointmentDetails = lazy(() => import('../pages/MyAppointments/AppointmentDetails'));
const MedicalDocuments = lazy(() => import('../pages/UploadReports/MedicalDocuments'));
const Prescriptions = lazy(() => import('../pages/UploadReports/Prescriptions'));
const PatientNotifications = lazy(() => import('../pages/PatientDashboard/Notifications'));
const PatientProfile = lazy(() => import('../pages/PatientDashboard/Profile'));
const PatientSettings = lazy(() => import('../pages/PatientDashboard/Settings'));

// Doctor Pages
const DoctorDashboard = lazy(() => import('../pages/DoctorDashboard/DoctorDashboard'));
const AppointmentRequests = lazy(() => import('../pages/DoctorDashboard/AppointmentRequests'));
const TodayAppointments = lazy(() => import('../pages/DoctorDashboard/TodayAppointments'));
const Availability = lazy(() => import('../pages/DoctorDashboard/Availability'));
const Consultation = lazy(() => import('../pages/DoctorDashboard/Consultation'));
const PatientsList = lazy(() => import('../pages/DoctorDashboard/PatientsList'));

// Admin Pages
const AdminDashboard = lazy(() => import('../pages/AdminDashboard/AdminDashboard'));
const DoctorApprovals = lazy(() => import('../pages/AdminDashboard/DoctorApprovals'));
const ManageDoctors = lazy(() => import('../pages/AdminDashboard/ManageDoctors'));
const ManagePatients = lazy(() => import('../pages/AdminDashboard/ManagePatients'));
const ManageAppointments = lazy(() => import('../pages/AdminDashboard/ManageAppointments'));
const Reports = lazy(() => import('../pages/AdminDashboard/Reports'));
const Activity = lazy(() => import('../pages/AdminDashboard/Activity'));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner fullPage message="Loading Book A Doctor SaaS Platform..." />}>
      <Routes>
        {/* Public Main Layout Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="doctors/:id" element={<DoctorProfile />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />

          {/* Auth Pages within MainLayout */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="register/doctor" element={<DoctorRegister />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Patient Portal Routes */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/patient/dashboard" replace />} />
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="book" element={<BookAppointment />} />
          <Route path="appointments" element={<MyAppointments />} />
          <Route path="appointments/:id" element={<AppointmentDetails />} />
          <Route path="documents" element={<MedicalDocuments />} />
          <Route path="prescriptions" element={<Prescriptions />} />
          <Route path="notifications" element={<PatientNotifications />} />
          <Route path="profile" element={<PatientProfile />} />
          <Route path="settings" element={<PatientSettings />} />
        </Route>

        {/* Doctor Portal Routes */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/doctor/dashboard" replace />} />
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="requests" element={<AppointmentRequests />} />
          <Route path="appointments" element={<TodayAppointments />} />
          <Route path="patients" element={<PatientsList />} />
          <Route path="availability" element={<Availability />} />
          <Route path="consultation" element={<Consultation />} />
          <Route path="notifications" element={<PatientNotifications />} />
          <Route path="profile" element={<PatientProfile />} />
          <Route path="settings" element={<PatientSettings />} />
        </Route>

        {/* Admin Workspace Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="doctors/pending" element={<DoctorApprovals />} />
          <Route path="doctors" element={<ManageDoctors />} />
          <Route path="patients" element={<ManagePatients />} />
          <Route path="appointments" element={<ManageAppointments />} />
          <Route path="reports" element={<Reports />} />
          <Route path="activity" element={<Activity />} />
          <Route path="settings" element={<PatientSettings />} />
        </Route>

        {/* 404 Catch All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
