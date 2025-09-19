import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { ArrowLeft, Package, User, MapPin, Save, Plus } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface CreateShipmentPageProps {
  onBack: () => void;
}

export function CreateShipmentPage({ onBack }: CreateShipmentPageProps) {
  const [formData, setFormData] = useState({
    // Remitente
    senderName: "",
    senderPhone: "",
    senderEmail: "",
    senderAddress: "",
    senderCity: "",
    
    // Destinatario
    recipientName: "",
    recipientPhone: "",
    recipientEmail: "",
    recipientAddress: "",
    recipientCity: "",
    
    // Paquete
    packageDescription: "",
    weight: "",
    dimensions: "",
    value: "",
    
    // Opciones
    courier: "",
    serviceType: "",
    saveFrequentClient: false
  });

  const [frequentClients] = useState([
    { id: 1, name: "TechStore SA", phone: "+51 999 123 456", address: "Av. Principal 123, Lima" },
    { id: 2, name: "Moda Express", phone: "+51 999 654 321", address: "Jr. Comercio 456, Cusco" },
    { id: 3, name: "Electro Mundial", phone: "+51 999 789 012", address: "Av. Industrial 789, Arequipa" }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const loadFrequentClient = (client: any) => {
    setFormData(prev => ({
      ...prev,
      recipientName: client.name,
      recipientPhone: client.phone,
      recipientAddress: client.address
    }));
    toast.success(`Datos de ${client.name} cargados correctamente`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.senderName || !formData.recipientName || !formData.weight) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }

    // Simular creación de envío
    const trackingCode = `SND-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    // Guardar cliente frecuente si está marcado
    if (formData.saveFrequentClient) {
      toast.success("Cliente guardado en lista de frecuentes");
    }
    
    toast.success(`Envío creado exitosamente. Código de seguimiento: ${trackingCode}`);
    
    // Reset form
    setFormData({
      senderName: "", senderPhone: "", senderEmail: "", senderAddress: "", senderCity: "",
      recipientName: "", recipientPhone: "", recipientEmail: "", recipientAddress: "", recipientCity: "",
      packageDescription: "", weight: "", dimensions: "", value: "",
      courier: "", serviceType: "", saveFrequentClient: false
    });
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
          <h1 className="text-2xl font-bold text-white">Crear Nuevo Envío</h1>
          <p className="text-gray-400">Registra un envío con datos completos del remitente y destinatario</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Formulario Principal */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Datos del Remitente */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Datos del Remitente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Nombre completo *</Label>
                    <Input
                      value={formData.senderName}
                      onChange={(e) => handleInputChange('senderName', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Nombre del remitente"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Teléfono</Label>
                    <Input
                      value={formData.senderPhone}
                      onChange={(e) => handleInputChange('senderPhone', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="+51 999 123 456"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300">Email</Label>
                  <Input
                    type="email"
                    value={formData.senderEmail}
                    onChange={(e) => handleInputChange('senderEmail', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="email@empresa.com"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Dirección completa</Label>
                  <Textarea
                    value={formData.senderAddress}
                    onChange={(e) => handleInputChange('senderAddress', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Dirección completa con referencias"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Ciudad</Label>
                  <Select value={formData.senderCity} onValueChange={(value) => handleInputChange('senderCity', value)}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Selecciona una ciudad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lima">Lima</SelectItem>
                      <SelectItem value="cusco">Cusco</SelectItem>
                      <SelectItem value="arequipa">Arequipa</SelectItem>
                      <SelectItem value="trujillo">Trujillo</SelectItem>
                      <SelectItem value="piura">Piura</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Datos del Destinatario */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Datos del Destinatario
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Nombre completo *</Label>
                    <Input
                      value={formData.recipientName}
                      onChange={(e) => handleInputChange('recipientName', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Nombre del destinatario"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Teléfono</Label>
                    <Input
                      value={formData.recipientPhone}
                      onChange={(e) => handleInputChange('recipientPhone', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="+51 999 123 456"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300">Email</Label>
                  <Input
                    type="email"
                    value={formData.recipientEmail}
                    onChange={(e) => handleInputChange('recipientEmail', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="cliente@email.com"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Dirección completa</Label>
                  <Textarea
                    value={formData.recipientAddress}
                    onChange={(e) => handleInputChange('recipientAddress', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Dirección completa con referencias"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Ciudad destino</Label>
                  <Select value={formData.recipientCity} onValueChange={(value) => handleInputChange('recipientCity', value)}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Selecciona una ciudad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lima">Lima</SelectItem>
                      <SelectItem value="cusco">Cusco</SelectItem>
                      <SelectItem value="arequipa">Arequipa</SelectItem>
                      <SelectItem value="trujillo">Trujillo</SelectItem>
                      <SelectItem value="piura">Piura</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Checkbox para guardar cliente frecuente */}
                <div className="flex items-center space-x-2 pt-4 border-t border-gray-700">
                  <Checkbox 
                    id="saveClient"
                    checked={formData.saveFrequentClient}
                    onCheckedChange={(checked) => handleInputChange('saveFrequentClient', checked ? 'true' : 'false')}
                  />
                  <Label htmlFor="saveClient" className="text-gray-300 flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Guardar como cliente frecuente
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Datos del Paquete */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Información del Paquete
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300">Descripción del contenido</Label>
                  <Input
                    value={formData.packageDescription}
                    onChange={(e) => handleInputChange('packageDescription', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Ej: Documentos, Ropa, Electrónicos"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-gray-300">Peso (kg) *</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="0.5"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Dimensiones (cm)</Label>
                    <Input
                      value={formData.dimensions}
                      onChange={(e) => handleInputChange('dimensions', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="20x15x10"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Valor declarado (S/)</Label>
                    <Input
                      type="number"
                      value={formData.value}
                      onChange={(e) => handleInputChange('value', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="100.00"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Botones de acción */}
            <div className="flex gap-4">
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                <Package className="w-4 h-4 mr-2" />
                Crear Envío
              </Button>
              <Button type="button" variant="outline" onClick={onBack} className="border-gray-600 text-gray-300">
                Cancelar
              </Button>
            </div>
          </form>
        </div>

        {/* Sidebar - Clientes Frecuentes */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="w-5 h-5" />
                Clientes Frecuentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {frequentClients.map((client) => (
                  <div key={client.id} className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-white text-sm">{client.name}</h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => loadFrequentClient(client)}
                        className="text-orange-400 hover:text-orange-300 p-1 h-auto"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-400 mb-1">{client.phone}</p>
                    <p className="text-xs text-gray-400">{client.address}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}