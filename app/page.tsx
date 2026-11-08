import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeHero from '@/components/home/HomeHero';
import HomeMission from '@/components/home/HomeMission';
import HomePrograms from '@/components/home/HomePrograms';
import HomeWhyUs from '@/components/home/HomeWhyUs';
import HomeScripture from '@/components/home/HomeScripture';
import HomeParentResources from '@/components/home/HomeParentResources';
import HomeTestimonials from '@/components/home/HomeTestimonials';
import HomeEnrollCta from '@/components/home/HomeEnrollCta';
import HomeNewsletter from '@/components/home/HomeNewsletter';

export const metadata: Metadata = {
  title: 'Love Edify Child Care Services | Faith-Based Daycare & Early Childhood Education',
  description:
    'Love Edify Child Care Services provides a safe, nurturing, faith-centered environment where children grow in love, learning, and faith. Enroll today.',
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HomeHero />
        <HomeMission />
        <HomePrograms />
        <HomeWhyUs />
        <HomeScripture />
        <HomeParentResources />
        <HomeTestimonials />
        <HomeEnrollCta />
        <HomeNewsletter />
      </main>
      <Footer />
    </>
  );
}
