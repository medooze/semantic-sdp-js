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
 * @param {string} direction
 * @returns {Direction}
 */
Direction.byValue = function(direction)
{
	return Direction[direction.toUpperCase()];
};

/**
 * Get Direction name
 * @memberOf Direction
 * @param {Direction} direction
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

/**
 * Get reverse direction
 * @memberOf Direction
 * @param {Direction} direction
 * @returns {Direction} Reversed direction
 */
Direction.reverse = function(direction)
{
	switch(direction)
	{
		case Direction.SENDRECV:
			return Direction.SENDRECV;
		case Direction.SENDONLY:
			return Direction.RECVONLY;
		case Direction.RECVONLY:
			return Direction.SENDONLY;
		case Direction.INACTIVE:
			return Direction.INACTIVE;
	}
};

module.exports = Direction;