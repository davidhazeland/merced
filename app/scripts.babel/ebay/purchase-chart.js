const build = (t) => {
  return _.map(_.groupBy(t, function (t) {
    return moment(t.date).format("MM/DD/YYYY")
  }), function (t, e) {
    let a = t.reduce(function (t, e) {
      return t.quantity = t.quantity + 1, t.price = e.price, t
    }, {quantity: 0, price: 0}), r = a.quantity, i = a.price;
    return {price: i, quantity: r, date: e}
  })
};

function drawChart(t) {
  let e = document.getElementById("myChart");
  e.height = 300;
  let data = build(t);

  const saleData = data.map(function (t) {
    return t.quantity
  });
  const priceData = data.map(function (t) {
    return t.price
  });

  const lines = 5;
  const maxSale = Math.max(...saleData);
  const saleStep = Math.round(maxSale/lines);
  const maxSaleAxes = Math.round(maxSale/saleStep)*saleStep;

  const maxPrice = Math.max(...priceData);
  const priceStep = Math.round(maxPrice/lines);

  const config = {
    type: "line",
    data: {
      labels: data.map(function (t) {
        return moment(t.date, "MM/DD/YYYY").toDate()
      }), datasets: [{
        data: saleData,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255,99,132,0.8)",
        label: "Sales",
        yAxisID: "sales"
      }, {
        fill: !1,
        data: priceData,
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
        yAxes: [
          {
            id: "sales",
            ticks: {
              beginAtZero: !0,
              stepSize: saleStep,
              max: maxSaleAxes
            },
            position: "left",
            gridLines: {
              display: false
            }
          }, {
          id: "price",
            ticks: {
              beginAtZero: !0,
              stepSize: priceStep
            },
          gridLines: {display:true},
          position: "right"
        }]
      }
    }
  };
  new Chart(e, config)
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
//# sourceMappingURL=purchase-chart.js.map
