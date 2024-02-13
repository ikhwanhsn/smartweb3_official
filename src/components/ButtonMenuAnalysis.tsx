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
    content: <CoomingSoon style={`mt-3`} />,
  },
  {
    title: "Signal",
    content: <CoomingSoon style={`mt-3`} />,
  },
  {
    title: "Trend",
    content: <CoomingSoon style={`mt-3`} />,
  },
  {
    title: "Narasi",
    content: <CoomingSoon style={`mt-3`} />,
  },
  {
    title: "Research",
    content: <CoomingSoon style={`mt-3`} />,
  },
  {
    title: "Others",
    content: <CoomingSoon style={`mt-3`} />,
  },
];

const ButtonMenuAnalysis = () => {
  const [isActiveButton, setIsActiveButton] = useState("Market");
  return (
    <section>
      <section className="mt-3  flex justify-center">
        {dataButton.map((item) => (
          <ButtonMenu
            key={item}
            style={isActiveButton === item ? "bg-blue-100" : ""}
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
      className={`px-5 py-2 border hover:bg-blue-100 transition-all ${style}`}
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
