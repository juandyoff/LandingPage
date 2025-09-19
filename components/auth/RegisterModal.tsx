import { useState } from "react";
import { X, User, Mail, Lock, Building, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Checkbox } from "../ui/checkbox";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  company: string;
  phone: string;
  businessType: string;
  acceptTerms: boolean;
}

export function RegisterModal({ isOpen, onClose, onSuccess }: RegisterModalProps) {
  const [formData, setFormData] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    phone: "",
    businessType: "",
    acceptTerms: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterForm>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterForm> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "El nombre es requerido";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "El apellido es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!formData.company.trim()) {
      newErrors.company = "La empresa es requerida";
    }

    if (!formData.businessType) {
      newErrors.businessType = "Selecciona el tipo de negocio";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simular registro de usuario
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular respuesta exitosa
      console.log("Usuario registrado:", {
        ...formData,
        plan: "Free",
        createdAt: new Date().toISOString()
      });

      onSuccess();
      onClose();
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        company: "",
        phone: "",
        businessType: "",
        acceptTerms: false
      });
      
    } catch (error) {
      console.error("Error en registro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof RegisterForm, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto" style={{ backgroundColor: '#2a2a2a', borderColor: '#444444' }}>
        <DialogHeader>
          <DialogTitle className="text-white text-center text-xl">
            Únete a SENDIFY
          </DialogTitle>
          <p className="text-gray-300 text-center text-sm">
            Comienza gratis y optimiza tu gestión logística
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="firstName" className="text-white">Nombre *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                  placeholder="Juan"
                />
              </div>
              {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <Label htmlFor="lastName" className="text-white">Apellido *</Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Pérez"
              />
              {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-white">Email *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white"
                placeholder="juan.perez@empresa.com"
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Contraseñas */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="password" className="text-white">Contraseña *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                  placeholder="••••••"
                />
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="text-white">Confirmar *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="••••••"
              />
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Empresa */}
          <div>
            <Label htmlFor="company" className="text-white">Empresa *</Label>
            <div className="relative">
              <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white"
                placeholder="Mi Empresa SAC"
              />
            </div>
            {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company}</p>}
          </div>

          {/* Teléfono y Tipo de Negocio */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="phone" className="text-white">Teléfono</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                  placeholder="+51 999 999 999"
                />
              </div>
            </div>
            <div>
              <Label className="text-white">Tipo de Negocio *</Label>
              <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturer">Manufacturero</SelectItem>
                  <SelectItem value="distributor">Distribuidor</SelectItem>
                  <SelectItem value="startup">Startup</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
              {errors.businessType && <p className="text-red-400 text-xs mt-1">{errors.businessType}</p>}
            </div>
          </div>

          {/* Términos y Condiciones */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
            />
            <div>
              <Label htmlFor="terms" className="text-sm text-gray-300 cursor-pointer">
                Acepto los{" "}
                <a href="#" className="text-sendify-orange hover:underline">
                  términos y condiciones
                </a>{" "}
                y la{" "}
                <a href="#" className="text-sendify-orange hover:underline">
                  política de privacidad
                </a>
              </Label>
              {errors.acceptTerms && <p className="text-red-400 text-xs mt-1">{errors.acceptTerms}</p>}
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-600 text-white hover:bg-gray-700"
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-sendify-orange hover:bg-sendify-orange-dark"
              disabled={isLoading}
            >
              {isLoading ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
          </div>

          <p className="text-xs text-gray-400 text-center">
            Comenzarás con el plan Free. Podrás actualizar en cualquier momento.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}