"use client";

import { useEffect, useState } from "react";
import { getInquiries, InquiryData } from "@/lib/firestore";
import { useLanguage } from "@/components/LanguageProvider";

interface InquiryWithId extends InquiryData {
    id: string;
    createdAt?: any;
}

export default function AdminInquiries() {
    const { t } = useLanguage();
    const [inquiries, setInquiries] = useState<InquiryWithId[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchInquiries() {
            try {
                const data = await getInquiries();
                setInquiries(data as InquiryWithId[]);
            } catch (error) {
                console.error("Failed to fetch inquiries:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchInquiries();
    }, []);

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

    return (
        <div className="max-w-6xl">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-12 uppercase tracking-tighter">{t("admin.inquiries_title")}</h1>
            
            <div className="bg-white border text-black border-black border-b-4">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-6 border-b border-black/10 bg-black/5">
                    <div className="col-span-3 text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">{t("admin.table.date")}</div>
                    <div className="col-span-3 text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">{t("admin.table.company")}</div>
                    <div className="col-span-6 text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">{t("admin.table.msg")}</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-black/10">
                    {loading ? (
                        <div className="p-12 text-center text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">
                            {t("admin.table.loading")}
                        </div>
                    ) : inquiries.length === 0 ? (
                        <div className="p-12 text-center text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">
                            {t("admin.table.no_inq")}
                        </div>
                    ) : (
                        inquiries.map((inq) => (
                            <div key={inq.id} className="grid grid-cols-12 gap-4 p-6 hover:bg-black/5 transition-colors items-start">
                                <div className="col-span-3 text-xs uppercase tracking-widest text-black/60 pt-1">
                                    {formatDate(inq.createdAt)}
                                </div>
                                <div className="col-span-3">
                                    <p className="font-bold text-sm uppercase tracking-wider mb-1">{inq.company}</p>
                                    <p className="text-xs text-black/60">{inq.name}</p>
                                    <p className="text-[10px] text-black/40 mt-1">{inq.email}</p>
                                </div>
                                <div className="col-span-6">
                                    <p className="text-xs leading-relaxed text-black/80">{inq.message}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
