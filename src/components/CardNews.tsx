import { fetcher } from "@/libs/swr/fetcher";
import { useEffect, useState } from "react";
import { BsFilter } from "react-icons/bs";
import useSWR from "swr";
import { TbRefresh } from "react-icons/tb";

const CardNews = () => {
  const [page, setPage] = useState(1);
  const [newsData, setNewsData] = useState<any>([]);
  const [filterData, setFilterData] = useState<any>([]);
  const [dataNotFound, setDataNotFound] = useState(false);
  const { data, error, isLoading } = useSWR(`/api/news/${page}`, fetcher);

  useEffect(() => {
    if (data) {
      setNewsData([...newsData, ...data.data.results]);
    }
  }, [data]);

  const inputFilter = (e: any) => {
    const filter = newsData.filter((item: any) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (filter.length === 0) {
      setDataNotFound(true);
    } else {
      setDataNotFound(false);
    }
    setFilterData(filter);
  };

  const handleRefresh = () => {
    setPage(1);
    setFilterData([]);
    setDataNotFound(false);
    setNewsData([]);
    setTimeout(() => {
      setNewsData([...data.data.results]);
    }, 500);
  };
  const nextNews = () => {
    setPage(page + 1);
  };
  return (
    <section className=" md:pt-20 pt-16">
      <div className="card pb-3 min-h-screen lg:w-3/6 w-full md:border-2 shadow-md mx-auto">
        <section className="py-3 md:px-5 px-4 flex justify-between items-center">
          <section className="flex gap-3">
            <h2 className="text-xl font-bold">Latest News</h2>
            <button
              onClick={() => handleRefresh()}
              className="mt-1 hover:scale-110"
            >
              <TbRefresh
                className={`${newsData.length === 0 ? "animate-spin" : ""}`}
              />
            </button>
          </section>
          <section className="flex items-center gap-5">
            <input
              type="search"
              placeholder="Search news..."
              onChange={(e) => inputFilter(e)}
              className="input input-bordered input-bgColor  shadow-sm input-sm w-full max-w-xs"
            />
            <BsFilter className="scale-[2] cursor-pointer hover:opacity-70" />
          </section>
        </section>
        <hr className="text-bgColor" />
        {newsData && dataNotFound === false && (
          <ContentNews data={filterData.length > 0 ? filterData : newsData} />
        )}
        {dataNotFound && <p className="mt-3 mx-auto text-sm">News Not Found</p>}
        {isLoading && page === 1 && (
          <p className="px-4 md:px-5 pt-1">Loading...</p>
        )}
        {filterData.length === 0 &&
          newsData.length > 0 &&
          dataNotFound === false && (
            <section className="text-center w-full mb-5">
              <button
                className="py-1 px-3 rounded-md border shadow-md hover:bg-bgColor hover:text-textColor border-black text-sm"
                onClick={() => nextNews()}
              >
                {isLoading ? "Loading..." : "Load More"}
              </button>
            </section>
          )}
      </div>
    </section>
  );
};

export default CardNews;

export const ContentNews = ({ data }: { data: any }) => {
  return (
    <div className="px-4 md:px-5 pt-3">
      {data.length > 0 &&
        data.map((article: any) => {
          const { publishTime, day, month, year } = timeSetting(article);

          return (
            <section className="leading-5 mb-3" key={article.id}>
              <a
                href={`https://${article.domain}`}
                className="hover:underline"
                target="_blank"
              >
                <p className="truncate">{article.title}</p>
                <small className="flex items-center gap-1">
                  <span className=" text-gray-700 font-semibold">
                    {`${
                      article.domain.charAt(0).toUpperCase() +
                      article.domain.slice(1)
                    }`}{" "}
                  </span>
                  {` - ${day} ${month} ${year} - ${publishTime}`}
                  <span className="text-green-600 font-semibold">
                    {article.currencies
                      ? ` - ${article.currencies.map((el: any) => el.code)}`
                      : ""}
                  </span>
                </small>
              </a>
            </section>
          );
        })}
    </div>
  );
};

export const timeSetting = (article: any) => {
  const date = new Date(article.published_at);
  const timeNow = new Date();
  const timeDiff = timeNow.getTime() - date.getTime();
  const minuteAgo = Math.floor(timeDiff / (1000 * 60));
  let publishTime;
  if (minuteAgo < 60) {
    publishTime = `${minuteAgo} minutes ago`;
  } else if (minuteAgo < 1440) {
    publishTime = `${Math.floor(minuteAgo / 60)} hours ago`;
  } else {
    publishTime = `${Math.floor(minuteAgo / 1440)} days ago`;
  }
  const hour = date.toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
  });
  let day: string | number = date.getDate();
  day === timeNow.getDate() ? (day = "Today") : (day = "Yesterday");
  let month: string = date.toLocaleDateString("en-US", { month: "short" });
  let year: number | string = date.getFullYear();
  day === "Today" || day === "Yesterday"
    ? ((month = ""), (year = ""))
    : ((month = month), (year = year));

  return { publishTime, day, month, year };
};
