"use client";

import { useEffect, useState } from "react";
import { getInquiries, getOrders } from "@/lib/firestore";
import { MessageSquareText, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function AdminDashboard() {
    const { t } = useLanguage();
    const [inquiriesCount, setInquiriesCount] = useState(0);
    const [ordersCount, setOrdersCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [inquiries, orders] = await Promise.all([
                    getInquiries(),
                    getOrders()
                ]);
                setInquiriesCount(inquiries.length);
                setOrdersCount(orders.length);
            } catch (error) {
                console.error("Failed to fetch admin dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="max-w-5xl">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-12 uppercase tracking-tighter">{t("admin.overview")}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 border border-black/10">
                {/* Inquiries Stat */}
                <div className="bg-white p-8 md:p-12 space-y-6">
                    <MessageSquareText className="w-8 h-8 text-black/40" />
                    <div>
                        <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-black/40 mb-2">{t("admin.total_inquiries")}</p>
                        <p className="text-5xl md:text-7xl font-heading font-bold tracking-tighter">
                            {loading ? "-" : inquiriesCount}
                        </p>
                    </div>
                </div>

                {/* Orders Stat */}
                <div className="bg-white p-8 md:p-12 space-y-6">
                    <ShoppingBag className="w-8 h-8 text-black/40" />
                    <div>
                        <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-black/40 mb-2">{t("admin.total_orders")}</p>
                        <p className="text-5xl md:text-7xl font-heading font-bold tracking-tighter">
                            {loading ? "-" : ordersCount}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
