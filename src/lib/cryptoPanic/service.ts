import axios from "axios";

export async function cryptoPanicAll() {
    const data = await axios
    .get(`https://cryptopanic.com/api/v1/posts/?auth_token=${process.env.NEXT_PUBLIC_AUTH_TOKEN_CRYPTOPANIC}`, {
    // params: {
    //     start: "1",
    //     limit: "10",
    // },
    })
    .then((response: any) => {
    // console.log(response.data.results);
    return response.data.results;
    })
    .catch((error: any) => {
    console.log(error);
    })

    return data
}