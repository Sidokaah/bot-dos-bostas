module.exports = {
  formatDate: function(date) {
    return new Intl.DateTimeFormat('PT').format(date)
  },
}