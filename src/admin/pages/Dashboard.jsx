import { Link } from "react-router";
import {
    FileText,
    Users,
    Briefcase,
    MessageSquare,
    Plus,
    MoreVertical,
} from "lucide-react";
import StatsCard from "../components/StatsCard";
import { useAuth } from "../contexts/AuthContext";
import {
    mockStats,
    mockRecentPosts,
    mockLatestMessages,
} from "../data/mockData";

// ── Status badge styles ───────────────────────────────────────────────────────
const statusStyles = {
    published: "bg-emerald-100 text-emerald-700",
    draft: "bg-amber-100 text-amber-700",
    review: "bg-blue-100 text-blue-700",
};

// ─── Dashboard Page ───────────────────────────────────────────────────────────
export default function Dashboard() {
    const { user } = useAuth();

    return (
        <div>
            {/* ── Welcome header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Welcome back, {user?.name?.split(" ")[0] || "Daniel"}! 👋
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Here's what's happening with your projects today.
                    </p>
                </div>
                <Link
                    to="/admin/posts/new"
                    className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500/25 hover:scale-[1.03] active:scale-[0.97] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 shadow-sm self-start"
                >
                    <Plus className="w-4 h-4" />
                    Create New Post
                </Link>
            </div>

            {/* ── Stats row ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatsCard
                    icon={FileText}
                    label="Total Posts"
                    value={mockStats.totalPosts}
                    change={mockStats.totalPostsChange}
                    iconBg="bg-blue-50"
                    iconColor="text-blue-600"
                />
                <StatsCard
                    icon={Users}
                    label="Team Members"
                    value={mockStats.teamMembers}
                    change={mockStats.teamMembersChange}
                    iconBg="bg-violet-50"
                    iconColor="text-violet-600"
                />
                <StatsCard
                    icon={Briefcase}
                    label="Active Services"
                    value={mockStats.activeServices}
                    change={mockStats.activeServicesChange}
                    iconBg="bg-amber-50"
                    iconColor="text-amber-600"
                />
                <StatsCard
                    icon={MessageSquare}
                    label="New Messages"
                    value={mockStats.newMessages}
                    change={mockStats.newMessagesChange}
                    iconBg="bg-rose-50"
                    iconColor="text-rose-600"
                />
            </div>

            {/* ── Bottom section: posts table + messages panel ── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Recent Blog Posts */}
                <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                        <h3 className="font-semibold text-slate-900">Recent Blog Posts</h3>
                        <Link
                            to="/admin/posts"
                            className="text-sm text-violet-600 hover:text-violet-500 font-medium"
                        >
                            View All
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="text-left font-medium text-slate-500 px-5 py-3">
                                        Article Name
                                    </th>
                                    <th className="text-left font-medium text-slate-500 px-3 py-3">
                                        Author
                                    </th>
                                    <th className="text-left font-medium text-slate-500 px-3 py-3">
                                        Status
                                    </th>
                                    <th className="text-left font-medium text-slate-500 px-3 py-3">
                                        Date
                                    </th>
                                    <th className="text-left font-medium text-slate-500 px-3 py-3 w-12">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockRecentPosts.map((post) => (
                                    <tr
                                        key={post.id}
                                        className="border-b border-slate-50 last:border-0 hover:bg-violet-50/40 hover:border-l-[3px] hover:border-l-violet-500 transition-all duration-200 cursor-pointer"
                                    >
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center flex-shrink-0">
                                                    <FileText className="w-4 h-4 text-violet-600" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-medium text-slate-900 truncate max-w-[180px]">
                                                        {post.title}
                                                    </p>
                                                    <p className="text-[11px] text-slate-400">
                                                        {post.category}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-3.5 text-slate-600">
                                            {post.author}
                                        </td>
                                        <td className="px-3 py-3.5">
                                            <span
                                                className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${statusStyles[post.status]}`}
                                            >
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="px-3 py-3.5 text-slate-500 whitespace-nowrap">
                                            {post.date}
                                        </td>
                                        <td className="px-3 py-3.5">
                                            <button className="p-1.5 rounded-lg hover:bg-violet-100 hover:text-violet-600 transition-all duration-200">
                                                <MoreVertical className="w-4 h-4 text-slate-400" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Latest Messages */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                        <h3 className="font-semibold text-slate-900">Latest Messages</h3>
                        <button className="text-slate-400 hover:text-slate-600 transition-colors">
                            <MoreVertical className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex-1 p-3 space-y-1">
                        {mockLatestMessages.map((msg) => (
                            <div
                                key={msg.id}
                                className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-violet-50/40 hover:border-l-[3px] hover:border-l-violet-400 transition-all duration-200 cursor-pointer border-l-[3px] border-l-transparent"
                            >
                                <div
                                    className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${msg.color}`}
                                >
                                    {msg.initials}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="font-medium text-sm text-slate-900 truncate">
                                            {msg.name}
                                        </p>
                                        <span className="text-[11px] text-slate-400 flex-shrink-0">
                                            {msg.time}
                                        </span>
                                    </div>
                                    <p className="text-[13px] text-slate-500 truncate mt-0.5">
                                        {msg.message}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="px-5 py-3 border-t border-slate-100">
                        <Link
                            to="/admin/contacts"
                            className="text-sm text-violet-600 hover:text-violet-500 font-medium"
                        >
                            View All Messages
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
