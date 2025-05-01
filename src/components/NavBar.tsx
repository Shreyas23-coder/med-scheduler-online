
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const NavBar = () => {
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
              <Link to="/about" className="font-medium text-gray-600 hover:text-medical-blue px-3 py-2 rounded-md">ABOUT</Link>
              <Link to="/contact" className="font-medium text-gray-600 hover:text-medical-blue px-3 py-2 rounded-md">CONTACT</Link>
            </div>
          </div>

          <div className="flex items-center">
            <Button asChild className="bg-medical-blue hover:bg-medical-blueHover text-white rounded-full">
              <Link to="/register">
                Create account
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
