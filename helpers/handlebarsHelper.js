module.exports = {
	modulo: function(a, b) {
		return a % b;
	},
	ifEquals: function (arg1, arg2, options) {
		return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
	},
	annoucementDateFormat: function (dateStr) {
		const date = new Date(dateStr);
		const year = date.getFullYear();
		let month = date.getMonth() + 1;
		if (month < 10) {
			month = '0' + month;
		}
		let day = date.getDate();
		if (day < 10) {
			day = '0' + day;
		}
		let hour = date.getHours();
		if (hour < 10) {
			hour = '0' + hour;
		}
		let minute = date.getMinutes();
		if (minute < 10) {
			minute = '0' + minute;
		}
		return `${day}/${month}/${year} - ${hour}:${minute}`;
	},
	formatMoney: function(money) {
		return money.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
	},
	increaseOne: function(num) {
		return num + 1;
	}
}