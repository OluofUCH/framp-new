"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  FaTwitter,
  FaDiscord,
  FaTelegram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="w-full border-t border-black/10 dark:border-white/10 bg-white dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="block mb-6">
              {mounted && (
                <Image
                  src={theme === "dark" ? "/images/logo-dark.svg" : "/images/logo.svg"}
                  alt="Framp"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              )}
            </Link>
            <p className="text-sm text-black/70 dark:text-white/70 mb-6 max-w-xs">
              Framp bridges digital assets with real-world needs, making crypto
              on/off ramping seamless.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FaTwitter, href: "https://twitter.com" },
                { icon: FaDiscord, href: "https://discord.com" },
                { icon: FaTelegram, href: "https://telegram.org" },
                { icon: FaGithub, href: "https://github.com" },
                { icon: FaLinkedin, href: "https://linkedin.com" },
              ].map(({ icon: Icon, href }, idx) => (
                <Link
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black/70 dark:text-white/70 hover:text-[#7b77b9] dark:hover:text-[#9f9ddb] transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {[
            {
              title: "Products",
              links: [
                ["On/Off Ramp", "/ramp"],
                ["Bill Payments", "/bill-payments"],
                ["Automated Savings", "/savings"],
              ],
            },
            {
              title: "Resources",
              links: [
                ["Documentation", "/documentation"],
                ["Help Center", "/help"],
                ["Blog", "/blog"],
                ["Security", "/security"],
              ],
            },
            {
              title: "Company",
              links: [
                ["About Us", "/about"],
                ["Careers", "/careers"],
                ["Privacy Policy", "/privacy"],
                ["Terms of Service", "/terms"],
              ],
            },
          ].map(({ title, links }) => (
            <div key={title}>
              <h3 className="font-semibold text-lg mb-4 text-black dark:text-white">{title}</h3>
              <ul className="space-y-3">
                {links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-black/70 dark:text-white/70 hover:text-[#7b77b9] dark:hover:text-[#9f9ddb] transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-black/10 dark:border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-black/60 dark:text-white/60">
            &copy; {new Date().getFullYear()} Framp. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0 text-sm text-black/60 dark:text-white/60">
            <span>Built on </span>
            <span className="text-[#7b77b9] dark:text-[#9f9ddb]">Solana</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
