"use client";

import { useCart } from "./CartProvider";
import { X } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { useState } from "react";
import { saveOrder } from "@/lib/firestore";

export default function CartSidebar() {
    const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
    const { t } = useLanguage();
    const [checking, setChecking] = useState(false);

    const checkoutWhatsApp = async () => {
        if (cart.length === 0) return;
        setChecking(true);

        try {
            // Simpan order ke Firestore sebelum redirect ke WhatsApp
            await saveOrder(
                cart.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
                totalPrice
            );
        } catch (err) {
            console.error("Gagal menyimpan order:", err);
            // Tetap lanjutkan ke WhatsApp meski Firestore gagal
        }

        let message = `${t("cart.whatsapp_msg")}\n\n`;
        cart.forEach(item => {
            message += `- ${item.name} x${item.quantity} (IDR ${(item.price * item.quantity).toLocaleString()})\n`;
        });

        message += `\nTotal: IDR ${totalPrice.toLocaleString()}`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/6285847487597?text=${encodedMessage}`, '_blank');
        clearCart();
        setChecking(false);
    };

    return (
        <div
            className={`fixed top-0 right-0 h-screen w-full max-w-[400px] z-200 transition-transform duration-300 ease-in-out ${isCartOpen ? "translate-x-0" : "translate-x-full"
                }`}
        >
            <div className="bg-white h-full p-8 flex flex-col border-l border-black">
                <div className="flex justify-between items-center mb-12">
                    <h3 className="text-3xl font-bold uppercase tracking-tighter">{t("cart.title")}</h3>
                    <button onClick={toggleCart} className="p-2 hover:bg-black/5 transition-colors border border-black/5">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-8 pr-2">
                    {cart.length === 0 ? (
                        <p className="text-black/30 text-center py-20 uppercase tracking-widest text-xs">{t("cart.empty") || "Your cart is empty"}</p>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-center py-4 border-b border-black/5">
                                <div className="flex-1 pr-4">
                                    <h4 className="font-semibold text-sm">{item.name}</h4>
                                    <p className="text-xs text-black/60 mb-2">
                                        IDR {item.price.toLocaleString("id-ID")}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border border-black/20">
                                            <button 
                                                onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeFromCart(item.id)} 
                                                className="w-7 h-7 flex items-center justify-center text-sm hover:bg-black/5 transition-colors"
                                            >
                                                -
                                            </button>
                                            <span className="text-xs w-6 text-center font-medium">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                                                className="w-7 h-7 flex items-center justify-center text-sm hover:bg-black/5 transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 text-xs font-medium hover:underline"
                                        >
                                            {t("cart.remove")}
                                        </button>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-sm">IDR {(item.price * item.quantity).toLocaleString("id-ID")}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="pt-12 border-t border-black/10">
                    <div className="flex justify-between items-center text-2xl font-bold mb-8 uppercase tracking-tighter">
                        <span>Total</span>
                        <span>IDR {totalPrice.toLocaleString("id-ID")}</span>
                    </div>
                    <button
                        onClick={checkoutWhatsApp}
                        disabled={cart.length === 0 || checking}
                        className="w-full btn bg-black text-white hover:invert border border-black disabled:bg-black/20"
                    >
                        {checking ? "Memproses..." : t("cart.checkout")}
                    </button>
                </div>
            </div>

            {/* Overlay to close when clicking outside */}
            {isCartOpen && (
                <div
                    className="fixed inset-0 -z-10 bg-black/20"
                    onClick={toggleCart}
                />
            )}
        </div>
    );
}
