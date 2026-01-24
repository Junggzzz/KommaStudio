"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export default function StoryPage() {
    const { t } = useLanguage();
    return (
        <div className="pt-20">
            {/* Header */}
            <section className="bg-black py-24 md:py-32 text-white border-b border-white/10">
                <div className="container px-6 md:px-12">
                    <div className="max-w-4xl">
                        <span className="text-white/40 font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs mb-8 block">/ {t("story.subtitle")}</span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-12 uppercase tracking-tighter">{t("story.title")}</h1>
                        <p className="text-lg md:text-xl text-white/50 max-w-2xl uppercase tracking-widest leading-relaxed">
                            {t("story.desc")}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-24 md:py-32 bg-white">
                <div className="container px-6 md:px-12">
                    <div className="max-w-4xl mx-auto space-y-24">
                        <div className="space-y-12">
                            <h2 className="text-4xl md:text-6xl font-heading font-bold text-black uppercase tracking-tighter">{t("story.darkside.title")}</h2>
                            <p className="text-black/50 text-xl leading-relaxed uppercase tracking-wider">
                                {t("story.darkside.desc")}
                            </p>
                        </div>

                        <div className="relative overflow-hidden">
                            <img
                                src="/images/profile/workshop.png"
                                alt="The Circular Coffee Collective Workshop"
                                className="w-full grayscale brightness-95"
                            />
                            <div className="absolute inset-0 border border-black/10 pointer-events-none" />
                        </div>

                        <div className="space-y-12">
                            <h2 className="text-4xl md:text-6xl font-heading font-bold text-black uppercase tracking-tighter text-right">{t("story.kopasway.title")}</h2>
                            <p className="text-black/50 text-xl leading-relaxed uppercase tracking-wider text-right ml-auto max-w-2xl">
                                {t("story.kopasway.desc")}
                            </p>

                            <div className="bg-black text-white p-12 md:p-20 space-y-12 border border-black">
                                <ul className="space-y-12">
                                    <li className="flex gap-12 border-b border-white/10 pb-12">
                                        <span className="text-5xl font-bold font-heading text-white/20">01</span>
                                        <div>
                                            <h4 className="font-bold text-white uppercase tracking-[0.4em] text-sm mb-4">{t("story.step1.title")}</h4>
                                            <p className="text-white/40 text-xs uppercase tracking-widest leading-loose">{t("story.step1.desc")}</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-12 border-b border-white/10 pb-12">
                                        <span className="text-5xl font-bold font-heading text-white/20">02</span>
                                        <div>
                                            <h4 className="font-bold text-white uppercase tracking-[0.4em] text-sm mb-4">{t("story.step2.title")}</h4>
                                            <p className="text-white/40 text-xs uppercase tracking-widest leading-loose">{t("story.step2.desc")}</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-12">
                                        <span className="text-5xl font-bold font-heading text-white/20">03</span>
                                        <div>
                                            <h4 className="font-bold text-white uppercase tracking-[0.4em] text-sm mb-4">{t("story.step3.title")}</h4>
                                            <p className="text-white/40 text-xs uppercase tracking-widest leading-loose">{t("story.step3.desc")}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
