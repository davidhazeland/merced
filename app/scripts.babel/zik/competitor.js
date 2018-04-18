const VALID_SELLER_PRODUCT_COUNT = 3;

syncValidSeller();

function syncValidSeller() {
  const database = firebase.database();
  database.ref('/valid-seller-list').once('value').then(snapshot => {
    const sellers = snapshot.val() || [];

    $(document).ready(function () {
      setTimeout(function() {
        const itemList = ci();

        if (!itemList || itemList.length < VALID_SELLER_PRODUCT_COUNT) {
          console.log('Nothing to sync.', itemList);
        } else {
          const {Competitor: seller} = getUrlVars();
          const itemIdList = itemList.map(item => item.id);

          const index = _.findIndex(sellers, s => s.name === seller);

          if (index !== -1) {
            sellers[index] = {
              name: seller,
              items: _.uniq([
                ...sellers[index].items,
                ...itemIdList
              ])
            };
            database.ref('/valid-seller-list').set(sellers);
          } else {
            database.ref('/valid-seller-list').set([
              ...sellers,
              {
                name: seller,
                items: itemIdList
              }
            ]);
          }
          console.log(`Valid seller synced with ${itemIdList.length} items`);
        }
      }, 5000)
    });
  });
}

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
