export const random_rgba = () => {
	const o = Math.round, r = Math.random, s = 255;

	return ['rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')', 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')'];
}

export const isOnlyNumberKey = (evt) => {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 47 && charCode < 58) {
        return true;
    } else {
        return false;
    }
}