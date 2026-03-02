import { Settings as SettingsIcon } from "lucide-react";
import ComingSoon from "../components/ComingSoon";

const features = [
    "Site branding — logo & favicon upload",
    "Social media links configuration",
    "Default SEO title & meta descriptions",
    "Email notification preferences",
    "Password & account security",
    "Appearance & theme customization",
];

export default function Settings() {
    return (
        <ComingSoon
            icon={SettingsIcon}
            title="Settings"
            description="Configure your site's branding, SEO defaults, notification preferences, and account security — all in one place."
            features={features}
            accentFrom="from-slate-600"
            accentTo="to-slate-800"
        />
    );
}
