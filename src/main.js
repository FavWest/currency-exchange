import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
//import Example from './example.js';

$(document).ready(function() {
  $("#convert").click(function(event){
    event.preventDefault();
    $("#display-dollars").text($("#dollars").val());
    $("#display-currency").text($("#currency-select").val());
    $("#display-result").show();
  });
});