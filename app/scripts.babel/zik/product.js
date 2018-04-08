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
    database.ref('/seller-list').once('value').then(snapshot => {
      const sellers = snapshot.val();

      sellers.map((seller) => {
        $(`td[value='${seller}']`).css('background-color', 'yellow');
      })
    });
  }, 0)
});
