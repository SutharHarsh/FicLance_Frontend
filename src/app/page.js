"use client";

import Feature from "@/components/Home/Feature";
import HeroSection2 from "@/components/Home/HeroSection2";
import HowItWorks from "@/components/Home/HowItWorks";
import RoleCards from "@/components/Home/RoleCards";
import { Integrations } from "@/components/Home/Integrations";
import PriceSection from "@/components/Home/PriceSection";
import FreelanceCTA from "@/components/Home/FreelanceCTA";
import Testimonials from "@/components/Home/Testimonials";
import Footer from "@/components/Home/Footer";
import HeroSection3 from "@/components/Home/HeroSection3";
import SignupPopup from "@/components/Auth/SignupPopup";
import PublicRoute from "@/components/PublicRoute";

/**
 * Home/Landing Page
 * 
 * CRITICAL FIX: Wrapped with PublicRoute
 * - If user is authenticated → redirects to /dashboard
 * - If user is unauthenticated → shows landing page
 * 
 * This prevents authenticated users from seeing the landing page
 */
export default function HomePage() {
  return (
    <PublicRoute>
      <div className="bg-white">
        <HeroSection3 />
        {/* <HeroSection2/> */}
        {/* <RoleCards/> */}
        <HowItWorks />
        <Feature />
        {/* <Integrations/> */}
        <PriceSection />
        <FreelanceCTA />
        <Testimonials />
        <Footer />
        
        {/* Timed Signup Popup */}
        <SignupPopup />
      </div>
    </PublicRoute>
  );
}
