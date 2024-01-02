import { cryptoPanicAll } from "@/lib/cryptoPanic/service";
import { newsType } from "@/types/news.type";
import { useEffect, useState } from "react";
import { BsFilter } from "react-icons/bs";
const axios = require("axios");

const CardNews = ({ news }: {news: newsType[]}) => {
  
  // const [articleName, setArticleName] = useState([]);
  // const baseURL: string = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

  // useEffect(() => {
  //   axios
  //     .get(baseURL, {
  //       params: {
  //         start: "1",
  //         limit: "10",
  //       },
  //       headers: {
  //         "X-CMC_PRO_API_KEY": process.env.NEXT_PUBLIC_APIKEY_COINMARKETCAP,
  //         "Accept": "application/json",
  //         // "Accept-Encoding": ["deflate", "gzip"]
  //       },
  //     })
  //     .then((response: any) => {
  //       setArticleName(response.data.data[0].title);
  //       console.log(response.data.data[0].title);
  //       console.log(response.data.data[0]);
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     })
  //   }, []);

  return (
    <section>
      <div className="card pb-3 lg:w-3/6 w-full border-2 shadow-md shadow-gray-500 mx-auto mt-5">
        <section className="py-3 px-5 flex justify-between items-center">
          <h2 className="text-xl font-bold">Latest News</h2>
          <section className="flex items-center gap-5">
            <input
              type="search"
              placeholder="Search news..."
              className="input input-bordered input-bgColor shadow-sm input-sm w-full max-w-xs"
            />
            <BsFilter className="scale-[2] cursor-pointer hover:opacity-70" />
          </section>
        </section>
        <hr className="text-bgColor" />
        <ContentNews data={news} />
      </div>
    </section>
  );
};

export default CardNews;

const ContentNews = ({data}: {data: newsType[]}) => {
  return (
    <div className="px-5 pt-3 mb-24">
      {data.length > 0 ? data.map((article: any) => {
        const date = new Date(article.published_at);
        const timeNow = new Date();
        const timeDiff = timeNow.getTime() - date.getTime();
        const minuteAgo = Math.floor(timeDiff / (1000 * 60));
        let publishTime;
        if(minuteAgo < 60) {
          publishTime = `${minuteAgo} minutes ago`;
        } else if (minuteAgo < 1440) {
          publishTime = `${Math.floor(minuteAgo / 60)} hours ago`;
        } else {
          publishTime = `${Math.floor(minuteAgo / 1440)} days ago`;
        }
        const hour = date.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit' });
        const day = date.getDay();
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const year = date.getFullYear();

        return (
          <section className="leading-5 mb-3" key={article.id}>
            <a href={article.url} className="hover:underline" target="_blank">
              <p className="truncate">{article.title}</p>
              <small>{`${article.domain.charAt(0).toUpperCase() + article.domain.slice(1)} - ${day} ${month} ${year} - ${publishTime}`}</small>
            </a>
          </section>
        )
      }): <p>Loading...</p>}
    </div>
  );
};