
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate("/login");
          return;
        }
        
        setUser(session.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-500">Loading profile information...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow container max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">My Account</h1>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-gray-800 font-medium">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Account ID</p>
                <p className="text-gray-800 font-medium">{user?.id}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-500 mb-2">Login Provider</p>
              <p className="text-gray-800 font-medium">Email and Password</p>
            </div>
            
            <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
              <Button 
                variant="outline"
                onClick={() => navigate("/appointments")}
              >
                View My Appointments
              </Button>
              <Button 
                variant="destructive"
                onClick={async () => {
                  await supabase.auth.signOut();
                  navigate("/");
                }}
              >
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
