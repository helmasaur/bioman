// String
exports.isEmpty = str => {
	return (!str || 0 === str.length);
};

exports.upperFirst = str => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

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