require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');
const MedicalDocument = require('./models/MedicalDocument');
const Prescription = require('./models/Prescription');

const mockMedicalDocuments = [
  {
    id: 'doc-1',
    patientId: 'pat-201',
    patientEmail: 'rohan.verma@example.com',
    name: 'Cardiac_ECG_Report_2026.pdf',
    category: 'Medical Report',
    size: '1.8 MB',
    fileUrl: '',
    uploadDate: '2026-06-12',
    status: 'Active'
  },
  {
    id: 'doc-2',
    patientId: 'pat-201',
    patientEmail: 'rohan.verma@example.com',
    name: 'Blood_Sugar_Panel_Report.pdf',
    category: 'Lab Report',
    size: '920 KB',
    fileUrl: '',
    uploadDate: '2026-05-20',
    status: 'Active'
  }
];

const mockPrescriptions = [
  {
    id: 'RX-901',
    appointmentId: 'APT-8039',
    patientId: 'pat-202',
    patientName: 'Sneha Reddy',
    patientEmail: 'sneha.reddy@example.com',
    doctorId: 'doc-101',
    doctorName: 'Dr. Arjun Kumar',
    doctorSpecialization: 'Cardiology',
    date: '2026-08-02',
    medicines: [
      { name: 'Telmisartan', dosage: '40mg', frequency: 'Once daily in morning', duration: '30 Days', instructions: 'After breakfast' },
      { name: 'Atorvastatin', dosage: '10mg', frequency: 'Once daily at night', duration: '30 Days', instructions: 'After dinner' }
    ],
    diagnosis: 'Mild hypertension and borderline lipid elevation',
    followUp: 'Follow up after 1 month with lipid profile report.',
    notes: 'Patient advised to reduce caffeine intake.'
  }
];

const mockDoctors = [
  {
    id: "doc-101",
    name: "Dr. Arjun Kumar",
    title: "Senior Cardiologist",
    specialization: "Cardiology",
    qualification: "MBBS, MD (General Medicine), DM (Cardiology)",
    experience: 14,
    rating: 4.9,
    reviewCount: 128,
    clinicName: "Apex Heart & Vascular Care",
    location: "Koramangala, Bengaluru",
    city: "Bengaluru",
    consultationFee: 800,
    about: "Dr. Arjun Kumar is a renowned cardiologist with over 14 years of clinical experience in non-invasive cardiology, heart failure management, and preventive cardiac care.",
    verified: true,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    availableSlots: [
      { id: "s1", time: "09:00 AM", period: "Morning", available: true },
      { id: "s2", time: "09:30 AM", period: "Morning", available: false },
      { id: "s3", time: "10:00 AM", period: "Morning", available: true },
      { id: "s4", time: "11:30 AM", period: "Morning", available: true },
      { id: "s5", time: "02:00 PM", period: "Afternoon", available: true },
      { id: "s6", time: "03:30 PM", period: "Afternoon", available: false },
      { id: "s7", time: "05:00 PM", period: "Evening", available: true },
      { id: "s8", time: "06:30 PM", period: "Evening", available: true }
    ],
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
    status: "Approved",
    regNumber: "KMC-45920",
    registrationYear: 2010
  },
  {
    id: "doc-102",
    name: "Dr. Priya Sharma",
    title: "Consultant Dermatologist",
    specialization: "Dermatology",
    qualification: "MBBS, DVD, MD (Dermatology)",
    experience: 10,
    rating: 4.8,
    reviewCount: 94,
    clinicName: "Glow Skin & Laser Clinic",
    location: "Indiranagar, Bengaluru",
    city: "Bengaluru",
    consultationFee: 700,
    about: "Dr. Priya Sharma specializes in cosmetic dermatology, acne treatment, laser therapies, and pediatric skin conditions with a patient-centric approach.",
    verified: true,
    availableDays: ["Monday", "Wednesday", "Friday", "Saturday"],
    availableSlots: [
      { id: "s10", time: "10:00 AM", period: "Morning", available: true },
      { id: "s11", time: "11:00 AM", period: "Morning", available: true },
      { id: "s12", time: "02:30 PM", period: "Afternoon", available: true },
      { id: "s13", time: "04:00 PM", period: "Afternoon", available: true },
      { id: "s14", time: "06:00 PM", period: "Evening", available: true }
    ],
    image: "https://images.unsplash.com/photo-1594824813566-78a9c394c8b9?auto=format&fit=crop&q=80&w=400",
    status: "Approved",
    regNumber: "KMC-51034",
    registrationYear: 2014
  },
  {
    id: "doc-103",
    name: "Dr. Meera Nair",
    title: "Lead Pediatrician",
    specialization: "Pediatrics",
    qualification: "MBBS, DCH, MD (Pediatrics)",
    experience: 12,
    rating: 4.95,
    reviewCount: 156,
    clinicName: "Little Angels Child Clinic",
    location: "Jayanagar, Bengaluru",
    city: "Bengaluru",
    consultationFee: 650,
    about: "Dr. Meera Nair is a trusted pediatrician focused on child immunization, growth monitoring, pediatric nutrition, and neonatal care.",
    verified: true,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    availableSlots: [
      { id: "s20", time: "09:30 AM", period: "Morning", available: true },
      { id: "s21", time: "10:30 AM", period: "Morning", available: true },
      { id: "s22", time: "11:30 AM", period: "Morning", available: false },
      { id: "s23", time: "03:00 PM", period: "Afternoon", available: true },
      { id: "s24", time: "05:30 PM", period: "Evening", available: true }
    ],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
    status: "Approved",
    regNumber: "KMC-48211",
    registrationYear: 2012
  },
  {
    id: "doc-104",
    name: "Dr. Rahul Verma",
    title: "Orthopedic Surgeon",
    specialization: "Orthopedics",
    qualification: "MBBS, MS (Orthopedics), MCh (Joint Replacement)",
    experience: 16,
    rating: 4.85,
    reviewCount: 110,
    clinicName: "OrthoSpine Specialty Center",
    location: "HSR Layout, Bengaluru",
    city: "Bengaluru",
    consultationFee: 900,
    about: "Dr. Rahul Verma specializes in arthroscopy, sports injuries, joint replacement surgeries, and complex fracture treatments.",
    verified: true,
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    availableSlots: [
      { id: "s30", time: "10:00 AM", period: "Morning", available: true },
      { id: "s31", time: "11:30 AM", period: "Morning", available: true },
      { id: "s32", time: "04:00 PM", period: "Afternoon", available: true },
      { id: "s33", time: "06:30 PM", period: "Evening", available: true }
    ],
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
    status: "Approved",
    regNumber: "KMC-41890",
    registrationYear: 2008
  },
  {
    id: "doc-105",
    name: "Dr. Ananya Deshmukh",
    title: "Consultant Neurologist",
    specialization: "Neurology",
    qualification: "MBBS, MD, DM (Neurology)",
    experience: 11,
    rating: 4.75,
    reviewCount: 82,
    clinicName: "NeuroCare Institute",
    location: "Whitefield, Bengaluru",
    city: "Bengaluru",
    consultationFee: 1000,
    about: "Dr. Ananya Deshmukh specializes in migraine management, stroke care, epilepsy treatment, and movement disorders.",
    verified: true,
    availableDays: ["Monday", "Wednesday", "Friday"],
    availableSlots: [
      { id: "s40", time: "09:00 AM", period: "Morning", available: true },
      { id: "s41", time: "11:00 AM", period: "Morning", available: true },
      { id: "s42", time: "03:00 PM", period: "Afternoon", available: true }
    ],
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=400",
    status: "Approved",
    regNumber: "KMC-53210",
    registrationYear: 2013
  },
  {
    id: "doc-106",
    name: "Dr. Rajesh Iyer",
    title: "General Physician & Diabetologist",
    specialization: "General Physician",
    qualification: "MBBS, MD (General Medicine)",
    experience: 18,
    rating: 4.9,
    reviewCount: 210,
    clinicName: "City Healthcare Clinic",
    location: "Malleswaram, Bengaluru",
    city: "Bengaluru",
    consultationFee: 500,
    about: "Dr. Rajesh Iyer provides comprehensive primary care, chronic disease management, lifestyle guidance, and adult immunizations.",
    verified: true,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    availableSlots: [
      { id: "s50", time: "08:30 AM", period: "Morning", available: true },
      { id: "s51", time: "10:00 AM", period: "Morning", available: true },
      { id: "s52", time: "05:00 PM", period: "Evening", available: true },
      { id: "s53", time: "07:00 PM", period: "Evening", available: true }
    ],
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
    status: "Approved",
    regNumber: "KMC-39012",
    registrationYear: 2006
  },
  {
    id: "doc-107",
    name: "Dr. Sunita Patel",
    title: "Senior Gynecologist & Obstetrician",
    specialization: "Gynecology",
    qualification: "MBBS, MS (Obstetrics & Gynecology)",
    experience: 15,
    rating: 4.88,
    reviewCount: 145,
    clinicName: "Motherhood & Women Care",
    location: "BTM Layout, Bengaluru",
    city: "Bengaluru",
    consultationFee: 750,
    about: "Dr. Sunita Patel offers complete women's healthcare services, high-risk pregnancy care, PCOS treatment, and minimally invasive gynecological care.",
    verified: false,
    availableDays: ["Monday", "Tuesday", "Thursday", "Friday"],
    availableSlots: [
      { id: "s60", time: "10:00 AM", period: "Morning", available: true },
      { id: "s61", time: "02:00 PM", period: "Afternoon", available: true }
    ],
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=400",

    status: "Pending",
    regNumber: "KMC-42199",
    registrationYear: 2009
  }
];

const mockPatients = [
  {
    id: "pat-201",
    name: "Rohan Verma",
    email: "rohan.verma@example.com",
    phone: "+91 98765 43210",
    dob: "1992-06-15",
    gender: "Male",
    bloodGroup: "O+",
    address: "Flat 402, Green Glen Layout, Bellandur, Bengaluru",
    city: "Bengaluru",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
    joinedDate: "2024-01-15",
    status: "Active",
    role: "patient"
  },
  {
    id: "pat-202",
    name: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    phone: "+91 98123 45678",
    dob: "1995-11-20",
    gender: "Female",
    bloodGroup: "A+",
    address: "House #12, 4th Cross, Indiranagar, Bengaluru",
    city: "Bengaluru",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    joinedDate: "2024-02-10",
    status: "Active",
    role: "patient"
  },
  {
    id: "pat-203",
    name: "Amitabh Banerjee",
    email: "amitabh.b@example.com",
    phone: "+91 97654 32109",
    dob: "1980-03-04",
    gender: "Male",
    bloodGroup: "B+",
    address: "32/B, MG Road, Bengaluru",
    city: "Bengaluru",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=200",
    joinedDate: "2023-11-05",
    status: "Active",
    role: "patient"
  }
];

const mockAppointments = [
  {
    id: "APT-8041",
    patientId: "pat-201",
    patientName: "Rohan Verma",
    patientEmail: "rohan.verma@example.com",
    patientPhone: "+91 98765 43210",
    doctorId: "doc-101",
    doctorName: "Dr. Arjun Kumar",
    doctorSpecialization: "Cardiology",
    doctorClinic: "Apex Heart & Vascular Care",
    doctorLocation: "Koramangala, Bengaluru",
    doctorImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
    date: "2026-08-06",
    time: "10:00 AM",
    slotPeriod: "Morning",
    reason: "Annual heart health checkup and blood pressure evaluation.",
    status: "Confirmed",
    fee: 800,
    paymentStatus: "Paid",
    documents: [
      { name: "Blood_Test_Report.pdf", size: "1.4 MB", type: "PDF" },
      { name: "ECG_Scan_2025.jpg", size: "850 KB", type: "Image" }
    ],
    timeline: [
      { status: "Requested", date: "2026-08-04 09:15 AM" },
      { status: "Confirmed", date: "2026-08-04 10:30 AM" }
    ],
    notes: "",
    prescription: null
  },
  {
    id: "APT-8042",
    patientId: "pat-201",
    patientName: "Rohan Verma",
    patientEmail: "rohan.verma@example.com",
    patientPhone: "+91 98765 43210",
    doctorId: "doc-102",
    doctorName: "Dr. Priya Sharma",
    doctorSpecialization: "Dermatology",
    doctorClinic: "Glow Skin & Laser Clinic",
    doctorLocation: "Indiranagar, Bengaluru",
    doctorImage: "https://images.unsplash.com/photo-1594824813566-78a9c394c8b9?auto=format&fit=crop&q=80&w=400",
    date: "2026-08-08",
    time: "02:30 PM",
    slotPeriod: "Afternoon",
    reason: "Skin rash consultation and prescription renewal.",
    status: "Pending",
    fee: 700,
    paymentStatus: "Pending",
    documents: [],
    timeline: [
      { status: "Requested", date: "2026-08-04 11:00 AM" }
    ],
    notes: "",
    prescription: null
  },
  {
    id: "APT-8039",
    patientId: "pat-202",
    patientName: "Sneha Reddy",
    patientEmail: "sneha.reddy@example.com",
    patientPhone: "+91 98123 45678",
    doctorId: "doc-101",
    doctorName: "Dr. Arjun Kumar",
    doctorSpecialization: "Cardiology",
    doctorClinic: "Apex Heart & Vascular Care",
    doctorLocation: "Koramangala, Bengaluru",
    doctorImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
    date: "2026-08-02",
    time: "11:30 AM",
    slotPeriod: "Morning",
    reason: "Post-exercise palpitation check.",
    status: "Completed",
    fee: 800,
    paymentStatus: "Paid",
    documents: [],
    timeline: [
      { status: "Requested", date: "2026-07-30 02:00 PM" },
      { status: "Confirmed", date: "2026-07-30 04:15 PM" },
      { status: "Completed", date: "2026-08-02 12:15 PM" }
    ],
    notes: "Patient advised to reduce caffeine intake. EKG normal.",
    prescription: {
      id: "RX-901",
      medicines: [
        { name: "Telmisartan", dosage: "40mg", frequency: "Once daily in morning", duration: "30 Days", instructions: "After breakfast" },
        { name: "Atorvastatin", dosage: "10mg", frequency: "Once daily at night", duration: "30 Days", instructions: "After dinner" }
      ],
      followUp: "Follow up after 1 month with lipid profile report."
    }
  },
  {
    id: "APT-8030",
    patientId: "pat-203",
    patientName: "Amitabh Banerjee",
    patientEmail: "amitabh.b@example.com",
    patientPhone: "+91 97654 32109",
    doctorId: "doc-104",
    doctorName: "Dr. Rahul Verma",
    doctorSpecialization: "Orthopedics",
    doctorClinic: "OrthoSpine Specialty Center",
    doctorLocation: "HSR Layout, Bengaluru",
    doctorImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
    date: "2026-07-28",
    time: "04:00 PM",
    slotPeriod: "Afternoon",
    reason: "Lower back pain consultation.",
    status: "Cancelled",
    fee: 900,
    paymentStatus: "Refunded",
    documents: [],
    timeline: [
      { status: "Requested", date: "2026-07-25 10:00 AM" },
      { status: "Cancelled", date: "2026-07-27 01:20 PM" }
    ],
    notes: "Cancelled by patient due to travel.",
    prescription: null
  }
];

async function seedDatabase() {
  console.log("Connecting to MongoDB Atlas...");
  await connectDB();

  console.log("Cleaning up old collections...");
  await User.deleteMany({});
  await Doctor.deleteMany({});
  await Appointment.deleteMany({});
  await MedicalDocument.deleteMany({});
  await Prescription.deleteMany({});

  console.log("Seeding Users collection...");
  const seededUsers = await User.insertMany(mockPatients);
  console.log(`Successfully seeded ${seededUsers.length} users into 'users' collection.`);

  console.log("Seeding Doctors collection...");
  const seededDoctors = await Doctor.insertMany(mockDoctors);
  console.log(`Successfully seeded ${seededDoctors.length} doctors into 'doctors' collection.`);

  console.log("Seeding Appointments collection...");
  const seededAppointments = await Appointment.insertMany(mockAppointments);
  console.log(`Successfully seeded ${seededAppointments.length} appointments into 'appointments' collection.`);

  console.log("Seeding Medical Documents collection...");
  const seededDocs = await MedicalDocument.insertMany(mockMedicalDocuments);
  console.log(`Successfully seeded ${seededDocs.length} medical documents into 'medicaldocuments' collection.`);

  console.log("Seeding Prescriptions collection...");
  const seededRxs = await Prescription.insertMany(mockPrescriptions);
  console.log(`Successfully seeded ${seededRxs.length} prescriptions into 'prescriptions' collection.`);

  console.log("\nDatabase 'book_a_doctor' & all collections ('users', 'doctors', 'appointments', 'medicaldocuments', 'prescriptions') populated successfully!");
  process.exit(0);
}

seedDatabase().catch((err) => {
  console.error("Database Seeding Failed:", err.message);
  process.exit(1);
});
