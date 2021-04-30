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
            $("#message").html(`<p class="red">There was an error: ${response["error-type"]}.</p>`);
            if(response["error-type"]==="invalid-key") {
              $("#message").append(`<p class="red">You may not have a valid API key. See <a href="https://github.com/FavWest/currency-exchange#readme">project README</a> for instructions for adding an API key.</p>`);
            } else if(response["error-type"]==="unsupported-code"){
              $("#message").append(`<p class="red">Currency does not exist. <a href="https://www.exchangerate-api.com/docs/supported-currencies">Click here</a> for a list of supported currencies.</p>`);
            } else {
              $("#message").html(`<p class="red">There was an error: ${response["error-type"]}</p>`);
            }
          } else {
            $("#message").html(`<p class="red">There was an error: ${response.message}</p>`);
            if(response.message==="Failed to fetch"){
              $("#message").append(`<p class="red">There may be a problem with the request URL</p>`);
            }
          }
        });
    }
  });
});