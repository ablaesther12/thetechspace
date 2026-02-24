import { useState } from 'react';

const NewsletterSection = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: wire up to email service
        setEmail('');
    };

    return (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Inspired</h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Get tips, trends &amp; updates in your inbox. Join our community of digital innovators.
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                    >
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="flex-1 p-2 bg-white text-slate-900 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <button
                            type="submit"
                            className="bg-green-700 hover:bg-slate-800 text-white font-semibold px-8 py-2 rounded-md transition-colors"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;
