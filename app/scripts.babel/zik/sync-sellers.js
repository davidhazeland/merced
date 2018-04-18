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

function syncSeller() {
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
}

syncSeller();
