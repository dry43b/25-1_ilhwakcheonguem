// app/page.js
"'use client';"

import Image from 'next/image';
import Link from 'next/link';

export const runtime = 'edge'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">

      <main>
        {/* Hero Section */}
        <section className="w-full bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-3xl text-neutral-950 font-bold mb-4">
                Welcome to IlHwakCheonGuem
              </h1>
              <p className="text-center mb-6">
                Trade cryptocurrencies securely and efficiently on our advanced platform.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/mail" className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800">
                  Get Started
                </Link>
                <Link href="/learn" className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Cryptocurrencies Section */}
        <section className="w-full py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl text-neutral-950 font-bold mb-8 text-center">
              Popular Cryptocurrencies
            </h1>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="rounded-xl border bg-white shadow max-w-sm flex-1 min-w-[250px]">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-xl font-bold">Bitcoin (BTC)</h2>
                </div>
                <div className="px-6 py-4">
                  <p className="text-lg font-semibold">$29,850.32</p>
                  <p className="text-green-500">+2.5%</p>
                </div>
              </div>
              
              <div className="rounded-xl border bg-white shadow max-w-sm flex-1 min-w-[250px]">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-xl font-bold">Ethereum (ETH)</h2>
                </div>
                <div className="px-6 py-4">
                  <p className="text-lg font-semibold">$1,875.64</p>
                  <p className="text-red-500">-1.2%</p>
                </div>
              </div>
              
              <div className="rounded-xl border bg-white shadow max-w-sm flex-1 min-w-[250px]">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-xl font-bold">Cardano (ADA)</h2>
                </div>
                <div className="px-6 py-4">
                  <p className="text-lg font-semibold">$0.3125</p>
                  <p className="text-green-500">+0.8%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full bg-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl text-neutral-950 font-bold mb-8 text-center">
              Why Choose IlHwakCheonGuem?
            </h1>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="rounded-xl border bg-white shadow max-w-sm flex-1 min-w-[250px]">
                <div className="px-6 py-4 border-b flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 9 4-4 4 4"></path>
                    <path d="m3 15 4 4 4-4"></path>
                    <path d="M13 6h5a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5"></path>
                    <path d="M13 18V6"></path>
                  </svg>
                  <h2 className="text-xl font-bold">Fast Transactions</h2>
                </div>
                <div className="px-6 py-4">
                  <p>Execute trades quickly and efficiently on our high-performance platform.</p>
                </div>
              </div>
              
              <div className="rounded-xl border bg-white shadow max-w-sm flex-1 min-w-[250px]">
                <div className="px-6 py-4 border-b flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <h2 className="text-xl font-bold">Secure Storage</h2>
                </div>
                <div className="px-6 py-4">
                  <p>Your assets are protected with state-of-the-art security measures.</p>
                </div>
              </div>
              
              <div className="rounded-xl border bg-white shadow max-w-sm flex-1 min-w-[250px]">
                <div className="px-6 py-4 border-b flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"></path>
                  </svg>
                  <h2 className="text-xl font-bold">24/7 Support</h2>
                </div>
                <div className="px-6 py-4">
                  <p>Our dedicated team is always available to assist you with any issues.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex items-center gap-2 bg-neutral-900 border-t px-4 py-6 mt-auto">
        <p className="text-sm text-gray-500">© 2024 IlHwakCheonGuem. All rights reserved.</p>
        <nav className="ml-auto flex gap-4">
          <a href="#" className="text-sm text-gray-500 hover:underline">
            Terms of Service
          </a>
          <a href="#" className="text-sm text-gray-500 hover:underline">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
}