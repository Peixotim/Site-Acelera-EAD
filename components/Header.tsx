'use client'

import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react"; // Adicionado useEffect e useRef
import { usePathname } from "next/navigation";
import { navigationItems } from "@/utils/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"; // Importações do Framer Motion

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(true); // NOVO: Estado para controlar a visibilidade do header
    const lastScrollY = useRef(0); // NOVO: Referência para guardar a última posição de scroll

    const pathname = usePathname();

    // NOVO: Lógica para esconder/mostrar o header ao rolar a página
    useEffect(() => {
        const controlHeader = () => {
            const currentScrollY = window.scrollY;
            // Esconde se rolar para baixo, mostra se rolar para cima
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', controlHeader);
        return () => {
            window.removeEventListener('scroll', controlHeader);
        };
    }, []);

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={isVisible ? "visible" : "hidden"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50"
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <Image
                                src="/Acelera EAD.png"
                                alt="Logo da Faculdade Marinho"
                                width={40}
                                height={40}
                                className="rounded-lg"
                            />
                        </div>
                        <span className="text-xl font-bold text-foreground">Acelera EAD</span>
                    </Link>

                    {/* Desktop Navigation com indicador animado */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative text-foreground hover:text-primary transition-colors duration-300"
                            >
                                {item.label}
                                {pathname === item.href && (
                                    <motion.span
                                        layoutId="underline"
                                        className="absolute left-0 -bottom-1 block h-[2px] w-full bg-primary"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Botão do Menu Mobile */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </Button>
                </div>

                {/* Mobile Navigation com Animação */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.nav
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="md:hidden mt-4 pt-4 border-t overflow-hidden"
                        >
                            <div className="flex flex-col space-y-4">
                                {navigationItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="text-foreground hover:text-primary transition-colors text-lg"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                {/* MUDANÇA: Usar um Link ou um Button que abre o modal */}
                                <Button
                                    onClick={() => {

                                        setIsMenuOpen(false);
                                    }}
                                    className="bg-primary hover:bg-primary/90 w-full"
                                >
                                    Inscreva-se
                                </Button>
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
};

export default Header;