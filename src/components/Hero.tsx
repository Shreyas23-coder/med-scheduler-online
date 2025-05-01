
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
              Simply browse through our extensive list of trusted doctors, 
              schedule your appointment hassle-free.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex -space-x-2">
                <img className="w-10 h-10 rounded-full border-2 border-white" src="/public/lovable-uploads/6af26af9-e173-4e99-b91c-383040cbdcb5.png" alt="Doctor Avatar" />
                <img className="w-10 h-10 rounded-full border-2 border-white" src="/public/lovable-uploads/6af26af9-e173-4e99-b91c-383040cbdcb5.png" alt="Doctor Avatar" />
                <img className="w-10 h-10 rounded-full border-2 border-white" src="/public/lovable-uploads/6af26af9-e173-4e99-b91c-383040cbdcb5.png" alt="Doctor Avatar" />
              </div>
            </div>
            <Button asChild className="bg-white text-medical-blue hover:bg-gray-100 rounded-full px-6 py-6 h-12 mt-4">
              <Link to="/doctors">
                Book appointment →
              </Link>
            </Button>
          </div>
          
          <div className="hidden md:block">
            <img 
              src="/public/lovable-uploads/7967c4e9-96e9-4830-bbbd-f7b6e37ecbcf.png" 
              alt="Medical Team" 
              className="object-cover h-full w-full" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
