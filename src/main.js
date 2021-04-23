import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from './js/exchange.js';
//import calculateConversion from './js/calculateConversion.js';

$(document).ready(function() {
  $("#convert").click(function(event){
    event.preventDefault();
    let currency=$("#currency-select").val();
    let amount=$("#dollars").val();
    let promise = Exchange.getExchange(currency, amount);
    promise.then(function(response){
      let body = JSON.parse(response);
      console.log(body);
      console.log(body.conversion_result);
      let conversion=body.conversion_result;
      $("#display-conversion").text(conversion);
    }, function(error){
      console.error("This is Tori's Error message"+error);
      $("#error-message").text(error.type);
    });
    $("#display-dollars").text($("#dollars").val());
    $("#display-currency").text($("#currency-select").val());  
    $("#display-result").show();
  });
});