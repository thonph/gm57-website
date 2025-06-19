interface TitleSolutionProps {
  title: string;
  description: string;
}

function TitleSolution({ title, description }: TitleSolutionProps) {
  return (
    <>
      <div className="text-center mb-12">
        <h2 className="text-3xl text-black mb-4 font-bold md:text-4xl">
          {title}
        </h2>
        <p className="text-lg text-gray-600 ">{description}</p>
      </div>
    </>
  );
}

export default TitleSolution;
