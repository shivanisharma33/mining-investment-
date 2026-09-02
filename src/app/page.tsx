import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsAndGlimpse from "@/components/StatsAndGlimpse";
import ProgramsGrid from "@/components/ProgramsGrid";
import FeaturedEventCountdown from "@/components/FeaturedEventCountdown";
import FeaturedPartners from "@/components/FeaturedPartners";
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
        <FeaturedPartners />
        <FeaturedEventCountdown />
        <StatsAndGlimpse />
        <ProgramsGrid />
        <GlobalCommunity />
        <EventHighlightsMedia />
        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}










