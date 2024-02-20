// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await axios
    .get(
      // "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      // "https://pro-api.coinmarketcap.com/v1/cryptocurrency/categories",
      // "https://pro-api.coinmarketcap.com/v1/cryptocurrency/category?id=605e2ce9d41eae1066535f7c",
      // "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?limit=55&sort=cmc_rank",
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=100&start=1`,
      // "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.NEXT_PUBLIC_API_KEY_CMC,
        },
      }
    )
    .then(function (response: any) {
      //   console.log(response.data);
      return response.data;
    })
    .catch(function (error: any) {
      console.log(error);
      return error;
    });
  res.status(200).json({ data: response });
}
