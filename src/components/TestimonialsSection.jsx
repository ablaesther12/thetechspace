import Ab1 from '../assets/img/Ab1.jpg';

const testimonials = [
    {
        id: 1,
        quote: '"TTS delivered exactly what we needed. Professional, creative, and always on time. Highly recommended!"',
        name: 'Sarah Johnson',
        role: 'CEO, TechStart',
        avatar: Ab1,
    },
    {
        id: 2,
        quote: '"TTS delivered exactly what we needed. Professional, creative, and always on time. Highly recommended!"',
        name: 'James Mensah',
        role: 'Founder, BrandCo',
        avatar: Ab1,
    },
    {
        id: 3,
        quote: '"TTS delivered exactly what we needed. Professional, creative, and always on time. Highly recommended!"',
        name: 'Linda Asante',
        role: 'Head of Marketing, NexaHub',
        avatar: Ab1,
    },
];

const StarIcon = () => (
    <svg
        className="h-5 w-5 fill-yellow-400 text-yellow-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const TestimonialsSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Our Clients Say</h2>
                    <p className="text-xl text-slate-600">
                        Don't just take our word for it — hear from our satisfied clients.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map(({ id, quote, name, role, avatar }) => (
                        <div
                            key={id}
                            className="border-0 shadow-lg bg-white p-6 rounded-lg hover:bg-slate-50 hover:shadow-xl transition duration-300"
                        >
                            <div className="flex mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <StarIcon key={star} />
                                ))}
                            </div>
                            <p className="text-slate-600 mb-4">{quote}</p>
                            <div className="flex items-center">
                                <img src={avatar} alt={name} className="w-10 h-10 rounded-full mr-3 object-cover" />
                                <div>
                                    <div className="font-semibold text-slate-900">{name}</div>
                                    <div className="text-sm text-slate-500">{role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
