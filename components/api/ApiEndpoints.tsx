import { useState } from "react";
import { ArrowLeft, Code, Play, Copy, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";

interface ApiEndpointsProps {
  onBack: () => void;
}

interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  requestExample: string;
  responseExample: string;
  parameters: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
}

export function ApiEndpoints({ onBack }: ApiEndpointsProps) {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, any>>({});

  const endpoints: ApiEndpoint[] = [
    {
      method: "POST",
      path: "/api/envios",
      description: "Crear un nuevo envío con validación de datos completa",
      parameters: [
        { name: "remitente", type: "object", required: true, description: "Datos del remitente (nombre, email, teléfono, dirección)" },
        { name: "destinatario", type: "object", required: true, description: "Datos del destinatario (nombre, email, teléfono, dirección)" },
        { name: "peso", type: "number", required: true, description: "Peso del envío en kilogramos" },
        { name: "dimensiones", type: "object", required: false, description: "Alto, ancho y largo en centímetros" },
        { name: "valor_declarado", type: "number", required: false, description: "Valor del contenido en soles" }
      ],
      requestExample: `{
  "remitente": {
    "nombre": "Tech Solutions SAC",
    "email": "envios@techsolutions.com",
    "telefono": "+51 999 123 456",
    "direccion": "Av. Javier Prado 123, Lima, Perú"
  },
  "destinatario": {
    "nombre": "Juan Pérez",
    "email": "juan.perez@gmail.com", 
    "telefono": "+51 987 654 321",
    "direccion": "Jr. Los Olivos 456, Arequipa, Perú"
  },
  "peso": 2.5,
  "dimensiones": {
    "alto": 20,
    "ancho": 30,
    "largo": 15
  },
  "valor_declarado": 150.00
}`,
      responseExample: `{
  "success": true,
  "data": {
    "codigo_envio": "SEND001234",
    "estado": "Registrado",
    "fecha_creacion": "2024-01-20T10:30:00Z",
    "costo_estimado": 25.50,
    "tiempo_estimado": "2-3 días",
    "courier_recomendado": "CourierExpress"
  },
  "message": "Envío creado exitosamente"
}`
    },
    {
      method: "GET", 
      path: "/api/tracking/:codigo",
      description: "Consultar estado y timeline histórico de un envío",
      parameters: [
        { name: "codigo", type: "string", required: true, description: "Código único del envío (en la URL)" }
      ],
      requestExample: `GET /api/tracking/SEND001234`,
      responseExample: `{
  "success": true,
  "data": {
    "codigo": "SEND001234",
    "estado_actual": "En Tránsito",
    "progreso": 60,
    "timeline": [
      {
        "fecha": "2024-01-20T10:30:00Z",
        "estado": "Registrado",
        "descripcion": "Envío registrado en el sistema",
        "ubicacion": "Lima, Perú"
      },
      {
        "fecha": "2024-01-20T15:45:00Z", 
        "estado": "Recogido",
        "descripcion": "Paquete recogido por courier",
        "ubicacion": "Lima, Perú"
      },
      {
        "fecha": "2024-01-21T08:20:00Z",
        "estado": "En Tránsito",
        "descripcion": "En camino a destino",
        "ubicacion": "Terminal Lima"
      }
    ],
    "informacion_envio": {
      "remitente": "Tech Solutions SAC",
      "destinatario": "Juan Pérez",
      "destino": "Arequipa, Perú",
      "peso": 2.5,
      "courier": "CourierExpress"
    }
  }
}`
    },
    {
      method: "GET",
      path: "/api/tarifas",
      description: "Obtener tarifas comparativas según peso y destino",
      parameters: [
        { name: "peso", type: "number", required: true, description: "Peso del envío en kilogramos (query param)" },
        { name: "origen", type: "string", required: true, description: "Ciudad de origen (query param)" },
        { name: "destino", type: "string", required: true, description: "Ciudad de destino (query param)" },
        { name: "tipo_servicio", type: "string", required: false, description: "standard, express, premium (query param)" }
      ],
      requestExample: `GET /api/tarifas?peso=2.5&origen=Lima&destino=Arequipa&tipo_servicio=standard`,
      responseExample: `{
  "success": true,
  "data": {
    "origen": "Lima, Perú",
    "destino": "Arequipa, Perú", 
    "peso": 2.5,
    "tarifas": [
      {
        "courier": "CourierExpress",
        "servicio": "Standard",
        "precio": 25.50,
        "tiempo_estimado": "2-3 días",
        "rating": 4.5,
        "caracteristicas": [
          "Tracking en tiempo real",
          "Seguro incluido hasta S/ 100"
        ]
      },
      {
        "courier": "FastDelivery",
        "servicio": "Express", 
        "precio": 35.00,
        "tiempo_estimado": "1-2 días",
        "rating": 4.8,
        "caracteristicas": [
          "Entrega rápida",
          "Tracking premium",
          "Seguro hasta S/ 200"
        ]
      },
      {
        "courier": "UltraSpeed",
        "servicio": "Premium",
        "precio": 45.75,
        "tiempo_estimado": "24 horas",
        "rating": 4.9,
        "caracteristicas": [
          "Entrega mismo día",
          "Tracking en vivo",
          "Seguro completo",
          "Atención prioritaria"
        ]
      }
    ]
  }
}`
    }
  ];

  const copyToClipboard = (text: string, endpointPath: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpointPath);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const testEndpoint = async (endpoint: ApiEndpoint) => {
    // Simular llamada a API
    setTestResults(prev => ({ ...prev, [endpoint.path]: { loading: true } }));
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockResponse = JSON.parse(endpoint.responseExample);
    setTestResults(prev => ({ 
      ...prev, 
      [endpoint.path]: { 
        loading: false, 
        success: true, 
        data: mockResponse 
      } 
    }));
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-600';
      case 'POST': return 'bg-blue-600';
      case 'PUT': return 'bg-yellow-600';
      case 'DELETE': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#222222' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-white hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-white">API RESTful de SENDIFY</h1>
        </div>

        {/* Descripción de la API */}
        <Card className="mb-8" style={{ backgroundColor: '#2a2a2a', borderColor: '#444444' }}>
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-sendify-orange" />
              Documentación de Endpoints
            </CardTitle>
            <CardDescription className="text-gray-300">
              API RESTful segura para integración con sistemas terceros. Todos los endpoints requieren autenticación via API Key.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-300 text-sm mb-2">Base URL:</p>
              <code className="text-sendify-orange">https://api.sendify.com/v1</code>
              <p className="text-gray-400 text-xs mt-2">
                * Todos los ejemplos están en modo de prueba. En producción, usar API Keys válidas.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Endpoints */}
        <div className="space-y-6">
          {endpoints.map((endpoint, index) => (
            <Card key={index} style={{ backgroundColor: '#2a2a2a', borderColor: '#444444' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className={`${getMethodColor(endpoint.method)} text-white`}>
                      {endpoint.method}
                    </Badge>
                    <code className="text-sendify-orange font-mono">{endpoint.path}</code>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testEndpoint(endpoint)}
                    disabled={testResults[endpoint.path]?.loading}
                    className="border-gray-600 text-white hover:bg-gray-700"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    {testResults[endpoint.path]?.loading ? "Probando..." : "Probar"}
                  </Button>
                </div>
                <CardDescription className="text-gray-300">
                  {endpoint.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="parameters" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-gray-700">
                    <TabsTrigger value="parameters" className="text-white">Parámetros</TabsTrigger>
                    <TabsTrigger value="request" className="text-white">Request</TabsTrigger>
                    <TabsTrigger value="response" className="text-white">Response</TabsTrigger>
                    <TabsTrigger value="test" className="text-white">Prueba</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="parameters" className="mt-4">
                    <div className="space-y-3">
                      {endpoint.parameters.map((param, paramIndex) => (
                        <div key={paramIndex} className="flex items-center justify-between p-3 bg-gray-800 rounded">
                          <div>
                            <div className="flex items-center gap-2">
                              <code className="text-sendify-orange">{param.name}</code>
                              <Badge variant={param.required ? "destructive" : "secondary"} className="text-xs">
                                {param.required ? "Requerido" : "Opcional"}
                              </Badge>
                              <span className="text-gray-400 text-sm">({param.type})</span>
                            </div>
                            <p className="text-gray-300 text-sm mt-1">{param.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="request" className="mt-4">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 z-10"
                        onClick={() => copyToClipboard(endpoint.requestExample, endpoint.path + '-request')}
                      >
                        {copiedEndpoint === endpoint.path + '-request' ? 
                          <Check className="w-4 h-4 text-green-400" /> : 
                          <Copy className="w-4 h-4 text-gray-400" />
                        }
                      </Button>
                      <Textarea
                        value={endpoint.requestExample}
                        readOnly
                        className="font-mono text-sm bg-gray-800 border-gray-600 text-white h-64"
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="response" className="mt-4">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 z-10"
                        onClick={() => copyToClipboard(endpoint.responseExample, endpoint.path + '-response')}
                      >
                        {copiedEndpoint === endpoint.path + '-response' ? 
                          <Check className="w-4 h-4 text-green-400" /> : 
                          <Copy className="w-4 h-4 text-gray-400" />
                        }
                      </Button>
                      <Textarea
                        value={endpoint.responseExample}
                        readOnly
                        className="font-mono text-sm bg-gray-800 border-gray-600 text-white h-64"
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="test" className="mt-4">
                    {testResults[endpoint.path] ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-600 text-white">200 OK</Badge>
                          <span className="text-gray-300 text-sm">Respuesta exitosa</span>
                        </div>
                        <Textarea
                          value={JSON.stringify(testResults[endpoint.path].data, null, 2)}
                          readOnly
                          className="font-mono text-sm bg-gray-800 border-gray-600 text-white h-64"
                        />
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-400 mb-4">Haz clic en "Probar" para ejecutar este endpoint</p>
                        <Button
                          onClick={() => testEndpoint(endpoint)}
                          className="bg-sendify-orange hover:bg-sendify-orange-dark"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Ejecutar Prueba
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer de la API */}
        <Card className="mt-8" style={{ backgroundColor: '#2a2a2a', borderColor: '#444444' }}>
          <CardContent className="p-6">
            <h3 className="text-white font-semibold mb-3">Información Adicional</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="text-sendify-orange font-medium mb-2">Autenticación</h4>
                <p className="text-gray-300">Usar header: <code className="bg-gray-700 px-1 rounded">Authorization: Bearer YOUR_API_KEY</code></p>
              </div>
              <div>
                <h4 className="text-sendify-orange font-medium mb-2">Rate Limits</h4>
                <p className="text-gray-300">1000 requests/hora en plan Free, ilimitado en planes Pro/Enterprise</p>
              </div>
              <div>
                <h4 className="text-sendify-orange font-medium mb-2">Errores</h4>
                <p className="text-gray-300">Códigos HTTP estándar: 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)</p>
              </div>
              <div>
                <h4 className="text-sendify-orange font-medium mb-2">Webhooks</h4>
                <p className="text-gray-300">Notificaciones automáticas de cambios de estado disponibles en configuración</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}