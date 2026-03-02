// ─── Mock Data for Admin Dashboard ────────────────────────────────────────────
// Will be replaced with API calls later

export const mockStats = {
    totalPosts: 124,
    totalPostsChange: 12,
    teamMembers: 8,
    teamMembersChange: 2,
    activeServices: 12,
    activeServicesChange: 0,
    newMessages: 45,
    newMessagesChange: 5,
};

export const mockRecentPosts = [
    {
        id: "1",
        title: "The Future of AI in Business",
        category: "Tech Trends",
        slug: "future-of-ai-business",
        author: "Sarah Jenkins",
        status: "published",
        date: "Oct 24, 2023",
    },
    {
        id: "2",
        title: "Cybersecurity Best Practices",
        category: "Security",
        slug: "cybersecurity-best-practices",
        author: "Mike Ross",
        status: "draft",
        date: "Oct 22, 2023",
    },
    {
        id: "3",
        title: "Mobile App Design Trends",
        category: "Design",
        slug: "mobile-app-design-trends",
        author: "Jessica Pearson",
        status: "review",
        date: "Oct 20, 2023",
    },
    {
        id: "4",
        title: "Social Media Marketing Strategy",
        category: "Marketing",
        slug: "social-media-marketing-strategy",
        author: "Louis Litt",
        status: "published",
        date: "Oct 19, 2023",
    },
];

export const mockLatestMessages = [
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        message: "Inquiry about premium services and pricing plans for our team...",
        time: "2m ago",
        initials: "JD",
        color: "bg-blue-600",
        read: false,
    },
    {
        id: "2",
        name: "Alice Smith",
        email: "alice@company.com",
        message: "Regarding the new website project proposal we discussed...",
        time: "1h ago",
        initials: "AS",
        color: "bg-violet-500",
        read: false,
    },
    {
        id: "3",
        name: "Robert Kyos",
        email: "robert@business.com",
        message: "Payment confirmation for the recent invoice...",
        time: "3h ago",
        initials: "RK",
        color: "bg-emerald-500",
        read: true,
    },
    {
        id: "4",
        name: "Emily Davis",
        email: "emily@startup.com",
        message: "Could you please update our company website with the new branding...",
        time: "5h ago",
        initials: "ED",
        color: "bg-amber-500",
        read: true,
    },
];

export const mockTeamMembers = [
    { id: "1", name: "Daniel Abla", position: "CEO & Founder" },
    { id: "2", name: "Sarah Jenkins", position: "Lead Developer" },
    { id: "3", name: "Mike Ross", position: "Security Analyst" },
    { id: "4", name: "Jessica Pearson", position: "UI/UX Designer" },
    { id: "5", name: "Louis Litt", position: "Marketing Lead" },
    { id: "6", name: "Kofi Mensah", position: "Backend Engineer" },
    { id: "7", name: "Esther Nkrumah", position: "Content Writer" },
    { id: "8", name: "Mon Ami", position: "DevOps Engineer" },
];

export const mockServices = [
    { id: "1", name: "Web Development", description: "Full-stack web solutions" },
    { id: "2", name: "Mobile Apps", description: "iOS & Android development" },
    { id: "3", name: "Cloud Solutions", description: "AWS, GCP, Azure deployments" },
    { id: "4", name: "UI/UX Design", description: "Modern, user-centered designs" },
    { id: "5", name: "Cybersecurity", description: "Security audits & solutions" },
    { id: "6", name: "AI & ML", description: "Machine learning solutions" },
    { id: "7", name: "SEO", description: "Search engine optimization" },
    { id: "8", name: "DevOps", description: "CI/CD & infrastructure" },
    { id: "9", name: "Consulting", description: "Technical consulting services" },
    { id: "10", name: "Training", description: "Developer training & workshops" },
    { id: "11", name: "QA Testing", description: "Automated & manual testing" },
    { id: "12", name: "Blockchain", description: "Blockchain development" },
];

export const mockSubscribers = [
    { id: "1", email: "subscriber1@example.com", subscribedAt: "Jan 15, 2025" },
    { id: "2", email: "subscriber2@company.com", subscribedAt: "Jan 12, 2025" },
    { id: "3", email: "techfan@gmail.com", subscribedAt: "Jan 10, 2025" },
    { id: "4", email: "dev.ops@hotmail.com", subscribedAt: "Jan 9, 2025" },
];
