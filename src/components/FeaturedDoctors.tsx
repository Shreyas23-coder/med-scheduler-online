
import { useQuery } from "@tanstack/react-query";
import DoctorCard from "./DoctorCard";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const FeaturedDoctors = () => {
  const { data: doctors, isLoading } = useQuery({
    queryKey: ["featuredDoctors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .limit(4);
      
      if (error) {
        console.error("Error loading featured doctors:", error);
        return [];
      }
      
      return data || [];
    }
  });

  return (
    <section className="py-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Doctors</h2>
            <p className="mt-2 text-gray-600">Trusted professionals ready to help you</p>
          </div>
          <Link to="/doctors" className="text-medical-blue hover:underline font-medium">
            View all →
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow h-72 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors && doctors.length > 0 ? (
              doctors.map((doctor) => (
                <DoctorCard 
                  key={doctor.id} 
                  id={doctor.id}
                  name={doctor.name} 
                  specialty={doctor.specialty}
                  image={doctor.image || "/public/lovable-uploads/6af26af9-e173-4e99-b91c-383040cbdcb5.png"}
                  rating={doctor.rating || 4.8}
                  fee={doctor.fee || 100}
                  availability={doctor.availability || "Available Today"}
                />
              ))
            ) : (
              <div className="col-span-4 text-center py-10">
                <p className="text-gray-500">No doctors found. Add some doctors in Supabase.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedDoctors;
