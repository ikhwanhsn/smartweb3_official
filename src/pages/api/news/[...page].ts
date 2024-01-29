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
  const page = req.query.page;
  const data = await axios
    .get(
      `https://cryptopanic.com/api/v1/posts/?auth_token=${
        process.env.NEXT_PUBLIC_API_KEY_CRYPTO_PANIC
      }&page=${page ? page : 1}`
    )
    .then(function (response: any) {
      return response.data;
    })
    .catch(function (error: any) {
      return error;
    });
  if (data) {
    res.status(200).json({ data: data });
  } else {
    res.status(500).json({ data: data });
  }
}
