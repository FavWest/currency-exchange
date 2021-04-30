import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from './js/exchange.js';

function showNeedAmount(){
  $("#display-need-amount").show();
  $("#display-result").hide();
  $("#display-error").hide();
  $("#display-loading").hide();
}

function showLoading(){
  $("#display-need-amount").hide();  
  $("#display-result").hide();
  $("#display-error").hide();
  $("#display-loading").show();
}

function showConversionResult(response){
  let conversion=response.conversion_result;
  $("#display-conversion").text(conversion);
  $("#display-dollars").text($("#dollars").val());
  $("#display-currency").text($("#currency-select").val());  
  $("#display-result").show();
  $("#display-loading").hide();
  $("#display-error").hide();
}

function showAPIError(response){
  if(response["error-type"]==="invalid-key") {
    $("#error-message").append(`${response["error-type"]}: make sure you have a valid API key. See project README for instructions for adding an API key.`);
  } else if(response["error-type"]==="unsupported-code"){
    $("#error-message").append(`${response["error-type"]}: currency not found; check your currency code.`);
  } else {
    $("#error-message").append(response["error-type"]);
  }
  $("#display-error").show();
  $("#display-result").hide();
  $("#display-loading").hide();
}

function showFetchError(response) {
  $("#error-message").append(response.message);
  $("#display-error").show();
  $("#display-result").hide();
  $("#display-loading").hide();
}

$(document).ready(function() {
  $("#convert").click(function(event){
    event.preventDefault();
    let amount=$("#dollars").val();
    if (amount==="") {
      showNeedAmount();
    } else {
      let currency=$("#currency-select").val();
      showLoading();
      Exchange.getExchange(currency, amount)
        .then(function(response){
          if(response.result==="success"){
            showConversionResult(response);
          } else if(response.result==="error") {
            showAPIError(response);
          } else {
            showFetchError(response);
          }
        });
    }
  });
});