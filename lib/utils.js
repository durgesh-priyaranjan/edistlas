module.exports = {
  flattenArray: function(arr, data) {
    var self = this;
    data = data || [];

    arr.forEach(item => {
      if (Array.isArray(item)) {
        return data.concat(self.flattenArray(item, data));
      } else {
        return data.push(item);
      }
    });
    return data;
  },

  sortBy: function(type, dataArr) {
    if (type === "asc") {
      dataArr = dataArr.sort();
    } else if (type === "desc") {
      dataArr = dataArr.sort(function(a, b) {
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
      });
    }

    return dataArr;
  }
};
