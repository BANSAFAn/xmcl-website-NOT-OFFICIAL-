
import { Hero } from "@/components/Hero";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { DownloadSection } from "@/components/download";
import { InformationSection } from "@/components/InformationSection";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-minecraft-dark-blue">
      <Navbar />
      <Hero />
      <FeatureShowcase />
      <InformationSection />
      <DownloadSection />
      <Footer />
    </div>
  );
};

export default Index;
