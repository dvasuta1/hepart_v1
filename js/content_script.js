function drawHepardButton() {
	var d = document.createElement('span');
		$(d).attr('id', 'hepart_button')
			.addClass('active')
			.html(chrome.i18n.getMessage("hepart_run"))
			.prependTo($("#exportLotDetails"))
			.click(function () {
				$(this).removeClass('active');
				$(this).off('click');
				getLotinfoById(insertTableRows);
			});
}

function getLotinfoById(callback) {
	var url = window.location.href.replace(/\/$/, '');
	var lotId = url.substr(url.lastIndexOf('/') + 1);

	if (lotId) {
		$.get("https://www.copart.com/public/data/lotdetails/solr/" + lotId, function (data) {
			if (data && data.data.lotDetails) {
				callback && callback(data.data.lotDetails);
			}
		}, "json");
	} else {
		console.debug('Wrong lot id', lotId);
	}
}

function insertTableRows(data) {
	var sellerRow = document.querySelectorAll('[data-uname~="lotdetailSeller"]');
	if (sellerRow.length === 0 && data.std && data.snm) {
		var container = $(document.querySelectorAll('[data-uname~="lotdetailPrimarydamage"]'));
		container = container.parent().parent();
		var tmpl = "<div><div class='details hepart_row'><label>" + chrome.i18n.getMessage("hepart_seller_type") + "</label><span class='lot-details-desc col-md-6'>" + data.std + "</span></div></div>"
		tmpl += "<div><div class='details hepart_row'><label>" + chrome.i18n.getMessage("hepart_seller_name") + "</label><span  class='lot-details-desc col-md-6'>" + data.snm + "</span></div></div>"
		container.prepend($(tmpl));
	}
	if (data.rc) {
		var container = $(document.querySelectorAll('[data-uname~="lotdetailVin"]'));
		container = container.parent().parent();
		var tmpl = "<div><div class='details hepart_row'><label>" + chrome.i18n.getMessage("hepart_repair_cost") + "</label><span class='lot-details-desc col-md-6'>" + formatter.format(data.rc) + " " + data.cuc + "</span></div></div>"
		container.prepend($(tmpl));
	}
	if (data.ahb !== 0) {
		var container = $(document.querySelectorAll('[name=counterBidForm] .sold-bid .sold'));
		var tmpl = "<div class='sold hepart_final_price'>" + chrome.i18n.getMessage("hepart_final_price") + formatter.format(data.ahb) + " " + data.cuc + "</div>"
		container.after($(tmpl));
	}
}

var formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
});


chrome.extension.onMessage.addListener(
	function (request, sender, sendResponse) {
			if (request.action === "drawHepartBtn") {
				setTimeout(function(){
					drawHepardButton();
				}, 2000)
				
			}
	}
);

