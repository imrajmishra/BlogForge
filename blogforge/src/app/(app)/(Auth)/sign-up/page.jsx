"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default function page() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your Nhost authentication logic here
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-neutral-950">
      <div className="rounded-none border border-solid border-white/30 bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-6">
        <h2 className="text-xl justify-center text-center font-bold text-neutral-800 dark:text-neutral-200">
          SignUp to BlogForge
        </h2>

        <form className="mt-8 mb-4 space-y-4" onSubmit={handleSubmit}>
          {/* FullName */}
          <LabelInputContainer>
            <label
              htmlFor=""
              className="text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
            >
              Name
            </label>
            <input
              id="type"
              type="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Patric"
              required
              className="flex h-10 w-full rounded-md border border-neutral-200 bg-gray-50 px-3 py-2 text-sm text-neutral-800 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-zinc-800 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus-visible:ring-neutral-600"
            />
          </LabelInputContainer>

          {/* Email */}
          <LabelInputContainer>
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="flex h-10 w-full rounded-md border border-neutral-200 bg-gray-50 px-3 py-2 text-sm text-neutral-800 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-zinc-800 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus-visible:ring-neutral-600"
            />
          </LabelInputContainer>

          {/* Password */}
          <LabelInputContainer>
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="flex h-10 w-full rounded-md border border-neutral-200 bg-gray-50 px-3 py-2 text-sm text-neutral-800 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-zinc-800 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus-visible:ring-neutral-600"
            />
          </LabelInputContainer>

          <button
            className="group relative mt-8 block h-10 w-full rounded-md bg-linear-to-br >
          from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] transition-all hover:opacity-90 dark:bg-zinc-800 dark:from-blue-600 dark:to-blue-800 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Login &rarr;
          </button>
        </form>

        <p className="mt-6 max-w-sm text-sm text-center text-neutral-600 dark:text-neutral-300">
          <br /> If you don&apos;t have an account,{" "}
          <Link href="/sign-in" className="text-orange-500 hover:underline">
            SignIn
          </Link>{" "}
          with BlogForge
        </p>
      </div>
    </div>
  );
};

