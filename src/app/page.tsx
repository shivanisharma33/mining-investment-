import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsAndGlimpse from "@/components/StatsAndGlimpse";
import WhyAttend from "@/components/WhyAttend";
import ProgramsGrid from "@/components/ProgramsGrid";
import FeaturedEventCountdown from "@/components/FeaturedEventCountdown";
import FeaturedPartners from "@/components/FeaturedPartners";
import CanadaPremierForum from "@/components/CanadaPremierForum";
import GlobalCommunity from "@/components/GlobalCommunity";
import EventHighlightsMedia from "@/components/EventHighlightsMedia";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full">
        <Hero />
        <StatsAndGlimpse />
        <WhyAttend />
        <ProgramsGrid />
        <FeaturedEventCountdown />
        <FeaturedPartners />
        <CanadaPremierForum />
        <GlobalCommunity />
        <EventHighlightsMedia />
        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}










