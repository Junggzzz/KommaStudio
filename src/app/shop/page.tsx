"use client";

import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/components/LanguageProvider";

export default function ShopPage() {
    const { t } = useLanguage();
    const products = [
        {
            id: "candle",
            name: t("product.candle.name"),
            price: 125000,
            description: t("product.candle.desc"),
            imageUrl: "/images/products/candle.png",
        },
        {
            id: "coasters",
            name: t("product.coasters.name"),
            price: 185000,
            description: t("product.coasters.desc"),
            imageUrl: "/images/products/coasters.png",
        },
        {
            id: "bodylotion",
            name: t("product.lotion.name"),
            price: 145000,
            description: t("product.lotion.desc"),
            imageUrl: "/images/products/bodylotion.png",
        },
        {
            id: "coffeesoap",
            name: t("product.soap.name"),
            price: 65000,
            description: t("product.soap.desc"),
            imageUrl: "/images/products/coffeesoap.png",
        },
        {
            id: "shampoo",
            name: t("product.shampoo.name"),
            price: 95000,
            description: t("product.shampoo.desc"),
            imageUrl: "/images/products/shampoo.png",
        },
        {
            id: "conditioner",
            name: t("product.conditioner.name"),
            price: 95000,
            description: t("product.conditioner.desc"),
            imageUrl: "/images/products/conditioner.png",
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

    return (
        <div className="pt-24 min-h-screen bg-background">
            {/* Header */}
            <section className="bg-black py-24 md:py-32 text-white border-b border-white/10">
                <div className="container px-6 md:px-12">
                    <div className="max-w-4xl">
                        <span className="text-white/40 font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs mb-8 block">/ {t("shop.subtitle")}</span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-12 uppercase tracking-tighter">{t("shop.title")}</h1>
                        <p className="text-lg md:text-xl text-white/50 max-w-2xl uppercase tracking-widest leading-relaxed">
                            {t("shop.desc")}
                        </p>
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <section className="py-24 md:py-32 bg-white">
                <div className="container px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px border border-black/5">
                        {products.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
}
