
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-white py-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">About Us</h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-medical-blue mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                We are a user-friendly platform that helps patients book doctor appointments 
                online with ease and convenience. Our mission is to make healthcare more 
                accessible to everyone by simplifying the appointment booking process and 
                connecting patients with trusted healthcare professionals.
              </p>
              <p className="text-gray-600">
                Founded in 2023, Prescripto has been dedicated to improving the healthcare 
                experience for both patients and doctors, using technology to bridge gaps 
                in healthcare access and communication.
              </p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-medical-blue mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Quick and easy appointment booking</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-medical-blue mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Access to a wide network of verified specialists</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-medical-blue mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>24/7 customer support</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-medical-blue mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Secure and private health information</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Team</h2>
            <p className="text-gray-600 mb-8">
              Our dedicated team of healthcare professionals, technologists, and customer support 
              specialists work together to ensure you receive the best possible care and service.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
