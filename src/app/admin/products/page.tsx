"use client";

import { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct, ProductData } from "@/lib/firestore";
import { useLanguage } from "@/components/LanguageProvider";

interface ProductWithId extends ProductData {
    id: string;
}

export default function AdminProducts() {
    const { t } = useLanguage();
    const [products, setProducts] = useState<ProductWithId[]>([]);
    const [loading, setLoading] = useState(true);
    
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Partial<ProductWithId>>({});

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        setLoading(true);
        try {
            const data = await getProducts();
            setProducts(data as ProductWithId[]);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (currentProduct.id) {
                // Update
                const { id, ...data } = currentProduct;
                await updateProduct(id, data as Partial<ProductData>);
            } else {
                // Add
                await addProduct(currentProduct as ProductData);
            }
            setIsEditing(false);
            setCurrentProduct({});
            await fetchProducts();
        } catch (err) {
            console.error("Failed to save product", err);
            setLoading(false);
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        setLoading(true);
        try {
            await deleteProduct(id);
            await fetchProducts();
        } catch (err) {
            console.error("Failed to delete product", err);
            setLoading(false);
        }
    }

    // A helper to push default products in case the DB is empty
    const handleInitializeProducts = async () => {
        setLoading(true);
        try {
            const defaultProducts: ProductData[] = [
                {
                    nameEn: "Aromatherapy Candle", nameId: "Lilin Aromaterapi",
                    descriptionEn: "Soy wax infused with coffee extract. Hand-poured in small batches.", descriptionId: "Lilin kedelai dengan ekstrak kopi. Dibuat manual dalam batch kecil.",
                    price: 125000, imageUrl: "/images/products/candle.png"
                },
                {
                    nameEn: "Circular Coaster Set", nameId: "Set Tatakan Gelas Sirkular",
                    descriptionEn: "Bespoke coasters made from 100% upcycled coffee waste. Water-resistant and heat-durable.", descriptionId: "Tatakan gelas khusus terbuat dari 100% limbah kopi daur ulang. Tahan air dan tahan panas.",
                    price: 185000, imageUrl: "/images/products/coasters.png"
                },
                {
                    nameEn: "Body Lotion - Nourishing", nameId: "Body Lotion - Menutrisi",
                    descriptionEn: "Infused with coffee antioxidants to rejuvenate and protect your skin with a luxury scent.", descriptionId: "Diperkaya dengan antioksidan kopi untuk meremajakan dan melindungi kulit dengan aroma mewah.",
                    price: 145000, imageUrl: "/images/products/bodylotion.png"
                },
                {
                    nameEn: "Coffee Craft Soap", nameId: "Sabun Kopi Artisanal",
                    descriptionEn: "Exfoliating soap bar with repurposed coffee grounds for a smooth, artisanal feel.", descriptionId: "Sabun batang eksfoliasi dengan ampas kopi daur ulang untuk rasa artisanal yang halus.",
                    price: 65000, imageUrl: "/images/products/coffeesoap.png"
                },
                {
                    nameEn: "Shampoo - Coffee Extract", nameId: "Sampo - Ekstrak Kopi",
                    descriptionEn: "Nourishing shampoo made with upcycled coffee antioxidants.", descriptionId: "Sampo penutrisi dengan antioksidan kopi daur ulang.",
                    price: 95000, imageUrl: "/images/products/shampoo.png"
                },
                {
                    nameEn: "Conditioner - Moist", nameId: "Kondisioner - Moist",
                    descriptionEn: "Deep moisturizing treatment for silky, coffee-scented hair.", descriptionId: "Perawatan pelembap mendalam untuk rambut halus beraroma kopi.",
                    price: 95000, imageUrl: "/images/products/conditioner.png"
                },
                {
                    nameEn: "Body Wash - Gentle", nameId: "Sabun Mandi - Formula Lembut",
                    descriptionEn: "A gentle formula that cleanses while maintaining skin hydration.", descriptionId: "Formula lembut yang membersihkan sekaligus menjaga hidrasi kulit.",
                    price: 95000, imageUrl: "/images/products/bodywash.png"
                },
                {
                    nameEn: "Aroma Cubes", nameId: "Aroma Cubes",
                    descriptionEn: "The pure scent of freshly ground beans, captured in cube form.", descriptionId: "Aroma murni biji kopi yang baru digiling, dalam bentuk kubus.",
                    price: 110000, imageUrl: "/images/products/aromacubes.png"
                }
            ];

            for (const prod of defaultProducts) {
                await addProduct(prod);
            }
            await fetchProducts();
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }

    return (
        <div className="max-w-6xl">
            <div className="flex justify-between items-end mb-12">
                <h1 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tighter">{t("admin.products_title")}</h1>
                <button
                    onClick={() => { setCurrentProduct({}); setIsEditing(true); }}
                    className="bg-black text-white px-6 py-3 font-bold text-xs tracking-widest uppercase hover:bg-black/80 transition-colors"
                >
                    {t("admin.btn_add_product")}
                </button>
            </div>
            
            {isEditing && (
                <div className="bg-white border border-black p-8 mb-12">
                    <h2 className="text-xl font-bold uppercase mb-6 border-b border-black/10 pb-4">
                        {currentProduct.id ? t("admin.products.edit") : t("admin.btn_add_product")}
                    </h2>
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Name (EN)</label>
                                <input type="text" required value={currentProduct.nameEn || ""} onChange={e => setCurrentProduct({...currentProduct, nameEn: e.target.value})} className="w-full border border-black/20 p-3 text-sm focus:outline-none focus:border-black" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Name (ID)</label>
                                <input type="text" required value={currentProduct.nameId || ""} onChange={e => setCurrentProduct({...currentProduct, nameId: e.target.value})} className="w-full border border-black/20 p-3 text-sm focus:outline-none focus:border-black" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Description (EN)</label>
                                <textarea required value={currentProduct.descriptionEn || ""} onChange={e => setCurrentProduct({...currentProduct, descriptionEn: e.target.value})} className="w-full border border-black/20 p-3 text-sm focus:outline-none focus:border-black h-24" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Description (ID)</label>
                                <textarea required value={currentProduct.descriptionId || ""} onChange={e => setCurrentProduct({...currentProduct, descriptionId: e.target.value})} className="w-full border border-black/20 p-3 text-sm focus:outline-none focus:border-black h-24" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Price (IDR)</label>
                                <input type="number" required value={currentProduct.price || ""} onChange={e => setCurrentProduct({...currentProduct, price: parseInt(e.target.value) || 0})} className="w-full border border-black/20 p-3 text-sm focus:outline-none focus:border-black" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Image URL</label>
                                <input type="text" required value={currentProduct.imageUrl || ""} onChange={e => setCurrentProduct({...currentProduct, imageUrl: e.target.value})} placeholder="/images/products/xyz.png" className="w-full border border-black/20 p-3 text-sm focus:outline-none focus:border-black" />
                            </div>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button type="submit" disabled={loading} className="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest">{t("admin.products.save")}</button>
                            <button type="button" disabled={loading} onClick={() => setIsEditing(false)} className="border border-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black/5">{t("admin.products.cancel")}</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white border text-black border-black border-b-4">
                <div className="grid grid-cols-12 gap-4 p-6 border-b border-black/10 bg-black/5">
                    <div className="col-span-2 text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">Image</div>
                    <div className="col-span-5 text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">Product</div>
                    <div className="col-span-2 text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">{t("admin.table.price")}</div>
                    <div className="col-span-3 text-[10px] uppercase font-bold tracking-[0.4em] text-black/40 text-right">{t("admin.table.actions")}</div>
                </div>

                <div className="divide-y divide-black/10">
                    {loading && !isEditing ? (
                        <div className="p-12 text-center text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">
                            {t("admin.table.loading")}
                        </div>
                    ) : products.length === 0 ? (
                        <div className="p-12 text-center flex flex-col items-center gap-4">
                            <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">No Products found.</p>
                            <button onClick={handleInitializeProducts} className="border border-black px-4 py-2 text-xs uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-colors">
                                {t("admin.products.init")}
                            </button>
                        </div>
                    ) : (
                        products.map((prod) => (
                            <div key={prod.id} className="grid grid-cols-12 gap-4 p-6 hover:bg-black/5 transition-colors items-center">
                                <div className="col-span-2">
                                    <img src={prod.imageUrl} alt={prod.nameEn} className="w-16 h-16 object-cover border border-black/10 grayscale" />
                                </div>
                                <div className="col-span-5">
                                    <p className="font-bold text-sm uppercase tracking-wider">{prod.nameEn}</p>
                                    <p className="text-xs text-black/60 uppercase tracking-widest mt-1 line-clamp-1">{prod.descriptionEn}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="font-bold text-sm">Rp {prod.price.toLocaleString("id-ID")}</p>
                                </div>
                                <div className="col-span-3 flex justify-end gap-2">
                                    <button onClick={() => { setCurrentProduct(prod); setIsEditing(true); }} className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold border border-black hover:bg-black hover:text-white transition-colors">{t("admin.products.edit")}</button>
                                    <button onClick={() => handleDelete(prod.id)} className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors">{t("admin.products.delete")}</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
