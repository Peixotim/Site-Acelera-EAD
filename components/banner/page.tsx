"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion, Variants } from "framer-motion"

// Conteúdo estático para o nosso banner único
const bannerContent = {
    image: "https://images.pexels.com/photos/5716037/pexels-photo-5716037.jpeg",
}

// Variantes de animação
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export function Banner() {
    return (
        <div className="p-4 md:p-10">
            <div className="relative w-full h-[600px] overflow-hidden rounded-2xl shadow-2xl group">
                {/* Imagem de Fundo com Animação de Zoom */}
                <motion.div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${bannerContent.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    whileInView={{ scale: 1.05 }}
                    transition={{ duration: 8, ease: "easeInOut" }}
                    viewport={{ once: true, amount: 0.5 }}
                />

                {/* Overlay de Gradiente */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

                {/* Conteúdo Animado */}
                <motion.div
                    // MUDANÇA PRINCIPAL AQUI v
                    className="relative z-20 flex flex-col items-center justify-end h-full text-center text-white p-6 md:p-10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <motion.div variants={itemVariants}>
                        <Button
                            size="lg"
                            className="px-8 py-6 text-lg rounded-full shadow-lg transition-transform duration-300 group-hover:scale-105"
                        >
                            Inscreva-se
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}