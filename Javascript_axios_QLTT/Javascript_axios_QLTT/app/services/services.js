const API = "https://625bc0d0398f3bc782ae7de0.mockapi.io/api/QLND";
function Services() {
  this.fetchData = function () {
    return axios({
      url: API,
      method: "GET",
    });
  };

  this.deleteProduct = function (id) {
    return axios({
      url: API + "/" + id,
      // url: `${API}/${id}`,
      method: "DELETE",
    });
  };

  this.addProduct = function (product) {
    return axios({
      url: API,
      method: "POST",
      data: product,
    });
  };

  this.getProductId = function (id) {
    return axios({
      url: API + "/" + id,
      method: "GET",
    });
  };

  this.upProduct = function (id, data) {
    return axios({
      url: API + "/" + id,
      method: "PUT",
      data,
    });
  };
}
