"use client";

import { useCart } from "./CartProvider";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

type ProductCardProps = {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    isPremium?: boolean;
};

export default function ProductCard({ id, name, price, description, imageUrl, isPremium }: ProductCardProps) {
    const { addToCart } = useCart();
    const { t } = useLanguage();

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="bg-white rounded-none border border-black/10 hover:border-black transition-all duration-700 group relative"
        >
            <div className="h-96 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-1000">
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    src={imageUrl}
                    alt={`${name} - Monochrome Artifact`}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 z-10">
                    {isPremium && (
                        <span className="bg-black text-white text-[8px] uppercase tracking-[0.3em] px-3 py-1 font-bold rounded-none">
                            {t("product.premium")}
                        </span>
                    )}
                </div>
            </div>
            <div className="bg-white p-12 space-y-8 border-x border-b border-black/5 transition-all group-hover:bg-black group-hover:text-white duration-500">
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold uppercase tracking-tighter leading-none">{name}</h3>
                    <p className="text-black/40 text-xs leading-relaxed uppercase tracking-widest line-clamp-2 group-hover:text-white/40">{description}</p>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-black/5 group-hover:border-white/10">
                    <p className="text-xl font-bold tracking-tighter">IDR {price.toLocaleString("id-ID")}</p>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart({ id, name, price, imageUrl })}
                        className="text-[9px] uppercase font-bold tracking-[0.3em] border border-black px-6 py-2 hover:bg-black hover:text-white transition-all group-hover:border-white group-hover:bg-white group-hover:text-black"
                    >
                        {t("product.add")}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
