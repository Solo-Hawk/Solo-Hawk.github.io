function loadPage() {
  setTimeout(showPage, 1000);
  
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("main").style.display = "block";
  setTimeout(function(){
    document.getElementById("main").style.animation = "fade 1s forwards";
//    document.getElementById("main").style.opacity = "1";
  
  }, 100)
  
  
}
