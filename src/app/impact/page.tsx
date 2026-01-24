import ImpactContent from "./ImpactContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sustainability Impact & Transparency | KOPAS Official",
    description: "Track the positive environmental impact of KOPAS. See how many kilograms of coffee waste we've upcycled and the CO2 emissions prevented into the atmosphere.",
};

export default function Page() {
    return <ImpactContent />;
}
