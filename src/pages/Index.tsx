
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import SpecialtiesSection from "@/components/SpecialtiesSection";
import FeaturedDoctors from "@/components/FeaturedDoctors";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main>
        <Hero />
        <SpecialtiesSection />
        <FeaturedDoctors />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
