var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;  
  let forecastElement = document.getElementsByClassName("forecast")
  if (n > forecastElement.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = forecastElement.length}
  for (i = 0; i < forecastElement.length; i++) {
    document.getElementsByClassName("forecast")[i].style.display = "none";  
  }
  document.getElementsByClassName("forecast")[slideIndex-1].style.display = "block";  
}