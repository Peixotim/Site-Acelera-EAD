import { useState } from "react"; // 1. Importar o useState
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Modal from "./Modal/modal";
import SubscriptionForm from "./Modal/SubscriptionForm";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
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

export default function Attraction() {
    // 4. Adicionar o estado para controlar a visibilidade do modal
    const [showModal, setShowModal] = useState(false);

    return (
        // Envolvemos com um Fragment <> para renderizar a section e o Modal
        <>
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <motion.div
                        className="relative w-full rounded-3xl overflow-hidden p-8 md:p-16 text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={containerVariants}
                    >
                        {/* Camada do Gradiente Animado */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-[-200%] w-[400%] h-[400%] bg-gradient-to-br from-amber-500 via-orange-600 to-red-700 animate-[spin_12s_linear_infinite]" />
                        </div>

                        {/* Efeito de Vidro Fosco (Glassmorphism) */}
                        <div className="relative z-10 bg-black/20 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl">
                            <motion.div variants={itemVariants} className="mb-4 flex justify-center">
                                <div className="bg-white/10 p-3 rounded-full border border-white/20">
                                    <Sparkles className="h-6 w-6 text-amber-300" />
                                </div>
                            </motion.div>

                            <motion.h2
                                variants={itemVariants}
                                className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight"
                                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
                            >
                                Pronto para expandir seu <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-400">portfólio</span>?
                            </motion.h2>

                            <motion.p
                                variants={itemVariants}
                                className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
                            >
                                Junte-se a uma rede de parceiros inovadores e leve sua oferta de cursos para o próximo nível sem investimento inicial.
                            </motion.p>

                            <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    size="lg"
                                    className="group relative bg-white text-gray-900 font-bold text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 overflow-hidden"
                                    // 5. Conectar o onClick para abrir o modal
                                    onClick={() => setShowModal(true)}
                                >
                                    {/* Efeito de brilho no hover */}
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                                    <span className="relative">
                                        Quero ser um parceiro
                                        <ArrowRight className="inline-block ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </span>
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 6. Renderizar o Modal com o formulário dentro */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <SubscriptionForm onClose={() => setShowModal(false)} />
            </Modal>
        </>
    );
}