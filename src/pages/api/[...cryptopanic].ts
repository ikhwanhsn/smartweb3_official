import { cryptoPanicAll } from '@/lib/cryptoPanic/service'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    data: any
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
){
    const data = await cryptoPanicAll()
    return res.status(200).json({data: data})
}