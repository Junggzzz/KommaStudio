import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Eco-Friendly Hospitality Solutions | KOPAS Official B2B",
    description: "Custom amenities and circular waste management for hotels, villas, and cafes. Partner with KOPAS to transform coffee waste into sustainable value.",
};

export default function B2BLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
