import CardNews from "@/components/CardNews";
import Navbar from "@/layouts/Navbar";
import { newsType } from "@/types/news.type";

const NewsPage = ({news}: {news: newsType[]}) => {
    return ( 
        <main>
            <Navbar/>
            <CardNews news={news}/>
        </main>
     );
}
 
export default NewsPage;

export async function getServerSideProps(){
    let res = await fetch('http://localhost:3000/api/cryptopanic');
    const result = await res.json();
  
    return {
      props: {
        news: result.data.results,
        revalidate: 10,
      },
    }
  }