
import DoctorCard from "./DoctorCard";

const doctors = [
  {
    id: "1",
    name: "Richard James",
    specialty: "General Physician",
    image: "/public/lovable-uploads/6af26af9-e173-4e99-b91c-383040cbdcb5.png",
    rating: 4.9,
    fee: 100,
    availability: "Available Today"
  },
  {
    id: "2",
    name: "Sarah Wilson",
    specialty: "Cardiologist",
    image: "/public/lovable-uploads/6af26af9-e173-4e99-b91c-383040cbdcb5.png",
    rating: 4.8,
    fee: 150,
    availability: "Available Tomorrow"
  },
  {
    id: "3",
    name: "Michael Chen",
    specialty: "Dermatologist",
    image: "/public/lovable-uploads/6af26af9-e173-4e99-b91c-383040cbdcb5.png",
    rating: 4.7,
    fee: 120,
    availability: "Available Today"
  },
  {
    id: "4",
    name: "Emily Parker",
    specialty: "Pediatrician",
    image: "/public/lovable-uploads/6af26af9-e173-4e99-b91c-383040cbdcb5.png",
    rating: 4.9,
    fee: 110,
    availability: "Available Tomorrow"
  }
];

const FeaturedDoctors = () => {
  return (
    <section className="py-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Doctors</h2>
            <p className="mt-2 text-gray-600">Trusted professionals ready to help you</p>
          </div>
          <a href="/doctors" className="text-medical-blue hover:underline font-medium">
            View all →
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} {...doctor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDoctors;
