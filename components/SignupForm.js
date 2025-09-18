"use client";
import { useState } from "react";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
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

      {/* ✅ Success Message */}
      {status === "success" && (
        <p className="mt-4 text-green-700 text-sm max-w-md text-center">
          🎉 Thanks for subscribing! <br />
          Avail your <span className="font-semibold">15% discount</span> by
          entering the <span className="font-semibold">same email</span> at
          checkout when we launch.
        </p>
      )}

      {/* ❌ Error Message */}
      {status === "error" && (
        <p className="mt-4 text-red-600 text-sm text-center">
          ❌ Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
