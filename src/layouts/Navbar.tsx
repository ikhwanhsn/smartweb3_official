import Image from "next/image";
import logo from "../../public/img/logo.jpg";

const Navbar = () => {
  return (
    <section>
      <div className="navbar lg:px-24 bg-bgColor text-textColor">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-bgColor rounded-box w-52"
            >
              <li>
                <a>News</a>
              </li>
              <li>
                <a>Analysis</a>
              </li>
              <li>
                <a>Tools</a>
              </li>
              <li>
                <a>Learn</a>
              </li>
            </ul>
          </div>
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
