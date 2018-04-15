const compareDate = (a, b) => {
  const timeDiff = Math.abs(b.getTime() - a.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

const ci = (sale = 10, price = 5, date = 3650) => {
  const data = $('#datatable-responsive').dataTable().fnGetData();
  const filtered = data.filter(row => {
    const validSale = parseFloat(row[3]) >= sale;
    const validPrice = parseFloat(row[5].split(' ')[1]) >= price;
    const validDate = compareDate(new Date(), new Date(row[2])) <= date;
    return validSale && validPrice && validDate;
  });
  if (filtered.length === 0) return;
  const idList = filtered.map(row => {
    const id = row[1].match(/.+ebay.com\/itm\/(\d+)".+/)[1];
    return {
      id,
      date: row[2],
      sold: row[3],
      price: row[5]
    }
  });
  return idList;
};

function syncProduct () {
  const itemList = ci();
  if (!itemList) {
    const message = $(`<span>Nothing to sync</span>`);
    $("#info").css('display', 'block').append(message);
    return;
  }
  const tasks = itemList.map(item => {
    return (callback) => {
      // Default options are marked with *
      return fetch('https://seed.dropist.io/api/items', {
        body: JSON.stringify({
          item_id: item.id
        }),
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        },
        method: 'POST'
      })
        .then(response => {
          return response.json();
        })
        .catch(err => {
          callback(err);
        })
        .then(result => {
          callback(null, result)
        })
    }
  });
  async.parallelLimit(tasks, 10, (err, results) => {
    let message;
    if (err) {
      console.log(err);
      message = $(`<span>${err.message}</span>`);
    } else {
      console.log(results);
      message = $(`<span>Products Synced (${results.length})</span>`);
    }
    $("#info").css('display', 'block').append(message);
  })
}

$(document).ready(function () {
  setTimeout(function() {
    // syncProduct();
  }, 5000)
});
