import BenefitsSection from "./_components/benefits-section";
import CTASection from "./_components/cta-section";
import FeaturesSection from "./_components/features-section";
import HeroSection from "./_components/hero-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <CTASection />
    </main>
  );
}
