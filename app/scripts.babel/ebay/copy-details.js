"use strict";

function handleCopyClick(e) {
  e.preventDefault();
  saveData({
    name: getValue("buyercontactname"),
    address1: getValue("buyeraddress1"),
    address2: getValue("buyeraddress2"),
    city: getValue("buyercity"),
    province: getValue("buyerstateprovince"),
    zip: getValue("buyerzip"),
    country: getValue("buyercountry"),
    phone1: getValue("dayphone1"),
    phone2: getValue("dayphone2"),
    phone3: getValue("dayphone3"),
    phone4: getValue("dayphone4")
  })
}

function handleCopyGlobalClick(e) {
  e.preventDefault();
  let a = $(".shreskin-edit-sales-record-title .help").parent().children(), t = {
    name: $(a[0]).text(),
    address1: "1850 Airport Exchange Blvd #200",
    address2: $(a[1]).text(),
    city: "Erlanger",
    province: "KY",
    zip: "41025",
    country: 1,
    phone1: 1,
    phone2: "",
    phone3: "",
    phone4: ""
  };
  saveData(t)
}

$(document).ready(function () {
  let e = $('<input type="button" class="merced-copy buttonsm" value="Copy"/>'),
    a = $('<input type="button" class="merced-copy-global buttonsm" value="Copy"/>');
  $("h3:contains('Buyer details')").append(e), $("h3:contains('Shipping Details')").append(a), $(".merced-copy").on("click", handleCopyClick), $(".merced-copy-global").on("click", handleCopyGlobalClick)
});
let getValue = function (e) {
  return $("[name='" + e + "']").val()
}, saveData = function (e) {
  chrome.storage.local.set({data: JSON.stringify(e)}, function () {
    copy(e), console.log(e), console.log("Data saved")
  })
};
//# sourceMappingURL=copy-details.js.map
