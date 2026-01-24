import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sustainability Impact: Our Collective Effort | KOPAS Official",
    description: "Track our progress in diverting coffee waste from landfills and the collective impact we've made on the environment through circular innovation.",
};

export default function ImpactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
