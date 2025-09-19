import { Card, CardContent } from "./ui/card";
import { Linkedin, Github, Mail } from "lucide-react";

export function TeamSection() {
  const team = [
    {
      name: "Juan Diego Esquirva",
      role: "CEO & Fundador",
      description: "Experto en logística con -15 años de experiencia en optimización de cadenas de suministro.",
      avatar: "AH",
      social: {
        linkedin: "#",
        github: "#",
        email: "miguel@sendify.com"
      }
    },
    {
      name: "Eduardo",
      role: "CTO",
      description: "Arquitecta de software especializada en sistemas distribuidos y plataformas de alto rendimiento.",
      avatar: "SR",
      social: {
        linkedin: "#",
        github: "#",
        email: "eduardo@sendify.com"
      }
    },
    {
      name: "Joan",
      role: "Director de Producto",
      description: "Product Manager con amplia experiencia en herramientas logísticas y user experience.",
      avatar: "ML",
      social: {
        linkedin: "#",
        github: "#",
        email: "joan@sendify.com"
      }
    },
    {
      name: "Pietro",
      role: "Lead Developer",
      description: "Desarrolladora full-stack especializada en React, Node.js y arquitecturas modernas.",
      avatar: "CT",
      social: {
        linkedin: "#",
        github: "#",
        email: "Pietro@sendify.com"
      }
    },
    {
      name: "Luis Operations",
      role: "Director de Operaciones",
      description: "Especialista en procesos operativos y optimización de flujos de trabajo logísticos.",
      avatar: "LO",
      social: {
        linkedin: "#",
        github: "#",
        email: "luis@sendify.com"
      }
    }
  ];

  return (
    <section id="equipo" className="py-20" style={{ backgroundColor: '#2a2a2a' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Equipo Horizon
          </h2>
          <p className="text-xl text-white opacity-80">
            Conoce al equipo que está revolucionando la logística
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {team.map((member, index) => (
            <Card 
              key={index} 
              className="border hover:border-opacity-75 transition-all duration-300 group"
              style={{ backgroundColor: '#222222', borderColor: '#444444' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FF9500'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#444444'}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform"
                    style={{ background: 'linear-gradient(135deg, #FF9500 0%, #e6850a 100%)' }}
                  >
                    <span className="text-white font-bold text-lg">
                      {member.avatar}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: '#FF9500' }}>
                    {member.role}
                  </p>
                  <p className="text-white opacity-70 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>

                <div className="flex justify-center gap-3 pt-4 border-t" style={{ borderColor: '#444444' }}>
                  <a 
                    href={member.social.linkedin}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors group"
                    style={{ backgroundColor: '#333333' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF9500'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#333333'}
                  >
                    <Linkedin className="w-4 h-4 text-white opacity-70 group-hover:opacity-100" />
                  </a>
                  <a 
                    href={member.social.github}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors group"
                    style={{ backgroundColor: '#333333' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF9500'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#333333'}
                  >
                    <Github className="w-4 h-4 text-white opacity-70 group-hover:opacity-100" />
                  </a>
                  <a 
                    href={`mailto:${member.social.email}`}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors group"
                    style={{ backgroundColor: '#333333' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF9500'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#333333'}
                  >
                    <Mail className="w-4 h-4 text-white opacity-70 group-hover:opacity-100" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}