import Hero from "./components/Hero";
import FavoritesGrid from "./components/FavoritesGrid";
import FeaturesSection from "./components/FeaturesSection";
import TrustSection from "./components/TrustSection";
import FAQSection from "./components/FAQSection";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Newsletter from "./components/Newsletter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminDashboardLink from "./components/AdminDashboardLink";
import { getHeroBanner, getHeroBannerPreview } from '@/lib/contentful'
import HeroBanner from './components/HeroBanner'
import { draftMode } from 'next/headers'

export default async function Home() {
  const banner = await getHeroBanner()
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <AdminDashboardLink />
      {banner ? <HeroBanner banner={banner} /> : <Hero />}
      <Hero />
      <FavoritesGrid />
      <FeaturesSection />
      <TrustSection />
      <FAQSection />
      <Testimonials />
      <Contact />
      <Newsletter />
      <Footer />
    </main>
  );
}
const { isEnabled } = await draftMode()
const banner = isEnabled
  ? await getHeroBannerPreview()
  : await getHeroBanner()