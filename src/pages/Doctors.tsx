
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("all");

  // Sample doctors data - in a real app this would come from an API
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      location: "New York",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop",
      rating: 4.8,
      reviews: 124,
      availability: "Available Today"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      location: "Boston",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop",
      rating: 4.9,
      reviews: 97,
      availability: "Next Available: Tomorrow"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      location: "Chicago",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300&auto=format&fit=crop",
      rating: 4.7,
      reviews: 156,
      availability: "Available Today"
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Dermatology",
      location: "Los Angeles",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop",
      rating: 4.6,
      reviews: 89,
      availability: "Next Available: Friday"
    },
  ];

  // Filter doctors based on search term and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        doctor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialty === "all" || doctor.specialty === specialty;
    return matchesSearch && matchesSpecialty;
  });

  const specialties = ["Cardiology", "Neurology", "Pediatrics", "Dermatology"];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Find a Doctor</h1>
          
          {/* Search and filter section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2">
                <Input
                  type="text"
                  placeholder="Search by doctor name or location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Select value={specialty} onValueChange={setSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    {specialties.map((spec) => (
                      <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Doctors list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
                  <p className="text-medical-blue font-medium">{doctor.specialty}</p>
                  <p className="text-gray-600 mb-3">{doctor.location}</p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {Array(5).fill(0).map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < Math.floor(doctor.rating) ? 'fill-current' : 'stroke-current fill-none'}`} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-700">{doctor.rating} ({doctor.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-medium">{doctor.availability}</span>
                    <Button className="bg-medical-blue hover:bg-medical-blueHover">Book Now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredDoctors.length === 0 && (
            <div className="text-center py-10">
              <h3 className="text-xl font-semibold text-gray-700">No doctors found</h3>
              <p className="text-gray-600 mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Doctors;
