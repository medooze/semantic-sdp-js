const Enum = require("./Enum");
/**
 * Enum for DirectionWay Way values.
 * @readonly
 * @enum {number}
 */
const DirectionWay = Enum("SEND","RECV");

/**
 * Get Direction Way by name
 * @memberOf DirectionWay
 * @param {string} direction
 * @returns {DirectionWay}
 */
DirectionWay.byValue = function(direction)
{
	return DirectionWay[direction.toUpperCase()];
};

/**
 * Get Direction Way name
 * @memberOf DirectionWay
 * @param {DirectionWay} direction
 * @returns {String}
 */
DirectionWay.toString = function(direction)
{
	switch(direction)
	{
		case DirectionWay.SEND:
			return "send";
		case DirectionWay.RECV:
			return "recv";
	}
};

/**
 * Get reverse direction way
 * @memberOf DirectionWay
 * @param {DirectionWay} direction
 * @returns {DirectionWay} Reversed direction
 */
DirectionWay.reverse = function(direction)
{
	switch(direction)
	{
		case DirectionWay.SEND:
			return DirectionWay.RECV;
		case DirectionWay.RECV:
			return DirectionWay.SEND;
	}
};

module.exports = DirectionWay;