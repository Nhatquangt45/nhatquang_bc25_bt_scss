function Services() {
  this.fetchDaTa = function () {
    return axios({
      url: "https://625bc0d0398f3bc782ae7de0.mockapi.io/api/QLND",
      method: "GET",
    });
  };
}
