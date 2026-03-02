import { FileText } from "lucide-react";
import ComingSoon from "../components/ComingSoon";

const features = [
    "Rich text editor with WYSIWYG formatting",
    "Featured image upload & management",
    "Category & tag organization",
    "Draft → Review → Publish workflow",
    "SEO metadata editor & preview",
    "Bulk actions & search filtering",
];

export default function Posts() {
    return (
        <ComingSoon
            icon={FileText}
            title="Blog Posts Management"
            description="Create, edit, and manage your blog posts with a powerful rich text editor. Organize content with categories, tags, and a full publishing workflow."
            features={features}
        />
    );
}
