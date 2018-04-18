const database = firebase.database();

database.ref('/seller-list').once('value').then(snapshot => {
  const sellers = snapshot.val();
  $(document).ready(function () {
    sellers.map((seller) => {
      $(`td[value='${seller}']`).css('background-color', 'yellow');
    })
  });
});


