import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from './js/exchange.js';

$(document).ready(function() {
  $("#convert").click(function(event){
    event.preventDefault();
    let conversion;
    Exchange.getExchange()
    .then(function(response){
      const body = JSON.parse(response);
      conversion=body.main.conversion_result;
    }, function(error){
      console.error("This is Tori's Error message"+error);
    });
    $("#display-dollars").text($("#dollars").val());
    $("#display-currency").text($("#currency-select").val());
    $("#display-conversion").text(conversion);
    $("#display-result").show();
  });
});