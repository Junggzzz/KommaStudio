"use client";

import { useLanguage } from "./LanguageProvider";

export default function Footer() {
    const { t } = useLanguage();
    return (
        <footer className="bg-black text-white py-24 border-t border-white/10">
            <div className="container px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-heading font-bold uppercase tracking-tighter">KOPAS</h2>
                        <p className="text-white/40 text-xs uppercase tracking-widest leading-loose max-w-xs">
                            {t("footer.tagline")}
                        </p>
                    </div>

                    <div className="space-y-8">
                        <h3 className="text-[10px] uppercase font-bold tracking-[0.5em] text-white/40 border-b border-white/10 pb-4">{t("footer.quicklinks")}</h3>
                        <ul className="space-y-4">
                            <li><a href="/" className="text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors">{t("nav.home")}</a></li>
                            <li><a href="/story" className="text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors">{t("nav.story")}</a></li>
                            <li><a href="/shop" className="text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors">{t("nav.shop")}</a></li>
                            <li><a href="/b2b" className="text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors">{t("nav.b2b")}</a></li>
                        </ul>
                    </div>

                    <div className="space-y-8">
                        <h3 className="text-[10px] uppercase font-bold tracking-[0.5em] text-white/40 border-b border-white/10 pb-4">{t("footer.contact")}</h3>
                        <ul className="space-y-4">
                            <li className="text-xs uppercase tracking-widest text-white/70">Email: hello@kopas.id</li>
                            <li className="text-xs uppercase tracking-widest text-white/70">WhatsApp: +62 812 3456 7890</li>
                            <li className="text-xs uppercase tracking-widest text-white/70">{t("footer.location")}: Bali, Indonesia</li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 text-center text-white/20 text-[9px] uppercase tracking-[0.4em]">
                    <p>&copy; {new Date().getFullYear()} KOPAS Official. {t("footer.rights")}</p>
                </div>
            </div>
        </footer>
    );
}
