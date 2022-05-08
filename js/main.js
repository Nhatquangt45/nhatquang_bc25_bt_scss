const header = document.querySelector("#header");
const services = new Services();
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
function getELE(id) {
  return document.getElementById(id);
}

function renderHTML(data) {
  console.log(data);
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var product = data[i];
    var {
      taiKhoan,
      hoTen,
      matKhau,
      email,
      loaiND,
      ngonNgu,
      moTa,
      hinhAnh,
    } = product;
    content += `
  <div class="col-12 col-md-6 col-lg-3">
    <div class="card">
        <div class="card-img">
            <img class="card-img-top" src="./img/${hinhAnh}" alt="">
        </div>
        <div class="card-body">
        <h4 class="card-title2">${hoTen}</h4>
            <h6 class="card-title1">${loaiND}</h6>
            <h6 class="card-title1">${ngonNgu}</h6>
            <p class="card-text">${moTa}</p>
        </div>
    </div>
</div>
    `;
  }
  getELE("product_list").innerHTML = content;
}

function getListProduct() {
  // show loanding
  getELE("loanding").style.display = "block";
  services
    .fetchDaTa()
    .then(function (result) {
      // hide
      getELE("loanding").style.display = "none";
      renderHTML(result.data);
    })
    .catch(function (error) {
      getELE("loanding").style.display = "none";
      renderHTML(error);
    });
}
getListProduct();
