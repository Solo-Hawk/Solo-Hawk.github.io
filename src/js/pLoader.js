function loadPage() {
  setTimeout(showPage, 100);
  
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("main").style.display = "flex";
  setTimeout(function(){
    document.getElementById("main").style.animation = "fade 0.2s forwards";
//    document.getElementById("main").style.opacity = "1";
  
  }, 200)
  
  
}
