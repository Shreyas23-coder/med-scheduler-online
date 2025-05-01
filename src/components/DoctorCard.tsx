
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type DoctorProps = {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  fee: number;
  availability: string;
};

const DoctorCard = ({ id, name, specialty, image, rating, fee, availability }: DoctorProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={image} 
            alt={`Dr. ${name}`} 
            className="w-full h-48 object-cover object-center" 
          />
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium text-medical-blue flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#FFCC00" stroke="#FFCC00" strokeWidth="2" className="mr-1">
              <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
            </svg>
            {rating.toFixed(1)}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">Dr. {name}</h3>
          <p className="text-sm text-gray-500 mb-2">{specialty}</p>
          
          <div className="flex items-center justify-between mb-4">
            <p className="text-medical-blue font-bold">${fee}</p>
            <span className="text-xs text-gray-500">{availability}</span>
          </div>
          
          <Button asChild className="w-full bg-medical-blue hover:bg-medical-blueHover text-white">
            <Link to={`/doctors/${id}`}>
              Book Appointment
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
