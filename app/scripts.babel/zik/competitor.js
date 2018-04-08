const compareDate = (a, b) => {
  const timeDiff = Math.abs(b.getTime() - a.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

const ci = (sale = 10, price = 5, date = 365) => {
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

function getUrlVars()
{
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++)
  {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

const config = {
  apiKey: "AIzaSyCh2JzXMnYajBzt7ytjHVe_Q6sXNFLb6YE",
  authDomain: "merced-13.firebaseapp.com",
  databaseURL: "https://merced-13.firebaseio.com",
  projectId: "merced-13",
  storageBucket: "merced-13.appspot.com",
  messagingSenderId: "1094482201047"
};
firebase.initializeApp(config);
const database = firebase.database();

database.ref('/seller-list').once('value').then(snapshot => {
  const sellers = snapshot.val() || [];

  const {Competitor} = getUrlVars();
  database.ref('/seller-list').set(_.uniq([
    ...sellers,
    Competitor
  ]));

  console.log('Seller synced');
});

$(document).ready(function () {
  setTimeout(function() {
    const itemList = ci();
    if (!itemList) {
      console.log('nothing to sync');
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
    async.parallelLimit(tasks, 20, (err, results) => {
      if (err) {
        console.log(err);
      }
      console.log(results);
      alert('Products synced.')
    })
  }, 5000)
});
