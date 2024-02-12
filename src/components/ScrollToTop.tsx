import Link from "next/link";
import { IoIosArrowUp } from "react-icons/io";

const ScrollToTop = () => {
  return (
    <section>
      <button className="fixed bottom-7 right-7 hover:scale-105 transition-all">
        <a href="#">
          <IoIosArrowUp className=" shadow-sm rounded-full scale-[2.5] border border-gray-200" />
        </a>
      </button>
    </section>
  );
};

export default ScrollToTop;
