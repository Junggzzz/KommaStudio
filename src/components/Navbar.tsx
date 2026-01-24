"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";
import { ShoppingCart, Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";

import { motion } from "framer-motion";

export default function Navbar() {
    const pathname = usePathname();
    const { toggleCart, totalItems } = useCart();
    const { lang, setLang, t } = useLanguage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: t("nav.home"), href: "/" },
        { name: t("nav.story"), href: "/story" },
        { name: t("nav.b2b"), href: "/b2b" },
        { name: t("nav.shop"), href: "/shop" },
        { name: t("nav.impact"), href: "/impact" },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 w-full z-[100] py-4 bg-white/95 backdrop-blur-sm border-b border-black"
        >
            <div className="container-fluid px-6 md:px-12">
                <nav className="flex justify-between items-center py-2">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 bg-black flex items-center justify-center border border-black transition-all group-hover:invert">
                            <img src="/logo-k.svg" alt="KOPAS Logo" className="w-5 h-5 invert" />
                        </div>
                        <span className="text-2xl font-heading tracking-tighter text-black font-bold uppercase">
                            KOPAS
                        </span>
                    </Link>

                    <ul className="hidden md:flex gap-12 items-center">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`text-[9px] uppercase tracking-[0.4em] transition-all duration-300 hover:text-black ${pathname === link.href ? "text-black" : "text-black/30"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-6 md:gap-10">
                        {/* Lang Switcher */}
                        <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest border border-black px-3 py-1.5 transition-all" role="group" aria-label="Language Switcher">
                            <button
                                onClick={() => setLang("id")}
                                className={`${lang === "id" ? "text-black" : "text-black/30"} hover:text-black transition-colors`}
                                aria-label="Switch to Indonesian"
                                aria-pressed={lang === "id"}
                            >
                                ID
                            </button>
                            <span className="text-black/20" aria-hidden="true">/</span>
                            <button
                                onClick={() => setLang("en")}
                                className={`${lang === "en" ? "text-black" : "text-black/30"} hover:text-black transition-colors`}
                                aria-label="Switch to English"
                                aria-pressed={lang === "en"}
                            >
                                EN
                            </button>
                        </div>

                        <button
                            onClick={toggleCart}
                            className="relative p-2 text-black hover:opacity-60 transition-opacity"
                            aria-label={`Shopping Cart, ${totalItems} items`}
                        >
                            <ShoppingCart className="w-5 h-5" aria-hidden="true" />
                            {totalItems > 0 && (
                                <span className="absolute top-1 right-0 bg-black text-white text-[7px] font-bold w-4 h-4 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        <Link href="/shop" className="hidden sm:block text-[9px] uppercase tracking-[0.4em] font-bold text-white bg-black px-10 py-3 hover:invert transition-all border border-black">
                            {t("nav.collection")}
                        </Link>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-black"
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{
                    opacity: isMobileMenuOpen ? 1 : 0,
                    x: isMobileMenuOpen ? 0 : "100%"
                }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-0 bg-white z-[90] flex flex-col pt-32 px-8 md:hidden"
            >
                <div className="flex flex-col gap-8">
                    {navLinks.map((link, index) => (
                        <motion.div
                            key={link.href}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : 20 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href={link.href}
                                className={`text-3xl font-heading tracking-tight ${pathname === link.href ? "text-black" : "text-black/40"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-auto mb-20 space-y-8">
                    <Link href="/shop" className="block text-center text-[10px] uppercase tracking-[0.5em] font-bold text-white bg-black py-6 border border-black">
                        {t("nav.collection")}
                    </Link>
                    <div className="flex justify-center gap-10 text-[10px] uppercase tracking-[0.4em] text-black/40">
                        <button onClick={() => setLang("id")} className={lang === "id" ? "text-black" : ""}>ID</button>
                        <button onClick={() => setLang("en")} className={lang === "en" ? "text-black" : ""}>EN</button>
                    </div>
                </div>
            </motion.div>
        </motion.header>
    );
}
