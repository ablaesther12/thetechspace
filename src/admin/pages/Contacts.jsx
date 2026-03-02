import { MessageSquare } from "lucide-react";
import ComingSoon from "../components/ComingSoon";

const features = [
    "Message inbox with read/unread status",
    "Quick reply directly from dashboard",
    "Archive & delete with undo",
    "Search & filter by date or sender",
    "Export contacts as CSV",
    "Email notification rules & templates",
];

export default function Contacts() {
    return (
        <ComingSoon
            icon={MessageSquare}
            title="Contact Messages"
            description="View and manage all contact form submissions. Reply to inquiries, archive resolved messages, and set up notification rules."
            features={features}
            accentFrom="from-emerald-500"
            accentTo="to-teal-500"
        />
    );
}
