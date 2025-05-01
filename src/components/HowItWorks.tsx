
const steps = [
  {
    id: 1,
    title: "Find a Doctor",
    description: "Browse through our list of qualified doctors and select the one that meets your needs.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.3-4.3"/>
      </svg>
    )
  },
  {
    id: 2,
    title: "Book an Appointment",
    description: "Select a date and time slot that works for you and book your appointment.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
        <line x1="16" x2="16" y1="2" y2="6"/>
        <line x1="8" x2="8" y1="2" y2="6"/>
        <line x1="3" x2="21" y1="10" y2="10"/>
        <path d="m9 16 2 2 4-4"/>
      </svg>
    )
  },
  {
    id: 3,
    title: "Get Confirmation",
    description: "Receive instant confirmation via email and SMS with all appointment details.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    )
  },
  {
    id: 4,
    title: "Visit the Doctor",
    description: "Arrive at the clinic on the scheduled date and time for your appointment.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/>
        <path d="M4 21h16"/>
        <path d="M12 3v10"/>
        <path d="m9 6 3-3 3 3"/>
      </svg>
    )
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Booking an appointment with Prescripto is quick and easy
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-medical-blue flex items-center justify-center text-white mb-4">
                {step.icon}
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md w-full">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {step.id < steps.length && (
                <div className="hidden lg:flex items-center justify-center w-full mt-8">
                  <svg width="80" height="2" viewBox="0 0 80 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="1" x2="80" y2="1" stroke="#CBD5E0" strokeWidth="2" strokeDasharray="4 4" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
