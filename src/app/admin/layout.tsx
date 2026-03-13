"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, MessageSquareText, ShoppingBag, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useLanguage } from "@/components/LanguageProvider";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { t } = useLanguage();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            
            if (!currentUser && pathname !== "/admin/login") {
                router.push("/admin/login");
            } else if (currentUser && pathname === "/admin/login") {
                router.push("/admin");
            }
        });

        return () => unsubscribe();
    }, [pathname, router]);

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/admin/login");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-black/40">{t("admin.loading")}</p>
            </div>
        );
    }

    if (pathname === "/admin/login") {
        return <main className="min-h-screen bg-white pt-24">{children}</main>;
    }

    const links = [
        { href: "/admin", label: t("admin.dashboard"), icon: LayoutDashboard },
        { href: "/admin/inquiries", label: t("admin.inquiries"), icon: MessageSquareText },
        { href: "/admin/orders", label: t("admin.orders"), icon: ShoppingBag },
    ];

    return (
        <div className="min-h-screen bg-white text-black flex flex-col md:flex-row pt-24 md:pt-32">
            {/* Sidebar */}
            <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-black/10 flex-shrink-0 flex flex-col">
                <div className="p-8">
                    <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-black/40 mb-8">{t("admin.panel")}</p>
                    <nav className="space-y-2">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-4 px-4 py-3 text-xs uppercase tracking-widest font-bold transition-colors ${
                                        isActive ? "bg-black text-white" : "text-black/60 hover:text-black hover:bg-black/5"
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                
                <div className="p-8 border-t border-black/10 mt-auto">
                     <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-4 px-4 py-3 text-xs uppercase tracking-widest font-bold text-red-500 hover:bg-black/5 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        {t("admin.logout")}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 md:p-16 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
