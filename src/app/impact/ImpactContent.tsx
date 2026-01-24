"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export default function ImpactContent() {
    const { t } = useLanguage();
    const stats = [
        { number: "1,240", label: t("impact.stat1"), icon: "☕" },
        { number: "3,120", label: t("impact.stat2"), icon: "☁️" },
        { number: "45+", label: t("impact.stat3"), icon: "🤝" },
    ];

    const chartData = [
        { month: "Jan", height: "40%" },
        { month: "Feb", height: "60%" },
        { month: "Mar", height: "55%" },
        { month: "Apr", height: "80%" },
        { month: "May", height: "95%" },
    ];

    return (
        <div className="pt-24 min-h-screen">
            {/* Header */}
            <section className="bg-black py-24 md:py-32 text-white border-b border-white/10">
                <div className="container px-6 md:px-12">
                    <div className="max-w-4xl">
                        <span className="text-white/40 font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs mb-8 block">/ {t("impact.subtitle")}</span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-12 uppercase tracking-tighter">{t("impact.title")}</h1>
                        <p className="text-lg md:text-xl text-white/50 max-w-2xl uppercase tracking-widest leading-relaxed">
                            {t("impact.desc")}
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Cards */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-12 md:p-16 bg-white border border-black/5 text-center flex flex-col justify-center items-center gap-6"
                            >
                                <div className="text-4xl mb-4 grayscale">{stat.icon}</div>
                                <h2 className="text-4xl md:text-5xl font-heading font-bold text-black mb-2">{stat.number}</h2>
                                <p className="text-muted font-bold tracking-widest uppercase text-xs">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-48 bg-white overflow-hidden border-t border-black/5">
                <div className="container px-6 md:px-12">
                    <div className="max-w-6xl mx-auto space-y-24">
                        <div className="text-left">
                            <h2 className="text-4xl md:text-6xl font-heading font-bold text-black mb-8 uppercase tracking-tighter">{t("impact.growth")}</h2>
                            <p className="text-black/40 text-xs uppercase tracking-widest leading-loose max-w-md">{t("impact.growth_desc")}</p>
                        </div>

                        <div className="flex items-end justify-center gap-4 sm:gap-8 h-64 border-b border-black/10 pb-12">
                            {chartData.map((data, i) => (
                                <div key={i} className="flex flex-col items-center gap-4 flex-1">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        whileInView={{ height: data.height }}
                                        transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                                        className="w-full max-w-[50px] bg-black relative group shadow-lg"
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            {data.height}
                                        </div>
                                    </motion.div>
                                    <span className="text-xs font-bold text-primary/60">{data.month}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 flex justify-center gap-8 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-black rounded-none" />
                                <span className="text-black/40 text-[10px] uppercase tracking-widest">Actually Upcycled</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-primary/10 rounded-full" />
                                <span className="text-muted">Projected Goal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
