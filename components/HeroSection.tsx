import { useState } from "react";
import { Button } from "./ui/button";
import { RegisterModal } from "./auth/RegisterModal";

interface HeroSectionProps {
  onAccessDashboard: () => void;
}

export function HeroSection({ onAccessDashboard }: HeroSectionProps) {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleRegisterSuccess = () => {
    // Redirigir al dashboard después del registro exitoso
    onAccessDashboard();
  };

  return (
    <>
      <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: '#222222' }}>
        {/* Background gradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #222222 0%, #2a2a2a 50%, #333333 100%)' }}></div>
        
        {/* Glowing effect */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 blur-3xl rounded-full" style={{ backgroundColor: '#FF9500', opacity: 0.1 }}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
                Simplifica y controla tus envíos con{" "}
                <span style={{ color: '#FF9500' }}>SENDIFY</span>
              </h1>
              <p className="text-xl mb-8 leading-relaxed text-white opacity-90">
                Una plataforma centralizada para gestionar, rastrear y optimizar tus envíos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={onAccessDashboard}
                  className="bg-sendify-orange hover:bg-sendify-orange-dark text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                >
                  Probar Demo
                </Button>
                <Button 
                  onClick={() => setShowRegisterModal(true)}
                  variant="outline"
                  className="border-sendify-orange text-sendify-orange hover:bg-sendify-orange hover:text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
                >
                  Registrarse Gratis
                </Button>
              </div>
            </div>

            {/* Right content - Package illustration */}
            <div className="relative">
              <div className="relative z-10 flex items-center justify-center">
                {/* Package boxes with floating animation */}
                <div className="relative w-80 h-80">
                  <div className="absolute top-8 right-12 w-20 h-20 rounded-lg shadow-lg transform rotate-12 animate-bounce" 
                       style={{ 
                         animationDelay: '0s', 
                         animationDuration: '3s',
                         backgroundColor: '#FF9500'
                       }}>
                    <div className="w-full h-4 rounded-t-lg" style={{ backgroundColor: '#e6850a' }}></div>
                    <div className="absolute top-2 left-2 w-3 h-3 bg-white/30 rounded"></div>
                  </div>
                  
                  <div className="absolute top-16 left-8 w-24 h-24 rounded-lg shadow-lg transform -rotate-6 animate-bounce" 
                       style={{ 
                         animationDelay: '1s', 
                         animationDuration: '3s',
                         backgroundColor: '#FF9500',
                         opacity: 0.8
                       }}>
                    <div className="w-full h-4 rounded-t-lg" style={{ backgroundColor: '#e6850a' }}></div>
                    <div className="absolute top-2 right-2 w-3 h-3 bg-white/30 rounded"></div>
                  </div>
                  
                  <div className="absolute bottom-12 right-4 w-28 h-28 rounded-lg shadow-lg transform rotate-6 animate-bounce" 
                       style={{ 
                         animationDelay: '2s', 
                         animationDuration: '3s',
                         backgroundColor: '#FF9500'
                       }}>
                    <div className="w-full h-5 rounded-t-lg" style={{ backgroundColor: '#e6850a' }}></div>
                    <div className="absolute top-3 left-3 w-4 h-4 bg-white/30 rounded"></div>
                  </div>
                  
                  <div className="absolute bottom-8 left-12 w-16 h-16 rounded-lg shadow-lg transform -rotate-12 animate-bounce" 
                       style={{ 
                         animationDelay: '0.5s', 
                         animationDuration: '3s',
                         backgroundColor: '#FF9500',
                         opacity: 0.9
                       }}>
                    <div className="w-full h-3 rounded-t-lg" style={{ backgroundColor: '#e6850a' }}></div>
                    <div className="absolute top-1 right-1 w-2 h-2 bg-white/30 rounded"></div>
                  </div>
                </div>
              </div>
              
              {/* Glow effect behind packages */}
              <div className="absolute inset-0 blur-3xl rounded-full" style={{ backgroundColor: '#FF9500', opacity: 0.05 }}></div>
            </div>
          </div>
        </div>
      </section>

      <RegisterModal 
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSuccess={handleRegisterSuccess}
      />
    </>
  );
}