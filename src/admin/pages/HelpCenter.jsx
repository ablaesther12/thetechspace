import { HelpCircle } from "lucide-react";
import ComingSoon from "../components/ComingSoon";

const features = [
    "Interactive documentation & guides",
    "Video tutorial library",
    "Keyboard shortcuts reference",
    "Submit & track support tickets",
    "Frequently asked questions",
    "Changelog & release notes",
];

export default function HelpCenter() {
    return (
        <ComingSoon
            icon={HelpCircle}
            title="Help Center"
            description="Access documentation, video tutorials, and support resources to get the most out of your admin dashboard."
            features={features}
            accentFrom="from-pink-500"
            accentTo="to-rose-500"
        />
    );
}
