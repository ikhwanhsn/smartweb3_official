import ScrollToTop from "@/components/ScrollToTop";
import Navbar from "./Navbar";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      {children}
      <ScrollToTop />
    </main>
  );
};

export default AppShell;
