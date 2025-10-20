"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import testimonialsData from "@/json/testimonials.json";

// --- Framer Motion Variants com valores ajustados para rapidez ---

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      // MUDANÇA: Stiffness aumentado para uma entrada mais rápida da seção
      stiffness: 120, 
      damping: 20,
      // MUDANÇA: Stagger reduzido para uma cascata mais veloz
      staggerChildren: 0.1, 
      when: "beforeChildren",
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 70, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      // MUDANÇA: Stiffness e Damping ajustados para um "pop" mais rápido dos cards
      stiffness: 150, 
      damping: 20,
      mass: 0.7,
    },
  },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      // MUDANÇA: Duração reduzida
      duration: 0.5, 
      ease: "easeOut",
    },
  },
};

const statVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      // MUDANÇA: Duração reduzida
      duration: 0.4, 
      ease: "easeOut",
    },
  },
};

const Testimonials = () => {
  return (
    <motion.section
      id="depoimentos"
      className="relative py-20 overflow-hidden bg-gradient-to-br from-background via-card to-background"
      itemScope
      itemType="https://schema.org/CollectionPage"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="absolute top-0 left-0 w-48 h-48 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.header 
            className="text-center mb-16 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
        >
          <motion.h1 variants={headerItemVariants} className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            O que nossos <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500">Ex-Alunos</span> dizem
          </motion.h1>
          <motion.p variants={headerItemVariants} className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Histórias reais de sucesso de quem passou pela Faculdade Marinho e se transformou profissionalmente.
          </motion.p>
        </motion.header>

        <motion.ul 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch" 
          role="list"
          variants={sectionVariants}
        >
          {testimonialsData.testimonials.map((testimonial, index) => (
            <motion.li
              key={index}
              className="relative group h-full"
              itemScope
              itemProp="hasPart"
              itemType="https://schema.org/Review"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
              // MUDANÇA: Stiffness do hover aumentado para uma resposta mais instantânea
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
            >
              <Card className="h-full border border-border/50 bg-card/80 backdrop-blur-md transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-orange-500/10 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
                
                <CardContent className="p-6 flex flex-col h-full z-10 relative">
                  <meta itemProp="reviewAspect" content="Experiência do Aluno" />
                  <Quote className="h-10 w-10 text-primary mb-4 opacity-50 transform -rotate-12 group-hover:opacity-80 transition-all duration-300" />
                  
                  <div className="flex gap-1 mb-4" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`} />
                    ))}
                    <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
                    <meta itemProp="bestRating" content="5" />
                  </div>
                  
                  <p itemProp="reviewBody" className="text-muted-foreground mb-6 leading-relaxed flex-grow text-lg">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center gap-4 mt-auto" itemProp="author" itemScope itemType="https://schema.org/Person">
                    <Avatar className="h-14 w-14 border-2 border-primary/20">
                      {/* CORREÇÃO: Assumindo que seu JSON tenha uma imagem de avatar */}
                      <AvatarImage src={testimonial.avatar} alt={`Avatar de ${testimonial.name}`} /> 
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-lg">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div itemProp="name" className="font-semibold text-foreground text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-primary/70">{testimonial.course}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "5.000+", label: "Alunos Formados" },
            { value: "98%", label: "Taxa de Empregabilidade" },
            { value: "4.9", label: "Avaliação Média" },
            { value: "12+", label: "Anos de Tradição" }
          ].map((stat, i) => (
            <motion.div key={i} className="text-center p-4" variants={statVariants}>
              <div className="text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500">
                {stat.value}
              </div>
              <div className="text-lg text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;