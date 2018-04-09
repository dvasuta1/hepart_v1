var domTranslations = {
	ru: {
		"hepart_run": {
			"message": "Поехали!",
			"description": "Run button"
		},
		"hepart_repair_cost": {
			"message": "Оценочная стоимость ремонта:",
			"description": "Est. Repair Cost"
		},
		"hepart_seller_type": {
			"message": "Тип продавца:",
			"description": "Seller type"
		},
		"hepart_seller_name": {
			"message": "Продавец:",
			"description": "Seller name"
		},
		"hepart_final_price": {
			"message": "Продано за ",
			"description": "Final price"
		},
		"hepart_no_data": {
			"message": "Ничего нового:(",
			"description": "Final price"
		}
	},
	en: {
		"hepart_run": {
			"message": "Show me!",
			"description": "Run button"
		},
		"hepart_repair_cost": {
			"message": "Est. Repair Cost:",
			"description": "Est. Repair Cost"
		},
		"hepart_seller_type": {
			"message": "Seller type:",
			"description": "Seller type"
		},
		"hepart_seller_name": {
			"message": "Seller:",
			"description": "Seller name"
		},
		"hepart_final_price": {
			"message": "Sold for ",
			"description": "Final price"
		},
		"hepart_no_data": {
			"message": "No useful data available",
			"description": "Final price"
		}
	}
};

function getTranslatedText(key) {
	var getCookie = function (name) {
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if (parts.length == 2) return parts.pop().split(";").shift();
	};
	var getLang = function () {
		return getCookie('userLang') || 'en';
	};

	var text = chrome.i18n.getMessage(key);
	var lang = getLang();
	var storedTranslations = domTranslations[lang];
	if (storedTranslations[key] && storedTranslations[key].message) {
		text = storedTranslations[key].message;
	}
	return text;

}

/*class LocalisationClass {
	getCookie(name) {
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if (parts.length == 2) return parts.pop().split(";").shift();
	}
	get lang() {
		return this.getCookie('userLang') || 'en';
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

var localeEx = new LocalisationClass(); */