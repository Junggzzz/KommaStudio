"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/components/LanguageProvider";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const featuredProducts = [
    {
      id: "candle",
      name: t("product.candle.name"),
      price: 125000,
      description: t("product.candle.desc"),
      imageUrl: "/images/products/candle.png",
      isPremium: true,
    },
    {
      id: "coasters",
      name: t("product.coasters.name"),
      price: 185000,
      description: t("product.coasters.desc"),
      imageUrl: "/images/products/coasters.png",
      isPremium: true,
    },
    {
      id: "bodywash",
      name: t("product.bodywash.name"),
      price: 95000,
      description: t("product.bodywash.desc"),
      imageUrl: "/images/products/bodywash.png",
    },
    {
      id: "aromacubes",
      name: t("product.aromacubes.name"),
      price: 110000,
      description: t("product.aromacubes.desc"),
      imageUrl: "/images/products/aromacubes.png",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://kopasofficial.com/#organization",
        "name": "KOPAS Official",
        "url": "https://kopasofficial.com",
        "logo": "https://kopasofficial.com/logo.png",
        "description": "KOPAS mengubah limbah ampas kopi menjadi produk fungsional dan solusi eco-hospitality.",
        "sameAs": [
          "https://www.instagram.com/kopas.official"
        ]
      },
      ...featuredProducts.map(product => ({
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.imageUrl,
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "IDR",
          "availability": "https://schema.org/InStock"
        }
      }))
    ]
  };

  return (
    <div ref={containerRef} className="relative bg-white selection:bg-black selection:text-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-20 bg-white">
        {/* Hero Section - Bold Split Layout */}
        <section className="relative min-h-[90vh] flex flex-col md:flex-row border-b border-black">
          {/* Left: Content */}
          <div className="flex-1 flex flex-col justify-center px-6 md:px-20 py-20 border-b md:border-b-0 md:border-r border-black z-20 bg-white">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-12"
            >
              <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-black/40 block">
                {t("hero.est")}
              </span>

              <h1 className="text-7xl md:text-[9rem] font-heading font-bold leading-[0.85] tracking-tighter text-black uppercase">
                {t("hero.bespoke")} <br />
                <span className="text-black/20">{t("hero.circular")}</span>
              </h1>

              <p className="text-black/50 text-base md:text-lg font-light leading-relaxed max-w-md uppercase tracking-[0.3em] text-[10px] md:text-[12px]">
                {t("mission.desc")}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <Link href="/shop" className="btn bg-black text-white hover:invert border border-black text-center">
                  {t("hero.collection")}
                </Link>
                <Link href="/b2b" className="btn border border-black text-black hover:bg-black hover:text-white text-center">
                  {t("hero.custom")}
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right: Immersive Image */}
          <div className="flex-1 relative overflow-hidden bg-black h-[50vh] md:h-auto">
            <motion.img
              style={{
                y: useTransform(scrollYProgress, [0, 0.3], [0, 150]),
                scale: useTransform(scrollYProgress, [0, 0.3], [1.1, 1.3])
              }}
              src="/images/profile/hero.png"
              className="w-full h-full object-cover grayscale opacity-80"
              alt="Hero Background"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />

            {/* Subtle Grid Overlay for "Tegas" look */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none opacity-10">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-white/30" />
              ))}
            </div>
          </div>

          {/* Floating Scroll Indicator - Sharp */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
            className="absolute bottom-12 right-12 z-30 hidden md:block"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-[2px] h-20 bg-black"
            />
          </motion.div>
        </section>

        {/* Mission Section - Sharp Luxury */}
        <section className="py-32 md:py-48 px-4 bg-white border-b border-black">
          <div className="container max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-center space-y-16"
            >
              <h2 className="text-5xl md:text-7xl font-heading leading-[0.9] text-black uppercase tracking-tighter">
                {t("mission.title")} <br />
                <span className="italic font-light text-black/30 lowercase">{t("mission.subtitle")}</span>
              </h2>

              <div className="w-24 h-[1px] bg-black/20 mx-auto" />

              <Link href="/story" className="text-[10px] uppercase font-bold tracking-[0.6em] text-black hover:opacity-50 transition-opacity">
                {t("mission.discover")}
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Product Spotlight - High Interactivity */}
        <section className="py-32 md:py-48 bg-black text-white">
          <div className="container px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 border-b border-white/10 pb-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <span className="text-[20px] uppercase tracking-[0.5em] text-white/30 block">01 / Collection</span>
                <h2 className="text-5xl md:text-7xl font-heading font-bold uppercase tracking-tighter ">
                  {t("product.selected")}
                </h2>
              </motion.div>

              <Link href="/shop" className="text-[10px] text-white uppercase tracking-[0.5em] font-bold border-b border-white pb-2 hover:text-white/50 hover:border-white/50 transition-all">
                {t("product.showall")}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-1px ">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 1 }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
