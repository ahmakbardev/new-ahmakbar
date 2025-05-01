"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0052FF] text-white py-10 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold mb-4">YourBrand</h2>
          <p className="text-sm text-white/70">
            Empowering developers with tools, docs, and community.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/docs" className="hover:underline">
                Docs
              </Link>
            </li>
            <li>
              <Link href="/community" className="hover:underline">
                Community
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Socials or Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                GitHub
              </a>
            </li>
            <li>
              <a href="mailto:hello@yourbrand.com" className="hover:underline">
                Email Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-white/60">
        © {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </footer>
  );
}
