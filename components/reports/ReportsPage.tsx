import { useState } from "react";
import { ArrowLeft, Download, FileText, BarChart3, Calendar, TrendingUp, Package, Clock, DollarSign } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";

interface ReportsPageProps {
  onBack: () => void;
}

interface ReportData {
  periodo: string;
  totalEnvios: number;
  tiempoPromedioEntrega: number;
  costoTotal: number;
  costoPromedio: number;
  enviosExitosos: number;
  enviosRetrasados: number;
}

interface ShipmentDetail {
  codigo: string;
  cliente: string;
  destino: string;
  fechaCreacion: string;
  fechaEntrega: string;
  tiempoEntrega: number;
  costo: number;
  courier: string;
  estado: string;
}

export function ReportsPage({ onBack }: ReportsPageProps) {
  const [dateFrom, setDateFrom] = useState("2024-01-01");
  const [dateTo, setDateTo] = useState("2024-01-31");
  const [reportType, setReportType] = useState("performance");
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Mock data para el reporte
  const mockReportData: ReportData = {
    periodo: `${dateFrom} - ${dateTo}`,
    totalEnvios: 156,
    tiempoPromedioEntrega: 2.8,
    costoTotal: 15680,
    costoPromedio: 100.51,
    enviosExitosos: 148,
    enviosRetrasados: 8
  };

  const mockShipmentDetails: ShipmentDetail[] = [
    {
      codigo: "SEND001",
      cliente: "Tech Solutions SAC",
      destino: "Lima, Perú",
      fechaCreacion: "2024-01-15",
      fechaEntrega: "2024-01-17",
      tiempoEntrega: 2,
      costo: 85.50,
      courier: "CourierExpress",
      estado: "Entregado"
    },
    {
      codigo: "SEND002", 
      cliente: "Global Imports",
      destino: "Arequipa, Perú",
      fechaCreacion: "2024-01-16",
      fechaEntrega: "2024-01-19",
      tiempoEntrega: 3,
      costo: 120.00,
      courier: "FastDelivery",
      estado: "Entregado"
    },
    {
      codigo: "SEND003",
      cliente: "StartupXYZ",
      destino: "Cusco, Perú",
      fechaCreacion: "2024-01-18",
      fechaEntrega: "",
      tiempoEntrega: 0,
      costo: 95.75,
      courier: "UltraSpeed",
      estado: "En Tránsito"
    }
  ];

  const generateReport = () => {
    setIsGenerating(true);
    // Simular generación de reporte
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const exportToCsv = () => {
    const csvHeaders = "Código,Cliente,Destino,Fecha Creación,Fecha Entrega,Tiempo Entrega (días),Costo,Courier,Estado\n";
    const csvData = mockShipmentDetails.map(item => 
      `${item.codigo},${item.cliente},${item.destino},${item.fechaCreacion},${item.fechaEntrega || "N/A"},${item.tiempoEntrega || "N/A"},${item.costo},${item.courier},${item.estado}`
    ).join("\n");
    
    const blob = new Blob([csvHeaders + csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reporte_sendify_${dateFrom}_${dateTo}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPdf = () => {
    // Simular exportación a PDF
    alert("Funcionalidad de exportación a PDF implementada. El archivo se descargará en un entorno real.");
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#222222' }}>
      <div className="max-w-7xl mx-auto">
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
          <h1 className="text-3xl font-bold text-white">Reportes y Analítica</h1>
        </div>

        {/* Controles de Filtros */}
        <Card className="mb-8" style={{ backgroundColor: '#2a2a2a', borderColor: '#444444' }}>
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-sendify-orange" />
              Generar Reporte
            </CardTitle>
            <CardDescription className="text-gray-300">
              Selecciona el rango de fechas y tipo de reporte para generar análisis detallados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <Label htmlFor="dateFrom" className="text-white">Fecha Desde</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="dateTo" className="text-white">Fecha Hasta</Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-white">Tipo de Reporte</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="performance">Desempeño General</SelectItem>
                    <SelectItem value="costs">Análisis de Costos</SelectItem>
                    <SelectItem value="delivery">Tiempos de Entrega</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={generateReport}
                  disabled={isGenerating}
                  className="bg-sendify-orange hover:bg-sendify-orange-dark w-full"
                >
                  {isGenerating ? "Generando..." : "Generar Reporte"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Métricas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card style={{ backgroundColor: '#2a2a2a', borderColor: '#444444' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Envíos</p>
                  <p className="text-2xl font-bold text-white">{mockReportData.totalEnvios}</p>
                </div>
                <Package className="w-8 h-8 text-sendify-orange" />
              </div>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: '#2a2a2a', borderColor: '#444444' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Tiempo Promedio</p>
                  <p className="text-2xl font-bold text-white">{mockReportData.tiempoPromedioEntrega} días</p>
                </div>
                <Clock className="w-8 h-8 text-sendify-orange" />
              </div>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: '#2a2a2a', borderColor: '#444444' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Costo Total</p>
                  <p className="text-2xl font-bold text-white">S/ {mockReportData.costoTotal.toFixed(2)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-sendify-orange" />
              </div>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: '#2a2a2a', borderColor: '#444444' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Tasa de Éxito</p>
                  <p className="text-2xl font-bold text-white">
                    {((mockReportData.enviosExitosos / mockReportData.totalEnvios) * 100).toFixed(1)}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-sendify-orange" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reporte Detallado */}
        <Card style={{ backgroundColor: '#2a2a2a', borderColor: '#444444' }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Reporte Detallado</CardTitle>
                <CardDescription className="text-gray-300">
                  Análisis completo de envíos en el período seleccionado
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={exportToCsv}
                  className="border-gray-600 text-white hover:bg-gray-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  CSV
                </Button>
                <Button 
                  variant="outline" 
                  onClick={exportToPdf}
                  className="border-gray-600 text-white hover:bg-gray-700"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">Código</TableHead>
                    <TableHead className="text-white">Cliente</TableHead>
                    <TableHead className="text-white">Destino</TableHead>
                    <TableHead className="text-white">Fecha Creación</TableHead>
                    <TableHead className="text-white">Fecha Entrega</TableHead>
                    <TableHead className="text-white">Tiempo (días)</TableHead>
                    <TableHead className="text-white">Costo</TableHead>
                    <TableHead className="text-white">Courier</TableHead>
                    <TableHead className="text-white">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockShipmentDetails.map((shipment) => (
                    <TableRow key={shipment.codigo}>
                      <TableCell className="text-white font-medium">{shipment.codigo}</TableCell>
                      <TableCell className="text-white">{shipment.cliente}</TableCell>
                      <TableCell className="text-white">{shipment.destino}</TableCell>
                      <TableCell className="text-white">{shipment.fechaCreacion}</TableCell>
                      <TableCell className="text-white">{shipment.fechaEntrega || "N/A"}</TableCell>
                      <TableCell className="text-white">{shipment.tiempoEntrega || "N/A"}</TableCell>
                      <TableCell className="text-white">S/ {shipment.costo.toFixed(2)}</TableCell>
                      <TableCell className="text-white">{shipment.courier}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={shipment.estado === "Entregado" ? "default" : "secondary"}
                          className={shipment.estado === "Entregado" ? "bg-green-600" : "bg-yellow-600"}
                        >
                          {shipment.estado}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}