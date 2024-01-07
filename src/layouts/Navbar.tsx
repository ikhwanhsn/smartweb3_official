import Image from "next/image";
import logo from "../../public/img/logo.jpg";
import { TbMenu2 } from "react-icons/tb";

const Navbar = () => {
  return (
    <section>
      <div className="navbar pl-4 md:px-24 bg-bgColor text-textColor fixed top-0 z-50">
        <div className="navbar-start">
          <TbMenu2 className="scale-125 md:hidden mr-3"/>
          <Image
            src={logo}
            width={40}
            height={40}
            alt="SmartWeb3 logo"
            className="rounded-full mr-3 hidden lg:block"
          />
          <a className="text-xl font-bold" href="/">
            SmartWeb3
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li className="hover:opacity-70">
              <a>News</a>
            </li>
            <li className="hover:opacity-70">
              <a>Analysis</a>
            </li>
            <li className="hover:opacity-70">
              <a>Tools</a>
            </li>
            <li className="hover:opacity-70">
              <a>Learn</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn bg-bgColor text-textColor hover:bg-textColor hover:text-bgColor">
            Connect Wallet
          </a>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
