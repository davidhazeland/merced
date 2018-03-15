function handlePasteClick() {
  chrome.storage.local.get("data", function (e) {
    let t = JSON.parse(e.data);
    setValue("enterAddressFullName", t.name), setValue("enterAddressAddressLine1", t.address1), setValue("enterAddressAddressLine2", t.address2), setValue("enterAddressCity", t.city), setValue("enterAddressStateOrRegion", t.province), setValue("enterAddressPostalCode", t.zip), setValue("enterAddressPhoneNumber", "" + t.phone1 + t.phone2 + t.phone3)
  })
}

$(document).ready(function () {
  let e = !1;
  $("#add-new-address-popover-link").on("click", function () {
    e || (e = !0, setTimeout(function () {
      let e = $('<input type="button" class="merced-paste" value="Paste"/>');
      $(".a-popover-footer [data-action='a-popover-close']").parent().append(e), $(".merced-paste").on("click", handlePasteClick)
    }, 1e3))
  })
});
let setValue = function (e, t) {
  $("[name='" + e + "']").val(t)
};
//# sourceMappingURL=amazon.js.map
