
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-medical-blue text-white min-h-[500px] relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center min-h-[400px]">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Book Appointment<br />
              With Trusted Doctors
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-md">
              We are a user-friendly platform that helps patients book doctor appointments 
              online with ease and convenience.
            </p>
            <Button asChild className="bg-white text-medical-blue hover:bg-gray-100 rounded-full px-6 py-6 h-12 mt-4">
              <Link to="/doctors">
                Book appointment →
              </Link>
            </Button>
          </div>
          
          <div className="hidden md:block">
            <img 
              src="/lovable-uploads/2e0a5725-0b9c-44df-941b-0eea473c6c8c.png" 
              alt="Doctor in white coat" 
              className="object-contain h-full w-full" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
