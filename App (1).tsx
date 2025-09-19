import { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { BenefitsSection } from "./components/BenefitsSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { TeamSection } from "./components/TeamSection";
import { PricingSection } from "./components/PricingSection";
import { Footer } from "./components/Footer";
import { Dashboard } from "./components/Dashboard";

type AppView = 'landing' | 'dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');

  if (currentView === 'dashboard') {
    return <Dashboard onBackToLanding={() => setCurrentView('landing')} />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#222222' }}>
      <Header onAccessDashboard={() => setCurrentView('dashboard')} />
      <HeroSection onAccessDashboard={() => setCurrentView('dashboard')} />
      <FeaturesSection />
      <BenefitsSection />
      <TestimonialsSection />
      <TeamSection />
      <PricingSection onAccessDashboard={() => setCurrentView('dashboard')} />
      <Footer />
    </div>
  );
}