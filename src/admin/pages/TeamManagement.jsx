import { Users } from "lucide-react";
import ComingSoon from "../components/ComingSoon";

const features = [
    "Team member profile management",
    "Photo & bio editor with live preview",
    "Role & department assignment",
    "Social media link integration",
    "Drag-to-reorder team display",
    "Active / inactive member toggle",
];

export default function TeamManagement() {
    return (
        <ComingSoon
            icon={Users}
            title="Team Members"
            description="Manage your team profiles, assign roles, and control how your team is presented on the public website."
            features={features}
            accentFrom="from-blue-500"
            accentTo="to-cyan-500"
        />
    );
}
