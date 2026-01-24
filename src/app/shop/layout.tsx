import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shop Sustainable Coffee Products | KOPAS Official Catalog",
    description: "Browse our collection of handcrafted products made from upcycled coffee grounds: coasters, eco-briquettes, hospitality amenities, and organic fertilizer.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
