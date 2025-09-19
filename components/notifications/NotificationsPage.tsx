import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { ArrowLeft, Bell, AlertTriangle, CheckCircle, Clock, Mail, MessageSquare, Settings } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface NotificationsPageProps {
  onBack: () => void;
}

interface Notification {
  id: string;
  type: 'delay' | 'delivery' | 'update' | 'alert';
  title: string;
  message: string;
  shipmentCode: string;
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface NotificationSettings {
  emailNotifications: boolean;
  whatsappNotifications: boolean;
  delayAlerts: boolean;
  deliveryConfirmations: boolean;
  statusUpdates: boolean;
  marketingEmails: boolean;
}

export function NotificationsPage({ onBack }: NotificationsPageProps) {
  const [activeTab, setActiveTab] = useState<'notifications' | 'settings'>('notifications');
  
  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      type: "delay",
      title: "Retraso en envío SND-001",
      message: "El envío hacia Cusco presenta un retraso de 4 horas debido a condiciones climáticas",
      shipmentCode: "SND-001",
      timestamp: "15 Enero 2024, 14:30",
      isRead: false,
      priority: "high"
    },
    {
      id: "2",
      type: "delivery",
      title: "Envío SND-002 entregado",
      message: "El paquete fue entregado exitosamente a María García en Arequipa",
      shipmentCode: "SND-002",
      timestamp: "15 Enero 2024, 11:20",
      isRead: true,
      priority: "medium"
    },
    {
      id: "3",
      type: "update",
      title: "Actualización de estado SND-003",
      message: "El envío ahora se encuentra en reparto local en Trujillo",
      shipmentCode: "SND-003",
      timestamp: "15 Enero 2024, 09:15",
      isRead: true,
      priority: "low"
    },
    {
      id: "4",
      type: "alert",
      title: "Paquete SND-004 requiere atención",
      message: "Dirección incorrecta detectada. Se requiere confirmación del destinatario",
      shipmentCode: "SND-004",
      timestamp: "14 Enero 2024, 16:45",
      isRead: false,
      priority: "high"
    },
    {
      id: "5",
      type: "delivery",
      title: "Confirmación de entrega SND-005",
      message: "Paquete entregado a Juan López en Lima. Firma digital disponible",
      shipmentCode: "SND-005",
      timestamp: "14 Enero 2024, 13:20",
      isRead: true,
      priority: "medium"
    }
  ]);

  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    whatsappNotifications: true,
    delayAlerts: true,
    deliveryConfirmations: true,
    statusUpdates: false,
    marketingEmails: false
  });

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'delay':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'delivery':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'update':
        return <Clock className="w-5 h-5 text-blue-400" />;
      case 'alert':
        return <Bell className="w-5 h-5 text-orange-400" />;
      default:
        return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-500/5';
      case 'medium':
        return 'border-orange-500 bg-orange-500/5';
      case 'low':
        return 'border-gray-600 bg-gray-800';
      default:
        return 'border-gray-600 bg-gray-800';
    }
  };

  const handleSettingChange = (setting: keyof NotificationSettings, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    toast.success("Configuración actualizada");
  };

  const markAllAsRead = () => {
    toast.success("Todas las notificaciones marcadas como leídas");
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="text-gray-400 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-white">Centro de Notificaciones</h1>
          <p className="text-gray-400">Gestiona alertas automáticas y configuraciones de notificación</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4">
        <Button 
          variant={activeTab === 'notifications' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('notifications')}
          className={activeTab === 'notifications' ? 'bg-orange-500 hover:bg-orange-600' : 'text-gray-400 hover:text-white'}
        >
          <Bell className="w-4 h-4 mr-2" />
          Notificaciones
          {unreadCount > 0 && (
            <Badge className="ml-2 bg-red-500 text-white">
              {unreadCount}
            </Badge>
          )}
        </Button>
        <Button 
          variant={activeTab === 'settings' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('settings')}
          className={activeTab === 'settings' ? 'bg-orange-500 hover:bg-orange-600' : 'text-gray-400 hover:text-white'}
        >
          <Settings className="w-4 h-4 mr-2" />
          Configuración
        </Button>
      </div>

      {activeTab === 'notifications' && (
        <div className="space-y-4">
          {/* Controles */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-white">Notificaciones Recientes</h2>
              {unreadCount > 0 && (
                <Badge className="bg-orange-500/20 text-orange-400">
                  {unreadCount} sin leer
                </Badge>
              )}
            </div>
            <Button variant="outline" onClick={markAllAsRead} className="border-gray-600 text-gray-300">
              Marcar todas como leídas
            </Button>
          </div>

          {/* Lista de notificaciones */}
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`${getPriorityColor(notification.priority)} transition-all hover:bg-gray-700/50 ${
                  !notification.isRead ? 'border-l-4 border-l-orange-500' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className={`font-medium ${!notification.isRead ? 'text-white' : 'text-gray-300'}`}>
                            {notification.title}
                          </h3>
                          <p className="text-gray-400 text-sm mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-orange-400 text-sm font-mono">
                              {notification.shipmentCode}
                            </span>
                            <span className="text-gray-500 text-xs">
                              {notification.timestamp}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="secondary" 
                            className={
                              notification.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                              notification.priority === 'medium' ? 'bg-orange-500/20 text-orange-400' :
                              'bg-gray-500/20 text-gray-400'
                            }
                          >
                            {notification.priority === 'high' ? 'Alta' : 
                             notification.priority === 'medium' ? 'Media' : 'Baja'}
                          </Badge>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-white">Configuración de Notificaciones</h2>
          
          {/* Canales de notificación */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Canales de Comunicación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <div>
                    <Label className="text-white">Notificaciones por Email</Label>
                    <p className="text-gray-400 text-sm">Recibe alertas en tu correo electrónico</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-green-400" />
                  <div>
                    <Label className="text-white">Notificaciones por WhatsApp</Label>
                    <p className="text-gray-400 text-sm">Recibe mensajes directos en WhatsApp</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.whatsappNotifications}
                  onCheckedChange={(checked) => handleSettingChange('whatsappNotifications', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Tipos de alertas */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Tipos de Alertas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <div>
                    <Label className="text-white">Alertas de Retraso</Label>
                    <p className="text-gray-400 text-sm">Notificación automática cuando un envío se retrasa</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.delayAlerts}
                  onCheckedChange={(checked) => handleSettingChange('delayAlerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <Label className="text-white">Confirmaciones de Entrega</Label>
                    <p className="text-gray-400 text-sm">Notificar cuando un paquete es entregado</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.deliveryConfirmations}
                  onCheckedChange={(checked) => handleSettingChange('deliveryConfirmations', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <div>
                    <Label className="text-white">Actualizaciones de Estado</Label>
                    <p className="text-gray-400 text-sm">Notificar cada cambio de estado del envío</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.statusUpdates}
                  onCheckedChange={(checked) => handleSettingChange('statusUpdates', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* User Stories destacadas */}
          <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Bell className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Sistema de Notificaciones Inteligente</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="text-green-400 font-medium mb-2">US-04.1: Notificación de retraso</h4>
                      <p className="text-gray-300 mb-2">
                        Como administrador logístico, recibo alertas automáticas cuando el sistema detecta retrasos en los envíos.
                      </p>
                      <p className="text-green-400 text-xs">✓ Implementado - Detección automática de retrasos</p>
                    </div>
                    <div>
                      <h4 className="text-green-400 font-medium mb-2">US-04.2: Confirmación de entrega</h4>
                      <p className="text-gray-300 mb-2">
                        Como cliente final, recibo notificación por email/WhatsApp cuando mi pedido es entregado.
                      </p>
                      <p className="text-green-400 text-xs">✓ Implementado - Notificaciones multicanal</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}