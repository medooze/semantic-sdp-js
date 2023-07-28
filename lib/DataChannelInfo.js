/**
 * DataChannel info
 * @namespace
 */
class DataChannelInfo
{
	/**
	 * @constructor
	 * @alias DataChannelInfo
	 * @param {Number} port
	 * @param {Number} maxMessageSize
	 * @param {String} keyParams
	 * @param {String} sessionParams
	 * @returns {DataChannelInfo}
	 */
	constructor(port,maxMessageSize)
	{
		//store properties
		this.port		= port;
		this.maxMessageSize	= maxMessageSize;
	}

	/**
	 * Create a clone of this D info object
	 * @returns {DataChannelInfo}
	 */
	clone() {
		//Clone
		return new DataChannelInfo(this.port,this.maxMessageSize);
	}


	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {Object} Plain javascript object
	 */
	plain() {
		return {
			port		: this.port,
			maxMessageSize	: this.maxMessageSize,
		};
	}
	/**
	 * Returns the sctp port number
	 * @returns {Number}
	 */
	getPort() {
		return this.port;
	}

	/**
	 * Get max message size
	 * @returns {Number}
	 */
	getMaxMessageSize() {
		return this.maxMessageSize;
	}
}

/**
 * Expands a plain JSON object containing an DataChannelInfo
 * @param {Object} plain JSON object
 * @returns {DataChannelInfo} Parsed SDES info
 */
DataChannelInfo.expand = function(plain)
{
	//Create new
	return new DataChannelInfo(
		plain.port,
		plain.maxMessageSize
	);
};

module.exports = DataChannelInfo;
