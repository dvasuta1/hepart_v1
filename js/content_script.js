'use strict';

class LocalisationClass {
	getCookie(name) {
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if (parts.length == 2) return parts.pop().split(";").shift();
	}
	get lang() {
		return this.getCookie('userLang') || 'en';
	}
	get isRussianLang() {
		return this.lang === 'ru';
	}
	getMessage(key) {
		var text = chrome.i18n.getMessage(key);
		var storedTranslations = domTranslations[this.lang];
		if (storedTranslations[key] && storedTranslations[key].message) {
			text = storedTranslations[key].message;
		}
		return text;
	}
}
var localeEx = new LocalisationClass();

function drawHepardButton() {
	resetAll();
	var d = document.createElement('span');
	$(d).attr('id', 'hepart_button')
		.addClass('active')
		.html(localeEx.getMessage("hepart_run"))
		.prependTo($("#exportLotDetails"))
		.click(function () {
			$(this).removeClass('active');
			$(this).off('click');
			getLotinfoById(insertTableRows); 
		});
}

function resetAll(){
	//$.when($('#hepart_button, #hepart_seller_type, #hepart_seller_name, #hepart_final_price').remove()).then( cb );
	$('#hepart_button, #hepart_seller_type, #hepart_seller_name, #hepart_final_price').remove();
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
		var tmpl = "<div id='hepart_seller_type'><div class='details hepart_row'><label>" + localeEx.getMessage("hepart_seller_type") + "</label><span class='lot-details-desc col-md-6'>" + data.std + "</span></div></div>"
		tmpl += "<div id='hepart_seller_name'><div class='details hepart_row'><label>" + localeEx.getMessage("hepart_seller_name") + "</label><span  class='lot-details-desc col-md-6'>" + data.snm + "</span></div></div>"
		container.prepend($(tmpl));
	}
	if (data.rc) {
		var container = $(document.querySelectorAll('[data-uname~="lotdetailVin"]'));
		container = container.parent().parent();
		var tmpl = "<div id='hepart_repair_cost'><div class='details hepart_row'><label>" + localeEx.getMessage("hepart_repair_cost") + "</label><span class='lot-details-desc col-md-6'>" + formatter.format(data.rc) + " " + data.cuc + "</span></div></div>"
		container.prepend($(tmpl));
	}
	if (data.ahb !== 0) {
		var container = $(document.querySelectorAll('[name=counterBidForm] .sold-bid .sold'));
		var tmpl = "<div id='hepart_final_price' class='sold hepart_final_price'>" + localeEx.getMessage("hepart_final_price") + formatter.format(data.ahb) + " " + data.cuc + "</div>"
		container.after($(tmpl));
	}
}

var formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
});

/*
document.addEventListener("click", (e) => {
	if (e.target.classList.contains("beast")) {
	  var chosenBeast = e.target.textContent;
	  var chosenBeastURL = beastNameToURL(chosenBeast);
  
	  browser.tabs.executeScript(null, { 
		file: "/content_scripts/beastify.js" 
	  });
  
	  var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
	  gettingActiveTab.then((tabs) => {
		browser.tabs.sendMessage(tabs[0].id, {beastURL: chosenBeastURL});
	  });
	}
	else if (e.target.classList.contains("clear")) {
	  browser.tabs.reload();
	  window.close();
	}
  });
*/

chrome.extension.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.action === "drawHepartBtn") {
			setTimeout(function () {
				console.log('GO!');
				$('.view-all-photos .viewalltxt', '#lot-images-wrapper > div > div.lot-details-actions.no-margin > a').click(function(){
					drawHepardButton();
			   });	
			   drawHepardButton();
			}, 2000)
		}
	}
);

