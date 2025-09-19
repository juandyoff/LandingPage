import { useState } from "react";
import { ArrowLeft, Package, Search, Calculator, Bell, BarChart3, Code } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CreateShipmentPage } from "./shipment/CreateShipmentPage";
import { TrackingPage } from "./tracking/TrackingPage";
import { QuotationPage } from "./quotation/QuotationPage";
import { NotificationsPage } from "./notifications/NotificationsPage";
import { ReportsPage } from "./reports/ReportsPage";
import { ApiEndpoints } from "./api/ApiEndpoints";

type DashboardView = 'main' | 'create-shipment' | 'tracking' | 'quotation' | 'notifications' | 'reports' | 'api';

interface DashboardProps {
  onBackToLanding: () => void;
}

// Logo SENDIFY como string base64 (reemplazar con el logo real)
const sendifyLogo = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjEwIiB5PSIyNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI0ZGOTUwMCI+U0VORElGWTwvdGV4dD48L3N2Zz4=";

export function Dashboard({ onBackToLanding }: DashboardProps) {
  const [currentView, setCurrentView] = useState<DashboardView>('main');

  const stats = [
    {
      title: "Envíos Activos",
      value: "47",
      change: "+12%",
      icon: Package,
      color: "#3b82f6"
    },
    {
      title: "En Tránsito",
      value: "23",
      change: "+5%",
      icon: Search,
      color: "#FF9500"
    },
    {
      title: "Entregados Hoy",
      value: "15",
      change: "+18%",
      icon: BarChart3,
      color: "#10b981"
    },
    {
      title: "Alertas Pendientes",
      value: "3",
      change: "-25%",
      icon: Bell,
      color: "#ef4444"
    }
  ];

  const recentShipments = [
    { id: "SND-001", client: "TechStore SA", destination: "Lima", status: "En tránsito", date: "2024-01-15" },
    { id: "SND-002", client: "Moda Express", destination: "Cusco", status: "Entregado", date: "2024-01-15" },
    { id: "SND-003", client: "Electro Mundial", destination: "Arequipa", status: "En reparto", date: "2024-01-14" },
    { id: "SND-004", client: "Librería Central", destination: "Trujillo", status: "Registrado", date: "2024-01-14" },
  ];

  const quickActions = [
    {
      title: "Crear Nuevo Envío",
      description: "Registra un nuevo envío con datos completos",
      icon: Package,
      color: "#3b82f6",
      action: () => setCurrentView('create-shipment')
    },
    {
      title: "Rastrear Envío",
      description: "Consulta el estado de cualquier envío",
      icon: Search,
      color: "#FF9500",
      action: () => setCurrentView('tracking')
    },
    {
      title: "Cotizar Tarifas",
      description: "Compara precios entre diferentes couriers",
      icon: Calculator,
      color: "#10b981",
      action: () => setCurrentView('quotation')
    },
    {
      title: "Notificaciones",
      description: "Gestiona alertas y configuraciones",
      icon: Bell,
      color: "#8b5cf6",
      action: () => setCurrentView('notifications')
    }
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'create-shipment':
        return <CreateShipmentPage onBack={() => setCurrentView('main')} />;
      case 'tracking':
        return <TrackingPage onBack={() => setCurrentView('main')} />;
      case 'quotation':
        return <QuotationPage onBack={() => setCurrentView('main')} />;
      case 'notifications':
        return <NotificationsPage onBack={() => setCurrentView('main')} />;
      case 'reports':
        return <ReportsPage onBack={() => setCurrentView('main')} />;
      case 'api':
        return <ApiEndpoints onBack={() => setCurrentView('main')} />;
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-6" style={{ borderColor: '#444444' }}>
        <div className="flex items-center gap-4">
          <img 
            src={sendifyLogo} 
            alt="SENDIFY Logo" 
            className="h-12 w-auto"
          />
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard SENDIFY</h1>
            <p className="text-white opacity-70">Gestiona todos tus envíos desde un solo lugar</p>
          </div>
        </div>
        <Button 
          onClick={onBackToLanding} 
          variant="outline" 
          className="text-white font-medium"
          style={{ borderColor: '#444444', backgroundColor: 'transparent' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333333'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          Volver al inicio
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} style={{ backgroundColor: '#2a2a2a', borderColor: '#444444' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white opacity-70 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm" style={{ color: '#10b981' }}>{stat.change}</p>
                </div>
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#333333' }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="border cursor-pointer transition-all group hover:border-opacity-75" 
              style={{ backgroundColor: '#2a2a2a', borderColor: '#444444' }}
              onClick={action.action}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FF9500'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#444444'}
            >
              <CardContent className="p-6 text-center">
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: action.color }}
                >
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">{action.title}</h3>
                <p className="text-white opacity-70 text-sm">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Shipments */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Envíos Recientes</h2>
        <Card style={{ backgroundColor: '#2a2a2a', borderColor: '#444444' }}>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: '#444444' }}>
                    <th className="text-left p-4 text-white opacity-70">Código</th>
                    <th className="text-left p-4 text-white opacity-70">Cliente</th>
                    <th className="text-left p-4 text-white opacity-70">Destino</th>
                    <th className="text-left p-4 text-white opacity-70">Estado</th>
                    <th className="text-left p-4 text-white opacity-70">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {recentShipments.map((shipment, index) => (
                    <tr 
                      key={index} 
                      className="border-b transition-colors"
                      style={{ borderColor: '#444444' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333333'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td className="p-4 font-mono" style={{ color: '#FF9500' }}>{shipment.id}</td>
                      <td className="p-4 text-white">{shipment.client}</td>
                      <td className="p-4 text-white opacity-80">{shipment.destination}</td>
                      <td className="p-4">
                        <Badge 
                          variant="secondary" 
                          style={{
                            backgroundColor: 
                              shipment.status === 'Entregado' ? 'rgba(16, 185, 129, 0.2)' :
                              shipment.status === 'En tránsito' ? 'rgba(59, 130, 246, 0.2)' :
                              shipment.status === 'En reparto' ? 'rgba(255, 149, 0, 0.2)' :
                              'rgba(107, 114, 128, 0.2)',
                            color:
                              shipment.status === 'Entregado' ? '#10b981' :
                              shipment.status === 'En tránsito' ? '#3b82f6' :
                              shipment.status === 'En reparto' ? '#FF9500' :
                              '#6b7280'
                          }}
                        >
                          {shipment.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-white opacity-70">{shipment.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Epic 05: Reportes y Analítica */}
      <Card 
        className="cursor-pointer hover:bg-gray-700 transition-colors group" 
        style={{ backgroundColor: '#2a2a2a', borderColor: '#444444' }}
        onClick={() => setCurrentView('reports')}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-sendify-orange group-hover:scale-110 transition-transform" />
              Reportes y Analítica
            </CardTitle>
          </div>
          <CardDescription className="text-gray-300">
            Genera reportes de costos y tiempos para optimizar decisiones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-400 space-y-1">
            <p>• Reportes de desempeño consolidados</p>
            <p>• Exportación en CSV y PDF</p>
            <p>• Análisis de tiempos de entrega</p>
            <p>• Métricas de costos por período</p>
          </div>
        </CardContent>
      </Card>

      {/* Epic 07: API RESTful */}
      <Card 
        className="cursor-pointer hover:bg-gray-700 transition-colors group" 
        style={{ backgroundColor: '#2a2a2a', borderColor: '#444444' }}
        onClick={() => setCurrentView('api')}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-sendify-orange group-hover:scale-110 transition-transform" />
              API RESTful
            </CardTitle>
          </div>
          <CardDescription className="text-gray-300">
            Endpoints seguros para integración con sistemas terceros
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-400 space-y-1">
            <p>• POST /envios - Crear envíos</p>
            <p>• GET /tracking - Consultar estados</p>
            <p>• GET /tarifas - Comparar precios</p>
            <p>• Documentación completa</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#222222' }}>
      <div className="container mx-auto px-6 py-8">
        {renderCurrentView()}
      </div>
    </div>
  );
}