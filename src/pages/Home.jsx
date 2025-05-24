import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import PricingSection from '../components/PricingSection';
import EarningSection from '../components/EarningSection';
import FAQSection from '../components/FAQSection';
import StatsSection from '../components/StatsSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

const Home = () => (
  <>
    <main>
      <HeroSection />
      <FeatureSection />
      <PricingSection />
      <EarningSection />
      <FAQSection />
      <StatsSection />
      <CTASection />
    </main>
    <Footer />
  </>
);

export default Home;