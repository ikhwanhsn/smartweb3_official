// const axios = require("axios");
// // import axios from "axios";

// let response: any = null;
// new Promise(async (resolve, reject) => {
//   try {
//     response = await axios.get(
//       "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
//       {
//         headers: {
//           "X-CMC_PRO_API_KEY": process.env.APIKEY_COINMARKETCAP,
//         },
//       }
//     );
//   } catch (ex) {
//     response = null;
//     // error
//     console.log(ex);
//     reject(ex);
//   }
//   if (response) {
//     // success
//     const json = response.data;
//     console.log(json);
//     resolve(json);
//   }
// });

// export default response;
