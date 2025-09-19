import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import sendifyLogo from "figma:asset/2bcff5e27583ec37f8644982714ba73bbecda86c.png";

export function Footer() {
  return (
    <footer className="border-t" style={{ backgroundColor: '#1a1a1a', borderColor: '#444444' }}>
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={sendifyLogo} 
                alt="SENDIFY Logo" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-white opacity-70 mb-6 leading-relaxed">
              Simplificamos la gestión logística para empresas de todos los tamaños con una plataforma integral y fácil de usar.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                style={{ backgroundColor: '#333333' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF9500'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#333333'}
              >
                <Facebook className="w-5 h-5 text-white opacity-70" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                style={{ backgroundColor: '#333333' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF9500'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#333333'}
              >
                <Twitter className="w-5 h-5 text-white opacity-70" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                style={{ backgroundColor: '#333333' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF9500'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#333333'}
              >
                <Linkedin className="w-5 h-5 text-white opacity-70" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                style={{ backgroundColor: '#333333' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF9500'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#333333'}
              >
                <Instagram className="w-5 h-5 text-white opacity-70" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-6">Producto</h3>
            <ul className="space-y-3">
              <li><a href="#funcionalidades" className="text-white opacity-70 hover:opacity-100 transition-all" style={{ color: '#FF9500' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}>Funcionalidades</a></li>
              <li><a href="#" className="text-white opacity-70 hover:opacity-100 transition-all">Precios</a></li>
              <li><a href="#" className="text-white opacity-70 hover:opacity-100 transition-all">API</a></li>
              <li><a href="#" className="text-white opacity-70 hover:opacity-100 transition-all">Integraciones</a></li>
              <li><a href="#" className="text-white opacity-70 hover:opacity-100 transition-all">Seguridad</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-6">Empresa</h3>
            <ul className="space-y-3">
              <li><a href="#equipo" className="text-white opacity-70 hover:opacity-100 transition-all">Equipo</a></li>
              <li><a href="#" className="text-white opacity-70 hover:opacity-100 transition-all">Blog</a></li>
              <li><a href="#" className="text-white opacity-70 hover:opacity-100 transition-all">Carreras</a></li>
              <li><a href="#" className="text-white opacity-70 hover:opacity-100 transition-all">Prensa</a></li>
              <li><a href="#" className="text-white opacity-70 hover:opacity-100 transition-all">Contacto</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-6">Newsletter</h3>
            <p className="text-white opacity-70 mb-4">
              Recibe las últimas noticias y actualizaciones de SENDIFY
            </p>
            <div className="flex gap-2 mb-6">
              <Input 
                placeholder="Tu email" 
                className="text-white placeholder:text-white placeholder:opacity-50"
                style={{ backgroundColor: '#333333', borderColor: '#444444' }}
              />
              <Button 
                className="text-white"
                style={{ backgroundColor: '#FF9500' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6850a'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF9500'}
              >
                <Mail className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white opacity-70">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+51 999 123 789</span>
              </div>
              <div className="flex items-center gap-3 text-white opacity-70">
                <Mail className="w-4 h-4" />
                <span className="text-sm">hello@sendify.com</span>
              </div>
              <div className="flex items-center gap-3 text-white opacity-70">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Av. Central 262</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t pt-8" style={{ borderColor: '#444444' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white opacity-70 text-sm">
              © 2024 SENDIFY. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white opacity-70 hover:opacity-100 text-sm transition-all" style={{ color: '#FF9500' }}>
                Términos de Servicio
              </a>
              <a href="#" className="text-white opacity-70 hover:opacity-100 text-sm transition-all">
                Política de Privacidad
              </a>
              <a href="#" className="text-white opacity-70 hover:opacity-100 text-sm transition-all">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}