// Integer
exports.isEven = n => {
	return (n & 1) === 0;
};

// String
exports.isEmpty = str => {
	return (!str || 0 === str.length);
};

exports.upperFirst = str => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

exports.replaceAt = (str, char, i) => {
	if(i > str.length - 1 || str.charAt(i) === char) {
		return str;
	}
	return str.substr(0, i) + char + str.substr(i + 1);
}

// Collection
exports.difference = (coll1, coll2) => {
	return coll1.filterArray((fn, k) => {
		return !coll2.has(k);
	});
};

// Object
exports.listData = data => {
	let list = '';

	for (let keyword in data) {
		list += `${keyword}, `;
	}

	return list.slice(0, -2);
};