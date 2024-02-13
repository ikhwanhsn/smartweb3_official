import Image from "next/image";
import coomingSoon from "../../public/videos/cooming_soon.gif";

const CoomingSoon = ({ style }: any) => {
  return (
    <section className="flex flex-col justify-center items-center">
      <Image
        src={coomingSoon}
        width={200}
        height={200}
        alt="Cooming Soon"
        className={`rounded-lg shadow-md ${style}`}
      />
      <p className="mt-3 italic">Cooming Soon...</p>
    </section>
  );
};

export default CoomingSoon;
