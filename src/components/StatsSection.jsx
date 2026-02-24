const stats = [
    { value: '150+', label: 'Projects Completed' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '5+', label: 'Years Experience' },
    { value: '24/7', label: 'Support Available' },
];

const StatsSection = () => {
    return (
        <section className="py-20 bg-slate-900 text-white">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                    {stats.map(({ value, label }) => (
                        <div key={label}>
                            <div className="text-4xl font-bold text-emerald-400 mb-2">{value}</div>
                            <div className="text-slate-300">{label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
