import { fetcher } from "@/libs/swr/fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";

const dataThead = [
  "No",
  "Name",
  "Price",
  "Market Cap",
  "Volume",
  "Supply",
  "Limited",
  "Change 24h",
];

const Market = () => {
  const [dataCrypto, setdataCrypto] = useState<any>([]);
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
            <th key={item} className="py-2">
              {item}
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
            console.log(circulatingPercentageFixed);
            return (
              <tr key={item.cmc_rank} className="text-center">
                <td className="py-2">{item.cmc_rank}.</td>
                <td className="py-2 text-start">{item.name}</td>
                <td className="py-2">${item.quote.USD.price.toFixed(2)}</td>
                <td className="py-2">
                  ${formatCurrency(item.quote.USD.market_cap)}
                </td>
                <td className="py-2">
                  ${formatCurrency(item.quote.USD.volume_24h)}
                </td>
                <td className="py-2">
                  <div
                    className="tooltip"
                    data-tip={`${
                      circulatingPercentageFixed === "Infinity"
                        ? "(Max)"
                        : `${circulatingPercentageFixed}%`
                    } ${formatCurrency(item.circulating_supply)}`}
                  >
                    <progress
                      className="progress w-24"
                      value={item.circulating_supply}
                      max={item.max_supply}
                    ></progress>
                  </div>
                </td>
                <td className="py-2">{item.infinite_supply ? "❌" : "✅"}</td>

                <td
                  className={`${
                    item.quote.USD.percent_change_24h < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {`${item.quote.USD.percent_change_24h.toFixed(2)}%`}
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
  if (Math.abs(value) >= 1.0e9) {
    return (value / 1.0e9).toFixed(2) + "B";
  }
  if (Math.abs(value) >= 1.0e6) {
    return (value / 1.0e6).toFixed(2) + "M";
  }
  return value;
}
