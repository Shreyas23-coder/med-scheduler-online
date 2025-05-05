
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define the expected shape of doctor data
interface Doctor {
  name: string;
  specialty: string;
  image: string | null;
}

// Define the appointment interface that will be used in the component
type Appointment = {
  id: string;
  doctor_id: string;
  date: string;
  time: string;
  status: string;
  reason: string | null;
  doctor: Doctor;
};

// Define the raw shape of data coming directly from Supabase
interface RawAppointmentData {
  id: string;
  doctor_id: string;
  date: string;
  time: string;
  status: string;
  reason: string | null;
  doctors: Doctor;
}

const MyAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please sign in to view your appointments");
        navigate("/login");
        return;
      }
      
      fetchAppointments();
    };
    
    checkAuth();
  }, [navigate]);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from("appointments")
        .select(`
          id,
          doctor_id,
          date,
          time,
          status,
          reason,
          doctors (
            name,
            specialty,
            image
          )
        `)
        .eq("user_id", session.user.id)
        .order("date", { ascending: true });
      
      if (error) throw error;
      
      if (data) {
        // Transform the data to map from "doctors" to "doctor" property
        const transformedAppointments: Appointment[] = data.map((item: RawAppointmentData) => ({
          id: item.id,
          doctor_id: item.doctor_id,
          date: item.date,
          time: item.time,
          status: item.status,
          reason: item.reason,
          doctor: item.doctors // Map from doctors to doctor
        }));
        
        setAppointments(transformedAppointments);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments");
    } finally {
      setIsLoading(false);
    }
  };

  const cancelAppointment = async (id: string) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status: "cancelled" })
        .eq("id", id);
      
      if (error) throw error;
      
      setAppointments(appointments.map(app => 
        app.id === id ? { ...app, status: "cancelled" } : app
      ));
      
      toast.success("Appointment cancelled successfully");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const isUpcoming = (appointment: Appointment) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const appDate = new Date(appointment.date);
    return appDate >= today && appointment.status !== "cancelled";
  };

  const isPast = (appointment: Appointment) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const appDate = new Date(appointment.date);
    return appDate < today || appointment.status === "cancelled";
  };

  const upcomingAppointments = appointments.filter(isUpcoming);
  const pastAppointments = appointments.filter(isPast);

  const formatAppointmentDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "MMMM d, yyyy");
    } catch (error) {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-medical-blue border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-gray-600">Loading your appointments...</p>
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
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">My Appointments</h1>
          
          <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past & Cancelled</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              {upcomingAppointments.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-500">You have no upcoming appointments.</p>
                  <Button 
                    className="mt-4 bg-medical-blue hover:bg-medical-blueHover"
                    onClick={() => navigate("/doctors")}
                  >
                    Book an Appointment
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center">
                      <div className="md:w-1/4 mb-4 md:mb-0">
                        <img 
                          src={appointment.doctor.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop"} 
                          alt={appointment.doctor.name} 
                          className="rounded-lg w-full h-32 object-cover" 
                        />
                      </div>
                      <div className="md:w-3/4 md:pl-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                          <div>
                            <h3 className="text-lg font-semibold">Dr. {appointment.doctor.name}</h3>
                            <p className="text-sm text-gray-500">{appointment.doctor.specialty}</p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            {getStatusBadge(appointment.status)}
                          </div>
                        </div>
                        
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-medium">{formatAppointmentDate(appointment.date)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Time</p>
                            <p className="font-medium">{appointment.time}</p>
                          </div>
                        </div>
                        
                        {appointment.reason && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">Reason</p>
                            <p className="text-sm">{appointment.reason}</p>
                          </div>
                        )}
                        
                        <div className="mt-4 flex justify-end">
                          <Button 
                            variant="outline" 
                            className="text-red-500 border-red-500 hover:bg-red-50"
                            onClick={() => cancelAppointment(appointment.id)}
                          >
                            Cancel Appointment
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past">
              {pastAppointments.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-500">You have no past appointments.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pastAppointments.map((appointment) => (
                    <div key={appointment.id} className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center opacity-75">
                      <div className="md:w-1/4 mb-4 md:mb-0">
                        <img 
                          src={appointment.doctor.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop"} 
                          alt={appointment.doctor.name} 
                          className="rounded-lg w-full h-32 object-cover grayscale" 
                        />
                      </div>
                      <div className="md:w-3/4 md:pl-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                          <div>
                            <h3 className="text-lg font-semibold">Dr. {appointment.doctor.name}</h3>
                            <p className="text-sm text-gray-500">{appointment.doctor.specialty}</p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            {getStatusBadge(appointment.status)}
                          </div>
                        </div>
                        
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-medium">{formatAppointmentDate(appointment.date)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Time</p>
                            <p className="font-medium">{appointment.time}</p>
                          </div>
                        </div>
                        
                        {appointment.reason && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">Reason</p>
                            <p className="text-sm">{appointment.reason}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyAppointments;
