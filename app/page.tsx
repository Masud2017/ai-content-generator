import Header from "./_components/Header";
import Hero from "./_components/Hero";
import DotPattern from "@/components/ui/dot-pattern";
import { ny } from "@/lib/utils";
import { HowItWorks } from "./_components/HowItWorks";
import { AICourseText } from "./_components/AICourseText";

import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div>
      <div>
        <Header />
        <Hero />
        <AICourseText />
        <HowItWorks />
      </div>
      <DotPattern
        className={ny(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]"
        )}
      />

      <Footer/>
    </div>
  );
}
