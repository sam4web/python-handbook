import BenefitsSection from "./_components/benefits-section";
import CheatsheetCTASection from "./_components/cheatsheet-cta-section";
import FeaturesSection from "./_components/features-section";
import HeroSection from "./_components/hero-section";
import SandboxPromoSection from "./_components/sandbox-promo-section";
import Footer from "./_components/footer";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <SandboxPromoSection />
      <CheatsheetCTASection />
      <Footer />
    </main>
  );
}
