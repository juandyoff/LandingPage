import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check } from "lucide-react";

interface PricingSectionProps {
  onAccessDashboard: () => void;
}

export function PricingSection({ onAccessDashboard }: PricingSectionProps) {
  const plans = [
    {
      name: "Plan Básico",
      price: "GRATIS",
      period: "",
      description: "Perfecto para empezar",
      features: [
        "Hasta 50 envíos por mes",
        "Tracking básico",
        "Portal público de consulta",
        "Notificaciones por email",
        "Soporte por email"
      ],
      buttonText: "Comenzar gratis",
      variant: "outline" as const,
      popular: false
    },
    {
      name: "Plan Pro",
      price: "$49",
      period: "/mes",
      description: "Para empresas en crecimiento",
      features: [
        "Hasta 500 envíos por mes",
        "Tracking en tiempo real",
        "Gestión de clientes frecuentes",
        "Cotizador de múltiples couriers",
        "Notificaciones WhatsApp + Email",
        "Reportes avanzados",
        "API de integración",
        "Soporte prioritario"
      ],
      buttonText: "Elegir Pro",
      variant: "default" as const,
      popular: true
    },
    {
      name: "Plan Empresarial",
      price: "Personalizado",
      period: "",
      description: "Para grandes operaciones",
      features: [
        "Envíos ilimitados",
        "Tracking avanzado con geolocalización",
        "Gestión multiusuario",
        "Integración con ERP",
        "Notificaciones multicampal",
        "Reportes personalizados",
        "API completa",
        "Gerente de cuenta dedicado",
        "SLA garantizado"
      ],
      buttonText: "Contactar ventas",
      variant: "outline" as const,
      popular: false
    }
  ];

  return (
    <section className="py-20" style={{ backgroundColor: '#222222' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Listo para comenzar a enviar?
          </h2>
          <p className="text-xl text-white opacity-80">
            Elige el plan que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`border relative transition-all duration-300 ${
                plan.popular ? 'scale-105' : 'hover:border-opacity-75'
              }`}
              style={{ 
                backgroundColor: '#2a2a2a', 
                borderColor: plan.popular ? '#FF9500' : '#444444' 
              }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="text-white px-4 py-1" style={{ backgroundColor: '#FF9500' }}>
                    Más Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-white text-xl mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-2">
                  <span className="text-4xl font-bold" style={{ color: '#FF9500' }}>
                    {plan.price}
                  </span>
                  <span className="text-white opacity-70">
                    {plan.period}
                  </span>
                </div>
                <p className="text-white opacity-70 text-sm">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#10b981' }} />
                      <span className="text-white opacity-80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={onAccessDashboard}
                  className={`w-full font-medium ${
                    plan.variant === 'default' 
                      ? 'text-white' 
                      : 'text-white'
                  }`}
                  style={{ 
                    backgroundColor: plan.variant === 'default' ? '#FF9500' : 'transparent',
                    borderColor: plan.variant === 'outline' ? '#444444' : 'transparent'
                  }}
                  variant={plan.variant}
                  onMouseEnter={(e) => {
                    if (plan.variant === 'default') {
                      e.currentTarget.style.backgroundColor = '#e6850a';
                    } else {
                      e.currentTarget.style.backgroundColor = '#333333';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (plan.variant === 'default') {
                      e.currentTarget.style.backgroundColor = '#FF9500';
                    } else {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-white opacity-70 text-sm mb-6">
            Todos los planes incluyen 30 días de prueba gratuita • Sin compromisos de permanencia
          </p>
          <div className="mt-6">
            <Button 
              onClick={onAccessDashboard} 
              size="lg" 
              className="text-white font-medium"
              style={{ backgroundColor: '#FF9500' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6850a'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF9500'}
            >
              Probar todas las funcionalidades
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}