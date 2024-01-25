import CardNews from "@/components/CardNews";
import Navbar from "@/layouts/Navbar";
import { newsType } from "@/types/news.type";

const NewsPage = () => {
  return (
    <main>
      <Navbar />
      <CardNews news={[]} />
    </main>
  );
};

export default NewsPage;
