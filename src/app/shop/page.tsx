"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/components/LanguageProvider";
import { getProducts, ProductData } from "@/lib/firestore";

interface ProductWithId extends ProductData {
    id: string;
}

export default function ShopPage() {
    const { t, lang } = useLanguage();
    const [products, setProducts] = useState<ProductWithId[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts();
                setProducts(data as ProductWithId[]);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

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
                        {loading ? (
                            <div className="col-span-full py-24 text-center">
                                <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">Loading Products...</p>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="col-span-full py-24 text-center">
                                <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">No Products Available.</p>
                            </div>
                        ) : (
                            products.map((product) => (
                                <ProductCard 
                                    key={product.id} 
                                    id={product.id}
                                    name={lang === "id" ? product.nameId : product.nameEn}
                                    price={product.price}
                                    description={lang === "id" ? product.descriptionId : product.descriptionEn}
                                    imageUrl={product.imageUrl}
                                />
                            ))
                        )}
                    </div>

                </div>
            </section>
        </div>
    );
}
