"use strict";

function drawChart(t) {
  let e = document.getElementById("myChart");
  e.height = 300;
  let a = _.map(_.groupBy(t, function (t) {
    return moment(t.date).format("MM/DD/YYYY")
  }), function (t, e) {
    let a = t.reduce(function (t, e) {
      return t.quantity = t.quantity + 1, t.price = e.price, t
    }, {quantity: 0, price: 0}), r = a.quantity, i = a.price;
    return {price: i, quantity: r, date: e}
  }), r = {
    type: "line",
    data: {
      labels: a.map(function (t) {
        return moment(t.date, "MM/DD/YYYY").toDate()
      }), datasets: [{
        data: a.map(function (t) {
          return t.quantity
        }),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255,99,132,0.8)",
        label: "Sales",
        yAxisID: "sales"
      }, {
        fill: !1,
        data: a.map(function (t) {
          return t.price
        }),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 0.8)",
        label: "Price",
        yAxisID: "price"
      }]
    },
    options: {
      maintainAspectRatio: !1,
      scales: {
        xAxes: [{
          type: "time",
          gridLines: {display: !1},
          time: {max: moment().toDate(), min: moment().subtract(30, "days").toDate(), unit: "day", round: !0}
        }],
        yAxes: [{id: "sales", ticks: {beginAtZero: !0}, gridLines: {display: !1}, position: "left"}, {
          id: "price",
          ticks: {beginAtZero: !0},
          position: "right"
        }]
      }
    }
  };
  new Chart(e, r)
}

$(document).ready(function () {
  let t = $(".newTabHeadBorder").parent().siblings(), e = $("th:contains('Date of Purchase')")[0].cellIndex,
    a = t.map(function () {
      let t = $(this).children();
      return {
        price: parseFloat($(t[e - 2]).text().substring(4)),
        quantity: parseInt($(t[e - 1]).text()),
        date: $(t[e]).text()
      }
    }).get(), r = $('<div style="height: 300px"><canvas id="myChart"></canvas></div>');
  $(".revmsg").after(r);
  let i = moment().subtract(30, "days");
  drawChart(a.filter(function (t) {
    let e = moment(t.date);
    return e.isValid() && e.isAfter(i)
  }))
});
//# sourceMappingURL=chart.js.map
