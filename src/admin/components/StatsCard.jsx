import { TrendingUp } from "lucide-react";

export default function StatsCard({
    icon: Icon,
    label,
    value,
    change,
    iconBg,
    iconColor,
}) {
    const hasChange = change !== undefined && change !== 0;

    return (
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 hover:border-slate-300/60 transition-all duration-300 cursor-default group">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                        {label}
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                        {value}
                    </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${iconBg} group-hover:scale-110 transition-transform duration-300`}
                    >
                        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor}`} />
                    </div>
                    {hasChange ? (
                        <div className="flex items-center gap-1 text-emerald-600 text-[11px] sm:text-xs font-semibold">
                            <TrendingUp className="w-3 h-3" />
                            <span>+{change}%</span>
                        </div>
                    ) : (
                        <span className="text-[11px] sm:text-xs text-slate-400 font-medium">
                            0%
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
