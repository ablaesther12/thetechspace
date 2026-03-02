import { Briefcase } from "lucide-react";
import ComingSoon from "../components/ComingSoon";

const features = [
    "Service card builder with icon picker",
    "Rich description & feature list editor",
    "Pricing tiers & package management",
    "Image & icon upload support",
    "Toggle service visibility on/off",
    "Category grouping & ordering",
];

export default function ServicesManagement() {
    return (
        <ComingSoon
            icon={Briefcase}
            title="Services Management"
            description="Build and manage your service offerings. Configure pricing tiers, feature lists, and control which services are displayed on your site."
            features={features}
            accentFrom="from-amber-500"
            accentTo="to-orange-500"
        />
    );
}
