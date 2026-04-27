"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useState, useEffect } from "react";

export default function FloatingInquiry() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const whatsappNumber = "6285847487597";
    const message = "Halo KOMMA STUDIO, saya tertarik dengan layanan B2B/Bulk Order. Bisa bantu jelaskan lebih lanjut?";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-8 right-8 z-150 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-5 duration-500">
            {/* Tooltip for B2B */}
            {/* Tooltip for B2B */}
            <div className="bg-black text-white px-4 py-2 rounded-none text-[10px] uppercase tracking-widest font-bold shadow-none border border-white/20 relative before:content-[''] before:absolute before:top-full before:right-4 before:border-8 before:border-transparent before:border-t-black">
                Bulk Inquiry? Chat us!
            </div>

            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white p-4 rounded-none border border-white/20 shadow-none hover:bg-white hover:text-black transition-all duration-300 group flex items-center justify-center scale-110"
                aria-label="WhatsApp Inquiry"
            >
                <MessageCircle className="w-8 h-8" />
            </a>
        </div>
    );
}
