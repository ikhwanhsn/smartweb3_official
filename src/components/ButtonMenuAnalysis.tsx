import { useState } from "react";
import CoomingSoon from "./CoomingSoon";
import Market from "./menuAnalysis/Market";

const dataButton = [
  "Market",
  "Data",
  "Signal",
  "Trend",
  "Narasi",
  "Research",
  "Others",
];

const dataActiveMenu = [
  {
    title: "Market",
    content: <Market />,
  },
  {
    title: "Data",
    content: <CoomingSoon style={`mt-12`} />,
  },
  {
    title: "Signal",
    content: <CoomingSoon style={`mt-12`} />,
  },
  {
    title: "Trend",
    content: <CoomingSoon style={`mt-12`} />,
  },
  {
    title: "Narasi",
    content: <CoomingSoon style={`mt-12`} />,
  },
  {
    title: "Research",
    content: <CoomingSoon style={`mt-12`} />,
  },
  {
    title: "Others",
    content: <CoomingSoon style={`mt-12`} />,
  },
];

const ButtonMenuAnalysis = () => {
  const [isActiveButton, setIsActiveButton] = useState("Market");
  return (
    <section className="relative">
      <section className="mt-3 flex justify-center sticky top-16 pt-4 z-20 w-full bg-white">
        {dataButton.map((item) => (
          <ButtonMenu
            key={item}
            style={
              isActiveButton === item
                ? "bg-bgColor text-textColor"
                : "bg-white text-bgColor"
            }
            onclick={() => setIsActiveButton(item)}
          >
            {item}
          </ButtonMenu>
        ))}
      </section>
      {dataActiveMenu.map((item) => (
        <ActiveMenu
          key={item.title}
          style={isActiveButton === item.title ? "block" : "hidden"}
        >
          {item.content}
        </ActiveMenu>
      ))}
    </section>
  );
};

export default ButtonMenuAnalysis;

type ButtonMenuProps = {
  onclick: () => void;
  children: React.ReactNode;
  style: string;
};

const ButtonMenu = ({ onclick, children, style }: ButtonMenuProps) => {
  return (
    <button
      className={`px-5 py-2 border hover:bg-bgColor hover:text-textColor transition-all ${style}`}
      onClick={onclick}
    >
      {children}
    </button>
  );
};

const ActiveMenu = ({ children, style }: any) => {
  return (
    <section className={`mb-5 rounded-md mx-5 shadow-sm ${style}`}>
      {children}
    </section>
  );
};
