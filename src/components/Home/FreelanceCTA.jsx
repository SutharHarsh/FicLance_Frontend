"use client";

import { FaRocket, FaPlayCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const FreelanceCTA = () => {
  const router = useRouter();
  return (
    <section className="py-20 mx-12 rounded-2xl bg-[#FFA21F] text-[#7529c6]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Start Your Journey Today
        </h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto text-[#1E1E1E]/80">
          Learn through real projects, grow your confidence, and build a portfolio that speaks for your skills.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <button 
          onClick={() => router.push("/dashboard")}
          className="bg-white text-[#2D3047] px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition whitespace-nowrap flex items-center justify-center gap-2 border">
            Get Started
          </button>
          <button 
          onClick={() => router.push("/help-desk")}
          className="bg-transparent border border-[#1E1E1E] text-[#1E1E1E] px-8 py-3 rounded-full font-medium hover:bg-white/20 transition whitespace-nowrap flex items-center justify-center gap-2">
            Learn More
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2 text-[#7529c6]">500+</div>
            <p className="text-[#1E1E1E]/80">Real-World Projects</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2 text-[#7529c6]">1000+</div>
            <p className="text-[#1E1E1E]/80">Portfolios Built</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2 text-[#7529c6]">92%</div>
            <p className="text-[#1E1E1E]/80">Projects Completed Successfully</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreelanceCTA;
