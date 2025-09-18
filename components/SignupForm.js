"use client";
import { useState } from "react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import Image from "next/image";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.message.includes("already subscribed")) {
          setStatus("exists");
          setMessage("✅ You are already subscribed with this email.");
        } else {
          setStatus("success");
          setMessage(
            "🎉 Thanks for subscribing! Avail your 15% discount by entering the same email at checkout when we launch."
          );
          setEmail("");
        }
      } else {
        setStatus("error");
        setMessage(data.message || "❌ Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("❌ Network error. Please try again.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* ✅ Signup Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="px-4 py-3 border text-gray-700 border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 w-full sm:w-72"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-gray-800 text-white font-semibold px-6 py-3 shadow-lg hover:bg-gray-900 transition transform hover:scale-105"
        >
          {status === "loading" ? "Submitting..." : "Sign Up Now"}
        </button>
      </form>

      {/* ✅ Messages */}
      {message && (
        <p
          className={`mt-4 text-sm max-w-md text-center ${
            status === "success"
              ? "text-green-700"
              : status === "exists"
              ? "text-blue-700"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      {/* ✅ Social Icons */}
      <div className="flex gap-6 mt-8">
        <a
          href="https://www.instagram.com/elvyn_official"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-pink-600 transition text-2xl"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.facebook.com/share/1CK6tFGjwJ/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-600 transition text-2xl"
        >
          <FaFacebook />
        </a>
      </div>

      {/* ✅ Logo at bottom */}
      <div className="mt-5">
        <Image
          src="/logo.png"
          alt="Elvyn Logo"
          width={150}
          height={40}
          className="mx-auto opacity-90 hover:opacity-100 transition"
        />
      </div>
    </div>
  );
}
