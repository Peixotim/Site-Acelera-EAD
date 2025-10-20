// src/components/Contact.tsx
"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { ContactCard } from "./ContactCards"; // Verifique se o caminho do import está correto

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // MUDANÇA AQUI: staggerChildren reduzido para uma cascata mais rápida.
      staggerChildren: 0.1, 
    },
  },
};

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Endereço",
      info: "Luiz Rodrigues dos Santos, 44\nTodos os Santos - Coronel Fabriciano/MG",
      href: "https://www.google.com/maps/search/?api=1&query=Luiz+Rodrigues+dos+Santos+44+Coronel+Fabriciano+MG"
    },
    {
      icon: Phone,
      title: "Telefone",
      info: "(31) 97329-6330",
      href: "tel:+5531973296330"
    },
    {
      icon: Mail,
      title: "E-mail",
      info: "gerencial@colegioaceleraead.com.br", // Adicionei um e-mail de exemplo
      href: "mailto:gerencial@colegioaceleraead.com.br" // E o link funcional
    },
    {
      icon: Clock,
      title: "Horário de Atendimento",
      info: "Segunda a Sexta: 8h às 18h",
      href: "#"
    }
  ];

  return (
    <motion.section
      id="contato"
      className="py-20 bg-gradient-to-b from-background to-card/50"
      itemScope
      itemType="https://schema.org/ContactPage"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            // MUDANÇA AQUI: Duração reduzida.
            transition={{ duration: 0.5, delay: 0 }}
          >
            Entre em <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500">Contato</span>
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            // MUDANÇA AQUI: Duração reduzida.
            transition={{ duration: 0.5, delay: 0 }}
          >
            Pronto para transformar seu futuro? Fale conosco para saber mais sobre nossos cursos e parcerias.
          </motion.p>
        </header>

        <motion.ul
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
          role="list"
          variants={containerVariants}
        >
          {contactInfo.map((item, index) => (
            // Renderiza apenas se a informação não estiver vazia
            item.info && (
              <ContactCard
                key={index}
                icon={item.icon}
                title={item.title}
                info={item.info}
                href={item.href}
              />
            )
          ))}
        </motion.ul>
      </div>
    </motion.section>
  );
};

export default Contact;