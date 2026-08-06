export const mockAppointments = [
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
    status: "Confirmed", // Requested, Pending, Confirmed, Scheduled, Completed, Cancelled, Rejected, Rescheduled
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
