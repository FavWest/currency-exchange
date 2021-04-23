export default function calculateConversion(body){
  console.log(body.main.rates["USD"]);
  return body.main.rates["USD"]
  //convert that to desired result
}