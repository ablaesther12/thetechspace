import {
    AreaChart,
    Area,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const data = [
    { name: "Jan", value: 20 },
    { name: "Feb", value: 40 },
    { name: "Mar", value: 60 },
    { name: "Apr", value: 80 },
    { name: "May", value: 100 },
    { name: "Jun", value: 130 },
    { name: "Jul", value: 160 },
];

export default function StatsSection() {
    return (
        <section className="w-full max-w-6xl mx-auto text-left py-32">
            <div className="px-4">
                <h3 className="text-lg sm:text-xl lg:text-4xl font-medium text-gray-900 mb-16">
                    Proven results you can trust.{" "}
                    <span className="text-gray-500 text-sm sm:text-base lg:text-4xl">
                        We deliver quality solutions, build strong client relationships, and provide dependable support to help your business grow with confidence.
                    </span>
                </h3>

                {/* Stats grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
                    <div>
                        <p className="text-3xl font-medium text-gray-900">50,000+</p>
                        <p className="text-gray-500 text-md">Projects Completed</p>
                    </div>
                    <div>
                        <p className="text-3xl font-medium text-gray-900">99.9%</p>
                        <p className="text-gray-500 text-md">Client Satisfaction</p>
                    </div>
                    <div>
                        <p className="text-3xl font-medium text-gray-900">1,200+</p>
                        <p className="text-gray-500 text-md">Happy Clients</p>
                    </div>
                    <div>
                        <p className="text-3xl font-medium text-gray-900">24/7</p>
                        <p className="text-gray-500 text-md">Support Available</p>
                    </div>
                </div>
            </div>

            {/* Area Chart */}
            <div className="w-full h-48 mt-8">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorBlue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
