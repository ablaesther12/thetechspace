import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const pageTitles = {
    "/admin": "Dashboard Overview",
    "/admin/posts": "Blog Posts",
    "/admin/posts/new": "Create New Post",
    "/admin/team": "Team Members",
    "/admin/services": "Services",
    "/admin/contacts": "Contact Messages",
    "/admin/testimonials": "Testimonials",
    "/admin/subscribers": "Newsletter Subscribers",
    "/admin/settings": "Settings",
    "/admin/help": "Help Center",
};

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const title =
        pageTitles[location.pathname] ||
        Object.entries(pageTitles).find(
            ([path]) => location.pathname.startsWith(path) && path !== "/admin"
        )?.[1] ||
        "Dashboard";

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Mobile backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="lg:ml-[230px] min-h-screen flex flex-col">
                <Topbar
                    title={title}
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                />
                <main className="flex-1 p-4 sm:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
