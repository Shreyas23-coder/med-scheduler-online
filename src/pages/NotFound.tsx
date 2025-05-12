
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-50 py-16">
        <div className="text-center max-w-lg px-4">
          <h1 className="text-7xl font-bold text-medical-blue mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It 
            might have been moved or doesn't exist.
          </p>
          <p className="text-gray-700 mb-8 border-t border-b border-gray-200 py-4">
            We are a user-friendly platform that helps patients book doctor appointments 
            online with ease and convenience.
          </p>
          <Button 
            asChild 
            className="bg-medical-blue hover:bg-medical-blueHover text-white rounded-md px-8 py-6"
          >
            <Link to="/">
              Return to Home
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
