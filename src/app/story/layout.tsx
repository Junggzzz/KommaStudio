import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Story: Turning Coffee Waste into Value | KOPAS Official",
    description: "Discover how KOPAS is revolutionizing the circular economy in Indonesia by transforming environmental burdens into sustainable opportunities.",
};

export default function StoryLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
