"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/lib/firestore";
import { useLanguage } from "@/components/LanguageProvider";

interface OrderWithId {
    id: string;
    items: any[];
    totalPrice: number;
    status: string;
    createdAt?: any;
}

const ORDER_STATUSES = [
    "pending",
    "processing",
    "shipped",
    "completed",
    "cancelled"
];

export default function AdminOrders() {
    const { t } = useLanguage();
    const [orders, setOrders] = useState<OrderWithId[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const data = await getOrders();
                setOrders(data as OrderWithId[]);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            const { updateOrderStatus } = await import("@/lib/firestore");
            await updateOrderStatus(orderId, newStatus);
            // Optmistic UI Update
            setOrders(orders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            console.error("Failed to update status:", error);
            alert("Gagal mengupdate status pesanan.");
        }
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp) return "N/A";
        return new Date(timestamp.seconds * 1000).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="max-w-6xl">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-12 uppercase tracking-tighter">{t("admin.orders_title")}</h1>

            <div className="bg-white border text-black border-black border-b-4">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-6 border-b border-black/10 bg-black/5">
                    <div className="col-span-3 text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">{t("admin.table.order_date")}</div>
                    <div className="col-span-3 text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">{t("admin.table.order_id")}</div>
                    <div className="col-span-2 text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">{t("admin.table.items")}</div>
                    <div className="col-span-2 text-right text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">Subtotal</div>
                    <div className="col-span-2 text-right text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">{t("admin.table.total")}</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-black/10">
                    {loading ? (
                        <div className="p-12 text-center text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">
                            {t("admin.table.loading")}
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="p-12 text-center text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">
                            {t("admin.table.no_ord")}
                        </div>
                    ) : (
                        orders.map((order) => (
                            <div key={order.id} className="grid grid-cols-12 gap-4 p-6 hover:bg-black/5 transition-colors items-start">
                                <div className="col-span-3 text-xs uppercase tracking-widest text-black/60 pt-1">
                                    {formatDate(order.createdAt)}
                                </div>
                                <div className="col-span-3">
                                    <p className="font-mono text-xs mb-2 truncate" title={order.id}>{order.id}</p>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 outline-none appearance-none cursor-pointer border ${order.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' :
                                                order.status === 'cancelled' ? 'bg-red-100 text-red-800 border-red-200' :
                                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                                        'bg-black text-white border-black'
                                            }`}
                                    >
                                        {ORDER_STATUSES.map(status => (
                                            <option key={status} value={status} className="bg-white text-black">
                                                {t(`admin.status.${status}`)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-4 space-y-2">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="grid grid-cols-2 gap-4 text-xs">
                                            <span className="truncate pr-2">{item.quantity}x {item.name}</span>
                                            <span className="text-black/60 text-right">{formatCurrency(item.price * item.quantity)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="col-span-2 text-right">
                                    <p className="font-bold text-sm tracking-widest">{formatCurrency(order.totalPrice)}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
