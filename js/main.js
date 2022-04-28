const header = document.querySelector("#header");

function scrollheader(event) {
  if (window.scrollY > 0) {
    header.classList.add("header-onscroll");
    header.classList.remove("header-default");
  } else {
    header.classList.add("header-default");
    header.classList.remove("header-onscroll");
  }
}

window.addEventListener("scroll", scrollheader);
