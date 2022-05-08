function Validation() {
  this.kiemTraRong = function (value, divId, mess) {
    if (value == "") {
      // bị lỗi
      getELE(divId).innerHTML = mess;
      getELE(divId).style.display = "block";
      return false;
    } else {
      getELE(divId).style.display = "none";
      return true;
    }
  };

  this.kiemTraKyTu = function (value, divId, mess) {
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.toString().match(letter)) {
      // hợp lệ

      getELE(divId).style.display = "none";
      return true;
    } else {
      getELE(divId).innerHTML = mess;
      getELE(divId).style.display = "block";
      return false;
    }
  };

  this.kiemTraKhoangTrang = function (value, divId, mess) {
    if (/\s/g.test(value)) {
      // bị lỗi
      getELE(divId).innerHTML = mess;
      getELE(divId).style.display = "block";
    } else {
      // ko bị lỗi
      getELE(divId).innerHTML = "";
      getELE(divId).style.display = "none";
    }
  };

  this.kiemTraTrung = function (value, divId, mess, arr) {
    var status = false;
    for (var i = 0; i < arr.length; i++) {
      var user = arr[i];
      if (value == user.taiKhoan) {
        status = true;
        break;
      }
    }
    if (status) {
      //khong hop le
      getELE(divId).innerHTML = mess;
      getELE(divId).style.display = "block";
      return false;
    }

    // hop le
    getELE(divId).style.display = "none";
    return true;
  };
  this.chonGiaTri = function (value, divId, defautMess) {
    if (value === defautMess) {
      getELE(divId).innerHTML = "(*)Vui lòng chọn giá trị ";
      getELE(divId).style.display = "block";
      return false;
    } else {
      getELE(divId).style.display = "none";
      return true;
    }
  };
  this.kiemTraPass = function (value, divId, mess) {
    var letter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (value.match(letter)) {
      //hop le
      getELE(divId).style.display = "none";
      return true;
    }
    // ko hop le
    getELE(divId).innerHTML = mess;
    getELE(divId).style.display = "block";
    return false;
  };

  this.kiemTraDoDai = function (value, divId, mess, min, max) {
    if (value.trim().length >= min && value.trim().length <= max) {
      //hop le
      getELE(divId).style.display = "none";
      return true;
    }
    // ko hop le
    getELE(divId).innerHTML = mess;
    getELE(divId).style.display = "block";
  };

  this.kiemTraEmail = function (value, divId, mess) {
    var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(letter)) {
      //hop le
      getELE(divId).style.display = "none";
      return true;
    }
    // ko hop le
    getELE(divId).innerHTML = mess;
    getELE(divId).style.display = "block";
    return false;
  };
}
