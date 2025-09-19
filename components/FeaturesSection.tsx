import { Card, CardContent } from "./ui/card";
import { Package, MapPin, Calculator, Bell } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Package,
      title: "Gestión de envíos",
      description: "Organiza, crea y gestiona todos tus envíos desde una sola plataforma intuitiva. Simplifica tus operaciones diarias.",
      userStories: [
        "Crear órdenes de envío con datos completos",
        "Guardar clientes y direcciones frecuentes",
        "Gestión centralizada de operaciones"
      ]
    },
    {
      icon: MapPin,
      title: "Tracking en tiempo real",
      description: "Monitorea la ubicación y el estado de los paquetes con actualizaciones en tiempo real. Nunca pierdas un envío.",
      userStories: [
        "Timeline estandarizado de estados",
        "Portal público para consultas",
        "Visibilidad completa del proceso"
      ]
    },
    {
      icon: Calculator,
      title: "Historial y reportes",
      description: "Accede a un historial detallado de envíos y genera reportes personalizados para analizar tu rendimiento logístico.",
      userStories: [
        "Cotización automática de tarifas",
        "Comparación entre diferentes couriers",
        "Optimización de costos y tiempos"
      ]
    }
  ];

  return (
    <section id="funcionalidades" className="py-20" style={{ backgroundColor: '#222222' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Funcionalidades Clave de SENDIFY
          </h2>
          <p className="text-xl text-white opacity-80 max-w-3xl mx-auto">
            Nuestras herramientas están diseñadas para cubrir cada aspecto de tu operación logística
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border hover:border-opacity-75 transition-all duration-300 group"
              style={{ backgroundColor: '#2a2a2a', borderColor: '#444444' }}
            >
              <CardContent className="p-8">
                <div className="mb-6">
                  <div 
                    className="w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: '#FF9500', opacity: 0.2 }}
                  >
                    <feature.icon className="w-8 h-8" style={{ color: '#FF9500' }} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white opacity-80 mb-4">
                    {feature.description}
                  </p>
                </div>
                <ul className="space-y-2">
                  {feature.userStories.map((story, storyIndex) => (
                    <li key={storyIndex} className="flex items-start gap-2 text-sm text-white opacity-70">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#FF9500' }}></div>
                      {story}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Epic-04 Notifications Feature */}
        <div 
          className="border rounded-2xl p-8"
          style={{ 
            background: 'linear-gradient(135deg, rgba(255, 149, 0, 0.1) 0%, rgba(255, 149, 0, 0.05) 100%)', 
            borderColor: 'rgba(255, 149, 0, 0.2)' 
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#FF9500', opacity: 0.2 }}
            >
              <Bell className="w-6 h-6" style={{ color: '#FF9500' }} />
            </div>
            <h3 className="text-2xl font-semibold text-white">Sistema de Notificaciones Inteligente</h3>
          </div>
          <p className="text-white opacity-80 mb-6">
            Mantente informado automáticamente sobre el estado de tus envíos con alertas en tiempo real.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium" style={{ color: '#FF9500' }}>Para Administradores</h4>
              <ul className="space-y-1 text-white opacity-80">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#FF9500' }}></div>
                  Alertas automáticas de retrasos
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#FF9500' }}></div>
                  Notificaciones de incidencias
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium" style={{ color: '#FF9500' }}>Para Clientes</h4>
              <ul className="space-y-1 text-white opacity-80">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#FF9500' }}></div>
                  Confirmación de entrega por email/WhatsApp
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#FF9500' }}></div>
                  Actualizaciones de estado automáticas
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}