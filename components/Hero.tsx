// src/components/Hero.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import hero from "@/public/assets/hero.png";
import Modal from "./Modal/modal";
import SubscriptionForm from "./Modal/SubscriptionForm";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

// Variantes para animar o container do texto (efeito cascata)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Variantes para animar cada item de texto/botão individualmente
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  // Hooks do Framer Motion para o efeito Parallax
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image com Parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${hero.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            y: backgroundY,
          }}
        />

        {/* Botão no final do banner */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
        >
          <Button
            size="lg"
            className="px-8 py-2 text-lg rounded-full shadow-lg hover:shadow-primary/30 transition-shadow duration-300"
            onClick={() => setShowModal(true)}
          >
            Solicitar Proposta
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </section>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <SubscriptionForm onClose={() => setShowModal(false)} />
      </Modal>
    </>
  );
};

export default Hero;
