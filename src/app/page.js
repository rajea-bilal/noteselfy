

import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Footer from '@/components/Footer'


export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
  

 

