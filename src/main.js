import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from './js/exchange.js';

$(document).ready(function() {
  $("#convert").click(function(event){
    event.preventDefault();
    let amount=$("#dollars").val();
    if (amount==="") {
      $("#message").html(`<p class="red">Please enter a dollar amount to get an exchange value</p>`);
    } else {
      let currency=$("#currency-select").val();
      $("#message").html(`<p>FETCHING EXCHANGE RATE...</p>`);
      Exchange.getExchange(currency, amount)
        .then(function(response){
          if(response.result==="success"){
            let conversion=response.conversion_result;
            $("#message").html(`$${$("#dollars").val()} in USD is equal to ${conversion} in ${$("#currency-select").val()}.`);
          } else if(response.result==="error") {
            if(response["error-type"]==="invalid-key") {
              $("#message").html(`<p class="red">There was an error: ${response["error-type"]}: make sure you have a valid API key. See project README for instructions for adding an API key.</p>`);
            } else if(response["error-type"]==="unsupported-code"){
              $("#message").html(`<p class="red">There was an error: ${response["error-type"]}: currency not found; check your currency code.</p>`);
            } else {
              $("#message").html(`<p class="red">There was an error: ${response["error-type"]}</p>`);
            }
          } else {
            $("#message").html(`<p class="red">There was an error: ${response.message}</p>`);
          }
        });
    }
  });
});