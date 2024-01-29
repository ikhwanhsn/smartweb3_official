import { fetcher } from "@/libs/swr/fetcher";
import { useEffect, useState } from "react";
import { BsFilter } from "react-icons/bs";
import { MdOutlineShowChart } from "react-icons/md";
import useSWR from "swr";

const CardNews = () => {
  const { data, error, isLoading } = useSWR("/api/news", fetcher);
  return (
    <section className="">
      <div className="card pb-3 lg:w-3/6 w-full md:border-2 shadow-md shadow-gray-500 mx-auto md:mt-20 mt-16">
        <section className="py-3 md:px-5 px-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Latest News</h2>
          <section className="flex items-center gap-5">
            <input
              type="search"
              placeholder="Search news..."
              className="input input-bordered input-bgColor border-gray-700 shadow-sm input-sm w-full max-w-xs"
            />
            <BsFilter className="scale-[2] cursor-pointer hover:opacity-70" />
          </section>
        </section>
        <hr className="text-bgColor" />
        {isLoading && <p className="m-3">Loading...</p>}
        {!isLoading && data && <ContentNews data={data.data.results} />}
        {!isLoading && (
          <section className="text-center w-full mb-5">
            <button className="py-1 px-3 rounded-md border shadow-md hover:bg-bgColor hover:text-textColor border-black text-sm">
              Load more...
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
                  {`${
                    article.domain.charAt(0).toUpperCase() +
                    article.domain.slice(1)
                  } - ${day} ${month} ${year} - ${publishTime}`}
                  <MdOutlineShowChart className="text-red-500" />
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
