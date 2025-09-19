import { Card, CardContent } from "./ui/card";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "María González",
      role: "Directora de Logística",
      company: "EcoStore",
      content: "SENDIFY transformó completamente nuestras operaciones. Ahora podemos gestionar 500+ envíos diarios sin problemas.",
      rating: 5,
      avatar: "MG"
    },
    {
      name: "Carlos Ruiz",
      role: "Fundador",
      company: "TechStartup",
      content: "La funcionalidad de tracking público ha mejorado significativamente la confianza de nuestros clientes.",
      rating: 5,
      avatar: "CR"
    },
    {
      name: "Ana López",
      role: "Gerente de Operaciones",
      company: "FashionHub",
      content: "El cotizador automático nos ayuda a elegir siempre la mejor opción de envío. Hemos reducido costos en un 30%.",
      rating: 5,
      avatar: "AL"
    },
    {
      name: "Roberto Silva",
      role: "CEO",
      company: "LogiMax",
      content: "Las notificaciones automáticas nos permiten reaccionar rápidamente ante cualquier retraso. Excelente herramienta.",
      rating: 5,
      avatar: "RS"
    },
    {
      name: "Laura Martín",
      role: "Coordinadora de Envíos",
      company: "HomeDecor",
      content: "La gestión de clientes frecuentes nos ahorra horas cada día. La eficiencia ha mejorado notablemente.",
      rating: 5,
      avatar: "LM"
    },
    {
      name: "Diego Herrera",
      role: "Director Comercial",
      company: "SportGear",
      content: "SENDIFY nos ha permitido escalar nuestro negocio sin aumentar el equipo de logística. Increíble ROI.",
      rating: 5,
      avatar: "DH"
    }
  ];

  return (
    <section id="comentarios" className="py-20" style={{ backgroundColor: '#222222' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Comentarios de nuestros clientes
          </h2>
          <p className="text-xl text-white opacity-80">
            Descubre por qué empresas de todos los tamaños confían en SENDIFY
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="border hover:border-opacity-75 transition-all duration-300"
              style={{ backgroundColor: '#2a2a2a', borderColor: '#444444' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FF9500'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#444444'}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Quote className="w-8 h-8 flex-shrink-0" style={{ color: '#FF9500' }} />
                  <div className="flex-1">
                    <div className="flex mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#fbbf24' }} />
                      ))}
                    </div>
                    <p className="text-white opacity-80 mb-4 italic">
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#FF9500' }}
                  >
                    <span className="text-white font-medium text-sm">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-white opacity-70">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}