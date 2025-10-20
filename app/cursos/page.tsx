"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Wrench, ArrowDown } from "lucide-react";
import tecnicos from "./tecnico.json";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function CursosTecnicosPage() {
    // Definimos um estado para controlar a quantidade de cards visíveis,
    // começando com 6 cards.
    const [cardsVisible, setCardsVisible] = useState(6);

    // Limitamos a exibição dos cards com base no estado `cardsVisible`
    const cursosParaExibir = tecnicos.slice(0, cardsVisible);

    // Verificamos se ainda há cards para carregar para exibir o botão
    const temMaisCursos = tecnicos.length > cardsVisible;

    // Função para carregar mais cards
    const handleLoadMore = () => {
        setCardsVisible(prev => prev + 6); // Adicionamos mais 6 cards
    };

    return (
        <div className='flex flex-col min-h-screen'>
            <Header />

            {/* Banner Section */}
            <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-md">
                        Cursos <span className="text-orange-200">Técnicos</span>
                    </h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Cursos oferecidos pela nossa instituição, a Global Tec, para sua formação técnica e profissional.
                    </p>
                </div>
            </section>

            <main className="flex-grow bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cursosParaExibir.map((curso, index) => (
                            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardHeader className="bg-orange-100 p-6 rounded-t-lg flex flex-col items-center">
                                    <div className="text-orange-600 mb-2">
                                        <Wrench className="h-10 w-10" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold text-gray-800 text-center">
                                        {curso.course}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <p className="text-gray-600 mb-2 border-b pb-2 text-center">
                                        <strong className="font-semibold text-gray-900">Tipo:</strong> <span className="text-orange-600 font-bold">{curso.type}</span>
                                    </p>
                                    <p className="text-gray-600 mb-4 border-b pb-2 text-center">
                                        <strong className="font-semibold text-gray-900">Parceiro:</strong> {curso.partner}
                                    </p>
                                    <p className="text-gray-700 leading-relaxed text-sm text-center">
                                        {curso.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Botão "Carregar mais" visível apenas se houver mais cards */}
                    {temMaisCursos && (
                        <div className="mt-16 text-center">
                            <Button
                                size="lg"
                                className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-12 py-6 text-lg font-semibold rounded-full group"
                                onClick={handleLoadMore}
                            >
                                Carregar mais Cursos
                                <ArrowDown className="ml-3 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
                            </Button>
                        </div>
                    )}

                    <div className="mt-16 text-center">
                        <Link 
                            href="/cursos" 
                            className="inline-flex items-center px-6 py-3 bg-[#0B093F] text-white font-bold rounded-full shadow-lg hover:bg-orange-700 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <ArrowLeft className="h-5 w-5 mr-3" />
                            Voltar para a página de Cursos
                        </Link>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}