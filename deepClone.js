function deepClone(src) {
	var copy = Array.isArray(src) ? [] : {};
	for (var item in src) {
		copy[item] = typeof src[item] == 'object' ?
			deepClone(src[item]) :
			src[item];
	}
	return copy;
}
