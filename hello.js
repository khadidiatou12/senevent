"use strict";
(function () {
  window.addEventListener("load", init); 

  function init() {
   id("hi").addEventListener("click",greet);
   qs("p").addEventListener(setTimeout, )
  }
  function changeColor() { 
    
  }

  function greet(){
    let myname = id("nom").value;
    let lastme= id("lastme").value;
    alert("Hello "+ myname +" "+ lastme);
  }

  function id(id) {
    return document.getElementById(id);
  }

  function qs(selector) {
    return document.querySelector(selector);
  }
})();