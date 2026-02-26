import HeroSection from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import PortfolioGallery from '../components/PortfolioGallery';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsletterSection from '../components/NewsletterSection';

const Home = () => {
  return (
    <>
      <HeroSection />
      <PortfolioGallery
        title="Browse our projects"
        archiveButton={{ text: "View all projects", href: "/projects" }}
      />
      <ServicesSection />
      <StatsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
};

export default Home;