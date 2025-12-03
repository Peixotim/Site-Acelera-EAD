"use client";

// 1. Importações necessárias, incluindo o tipo "Variants" da Framer Motion
import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  BookOpen,
  Target,
  BicepsFlexed,
  Smartphone,
} from "lucide-react";
import studentsSuccess from "@/public/assets/students-success.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 2. Criando uma versão animada do componente Card
const MotionCard = motion(Card);

const About = () => {
  // 3. Definindo variantes de animação com a tipagem correta
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Anima os filhos com um atraso de 0.2s entre eles
      },
    },
  };

  const features = [
    {
      icon: Award,
      title: "Tradição e Credibilidade",
      description:
        "A ACELERA EAD é especialista em conectar pessoas ao mercado educacional, tornando possível a criação de novos polos EAD em todo o Brasil.",
    },
    {
      icon: BicepsFlexed,
      title: "Vantagem Competitiva",
      description:
        "Com nosso modelo, você oferece cursos de instituições reconhecidas, com segurança jurídica, respaldo pedagógico e suporte completo para seu polo.",
    },
    {
      icon: BookOpen,
      title: "Empreenda com Propósito",
      description:
        "Junte-se a uma rede sólida, amplie seu alcance e transforme vidas através da educação — com o apoio de quem entende do assunto.",
    },
    {
      icon: Target,
      title: "Parceria que Gera Resultados",
      description:
        "Ofereça o que há de mais inovador em educação, com o respaldo de uma instituição sólida e de alta qualidade para garantir o sucesso.",
    },
  ];

  const contactSections = [
    {
      title: "Fale Conosco",
      contacts: [
        {
          number: "(31) 97329-6330",
          href: "https://wa.me/5531973296330?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20parceria%20de%20Tecnicos",
          image: "/i.jpg"
        },
        {
          number: "31 98101-2568",
          href: "https://wa.me/5531981012568?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20parceria%20de%20Tecnicos",
          image: "/i2.jpeg"
        }
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow overflow-x-hidden">
        <section id="sobre" className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
              >
                <motion.h2
                  variants={fadeIn}
                  className="text-4xl md:text-5xl font-bold text-foreground mb-6"
                >
                  Parceria que Gera
                  <span className="block text-primary">Resultados</span>
                </motion.h2>

                <motion.p
                  variants={fadeIn}
                  className="text-muted-foreground mb-8 leading-relaxed"
                >
                  A ACELERA EAD atua como intermediadora estratégica de negócios
                  educacionais, conectando instituições e empreendedores
                  interessados em expandir sua presença no ensino a distância.
                  Por meio de parcerias exclusivas, viabiliza a oferta de cursos
                  de pós-graduação da Faculdade Iguaçu e cursos técnicos da
                  Global Tec, possibilitando a implantação de polos credenciados
                  para matrícula em todo o país. Com essa integração, a ACELERA
                  EAD impulsiona o crescimento de novos parceiros, ampliando o
                  portfólio educacional com segurança, qualidade e suporte
                  completo.Conexão que Transforma
                </motion.p>

                <motion.div
                  className="grid sm:grid-cols-2 gap-6 mb-8"
                  variants={staggerContainer}
                >
                  {features.map((feature, index) => (
                    <MotionCard
                      key={index}
                      variants={fadeIn}
                      className="bg-background/80 backdrop-blur-sm border-border/20 shadow-lg hover:shadow-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:scale-[1.03]"
                    >
                      <CardContent className="p-6">
                        <div className="mb-4 bg-gradient-to-br from-primary/10 to-transparent p-3 rounded-lg inline-block">
                          <feature.icon className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-foreground">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {feature.description}
                        </p>
                      </CardContent>
                    </MotionCard>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-elegant">
                  <Image
                    src={studentsSuccess}
                    alt="Empreendedores de sucesso em parceria com a Acelera EAD"
                    width={800}
                    height={600}
                    className="w-full h-[600px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <MotionCard
                  className="absolute -bottom-8 -left-8 bg-background shadow-orange border-none"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5, ease: "backOut" }}
                >
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">
                        12+
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Anos de Experiência
                      </div>
                    </div>
                  </CardContent>
                </MotionCard>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="container mx-auto px-4 mt-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Fale com um de nossos consultores
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Entre em contato conosco através do WhatsApp e tire todas as
                suas dúvidas sobre nossas parcerias educacionais.
              </p>
            </motion.div>

            {contactSections.map((section, index) => (
              <div key={index} className="mb-16">
                <motion.div variants={fadeIn} className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    {section.title}
                  </h3>
                  <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
                </motion.div>

                <motion.div
                  className="max-w-4xl mx-auto"
                  variants={staggerContainer}
                >
                  <div
                    className={`grid gap-6 ${
                      section.contacts.length === 1
                        ? "grid-cols-1 max-w-md mx-auto"
                        : "grid-cols-1 md:grid-cols-2"
                    }`}
                  >
                    {section.contacts.map((contact, contactIndex) => (
                      <MotionCard
                        key={contactIndex}
                        variants={fadeIn}
                        className="group border-2 border-primary/20 shadow-lg hover:shadow-xl hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-2 bg-white"
                      >
                        <CardContent className="p-8 text-center h-full flex flex-col justify-between">
                          <div className="flex-1">
                            <div className="relative rounded-full w-20 h-20 mx-auto mb-6 overflow-hidden border-4 border-primary/30">
                              <Image
                                src={contact.image}
                                alt="Ícone do WhatsApp"
                                fill
                                className="object-cover"
                              />
                            </div>

                            <h4 className="text-xl font-bold text-foreground mb-2 tracking-wide">
                              {contact.number}
                            </h4>
                            <p className="text-muted-foreground mb-6 text-sm">
                              Clique para iniciar uma conversa no WhatsApp
                            </p>
                          </div>

                          <Link href={contact.href} passHref className="w-full">
                            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-base font-semibold rounded-lg transition-all duration-200 hover:scale-105">
                              <Smartphone className="mr-2 h-4 w-4" />
                              Iniciar Conversa
                            </Button>
                          </Link>
                        </CardContent>
                      </MotionCard>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
