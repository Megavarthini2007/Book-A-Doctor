import React from 'react';
import Breadcrumb from '../../components/layout/Breadcrumb';

export const FAQ = () => {
  const faqs = [
    {
      q: 'How do I book an appointment with a doctor?',
      a: 'You can search for a doctor by specialization, name, or location on the Find Doctors page, select your preferred time slot, provide visit details, and confirm your booking instantly.'
    },
    {
      q: 'Are all doctors on Book A Doctor verified?',
      a: 'Yes. Every practitioner undergoes a thorough 6-step medical license verification process before being approved by our administration.'
    },
    {
      q: 'Can I cancel or reschedule my appointment?',
      a: 'Yes, you can cancel or reschedule your upcoming appointments directly from your Patient Dashboard under My Appointments.'
    },
    {
      q: 'How do I access my prescription after consultation?',
      a: 'Once your doctor completes the appointment, digital prescriptions and clinical notes become immediately viewable and downloadable under your Patient Dashboard > Prescriptions section.'
    }
  ];

  return (
    <div className="container py-4">
      <Breadcrumb items={[{ label: 'Frequently Asked Questions' }]} />

      <div className="text-center max-w-xl mx-auto mb-5">
        <h2 className="fw-bold text-dark display-6">Frequently Asked Questions</h2>
        <p className="text-secondary">Answers to common questions about booking doctor appointments and healthcare services.</p>
      </div>

      <div className="accordion accordion-flush bg-white rounded-4 border p-4 max-w-2xl mx-auto" id="faqAccordion">
        {faqs.map((faq, idx) => (
          <div key={idx} className="accordion-item">
            <h2 className="accordion-header" id={`heading${idx}`}>
              <button
                className={`accordion-button ${idx !== 0 ? 'collapsed' : ''} fw-bold text-dark`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${idx}`}
                aria-expanded={idx === 0}
                aria-controls={`collapse${idx}`}
              >
                {faq.q}
              </button>
            </h2>
            <div
              id={`collapse${idx}`}
              className={`accordion-collapse collapse ${idx === 0 ? 'show' : ''}`}
              aria-labelledby={`heading${idx}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body text-secondary small">{faq.a}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
