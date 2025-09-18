"use client";
import React from "react";
import { Playfair_Display } from "next/font/google";
import SignupForm from "@/components/SignupForm";
import Image from "next/image";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function Promo() {
  return (
    <main
      className={`${playfair.variable} relative min-h-screen bg-[#f9f9f9] flex flex-col items-center justify-center px-6 py-5 text-center overflow-hidden font-serif`}
    >
      {/* 👜 Bag silhouettes */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-15">
        <Image
          src="/bag.jpg"
          alt="Bags Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* 🔥 Smoke effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="smoke-top-left"></div>
        <div className="smoke-top-right"></div>
        <div className="smoke-bottom-left"></div>
        <div className="smoke-bottom-right"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="font-serif text-base font-semibold text-gray-800 tracking-wide mb-3">
          THE COUNTDOWN BEGINS..
        </h2>

        <p className="font-serif text-xl text-gray-700 mb-8 leading-relaxed">
          Get Ready to Explore Our Website <br /> Going Live Soon!
        </p>

        <h1
          className="font-serif text-4xl md:text-5xl font-normal text-gray-900 mb-8 leading-snug"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Avail 15% Off on your <br />
          first purchase!
        </h1>

        <p className="font-serif text-gray-700 text-base leading-relaxed mb-10">
          We&apos;re all set to launch our Website very soon.. Subscribe us to
          claim <span className="font-semibold">15% Special Discount</span> on
          our upcoming{" "}
          <span className="font-bold">Limited Vogue Bag Collection</span> and
          get notified with our stock updates, exclusive offers and many more.
        </p>

        {/* Signup Form */}
        {/* <form className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3  border text-gray-700 border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 w-full sm:w-72"
          />
          <button
            type="submit"
            className="bg-gray-800 text-white font-semibold px-6 py-3  shadow-lg hover:bg-gray-900 transition transform hover:scale-105"
          >
            Sign Up Now
          </button>
        </form> */}
        <SignupForm />
      </div>

      {/* CSS for Smoke effects */}
      <style jsx>{`
        .smoke-top-left {
          position: absolute;
          top: -50px;
          left: -50px;
          width: 300px;
          height: 300px;
          background: radial-gradient(
            circle,
            rgba(0, 0, 0, 0.05) 0%,
            transparent 70%
          );
          transform: rotate(45deg);
          filter: blur(25px);
        }
        .smoke-top-right {
          position: absolute;
          top: -50px;
          right: -50px;
          width: 300px;
          height: 300px;
          background: radial-gradient(
            circle,
            rgba(0, 0, 0, 0.05) 0%,
            transparent 70%
          );
          transform: rotate(-45deg);
          filter: blur(25px);
        }
        .smoke-bottom-left {
          position: absolute;
          bottom: -50px;
          left: -50px;
          width: 300px;
          height: 300px;
          background: radial-gradient(
            circle,
            rgba(0, 0, 0, 0.05) 0%,
            transparent 70%
          );
          transform: rotate(-45deg);
          filter: blur(25px);
        }
        .smoke-bottom-right {
          position: absolute;
          bottom: -50px;
          right: -50px;
          width: 300px;
          height: 300px;
          background: radial-gradient(
            circle,
            rgba(0, 0, 0, 0.05) 0%,
            transparent 70%
          );
          transform: rotate(45deg);
          filter: blur(25px);
        }
      `}</style>
    </main>
  );
}
