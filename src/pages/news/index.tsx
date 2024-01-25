import CardNews from "@/components/CardNews";
import Navbar from "@/layouts/Navbar";
import { useEffect, useState } from "react";

const axios = require("axios");

const NewsPage = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    await axios
      .get(
        `https://cryptopanic.com/api/v1/posts/?auth_token=${process.env.NEXT_PUBLIC_API_KEY_CRYPTO_PANIC}`
      )
      .then(function (response: any) {
        setNews(response.data.results);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };

  return (
    <main>
      <Navbar />
      <CardNews news={news} />
    </main>
  );
};

export default NewsPage;
