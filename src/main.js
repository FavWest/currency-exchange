import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from './js/exchange.js';
//import calculateConversion from './js/calculateConversion.js';

$(document).ready(function() {
  $("#convert").click(function(event){
    $("#display-result").hide();
    $("#display-error").hide();
    $("#display-loading").show();
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
      $("#display-dollars").text($("#dollars").val());
      $("#display-currency").text($("#currency-select").val());  
      $("#display-result").show();
      $("#display-loading").hide();
      $("#display-error").hide();
    }, function(error){
      console.error(error);
      $("#error-message").text(error);
      $("#display-error").show();
      $("#display-result").hide();
      $("#display-loading").hide();
    });
  });
});