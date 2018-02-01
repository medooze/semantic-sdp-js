
function Enum () {

	var _this = this;

	if (!(this instanceof Enum))
		return new (Function.prototype.bind.apply (Enum, [null].concat (Array.prototype.slice.call (arguments)))) ();
	Array.from (arguments).forEach (function (arg) {
		_this[arg] = Symbol.for("MEDOOZE_SEMANTIC_SDP_"+arg);
	});
}

module.exports = Enum;