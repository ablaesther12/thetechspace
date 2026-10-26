import HeroSection from '../components/Hero';
import BuildLogSection from '../components/home/BuildLogSection';
import ServicesBento from '../components/home/ServicesBento';
import RecentWork from '../components/home/RecentWork';
import WhyTts from '../components/home/WhyTts';
import { FinalCta } from '../components/home/PeopleAndLabs';
import NewsletterSection from '../components/NewsletterSection';

// Stats and testimonials were removed from the homepage: their numbers and
// quotes are unverified (see PRODUCT.md). TestimonialsSection.jsx and
// StatsSection.jsx are kept for when real figures and quotes exist.
const Home = () => {
  return (
    <>
      <HeroSection />
      <BuildLogSection />
      <ServicesBento />
      <RecentWork />
      <WhyTts />
      <FinalCta />
      <NewsletterSection />
    </>
  );
};

export default Home;
