import { Button } from "./ui/button";
import sendifyLogo from "figma:asset/2bcff5e27583ec37f8644982714ba73bbecda86c.png";

interface HeaderProps {
  onAccessDashboard: () => void;
}

export function Header({ onAccessDashboard }: HeaderProps) {
  return (
    <header className="w-full backdrop-blur-sm border-b sticky top-0 z-50" style={{ backgroundColor: '#222222', borderColor: '#444444' }}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src={sendifyLogo} 
              alt="SENDIFY Logo" 
              className="h-10 w-auto"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="text-white hover:opacity-80 transition-all" style={{ color: '#FF9500' }}>
              Inicio
            </a>
            <a href="#funcionalidades" className="text-white hover:opacity-80 transition-all">
              Funcionalidades
            </a>
            <button onClick={onAccessDashboard} className="text-white hover:opacity-80 transition-all">
              Demo
            </button>
            <a href="#comentarios" className="text-white hover:opacity-80 transition-all">
              Comentarios
            </a>
            <a href="#equipo" className="text-white hover:opacity-80 transition-all">
              Equipo
            </a>
          </nav>

          {/* CTA Button */}
          <Button 
            onClick={onAccessDashboard} 
            className="text-white font-medium"
            style={{ backgroundColor: '#FF9500' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6850a'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF9500'}
          >
            Acceder al Dashboard
          </Button>
        </div>
      </div>
    </header>
  );
}