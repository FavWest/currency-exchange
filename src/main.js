import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from './js/exchange.js';
//import calculateConversion from './js/calculateConversion.js';

$(document).ready(function() {
  let conversion;
  $("#convert").click(function(event){
    event.preventDefault();
    let currency="KRW";
    let promise = Exchange.getExchange(currency);
    promise.then(function(response){
      const body = JSON.parse(response);
      console.log(body);
    }, function(error){
      console.error("This is Tori's Error message"+error);
    });
    $("#display-dollars").text($("#dollars").val());
    $("#display-currency").text($("#currency-select").val());
    $("#display-conversion").text(conversion);
    $("#display-result").show();
  });
});