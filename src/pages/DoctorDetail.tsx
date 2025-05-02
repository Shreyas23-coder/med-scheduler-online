
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Define Doctor type based on our database schema
type Doctor = {
  id: string;
  name: string;
  specialty: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  availability: string;
  bio: string | null;
  experience: number;
  fee: number;
  created_at: string;
  updated_at: string;
};

const DoctorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [userSession, setUserSession] = useState<any>(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserSession(session);
    });

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUserSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch doctor details from Supabase
  const { data: doctor, isLoading, error } = useQuery({
    queryKey: ["doctor", id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("doctors")
          .select("*")
          .eq("id", id)
          .single();
        
        if (error) {
          toast.error("Failed to load doctor details");
          throw error;
        }
        
        return data as Doctor;
      } catch (err) {
        console.error("Error fetching doctor details:", err);
        throw err;
      }
    },
  });

  // Available time slots (in a real app, these would come from the backend)
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM", 
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ];

  const bookAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time");
      return;
    }

    // Check if user is authenticated
    if (!userSession) {
      toast.error("Please sign in to book an appointment");
      navigate("/login");
      return;
    }

    try {
      const appointmentData = {
        doctor_id: id,
        user_id: userSession.user.id,
        date: format(selectedDate, "yyyy-MM-dd"),
        time: selectedTime,
        status: "pending",
        reason: "General Checkup" // This would come from a form in a real app
      };

      const { error } = await supabase
        .from("appointments")
        .insert(appointmentData);

      if (error) throw error;
      
      toast.success("Appointment booked successfully");
      navigate("/appointments");
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-medical-blue border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-gray-600">Loading doctor details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-red-500">Failed to load doctor details</p>
            <Button className="mt-4" onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Doctor profile header */}
            <div className="relative h-48 md:h-64 bg-medical-blue">
              <div className="absolute inset-0 bg-gradient-to-r from-medical-blue to-medical-lightBlue opacity-90"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <h1 className="text-3xl font-bold">{doctor.name}</h1>
                <p className="text-xl opacity-90">{doctor.specialty}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
              {/* Doctor details column */}
              <div className="md:col-span-1">
                <div className="mb-6">
                  <img 
                    src={doctor.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop"} 
                    alt={doctor.name} 
                    className="rounded-lg w-full h-64 object-cover mb-4" 
                  />
                  
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {Array(5).fill(0).map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < Math.floor(doctor.rating) ? 'fill-current' : 'stroke-current fill-none'}`} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-700">{doctor.rating} ({doctor.reviews} reviews)</span>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-medical-blue mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{doctor.location}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-medical-blue mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>{doctor.experience}+ years experience</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-medical-blue mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V5z" clipRule="evenodd" />
                      </svg>
                      <span>{doctor.availability}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg mb-6">
                  <h3 className="font-semibold text-lg mb-2">Consultation Fee</h3>
                  <p className="text-2xl font-bold text-medical-blue">${doctor.fee}</p>
                </div>
              </div>
              
              {/* Booking column */}
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>
                
                {!userSession ? (
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
                    <div className="flex justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-medical-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Please sign in to book an appointment</h3>
                    <p className="text-gray-600 mb-6">You need to be signed in to schedule appointments with Dr. {doctor.name}</p>
                    <div className="flex justify-center gap-4">
                      <Button
                        onClick={() => navigate("/login")}
                        className="bg-medical-blue hover:bg-medical-blueHover text-white"
                      >
                        Sign In
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => navigate("/register")}
                        className="border-medical-blue text-medical-blue hover:bg-medical-blue/10"
                      >
                        Create Account
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Select Date</h3>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="border rounded-md pointer-events-auto"
                        disabled={(date) => 
                          date < new Date() || 
                          date > new Date(new Date().setDate(new Date().getDate() + 30))
                        }
                      />
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Select Time</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            className={`text-sm ${selectedTime === time ? 'bg-medical-blue text-white' : ''}`}
                            onClick={() => setSelectedTime(time)}
                            disabled={!selectedDate}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {userSession && (
                  <Button 
                    onClick={bookAppointment}
                    className="w-full mt-8 bg-medical-blue hover:bg-medical-blueHover text-white py-3"
                    disabled={!selectedDate || !selectedTime}
                  >
                    Book Appointment
                  </Button>
                )}
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">About Dr. {doctor.name.split(' ')[0]}</h3>
                  <p className="text-gray-700">
                    {doctor.bio || `Dr. ${doctor.name} is a highly experienced ${doctor.specialty} specialist with ${doctor.experience}+ years of clinical experience. 
                    They are committed to providing compassionate and personalized care to all patients.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DoctorDetail;
