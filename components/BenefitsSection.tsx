import { Card, CardContent } from "./ui/card";
import { CheckCircle, Clock, Shield, TrendingUp } from "lucide-react";

export function BenefitsSection() {
  return (
    <section className="py-20" style={{ backgroundColor: '#2a2a2a' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Envío rápido, envío seguro
          </h2>
          <p className="text-xl text-white opacity-80">
            Te presentamos SENDIFY
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center border" style={{ backgroundColor: '#222222', borderColor: '#444444' }}>
            <CardContent className="p-6">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}
              >
                <CheckCircle className="w-6 h-6" style={{ color: '#10b981' }} />
              </div>
              <h3 className="font-semibold text-white mb-2">Operaciones Simplificadas</h3>
              <p className="text-white opacity-70 text-sm">
                Reduce tiempos de operación con gestión centralizada
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border" style={{ backgroundColor: '#222222', borderColor: '#444444' }}>
            <CardContent className="p-6">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
              >
                <Clock className="w-6 h-6" style={{ color: '#3b82f6' }} />
              </div>
              <h3 className="font-semibold text-white mb-2">Tracking en Tiempo Real</h3>
              <p className="text-white opacity-70 text-sm">
                Visibilidad completa del estado de cada envío
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border" style={{ backgroundColor: '#222222', borderColor: '#444444' }}>
            <CardContent className="p-6">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'rgba(255, 149, 0, 0.2)' }}
              >
                <Shield className="w-6 h-6" style={{ color: '#FF9500' }} />
              </div>
              <h3 className="font-semibold text-white mb-2">Confianza Total</h3>
              <p className="text-white opacity-70 text-sm">
                Portal público para que tus clientes consulten sus envíos
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border" style={{ backgroundColor: '#222222', borderColor: '#444444' }}>
            <CardContent className="p-6">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)' }}
              >
                <TrendingUp className="w-6 h-6" style={{ color: '#8b5cf6' }} />
              </div>
              <h3 className="font-semibold text-white mb-2">Optimización de Costos</h3>
              <p className="text-white opacity-70 text-sm">
                Compara tarifas entre couriers y elige la mejor opción
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}