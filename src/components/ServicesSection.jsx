import { Code, Palette, Smartphone } from 'lucide-react';

const services = [
    {
        icon: Code,
        iconBg: 'bg-blue-100 group-hover:bg-blue-500',
        iconColor: 'text-blue-600 group-hover:text-white',
        title: 'Website Design & Development',
        description:
            'Custom websites that are fast, responsive, and optimized for conversions. Built with the latest technologies.',
    },
    {
        icon: Palette,
        iconBg: 'bg-purple-100 group-hover:bg-purple-500',
        iconColor: 'text-purple-600 group-hover:text-white',
        title: 'Graphic Design',
        description:
            'Visual identity, branding, and marketing materials that make your business stand out from the competition.',
    },
    {
        icon: Smartphone,
        iconBg: 'bg-emerald-100 group-hover:bg-emerald-500',
        iconColor: 'text-emerald-600 group-hover:text-white',
        title: 'UI/UX Design',
        description:
            'User-centered design that creates intuitive experiences and drives engagement across all devices.',
    },
];

const ServicesSection = () => {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What We Do Best</h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        From concept to launch, we deliver comprehensive digital solutions that elevate your brand.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map(({ icon: Icon, iconBg, iconColor, title, description }) => (
                        <div
                            key={title}
                            className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white p-8 text-center rounded-lg"
                        >
                            <div className={`w-16 h-16 ${iconBg} rounded-full flex items-center justify-center mx-auto mb-6 transition-colors`}>
                                <Icon className={`h-8 w-8 ${iconColor}`} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
                            <p className="text-slate-600">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
