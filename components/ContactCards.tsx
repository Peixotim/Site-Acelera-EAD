// src/components/ContactCard.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { type ElementType } from "react";

interface ContactCardProps {
  icon: ElementType;
  title: string;
  info: string;
  href: string;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    // MUDANÇA AQUI: stiffness e damping ajustados para uma animação mais rápida.
    transition: { type: "spring", stiffness: 150, damping: 25 },
  },
};

export const ContactCard = ({ icon: Icon, title, info, href }: ContactCardProps) => {
  return (
    <motion.li
      className="w-full h-full"
      variants={cardVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      // MUDANÇA AQUI: stiffness do hover aumentado para uma resposta mais instantânea.
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <Card className="group relative h-full w-full overflow-hidden rounded-xl border-border/50 bg-card/80 backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-primary/20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          <CardContent className="relative z-10 p-6 flex flex-col h-full">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="mb-2 text-lg font-semibold text-foreground">
                  {title}
                </h2>
                <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                  {info}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </a>
    </motion.li>
  );
};