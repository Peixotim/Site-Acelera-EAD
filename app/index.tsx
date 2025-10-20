"use client"

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Sobre from "@/app/about/page";
import Courses from "@/components/Courses";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Banner } from "@/components/banner/page";
import Attraction from "@/components/Atraction";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Attraction/>
        <Banner/>
        <Testimonials />
        <Contact />
        
      </main>
      <Footer />
    </div>
  );
};

export default Index;