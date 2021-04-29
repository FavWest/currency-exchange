import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from './js/exchange.js';

$(document).ready(function() {
  $("#convert").click(function(event){
    $("#display-result").hide();
    $("#display-error").hide();
    $("#display-loading").show();
    event.preventDefault();
    let currency=$("#currency-select").val();
    let amount=$("#dollars").val();
    Exchange.getExchange(currency, amount)
      .then(function(response){
        if(response.result==="success"){//TODO
          let conversion=response.conversion_result;
          $("#display-conversion").text(conversion);
          $("#display-dollars").text($("#dollars").val());
          $("#display-currency").text($("#currency-select").val());  
          $("#display-result").show();
          $("#display-loading").hide();
          $("#display-error").hide();
        } else if(response.result==="error") {
          $("#error-message").append(response["error-type"]); //TODO
          $("#display-error").show();
          $("#display-result").hide();
          $("#display-loading").hide();
        } else {
          $("#error-message").append(response.message); //TODO
          $("#display-error").show();
          $("#display-result").hide();
          $("#display-loading").hide();
        }
      });
  });
});