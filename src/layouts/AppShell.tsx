import Navbar from "./Navbar";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default AppShell;
