"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";
import Link from "next/link";
export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);

  function createLink() {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    const data = JSON.stringify({ name, message });
    const encoded = btoa(data);
    const url = `${window.location.origin}/card?d=${encoded}`;
    setLink(url);
    setCopied(false);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/onam-bg.jpg')" }} // add your bg image in public folder
    >
      

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-lg bg-amber-100 border border-amber-300 rounded-2xl p-8"
      >
        {/* Title */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center text-4xl font-bold text-amber-800"
        >
          Onam Greetings Generator
        </motion.h1>
        <p className="text-center text-black mt-3 text-sm ">
          Craft a warm & joyful greeting in just seconds.
        </p>

        {/* Input Fields */}
        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Enter your name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-amber-400 px-4 py-3 text-gray-800 focus:border-amber-400  focus:ring-amber-300 outline-none transition"
          />

          <textarea
            placeholder="Message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-xl border border-amber-400 px-4 py-3 text-gray-800 focus:border-amber-400 focus:ring-amber-300 outline-none transition"
            rows={4}
          />
        </div>

        
        <motion.button
          onClick={createLink}
          className="mt-6 w-full rounded-xl bg-amber-500 text-white font-medium py-3 shadow-md hover:bg-amber-600 transition-colors cursor-pointer"
        >
          Generate Greeting
        </motion.button>
        {link && (
          <Link href={link} target="_blank">        
          <button className="mt-6 w-full rounded-xl bg-amber-500 text-white font-medium py-3 shadow-md hover:bg-amber-600 transition-colors cursor-pointer">
          View Greeting

        </button>
        </Link>)}


        {/* Generated Link Box */}
        {link && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6"
          >
            <p className="text-gray-700 text-sm mb-2">Your greeting link:</p>
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-4">
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-amber-700 text-sm hover:underline mb-2 truncate underline"
              >
                {link}
              </a>
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
              >
                <Copy className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            {copied && (
              <p className="text-green-600 text-xs mt-1">Copied!</p>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
