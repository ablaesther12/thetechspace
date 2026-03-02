import { NavLink, useLocation, useNavigate } from "react-router";
import {
    LayoutDashboard,
    FileText,
    Users,
    Briefcase,
    MessageSquare,
    Settings,
    HelpCircle,
    LogOut,
    Milestone,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import logo1 from "../../assets/img/logo1.png";

const menuItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard, exact: true },
    { name: "Posts", path: "/admin/posts", icon: FileText },
    { name: "Team", path: "/admin/team", icon: Users },
    { name: "Services", path: "/admin/services", icon: Briefcase },
    { name: "Milestones", path: "/admin/milestones", icon: Milestone },
    { name: "Messages", path: "/admin/contacts", icon: MessageSquare, badge: 5 },
];

const systemItems = [
    { name: "Settings", path: "/admin/settings", icon: Settings },
    { name: "Help Center", path: "/admin/help", icon: HelpCircle },
];

export default function Sidebar() {
    const { logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path, exact) => {
        if (exact) return location.pathname === path;
        return location.pathname.startsWith(path);
    };

    const handleLogout = () => {
        logout();
        navigate("/admin/login");
    };

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-[230px] bg-slate-900 flex flex-col z-40">
            {/* ── Logo ── */}
            <div className="px-5 pt-6 pb-5 flex items-center gap-3">
                <img src={logo1} alt="Logo" className="h-8 w-8 object-contain" />
                <div>
                    <h1 className="text-white font-bold text-sm tracking-tight">
                        TheTechSpace
                    </h1>
                    <p className="text-slate-500 text-[11px]">Admin Console</p>
                </div>
            </div>

            {/* ── Navigation ── */}
            <nav className="flex-1 px-3 mt-2 overflow-y-auto">
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest px-3 mb-2">
                    Menu
                </p>

                <div className="space-y-0.5">
                    {menuItems.map((item) => {
                        const active = isActive(item.path, item.exact);
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.exact}
                                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200
                  ${active
                                        ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25"
                                        : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                                    }
                `}
                            >
                                <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
                                <span className="flex-1">{item.name}</span>
                                {item.badge && (
                                    <span
                                        className={`
                    min-w-[20px] h-[20px] flex items-center justify-center rounded-full text-[11px] font-bold
                    ${active ? "bg-white/20 text-white" : "bg-violet-600 text-white"}
                  `}
                                    >
                                        {item.badge}
                                    </span>
                                )}
                            </NavLink>
                        );
                    })}
                </div>

                {/* System section */}
                <div className="mt-8">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest px-3 mb-2">
                        System
                    </p>
                    <div className="space-y-0.5">
                        {systemItems.map((item) => {
                            const active = isActive(item.path);
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200
                    ${active
                                            ? "bg-violet-600 text-white shadow-lg shadow-violet-600/25"
                                            : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                                        }
                  `}
                                >
                                    <item.icon className="w-[18px] h-[18px]" />
                                    <span>{item.name}</span>
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* ── Sign Out ── */}
            <div className="p-3">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-[13px] font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all duration-200"
                >
                    <LogOut className="w-[18px] h-[18px]" />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
