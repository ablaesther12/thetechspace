import { Search, Bell, Menu } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Topbar({ title, onToggleSidebar }) {
    const { user } = useAuth();

    return (
        <header className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 border-b border-slate-200/60 bg-white sticky top-0 z-20">
            {/* Left — hamburger + title */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onToggleSidebar}
                    className="lg:hidden p-2 -ml-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    {title}
                </h2>
            </div>

            {/* Center — search (hidden on small screens) */}
            <div className="hidden md:flex items-center gap-2 bg-slate-100 hover:bg-slate-200/70 rounded-full px-4 py-2 w-64 transition-colors group">
                <Search className="w-4 h-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
                />
            </div>

            {/* Right — notifications + user */}
            <div className="flex items-center gap-2 sm:gap-4">
                <button className="relative p-2 rounded-full hover:bg-slate-100 hover:text-violet-600 transition-all duration-200">
                    <Bell className="w-5 h-5 text-slate-500" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                </button>

                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-slate-900 leading-tight">
                            {user?.name || "Admin"}
                        </p>
                        <p className="text-[11px] text-slate-500 leading-tight">
                            {user?.role || "Administrator"}
                        </p>
                    </div>
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer">
                        {user?.name?.charAt(0) || "A"}
                    </div>
                </div>
            </div>
        </header>
    );
}
