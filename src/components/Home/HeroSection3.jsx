"use client"; // Required if using Next.js App Router and client-side interactivity

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { FaRocket, FaPlayCircle } from "react-icons/fa";
import Link from "next/link";

import LogoLoop from "../LogoLoop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
];

// Alternative with image sources
const imageLogos = [
  {
    src: "/logos/company1.png",
    alt: "Company 1",
    href: "https://company1.com",
  },
  {
    src: "/logos/company2.png",
    alt: "Company 2",
    href: "https://company2.com",
  },
  {
    src: "/logos/company3.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
];

const HeroSection3 = () => {
  const router = useRouter();
  const CIRCULAR_TEXT =
    "We are the future of work • We are the future of work • We are the future of work";

  return (
    <>
      <div className="overflow-x-hidden bg-white h-[1030px] sm:h-[1000px] lg:h-3/4">
        {/* Desktop & Laptop View */}
        <div className="home-section z-0 lg:h-screen h-[1000px] overflow-hidden relative flex flex-col justify-center lg:flex-row lg:justify-end">
          <div className="flex-1">
            {/* FicLance Logo */}
            <div className="flex justify-center md:justify-between items-center mx-4 my-4">
              <Link href="/" className="flex items-center justify-center group">
                <Image
                  src="/Logo2.png"
                  alt="FicLance"
                  width={140}
                  height={48}
                  className="h-12 md:ml-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </Link>
              <div className="lg:flex hidden  gap-8 mr-10">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="text-xl font-semibold text-gray-800 hover:text-[#7529c6] transition-all duration-200 ease-in-out"
                >
                  Start Simulation
                </button>
                <button
                  onClick={() => router.push("/auth/login")}
                  className="rounded-3xl text-lg text-gray-800 border-2 border-black bg-white hover:bg-[#FFA21F] hover:text-black hover:font-semibold transition-all duration-200 ease-linear px-10 py-1"
                >
                  Login
                </button>
              </div>
              {/* <div className="md:hidden">☰</div> */}
            </div>

            {/* Circular Text - Desktop & Laptop */}
            <div className="circular-text" aria-hidden>
              <svg
                viewBox="0 0 350 350"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden lg:block w-full h-full absolute -z-20 -rotate-90 opacity-10 text-sm font-black -mt-[150px] ml-[28vw]"
                role="img"
              >
                <defs>
                  <path
                    id="circlePath"
                    d="M150,150 m-100,0 a100,100 0 1,1 200,0 a100,100 0 1,1 -200,0"
                    fill="none"
                  />
                </defs>

                <text
                  className="text-[12px] font-medium text-sm"
                  style={{ letterSpacing: "0.5px" }}
                >
                  <textPath
                    href="#circlePath"
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    {CIRCULAR_TEXT}
                  </textPath>
                </text>
              </svg>
            </div>

            {/* HeroSection Text */}
            <div className="mt-8 lg:mt-[12vh] lg:ml-16 flex flex-col items-center lg:items-start gap-5">
              <h1 className=" text-center text-black lg:text-left lg:text-[10vh] text-[35px] sm:text-[40px] opacity-80 leading-[98%] tracking-[-0.01em]">
                Your <span className="font-bold text-[#FFA21F]">Journey</span>{" "}
                from <br />
                <span className="bg-gradient-to-b from-amber-500 to-amber-200 bg-clip-text text-transparent font-bold">
                  Learner
                </span>{" "}
                to <span className="font-bold underline">Leader</span> <br />
                starts here.
              </h1>
              <p className="text-[14px] sm:text-[16px] text-center text-gray-800 lg:text-left mx-2 sm:w-[450px] opacity-60">
                Where skills meet proof, AI-powered client simulations that turn
                learners into portfolio-ready professionals.
              </p>

              <div className="flex sm:flex-row flex-col gap-4">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="bg-black cursor-pointer text-white px-8 py-3 rounded-full md:mr-4 w-60 sm:w-48 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <FaRocket className="text-lg" />
                  Get Started
                </button>
                <Link href="/help-desk">
                  <button className="border cursor-pointer border-black text-black px-8 py-3 w-60 sm:w-48 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                    {/* <FaPlayCircle className="text-lg" /> */}
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Desktop/Laptop: Image outside the orange div */}
          <div className="hidden lg:block absolute bg-[#FFA21F] z-0 w-full lg:h-screen rounded-[50px] lg:rounded-tr-[91px] lg:left-8 lg:top-[69%] -rotate-[16deg] ">
            <div className="hidden lg:flex absolute rotate-[17deg] -top-48 xl:-top-44 2xl:-top-64 right-0 lg:pr-10 xl:pr-16 h-[600px]">
              <Image
                className="object-contain lg:w-[28vw] xl:w-[30vw]"
                src="/new_img.png"
                alt="Freelancers Illustration"
                width={800}
                height={600}
                // quality={100}
                // priority
                // unoptimized
              />
            </div>
          </div>

          {/* Tablet/Mobile: Image inside the orange div */}
          <div className="lg:hidden absolute bg-[#FFA21F] top-[80vh] sm:top-[460px] z-0 w-[150%] -left-[20%] h-[350px] rounded-[50px] -rotate-[16deg] flex justify-center items-center">
            <div className="mb-30 rotate-[16deg] mr-5 -mt-16 relative w-[425px] h-[350px]">
              <Image
                className="object-contain"
                src="/new_img.png"
                alt="Freelancers Illustration"
                fill
                quality={100}
                priority
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* <div className="bg-[#FFA21F] h-10"></div> */}
        {/* Basic horizontal loop */}
        <LogoLoop
          className="bg-gradient-to-b from-[#FFA21F] to-white text-black bg-blend-lighten -mt-64 -rotate-[16deg] min-w-[1200px] -ml-10 md:-mt-[287px] md:-rotate-[16deg] lg:rotate-0 lg:mt-0 lg:w-full lg:ml-0 "
          logos={techLogos}
          speed={100}
          direction="left"
          logoHeight={48}
          gap={100}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="gradient-to-b from-[#FFA21F] to-white"
          ariaLabel="Technology partners"
        />
      </div>
    </>
  );
};

export default HeroSection3;
