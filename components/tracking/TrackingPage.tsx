import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { ArrowLeft, Search, Package, MapPin, Truck, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface TrackingPageProps {
  onBack: () => void;
}

interface TrackingEvent {
  status: string;
  description: string;
  location: string;
  date: string;
  time: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

interface ShipmentInfo {
  code: string;
  sender: string;
  recipient: string;
  origin: string;
  destination: string;
  weight: string;
  courier: string;
  estimatedDelivery: string;
  currentStatus: string;
  events: TrackingEvent[];
}

export function TrackingPage({ onBack }: TrackingPageProps) {
  const [trackingCode, setTrackingCode] = useState("");
  const [shipmentInfo, setShipmentInfo] = useState<ShipmentInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data para simular diferentes envíos
  const mockShipments: { [key: string]: ShipmentInfo } = {
    "SND-001": {
      code: "SND-001",
      sender: "TechStore SA",
      recipient: "Juan Pérez",
      origin: "Lima",
      destination: "Cusco",
      weight: "2.5 kg",
      courier: "EXPRESS COURIER",
      estimatedDelivery: "16 Enero 2024",
      currentStatus: "En tránsito",
      events: [
        {
          status: "Registrado",
          description: "Paquete registrado en el sistema",
          location: "Lima - Centro de Distribución",
          date: "15 Enero 2024",
          time: "08:30",
          isCompleted: true,
          isCurrent: false
        },
        {
          status: "En tránsito",
          description: "Paquete en ruta hacia destino",
          location: "Lima - Aeropuerto Jorge Chávez",
          date: "15 Enero 2024",
          time: "14:20",
          isCompleted: true,
          isCurrent: true
        },
        {
          status: "En reparto",
          description: "Paquete listo para reparto local",
          location: "Cusco - Centro de Distribución",
          date: "",
          time: "",
          isCompleted: false,
          isCurrent: false
        },
        {
          status: "Entregado",
          description: "Paquete entregado al destinatario",
          location: "Cusco - Dirección del cliente",
          date: "",
          time: "",
          isCompleted: false,
          isCurrent: false
        }
      ]
    },
    "SND-002": {
      code: "SND-002",
      sender: "Moda Express",
      recipient: "María García",
      origin: "Lima",
      destination: "Arequipa",
      weight: "1.2 kg",
      courier: "FAST DELIVERY",
      estimatedDelivery: "16 Enero 2024",
      currentStatus: "Entregado",
      events: [
        {
          status: "Registrado",
          description: "Paquete registrado en el sistema",
          location: "Lima - Centro de Distribución",
          date: "14 Enero 2024",
          time: "09:15",
          isCompleted: true,
          isCurrent: false
        },
        {
          status: "En tránsito",
          description: "Paquete en ruta hacia destino",
          location: "Lima - Terminal Terrestre",
          date: "14 Enero 2024",
          time: "16:45",
          isCompleted: true,
          isCurrent: false
        },
        {
          status: "En reparto",
          description: "Paquete listo para reparto local",
          location: "Arequipa - Centro de Distribución",
          date: "15 Enero 2024",
          time: "08:30",
          isCompleted: true,
          isCurrent: false
        },
        {
          status: "Entregado",
          description: "Paquete entregado al destinatario",
          location: "Arequipa - Dirección del cliente",
          date: "15 Enero 2024",
          time: "11:20",
          isCompleted: true,
          isCurrent: true
        }
      ]
    }
  };

  const handleSearch = () => {
    if (!trackingCode) {
      toast.error("Por favor ingresa un código de seguimiento");
      return;
    }

    setIsLoading(true);
    
    // Simular búsqueda con delay
    setTimeout(() => {
      const shipment = mockShipments[trackingCode.toUpperCase()];
      if (shipment) {
        setShipmentInfo(shipment);
        toast.success("Información de envío encontrada");
      } else {
        setShipmentInfo(null);
        toast.error("No se encontró información para este código de seguimiento");
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStatusIcon = (status: string, isCompleted: boolean, isCurrent: boolean) => {
    if (isCompleted) {
      return <CheckCircle className="w-5 h-5 text-green-400" />;
    } else if (isCurrent) {
      return <Clock className="w-5 h-5 text-orange-400" />;
    } else {
      switch (status) {
        case "Registrado":
          return <Package className="w-5 h-5 text-gray-400" />;
        case "En tránsito":
          return <Truck className="w-5 h-5 text-gray-400" />;
        case "En reparto":
          return <MapPin className="w-5 h-5 text-gray-400" />;
        case "Entregado":
          return <CheckCircle className="w-5 h-5 text-gray-400" />;
        default:
          return <Package className="w-5 h-5 text-gray-400" />;
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Registrado":
        return "bg-gray-500/20 text-gray-400";
      case "En tránsito":
        return "bg-blue-500/20 text-blue-400";
      case "En reparto":
        return "bg-orange-500/20 text-orange-400";
      case "Entregado":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="text-gray-400 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-white">Tracking de Envíos</h1>
          <p className="text-gray-400">Consulta el estado de cualquier envío ingresando su código de seguimiento</p>
        </div>
      </div>

      {/* Buscador */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Buscar Envío</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label className="text-gray-300">Código de seguimiento</Label>
              <Input
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Ej: SND-001, SND-002"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Search className="w-4 h-4 mr-2" />
                {isLoading ? "Buscando..." : "Buscar"}
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Códigos de prueba: SND-001, SND-002
          </p>
        </CardContent>
      </Card>

      {/* Información del envío */}
      {shipmentInfo && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Información básica */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Información del Envío</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-400">Código</Label>
                <p className="text-orange-400 font-mono font-semibold">{shipmentInfo.code}</p>
              </div>
              <div>
                <Label className="text-gray-400">Estado actual</Label>
                <Badge className={`mt-1 ${getStatusColor(shipmentInfo.currentStatus)}`}>
                  {shipmentInfo.currentStatus}
                </Badge>
              </div>
              <div>
                <Label className="text-gray-400">Remitente</Label>
                <p className="text-white">{shipmentInfo.sender}</p>
              </div>
              <div>
                <Label className="text-gray-400">Destinatario</Label>
                <p className="text-white">{shipmentInfo.recipient}</p>
              </div>
              <div>
                <Label className="text-gray-400">Ruta</Label>
                <p className="text-white">{shipmentInfo.origin} → {shipmentInfo.destination}</p>
              </div>
              <div>
                <Label className="text-gray-400">Peso</Label>
                <p className="text-white">{shipmentInfo.weight}</p>
              </div>
              <div>
                <Label className="text-gray-400">Courier</Label>
                <p className="text-white">{shipmentInfo.courier}</p>
              </div>
              <div>
                <Label className="text-gray-400">Entrega estimada</Label>
                <p className="text-white">{shipmentInfo.estimatedDelivery}</p>
              </div>
            </CardContent>
          </Card>

          {/* Timeline de eventos */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Timeline de Seguimiento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Línea vertical */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-600"></div>
                  
                  <div className="space-y-6">
                    {shipmentInfo.events.map((event, index) => (
                      <div key={index} className="relative flex items-start gap-4">
                        {/* Icono */}
                        <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                          event.isCompleted ? 'bg-green-500/20 border-green-500' :
                          event.isCurrent ? 'bg-orange-500/20 border-orange-500' :
                          'bg-gray-700 border-gray-600'
                        }`}>
                          {getStatusIcon(event.status, event.isCompleted, event.isCurrent)}
                        </div>
                        
                        {/* Contenido */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className={`font-semibold ${
                                event.isCompleted ? 'text-green-400' :
                                event.isCurrent ? 'text-orange-400' :
                                'text-gray-400'
                              }`}>
                                {event.status}
                              </h3>
                              <p className="text-gray-300 text-sm mt-1">{event.description}</p>
                              <p className="text-gray-400 text-sm mt-1">{event.location}</p>
                            </div>
                            {event.date && (
                              <div className="text-right text-sm text-gray-400">
                                <p>{event.date}</p>
                                <p>{event.time}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Portal público info */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Search className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Portal Público de Tracking</h3>
              <p className="text-gray-300 text-sm mb-3">
                Tus clientes pueden consultar el estado de sus envíos sin necesidad de autenticación.
              </p>
              <p className="text-blue-400 text-sm">
                Comparte el código de seguimiento con tus clientes para que puedan rastrear sus pedidos
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}