import Image from 'next/image';
import OpportunitiesItems from "@/components/OpportunitiesItems";

function OpportunitiesSection() {
  return (
    <section id="opportunities" className="py-16 px-4 bg-green-50">
      <OpportunitiesItems />
    </section>
  );
}

export default OpportunitiesSection;
