"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaUsers,
  FaLightbulb,
  FaRocket,
  FaHeart,
} from "react-icons/fa";
import { RiTeamFill, RiGlobalLine } from "react-icons/ri";
import { BackgroundElements } from "@/components/ui/BackgroundElements";

export default function AboutPage() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      image: "/images/team/sarah.jpg",
      bio: "Former Goldman Sachs exec with 10+ years in fintech innovation."
    },
    {
      name: "David Chen",
      role: "CTO & Co-Founder",
      image: "/images/team/david.jpg",
      bio: "Blockchain architect with experience at Coinbase and ConsenSys."
    },
    {
      name: "Maria Rodriguez",
      role: "Head of Product",
      image: "/images/team/maria.jpg",
      bio: "UX expert who led mobile banking products at Square and Stripe."
    },
    {
      name: "James Wilson",
      role: "Head of Engineering",
      image: "/images/team/james.jpg",
      bio: "Full-stack engineer with deep expertise in DeFi protocols."
    }
  ];

  const values = [
    {
      icon: FaUsers,
      title: "User-First Philosophy",
      description: "Every decision we make starts with how it benefits our users. We prioritize simplicity, security, and accessibility."
    },
    {
      icon: FaLightbulb,
      title: "Innovation Through Simplicity",
      description: "We believe the best innovations are those that make complex things simple, not simple things complex."
    },
    {
      icon: FaHeart,
      title: "Financial Inclusion",
      description: "Building bridges between traditional and decentralized finance to democratize access to financial services."
    },
    {
      icon: RiGlobalLine,
      title: "Global Impact",
      description: "Creating solutions that work across borders, cultures, and economic systems to serve users worldwide."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center bg-white dark:bg-background/90 py-10 relative overflow-hidden">
        <BackgroundElements />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <motion.div
              className="w-full lg:w-1/2 mt-8 lg:mt-0 flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              >
               <p className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-black dark:text-white mb-6">About Us</p>
              </motion.div>
            </motion.div>
            <motion.div
              className="w-full lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-black dark:text-white mb-6">
                Redefining <span className="text-[#7b77b9]">Finance</span>
                <span className="block">for Everyone</span>
              </h1>
              <p className="text-lg sm:text-xl text-black/80 dark:text-white/80 max-w-xl mx-auto lg:mx-0 mb-8">
                We're on a mission to bridge the gap between traditional and decentralized finance, 
                making advanced financial tools accessible to everyone, everywhere.
              </p>
            </motion.div>

           
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-muted/95 dark:bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black dark:text-white">
                Our Story
              </h2>
              <div className="w-20 h-1 bg-[#7b77b9] mx-auto mb-8"></div>
            </div>
            
            <div className="bg-white dark:bg-background rounded-2xl p-8 md:p-12 shadow-sm border border-black/10 dark:border-white/10">
              <p className="text-lg text-black/80 dark:text-white/80 leading-relaxed mb-6">
                Framp was born from a simple observation: despite the rapid advancement of blockchain 
                technology and DeFi protocols, most people still struggle to use their digital assets 
                for everyday needs. The gap between holding crypto and spending it in the real world 
                remained frustratingly wide.
              </p>
              <p className="text-lg text-black/80 dark:text-white/80 leading-relaxed mb-6">
                Our founders, coming from backgrounds in traditional finance and blockchain development, 
                recognized that the future of finance isn't about choosing between TradFi and DeFi—it's 
                about seamlessly integrating both to create something better than either could offer alone.
              </p>
              <p className="text-lg text-black/80 dark:text-white/80 leading-relaxed">
                Today, we're building the infrastructure that makes this vision a reality, starting with 
                simple, powerful tools that help people transition smoothly between digital and traditional 
                financial systems.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
              What Drives Us
            </h2>
            <p className="text-lg text-black/70 dark:text-white/70">
              The principles that guide everything we build
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={item}
                className="bg-muted/50 dark:bg-muted/20 rounded-xl p-8 border border-black/10 dark:border-white/10 hover:shadow-lg transition-all duration-300"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-[#7b77b9]/10 dark:bg-[#7b77b9]/20 flex items-center justify-center mb-6"
                  animate={{
                    scale: hoveredCard === index ? 1.1 : 1,
                    transition: { duration: 0.2 }
                  }}
                >
                  <value.icon className="text-[#7b77b9] h-7 w-7" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">
                  {value.title}
                </h3>
                <p className="text-black/70 dark:text-white/70 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/95 dark:bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
              Meet Our Team
            </h2>
            <p className="text-lg text-black/70 dark:text-white/70">
              The passionate individuals building the future of finance
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={item}
                className="bg-white dark:bg-background rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-black/10 dark:border-white/10"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#7b77b9]/20 to-[#7b77b9]/40 flex items-center justify-center">
                  <FaUsers className="text-[#7b77b9] h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">
                  {member.name}
                </h3>
                <p className="text-[#7b77b9] font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-black/70 dark:text-white/70">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white dark:bg-background relative overflow-hidden">
        <BackgroundElements />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-8 md:p-12 rounded-2xl backdrop-blur-sm relative overflow-hidden bg-white/50 dark:bg-background/50 border border-black/10 dark:border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7b77b9]/10 via-transparent to-[#7b77b9]/10 opacity-30"></div>
              <div className="relative z-10">
                <motion.div
                  className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#7b77b9]/10 dark:bg-[#7b77b9]/20 flex items-center justify-center"
                  animate={{
                    rotate: [0, 360],
                    transition: { duration: 20, repeat: Infinity, ease: "linear" }
                  }}
                >
                  <FaRocket className="text-[#7b77b9] h-8 w-8" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black dark:text-white">
                  Our Mission
                </h2>
                <p className="text-xl text-black/80 dark:text-white/80 leading-relaxed mb-8">
                  To democratize access to advanced financial tools by creating seamless bridges 
                  between traditional and decentralized finance, empowering individuals to take 
                  control of their financial future with confidence and ease.
                </p>
                <Button
                  size="lg"
                  asChild
                  className="bg-[#7b77b9] hover:bg-[#7b77b9]/90 text-white px-8 rounded-full"
                >
                  <Link href="/waitlist">
                    Join Our Journey <FaArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}