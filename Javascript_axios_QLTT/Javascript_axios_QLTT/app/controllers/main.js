var services = new Services();

function getELE(id) {
  return document.getElementById(id);
}

function getListProduct() {
  services
    .fetchData()
    .then(function (result) {
      renderHTML(result.data);
    })
    .catch(function (error) {
      renderHTML(error);
    });
}

function renderHTML(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var product = data[i];
    var {
      id,
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
    <tr>
    <td>${i + 1}</td>
    <td>${taiKhoan}</td>
    <td>${matKhau}</td>
    <td>${hoTen}</td>
    <td>${email}</td>
    <td>${ngonNgu}</td>
    <td>${loaiND}</td>
    <td>${hinhAnh}</td>
     <td>
     <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick ="sua('${id}')">Sửa</button>
     <button class="btn btn-danger" onclick ="xoa('${id}')">Xóa</button>
     </td>
      </tr>
    `;
  }
  getELE("tblDanhSachNguoiDung").innerHTML = content;
}

getListProduct();

/**
 * xóa người dùng
 */

function xoa(id) {
  console.log(id);
  services
    .deleteProduct(id)
    .then(function (result) {
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * thêm nút add và sửa lại tiêu đề
 */
getELE("btnThemNguoiDung").addEventListener("click", function () {
  document.querySelector(".modal-title").innerHTML = " Thêm người dùng  ";
  var footer = `  <button class="btn btn- btn-success" onclick="addProduct()">ADD</button>`;
  document.querySelector(".modal-footer").innerHTML = footer;
});
/**
 * Add
 */
function addProduct(isChecking = true) {
  var taiKhoan = getELE("TaiKhoan").value;
  var hoTen = getELE("HoTen").value;
  var matKhau = getELE("MatKhau").value;
  var email = getELE("Email").value;
  var hinhAnh = getELE("HinhAnh").value;
  var loaiND = getELE("loaiNguoiDung").value;
  var ngonNgu = getELE("loaiNgonNgu").value;
  var moTa = getELE("MoTa").value;

  //  tạo biến cờ flag
  var isValid = true;
  var productList = new ProductList();
  var validation = new Validation();
  // /**
  //  * kiểm tra tài khoản : ko trống , không trùng
  //  */

  isValid &= validation.kiemTraRong(
    taiKhoan,
    "tbTKNV",
    "(*) vui lòng nhập tài khoản"
  );
  //   validation.kiemTraKhoangTrang(
  //     taiKhoan,
  //     "tbTKNV",
  //     "(*) vui lòng không để khoảng trắng"
  //   );
  if (isChecking == true)
    isValid = validation.kiemTraTrung(
      taiKhoan,
      "tbTKNV",
      "(*) vui lòng không để khoảng trắng",
      productList.arr
    );

  /**
   * kiểm tra họ và tên : ko trống , không chữ số và ký tự DB
   */
  isValid &=
    validation.kiemTraRong(hoTen, "tbTen", "(*) vui lòng nhập Họ Và Tên") &&
    validation.kiemTraKyTu(hoTen, "tbTen", "(*) vui lòng nhập tên không ký tự");

  /**
   * kiểm tra pass : ko trống ,..
   */

  isValid &=
    validation.kiemTraRong(
      matKhau,
      "tbMatKhau",
      "(*) vui lòng nhập Mật Khẩu"
    ) &&
    validation.kiemTraPass(
      matKhau,
      "tbMatKhau",
      "(*) vui lòng nhập mật khẩu đúng format có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số"
    ) &&
    validation.kiemTraDoDai(
      matKhau,
      "tbMatKhau",
      "(*) độ dài mật khẩu từ 6-8 ",
      6,
      8
    );

  /**
   * kiểm tra email:ko trống ,đúng format email
   */
  isValid &=
    validation.kiemTraRong(email, "tbEmail", "(*) vui lòng nhập Email") &&
    validation.kiemTraEmail(
      email,
      "tbEmail",
      "(*) vui lòng nhập đúng format Email"
    );
  /**
   * kiểm tra hình ảnh
   */
  isValid &= validation.kiemTraRong(
    hinhAnh,
    "tbHinhAnh",
    "(*) vui lòng nhập hình ảnh"
  );
  /**
   * kiểm tra loại người dùng
   */
  isValid &=
    validation.kiemTraRong(
      loaiND,
      "tbNguoiDung",
      "(*) vui lòng  chọn người dùng"
    ) &&
    validation.chonGiaTri(
      loaiND,
      "tbNguoiDung",
      "(*) vui lòng chọn một người dùng"
    );
  /**
   * kiểm tra ngôn ngữ
   */
  isValid &=
    validation.kiemTraRong(
      ngonNgu,
      "tbNgonNgu",
      "(*) vui lòng chọn ngôn ngữ"
    ) &&
    validation.chonGiaTri(
      ngonNgu,
      "tbNgonNgu",
      "(*) vui lòng chọn một ngôn ngữ"
    );
  /**
   * kiểm tra mo tả
   */
  isValid &=
    validation.kiemTraRong(moTa, "tbMoTa", "(*) vui lòng nhập Mô Tả") &&
    validation.kiemTraDoDai(
      moTa,
      "tbMoTa",
      "(*) vui lòng không nhập vượt quá 60 ký tự ",
      0,
      60
    );
  // tạo  đối tượng
  var product = new Product(
    "",
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );

  if (isValid) {
    services
      .addProduct(product)
      .then(function (result) {
        getListProduct();
        // tat popup
        document.querySelector(".close").click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

/**
 * sửa thông tin
 */
function sua(id) {
  document.querySelector(".modal-title").innerHTML = " Sửa người dùng  ";
  var footer = `  <button class="btn btn- btn-primary" onclick="upProduct(${id})">UPDATE</button>`;
  document.querySelector(".modal-footer").innerHTML = footer;

  services
    .getProductId(id)
    .then(function (result) {
      var {
        id,
        taiKhoan,
        hoTen,
        matKhau,
        email,
        loaiND,
        ngonNgu,
        moTa,
        hinhAnh,
      } = result.data;
      getELE("TaiKhoan").value = taiKhoan;
      getELE("TaiKhoan").disabled = true;
      getELE("HoTen").value = hoTen;
      getELE("MatKhau").value = matKhau;
      getELE("Email").value = email;
      getELE("loaiNguoiDung").value = loaiND;
      getELE("loaiNgonNgu").value = ngonNgu;
      getELE("MoTa").value = moTa;
      getELE("HinhAnh").value = hinhAnh;
    })
    .catch(function (error) {
      console.log(error);
    });
}
/**
 * upp
 */
function upProduct(id) {
  var taiKhoan = getELE("TaiKhoan").value;
  var hoTen = getELE("HoTen").value;
  var matKhau = getELE("MatKhau").value;
  var email = getELE("Email").value;
  var loaiND = getELE("loaiNguoiDung").value;
  var ngonNgu = getELE("loaiNgonNgu").value;
  var moTa = getELE("MoTa").value;
  var hinhAnh = getELE("HinhAnh").value;

  var product = new Product(
    id,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );

  services
    .upProduct(id, product)
    .then(function (result) {
      getListProduct();
      //   tắt poopup
      document.querySelector(".close").click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
