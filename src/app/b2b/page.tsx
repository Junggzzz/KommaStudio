"use client";

import { CheckCircle, ArrowRight, MessageSquare, Briefcase, Hotel, Coffee } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { useState } from "react";
import { saveInquiry } from "@/lib/firestore";

export default function B2BPage() {
    const { t } = useLanguage();

    const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.company || !form.message) {
            setError("Semua field wajib diisi.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            await saveInquiry(form);
            setSuccess(true);
            setForm({ name: "", email: "", company: "", message: "" });
        } catch (err: any) {
            console.error("Firebase saveInquiry Error:", err);
            setError("Gagal mengirim inquiry. Coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-32 bg-white">
            {/* Hero */}
            <section className="relative min-h-[70vh] flex flex-col justify-center items-center text-white overflow-hidden">
                <div
                    className="absolute inset-0 z-[-1] bg-cover bg-center grayscale brightness-50"
                    style={{
                        backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/profile/b2b.png')"
                    }}
                />
                <div className="container px-6 md:px-12">
                    <div className="max-w-5xl">
                        <span className="text-white/40 font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs mb-8 block">/ {t("b2b.subtitle")}</span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-12 uppercase tracking-tighter leading-[0.85]">{t("b2b.title")}</h1>
                        <p className="text-lg md:text-xl text-white/50 max-w-2xl uppercase tracking-[0.3em] leading-relaxed">
                            {t("b2b.desc")}
                        </p>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-24 md:py-32 bg-white border-b border-black/5">
                <div className="container px-6 md:px-12">
                    <div className="text-left mb-24">
                        <h2 className="text-4xl md:text-6xl font-heading font-bold text-black uppercase tracking-tighter mb-8">{t("b2b.partner")}</h2>
                        <div className="w-24 h-[1px] bg-black" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black border border-black">
                        <div className="p-12 md:p-16 bg-white space-y-8">
                            <Coffee className="w-10 h-10 text-black" />
                            <h3 className="text-2xl font-bold uppercase tracking-tighter leading-none">{t("b2b.service1.title")}</h3>
                            <p className="text-black/40 text-[10px] uppercase tracking-widest leading-loose">{t("b2b.service1.desc")}</p>
                        </div>
                        <div className="p-12 md:p-16 bg-white space-y-8">
                            <Hotel className="w-10 h-10 text-black" />
                            <h3 className="text-2xl font-bold uppercase tracking-tighter leading-none">{t("b2b.service2.title")}</h3>
                            <p className="text-black/40 text-[10px] uppercase tracking-widest leading-loose">{t("b2b.service2.desc")}</p>
                        </div>
                        <div className="p-12 md:p-16 bg-white space-y-8">
                            <Briefcase className="w-10 h-10 text-black" />
                            <h3 className="text-2xl font-bold uppercase tracking-tighter leading-none">{t("b2b.service3.title")}</h3>
                            <p className="text-black/40 text-[10px] uppercase tracking-widest leading-loose">{t("b2b.service3.desc")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inquiry Form */}
            <section className="py-24 md:py-48 bg-black text-white">
                <div className="container px-6 md:px-12">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-24">
                        <div className="flex-1 space-y-12">
                            <h2 className="text-4xl md:text-7xl font-heading font-bold uppercase tracking-tighter leading-none">{t("b2b.inquiry")}</h2>
                            <p className="text-white/40 text-xs uppercase tracking-widest leading-loose max-w-sm">{t("b2b.inquiry_desc")}</p>
                        </div>

                        <div className="flex-1">
                            {success ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-start gap-6 py-16"
                                >
                                    <CheckCircle className="w-12 h-12 text-white" />
                                    <h3 className="text-3xl font-bold uppercase tracking-tighter">Inquiry Terkirim!</h3>
                                    <p className="text-white/40 text-xs uppercase tracking-widest leading-loose">
                                        Terima kasih. Tim KOPAS akan menghubungi Anda segera.
                                    </p>
                                    <button
                                        onClick={() => setSuccess(false)}
                                        className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/40 hover:text-white transition-colors flex items-center gap-2"
                                    >
                                        Kirim Inquiry Lain <ArrowRight className="w-3 h-3" />
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-12">
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/40 block">{t("b2b.form.name")}</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-b border-white/20 py-4 focus:border-white transition-colors outline-none text-xl font-light rounded-none"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/40 block">{t("b2b.form.email")}</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-b border-white/20 py-4 focus:border-white transition-colors outline-none text-xl font-light rounded-none"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/40 block">{t("b2b.form.company")}</label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={form.company}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-b border-white/20 py-4 focus:border-white transition-colors outline-none text-xl font-light rounded-none"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/40 block">{t("b2b.form.message")}</label>
                                        <textarea
                                            rows={4}
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-b border-white/20 py-4 focus:border-white transition-colors outline-none text-xl font-light resize-none rounded-none"
                                        />
                                    </div>

                                    {error && (
                                        <p className="text-red-400 text-xs uppercase tracking-widest">{error}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full btn bg-white text-black hover:invert border border-white disabled:opacity-40"
                                    >
                                        {loading ? "Mengirim..." : t("b2b.form.submit")}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
