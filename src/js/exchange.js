export default class Exchange {  
  static getExchange(currency) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `http://data.fixer.io/api/latest?access_key=${process.env.API_KEY}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}








//     return new Promise(function(resolve, reject){
//       let request = new XMLHttpRequest();
//       const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${currency}/10`;
//       request.onload = function() {
//         if (this.status === 200) {
//           resolve(request.response);
//         } else {
//           reject(request.response);
//         }
//       };
//       request.open("GET", url, true);
//       request.send();
//     });
//   }
// }