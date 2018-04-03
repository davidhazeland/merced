const compareDate = (a, b) => {
  const timeDiff = Math.abs(b.getTime() - a.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

const ci = (sale = 10, price = 10, date = 365) => {
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
  return _.keyBy(idList, 'id');
};



$(document).ready(function () {
  const config = {
    apiKey: "AIzaSyCh2JzXMnYajBzt7ytjHVe_Q6sXNFLb6YE",
    authDomain: "merced-13.firebaseapp.com",
    databaseURL: "https://merced-13.firebaseio.com",
    projectId: "merced-13",
    storageBucket: "merced-13.appspot.com",
    messagingSenderId: "1094482201047"
  };
  firebase.initializeApp(config);

  setTimeout(() => {
    const database = firebase.database();
    const username = $('#srcUsername').val();

    const idList = ci();

    if (!username) {
      return;
    }
    if (idList) {
      database.ref('/sellers/' + username).set(idList);
      console.log('synced');
    } else {
      database.ref('/sellers/' + username).set({
        isSynced: true
      });
      console.log('nothing to sync');
    }
  }, 5000)
});
