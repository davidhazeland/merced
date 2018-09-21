"use strict";

function handleCopyClick(e) {
  e.preventDefault();
  const addresses = $('#ship-address .address');
  const hasAddress2 = addresses.length === 5;
  const [zip, province, ...city]  = (hasAddress2 ? $(addresses[3]).text() : $(addresses[2]).text()).split(' ').reverse();

  saveData({
    name: $(addresses[0]).text(),
    address1: $(addresses[1]).text(),
    address2: hasAddress2 ? $(addresses[2]).text() : '',
    city: city.join(' '),
    province: province,
    zip: zip,
    country: hasAddress2 ? $(addresses[4]).text() : $(addresses[3]).text(),
    phone: $($('.purchase-details .info-item dd')[2]).text(),
  })
}

function handleCopyGlobalClick(e) {
  e.preventDefault();
  let a = $(".shreskin-edit-sales-record-title .help").parent().children(), t = {
    name: $('.buyer-details dd').html().split('<span class="user-id"')[0],
    address1: "1850 Airport Exchange Blvd #200",
    address2: $($('#ship-address .address')[0]).text(),
    city: "Erlanger",
    province: "KY",
    zip: "41025",
    country: 1,
    phone: $($('.purchase-details .info-item dd')[2]).text()
  };
  saveData(t)
}

$(document).ready(function () {
  let e = $('<input type="button" class="merced-copy buttonsm" value="Copy"/>'),
    a = $('<input type="button" class="merced-copy-global buttonsm" value="Copy"/>');
  $("h2:contains('Shipping details')").append(e), $(".title-wrapper:contains('Global Shipping Program')").append(a), $(".merced-copy").on("click", handleCopyClick), $(".merced-copy-global").on("click", handleCopyGlobalClick)
});

let getValue = function (e) {
  return $("[name='" + e + "']").val()
}, saveData = function (e) {
  chrome.storage.local.set({data: JSON.stringify(e)}, function () {
    console.log(e), console.log("Data saved")
  })
};
//# sourceMappingURL=copy-details.js.map
