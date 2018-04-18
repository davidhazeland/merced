$(document).ready(function () {
  setTimeout(function() {
    // syncProduct();
  }, 5000)
});

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
