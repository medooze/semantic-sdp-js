const Enum = require("./Enum");
/**
 * Enum for Direction values.
 * @readonly
 * @enum {number}
 */
const Direction = Enum("SENDRECV","SENDONLY","RECVONLY","INACTIVE");

/**
 * Get Direction by name
 * @memberOf Direction
 * @param {string} Direction
 * @returns {Direction}
 */
Direction.byValue = function(direction)
{
	return Direction[direction.toUpperCase()];
};

/**
 * Get Direction name
 * @memberOf Direction
 * @param {Direction} Direction
 * @returns {String}
 */
Direction.toString = function(direction)
{
	switch(direction)
	{
		case Direction.SENDRECV: 
			return "sendrecv";
		case Direction.SENDONLY: 
			return "sendonly";
		case Direction.RECVONLY: 
			return "recvonly";
		case Direction.INACTIVE: 
			return "inactive";
	}
};

module.exports = Direction;