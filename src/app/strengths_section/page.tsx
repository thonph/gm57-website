import Image from 'next/image';
import StrengthsItems from "@/components/StrengthsItems";

function StrengthsSection() {
  return (
    <section id="strengths" className="py-16 px-4 bg-green-50">
      <StrengthsItems />
    </section>
  );
}

export default StrengthsSection;