import CardSolution from "@/components/CardSolution";
import HeadingSolution from "@/components/HeadingSolution";
import HeadingSolutionRent from "@/components/HeadingSolutionRent";
import ListServiceRent from "@/components/ListServiceRent";
import ListServiceSolution from "@/components/ListServiceSolution";
import TitleSolution from "@/components/TitleSolution";

function SolutionSection() {
  return (
    <section id="solutions" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <TitleSolution />
        <div className="mb-16">
          <div className="bg-green-50 rounded-lg p-8 border border-green-200">
            <CardSolution />
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-8">
            <HeadingSolution />
          </div>

          <ListServiceSolution />
        </div>

        <div className="mb-8">
          <div className="bg-green-50 rounded-lg p-8 border border-green-200">
            <HeadingSolutionRent />

            <div className="max-w-4xl mx-auto">
              <ListServiceRent />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SolutionSection;
