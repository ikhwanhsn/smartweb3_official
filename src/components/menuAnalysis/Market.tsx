import { fetcher } from "@/libs/swr/fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { FaExchangeAlt } from "react-icons/fa";

const dataThead = [
  "No",
  "Cryptocurrency",
  "Price",
  "Market Cap",
  "Volume",
  "Supply",
  "Limited",
  "Added",
  "Change ",
];

const dataChange = ["1h", "24h", "7d", "30d", "60d", "90d"];

const Market = () => {
  const [dataCrypto, setdataCrypto] = useState<any>([]);
  const [percentChange, setPercentChange] = useState(0);
  const { data, error, isLoading } = useSWR(
    `/api/analysis/cryptoRunPrice`,
    fetcher
  );
  useEffect(() => {
    if (data) {
      setdataCrypto([...dataCrypto, data]);
    }
    if (dataCrypto.length > 0) {
      console.log(dataCrypto[0].data.data);
    }
  }, [data]);
  return (
    <table className="table table-auto w-full rounded-md text-base">
      <thead className="bg-gray-100">
        <tr>
          {dataThead.map((item) => (
            <th key={item} className="text-sm">
              {item}
              {item === "Change " && (
                <>
                  {dataChange[percentChange]}
                  <FaExchangeAlt
                    className="absolute top-4 cursor-pointer right-6 scale-75"
                    onClick={() =>
                      percentChange > dataChange.length - 2
                        ? setPercentChange(0)
                        : setPercentChange(percentChange + 1)
                    }
                  />
                </>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataCrypto.length > 0 &&
          dataCrypto[0].data.data.map((item: any) => {
            const circulatingPercentage =
              (item.circulating_supply / item.max_supply) * 100;
            const circulatingPercentageFixed = circulatingPercentage.toFixed(0);
            const percentage =
              percentChange === 0
                ? item.quote.USD.percent_change_1h
                : percentChange === 1
                ? item.quote.USD.percent_change_24h
                : percentChange === 2
                ? item.quote.USD.percent_change_7d
                : percentChange === 3
                ? item.quote.USD.percent_change_30d
                : percentChange === 4
                ? item.quote.USD.percent_change_60d
                : item.quote.USD.percent_change_90d;
            const dateString = item.date_added;
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            return (
              <tr
                key={item.cmc_rank}
                className={` ${
                  item.cmc_rank % 2 === 0 ? "hover:bg-gray-50" : "bg-gray-50"
                }`}
              >
                <td>{item.cmc_rank}.</td>
                <td>
                  {item.name}
                  <span className="ml-1 text-gray-400">{item.symbol}</span>
                </td>
                <td>${formatCurrency(item.quote.USD.price)}</td>
                <td>${formatCurrency(item.quote.USD.market_cap)}</td>
                <td className={`flex gap-1`}>
                  ${formatCurrency(item.quote.USD.volume_24h)}
                  <sup
                    className={`mt-3 ${
                      item.quote.USD.volume_change_24h < 0
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {item.quote.USD.volume_change_24h.toFixed(0)}%
                  </sup>
                </td>
                <td>
                  <div
                    className="tooltip"
                    data-tip={`${
                      circulatingPercentageFixed === "Infinity"
                        ? "(Max)"
                        : `(${circulatingPercentageFixed}%)`
                    } ${formatCurrency(item.circulating_supply)}`}
                  >
                    <progress
                      className="progress w-20"
                      value={item.circulating_supply}
                      max={item.max_supply}
                    ></progress>
                  </div>
                </td>
                <td className="py-2">{item.infinite_supply ? "❌" : "✅"}</td>
                <td>
                  <div className="tooltip" data-tip={`${day}/${month}/${year}`}>
                    {year}
                  </div>
                </td>
                <td
                  className={` ${
                    percentage < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {percentChange === 0 &&
                    `${item.quote.USD.percent_change_1h.toFixed(2)}%`}
                  {percentChange === 1 &&
                    `${item.quote.USD.percent_change_24h.toFixed(2)}%`}
                  {percentChange === 2 &&
                    `${item.quote.USD.percent_change_7d.toFixed(2)}%`}
                  {percentChange === 3 &&
                    `${item.quote.USD.percent_change_30d.toFixed(2)}%`}
                  {percentChange === 4 &&
                    `${item.quote.USD.percent_change_60d.toFixed(2)}%`}
                  {percentChange === 5 &&
                    `${item.quote.USD.percent_change_90d.toFixed(2)}%`}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Market;

function formatCurrency(value: number) {
  if (value < 1) {
    return value.toFixed(4);
  }
  if (Math.abs(value) >= 1.0e12) {
    return (value / 1.0e12).toFixed(2) + "T";
  }
  if (Math.abs(value) >= 1.0e9) {
    return (value / 1.0e9).toFixed(2) + "B";
  }
  if (Math.abs(value) >= 1.0e6) {
    return (value / 1.0e6).toFixed(2) + "M";
  }
  return value.toFixed(2);
}
