"use client";

import Link from "next/link";
import {
  FaTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaApple,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#1E1E1E] via-slate-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="sm:col-span-2 lg:col-span-1 xl:col-span-2">
              <Link href="/" className="inline-flex items-center mb-6">
                <span className="text-3xl font-bold bg-gradient-to-r from-[#FFA21F] to-[#FFD54F] bg-clip-text text-transparent">
                  Ficlance
                </span>
              </Link>
              <p className="text-slate-300 leading-relaxed mb-8 max-w-md">
                Building experience before your first opportunity.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-slate-300">
                  <FaEnvelope className="w-4 h-4 mr-3 text-[#FFD54F]" />
                  <span className="text-sm">ficlance@gmail.com</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <FaPhone className="w-4 h-4 mr-3 text-[#FFD54F]" />
                  <span className="text-sm">+91 9327668201</span>
                </div>
                {/* <div className="flex items-center text-slate-300">
                  <FaMapMarkerAlt className="w-4 h-4 mr-3 text-[#FFD54F]" />
                  <span className="text-sm">San Francisco, CA</span>
                </div> */}
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  {
                    Icon: FaTwitter,
                    label: "Twitter",
                    link: "https://x.com/HarshSuthar2804",
                  },
                  {
                    Icon: FaLinkedinIn,
                    label: "LinkedIn",
                    link: "https://www.linkedin.com/in/parva-shukla26/",
                  },
                  // { Icon: FaFacebookF, label: "Facebook", link: "#" },
                  // { Icon: FaInstagram, label: "Instagram", link: "#" },
                ].map(({ Icon, label, link }, i) => (
                  <Link
                    key={i}
                    href={link}
                    target="_blank"
                    aria-label={label}
                    className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#673AB7] hover:to-[#FF8C22] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Icon className="text-white w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white relative">
                Platform
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-[#FF8C22] to-[#FFD54F]"></div>
              </h3>
              <ul className="space-y-4">
                {[
                  { label: "Dashboard", link: "/dashboard",},
                  { label: "Portfolio", link: "/portfolio" },
                  { label: "Profile", link: "/profile" },
                ].map(({ label, link }, item) => (
                  <li key={item}>
                    <Link
                      href={link}
                      className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center group text-sm"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {label}
                      </span>
                      <FaArrowRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white relative">
                Resources
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-[#FF8C22] to-[#FFD54F]"></div>
              </h3>
              <ul className="space-y-4">
                {[
                  { label: "Help Desk", link: "/help-desk" },
                  { label: "Plans", link: "/pricing" },
                  { label: "Demo Video", link: "#" },
                ].map(({ label, link }, item) => (
                  <li key={item}>
                    <Link
                      href={link}
                      className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center group text-sm"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {label}
                      </span>
                      <FaArrowRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white relative">
                Stay Updated
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-[#FF8C22] to-[#FFD54F]"></div>
              </h3>
              <p className="text-slate-300 mb-6 text-sm leading-relaxed">
                Get the latest updates, tips, and exclusive content delivered to
                your inbox.
              </p>

              <div className="mb-8 space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-slate-800/50 text-white px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#FF8C22] focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                />
                <button
                  type="button"
                  onClick={() => console.log("Subscribe clicked")}
                  className="w-full bg-gradient-to-r from-[#FF8C22] to-[#673AB7] text-white px-6 py-3 rounded-xl font-medium hover:from-[#ff8a1d] hover:to-[#5d31a8] transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center"
                >
                  Subscribe
                  <FaArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>

              {/* Payment Methods */}
              <div className="border-t border-slate-700 pt-6">
                <p className="text-slate-400 text-xs mb-3 uppercase tracking-wider">
                  Secure Payments
                </p>
                <div className="flex items-center space-x-3">
                  {[FaCcVisa, FaCcMastercard, FaCcPaypal, FaApple].map(
                    (Icon, i) => (
                      <div key={i} className="bg-slate-800 p-2 rounded-lg">
                        <Icon className="text-slate-300 text-lg" />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-center items-center space-y-4 lg:space-y-0">
              <p className="text-slate-400 text-sm">
                © 2025 Ficlance. All rights reserved. Built with ❤ for
                leaders.
              </p>

              {/* <div className="flex flex-wrap justify-center lg:justify-end items-center space-x-6 text-sm">
                {[
                  "Terms of Service",
                  "Privacy Policy",
                  "Cookie Policy",
                  "Accessibility",
                ].map((text) => (
                  <Link
                    key={text}
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors duration-200 relative group"
                  >
                    {text}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF8C22] to-[#FFD54F] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                ))}
              </div> */}
            </div>

            {/* <div className="mt-6 pt-6 border-t border-slate-700/50 text-center">
              <p className="text-slate-500 text-xs">
                This site is protected by reCAPTCHA and the Google Privacy
                Policy and Terms of Service apply.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
