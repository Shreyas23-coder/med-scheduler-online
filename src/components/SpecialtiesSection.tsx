
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

type Specialty = {
  id: string;
  name: string;
  icon: JSX.Element;
};

const specialties: Specialty[] = [
  {
    id: "cardiology",
    name: "Cardiology",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      </svg>
    )
  },
  {
    id: "dermatology",
    name: "Dermatology",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M16 8a4 4 0 0 0-8 0"/>
        <path d="M12 14a2 2 0 0 0 0-4"/>
      </svg>
    )
  },
  {
    id: "neurology",
    name: "Neurology",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.2 6c-.4-2.8-2.6-5-5.4-5.4C11.3.1 8 1.7 6 5c-3.2.4-6 3.2-6 6.8 0 3.7 3 6.8 6.8 6.8h.8c.2 1 .9 1.8 1.8 2.2 1 .4 2 .2 2.8-.4.2.4.5.7.9.8 1.2.5 2.6 0 3.2-1.2.2.2.4.3.6.4.5.2 1.1.2 1.6 0 .5-.2 1-.5 1.3-1 .4.2.8.2 1.2.2 2.7-.8 2.8-4.6 2.8-5v-2c0-3.5-2.7-6.4-6-6.8h-1.8"/>
        <path d="M8 15v1c0 2 1.3 3 3 3h1"/>
        <path d="m13 7-3 2"/>
        <path d="m13 13-3-2"/>
      </svg>
    )
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
      </svg>
    )
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    )
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c-1.2 0-2.4.6-3 1.7A3.6 3.6 0 0 0 4.6 9c.4.6.8 1.2 1.2 1.7.3.5.6.9.8 1.4a2 2 0 0 1 0 1.8c-.2.5-.5.9-.8 1.4-.4.5-.8 1-1.2 1.7a3.6 3.6 0 0 0 4.4 4.3 3.7 3.7 0 0 0 6 0 3.6 3.6 0 0 0 4.4-4.3c-.4-.7-.8-1.2-1.2-1.7-.3-.5-.6-1-.8-1.4a2 2 0 0 1 0-1.8c.2-.5.5-.9.8-1.4.4-.5.8-1.1 1.2-1.7a3.6 3.6 0 0 0-4.4-4.3 3.7 3.7 0 0 0-3-1.7Z"/>
        <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/>
      </svg>
    )
  }
];

const SpecialtiesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Medical Specialties</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Find the right specialist for your health needs from our wide range of medical specialties
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {specialties.map((specialty) => (
            <Link to={`/specialty/${specialty.id}`} key={specialty.id}>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300 hover:border-medical-blue">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-medical-blue bg-opacity-10 flex items-center justify-center text-medical-blue">
                    {specialty.icon}
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900">{specialty.name}</h3>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;
