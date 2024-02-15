import { fetcher } from "@/libs/swr/fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { FaExchangeAlt } from "react-icons/fa";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

const dataThead = [
  "No",
  "Cryptocurrency",
  "Price",
  "Market Cap",
  "Volume",
  "Supply",
  "Limited",
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
    <table className="table-auto w-full border rounded-md">
      <thead className="bg-gray-100">
        <tr>
          {dataThead.map((item) => (
            <th key={item} className="py-2 relative border-2">
              {item}
              {item === "Change " && (
                <>
                  {dataChange[percentChange]}
                  <FaExchangeAlt
                    className="absolute top-3 cursor-pointer right-4 scale-75"
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
            return (
              <tr key={item.cmc_rank} className="text-center">
                <td className="py-2 w-14 border-l-2 border-r-2">
                  {item.cmc_rank}.
                </td>
                <td className={`py-2 text-start w-64 border-r-2 px-3`}>
                  {item.name}
                </td>
                <td
                  className={`py-2 border-r-2 w-40 ${
                    percentage < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  ${formatCurrency(item.quote.USD.price)}
                </td>
                <td
                  className={`py-2 border-r-2 w-40 ${
                    percentage < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  ${formatCurrency(item.quote.USD.market_cap)}
                </td>
                <td
                  className={`py-2 border-r-2 w-44 flex gap-1 justify-center items-center ${
                    item.quote.USD.volume_change_24h < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  ${formatCurrency(item.quote.USD.volume_24h)}
                  <sup>{item.quote.USD.volume_change_24h.toFixed(0)}%</sup>
                </td>
                <td className="py-2 border-r-2 w-40">
                  <div
                    className="tooltip"
                    data-tip={`${
                      circulatingPercentageFixed === "Infinity"
                        ? "(Max)"
                        : `(${circulatingPercentageFixed}%)`
                    } ${formatCurrency(item.circulating_supply)}`}
                  >
                    <progress
                      className="progress w-24"
                      value={item.circulating_supply}
                      max={item.max_supply}
                    ></progress>
                  </div>
                </td>
                <td className="py-2 border-r-2 w-24">
                  {item.infinite_supply ? "❌" : "✅"}
                </td>

                <td
                  className={`w-40 border-r-2 ${
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
