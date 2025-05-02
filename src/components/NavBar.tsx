
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, User } from "lucide-react";
import { toast } from "sonner";

const NavBar = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm py-4">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-medical-blue p-1.5 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m19 14-2 2h-2"/>
                  <path d="m12 12-2 2"/>
                  <rect x="2" y="6" width="20" height="12" rx="2"/>
                  <path d="M4 10h.01"/>
                  <path d="M4 14h.01"/>
                  <path d="M8 10h.01"/>
                  <path d="M8 14h.01"/>
                  <path d="M12 10h.01"/>
                  <path d="M12 6v12"/>
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-800">Prescripto</span>
            </Link>

            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className="font-medium text-gray-600 hover:text-medical-blue px-3 py-2 rounded-md">HOME</Link>
              <Link to="/doctors" className="font-medium text-gray-600 hover:text-medical-blue px-3 py-2 rounded-md">ALL DOCTORS</Link>
              {user && (
                <Link to="/appointments" className="font-medium text-gray-600 hover:text-medical-blue px-3 py-2 rounded-md">MY APPOINTMENTS</Link>
              )}
              <Link to="/about" className="font-medium text-gray-600 hover:text-medical-blue px-3 py-2 rounded-md">ABOUT</Link>
              <Link to="/contact" className="font-medium text-gray-600 hover:text-medical-blue px-3 py-2 rounded-md">CONTACT</Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="ghost" size="sm" className="text-gray-600 flex items-center gap-2" onClick={() => navigate("/profile")}>
                  <User size={16} />
                  <span className="hidden sm:inline">Account</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600" onClick={handleLogout}>
                  <LogOut size={16} className="mr-2" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" className="text-gray-600">
                  <Link to="/login">
                    Sign In
                  </Link>
                </Button>
                <Button asChild className="bg-medical-blue hover:bg-medical-blueHover text-white rounded-full">
                  <Link to="/register">
                    Create account
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
