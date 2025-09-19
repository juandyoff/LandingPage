import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { ArrowLeft, Calculator, Truck, Clock, Shield, Star } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface QuotationPageProps {
  onBack: () => void;
}

interface CourierQuote {
  id: string;
  name: string;
  logo: string;
  price: number;
  deliveryTime: string;
  rating: number;
  features: string[];
  isRecommended?: boolean;
}

export function QuotationPage({ onBack }: QuotationPageProps) {
  const [formData, setFormData] = useState({
    originCity: "",
    destinationCity: "",
    weight: "",
    dimensions: "",
    value: "",
    serviceType: ""
  });

  const [quotes, setQuotes] = useState<CourierQuote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState<string | null>(null);

  // Mock data para diferentes couriers
  const mockQuotes: CourierQuote[] = [
    {
      id: "express-courier",
      name: "Express Courier",
      logo: "EC",
      price: 25.50,
      deliveryTime: "1-2 días hábiles",
      rating: 4.8,
      features: ["Tracking en tiempo real", "Seguro incluido", "Entrega hasta la puerta"],
      isRecommended: true
    },
    {
      id: "fast-delivery",
      name: "Fast Delivery",
      logo: "FD",
      price: 22.00,
      deliveryTime: "2-3 días hábiles",
      rating: 4.6,
      features: ["Tracking básico", "Entrega en punto de recojo", "Cobertura nacional"]
    },
    {
      id: "premium-logistics",
      name: "Premium Logistics",
      logo: "PL",
      price: 35.00,
      deliveryTime: "24 horas",
      rating: 4.9,
      features: ["Entrega express", "Seguro premium", "Soporte 24/7", "Foto de entrega"]
    },
    {
      id: "economy-shipping",
      name: "Economy Shipping",
      logo: "ES",
      price: 18.50,
      deliveryTime: "3-5 días hábiles",
      rating: 4.2,
      features: ["Precio económico", "Tracking web", "Red nacional"]
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleQuote = () => {
    if (!formData.originCity || !formData.destinationCity || !formData.weight) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }

    setIsLoading(true);

    // Simular cálculo de cotizaciones
    setTimeout(() => {
      // Aplicar variaciones de precio basadas en peso y distancia
      const weightMultiplier = parseFloat(formData.weight) > 5 ? 1.3 : 1;
      const distanceMultiplier = formData.originCity !== formData.destinationCity ? 1.2 : 1;

      const calculatedQuotes = mockQuotes.map(quote => ({
        ...quote,
        price: Math.round(quote.price * weightMultiplier * distanceMultiplier * 100) / 100
      }));

      // Ordenar por precio
      calculatedQuotes.sort((a, b) => a.price - b.price);

      setQuotes(calculatedQuotes);
      setIsLoading(false);
      toast.success("Cotizaciones calculadas exitosamente");
    }, 1500);
  };

  const handleSelectCourier = (courierId: string) => {
    setSelectedCourier(courierId);
    const courier = quotes.find(q => q.id === courierId);
    if (courier) {
      toast.success(`${courier.name} seleccionado para el envío`);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
      />
    ));
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
          <h1 className="text-2xl font-bold text-white">Cotizador de Tarifas</h1>
          <p className="text-gray-400">Compara precios y tiempos de entrega entre diferentes couriers</p>
        </div>
      </div>

      {/* Formulario de cotización */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Datos para Cotización
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <Label className="text-gray-300">Ciudad origen *</Label>
              <Select value={formData.originCity} onValueChange={(value) => handleInputChange('originCity', value)}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Origen" />
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

            <div>
              <Label className="text-gray-300">Ciudad destino *</Label>
              <Select value={formData.destinationCity} onValueChange={(value) => handleInputChange('destinationCity', value)}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Destino" />
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

            <div className="flex items-end">
              <Button 
                onClick={handleQuote}
                disabled={isLoading}
                className="bg-orange-500 hover:bg-orange-600 text-white w-full"
              >
                <Calculator className="w-4 h-4 mr-2" />
                {isLoading ? "Cotizando..." : "Cotizar"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados de cotización */}
      {quotes.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Opciones de Envío Disponibles</h2>
          
          <div className="grid gap-4">
            {quotes.map((quote) => (
              <Card 
                key={quote.id} 
                className={`bg-gray-800 border-gray-700 hover:border-orange-500/50 transition-all cursor-pointer ${
                  selectedCourier === quote.id ? 'border-orange-500 bg-orange-500/5' : ''
                } ${quote.isRecommended ? 'ring-2 ring-green-500/50' : ''}`}
                onClick={() => handleSelectCourier(quote.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Logo del courier */}
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{quote.logo}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-white">{quote.name}</h3>
                          {quote.isRecommended && (
                            <Badge className="bg-green-500/20 text-green-400">
                              Recomendado
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {renderStars(quote.rating)}
                          <span className="text-gray-400 text-sm">({quote.rating})</span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {quote.deliveryTime}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-400">
                        S/ {quote.price.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-400">
                        Costo total
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Características incluidas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {quote.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="bg-gray-700 text-gray-300">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedCourier === quote.id && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-green-400">
                          <Shield className="w-4 h-4" />
                          <span className="text-sm">Courier seleccionado</span>
                        </div>
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                          Proceder con este courier
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Información adicional */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Optimización de Costos</h3>
              <p className="text-gray-300 text-sm mb-3">
                Nuestro sistema compara automáticamente precios y tiempos de entrega para ayudarte a tomar la mejor decisión.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="text-purple-400 font-medium">Factores considerados:</h4>
                  <ul className="text-gray-400 mt-1 space-y-1">
                    <li>• Peso y dimensiones del paquete</li>
                    <li>• Distancia entre ciudades</li>
                    <li>• Tipo de servicio solicitado</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-purple-400 font-medium">Beneficios:</h4>
                  <ul className="text-gray-400 mt-1 space-y-1">
                    <li>• Ahorro promedio del 25% en costos</li>
                    <li>• Comparación en tiempo real</li>
                    <li>• Selección optimizada courier/tiempo</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}