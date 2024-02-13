import { fetcher } from "@/libs/swr/fetcher";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import useSWR from "swr";

const CryptoRunPrice = () => {
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
    <section className="flex items-center bg-blue-100 h-12">
      <Marquee pauseOnHover speed={30}>
        {dataCrypto.length > 0 &&
          dataCrypto[0].data.data.map((item: any) => {
            console.log(item);
            return (
              <section className="px-3 hover:text-accentColor cursor-pointer">
                {item.symbol}
                <span
                  className={`ml-1 ${
                    item.quote.USD.percent_change_24h < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {item.quote.USD.percent_change_24h.toFixed(2)}%
                </span>
              </section>
            );
          })}
      </Marquee>
    </section>
  );
};

export default CryptoRunPrice;
