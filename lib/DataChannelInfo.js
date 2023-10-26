/** @typedef {import(".").DataChannelInfoPlain} DataChannelInfoPlain */

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
	 * @returns {DataChannelInfoPlain} Plain javascript object
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
 * @param {DataChannelInfoPlain | DataChannelInfo} plain JSON object
 * @returns {DataChannelInfo} Parsed SDES info
 */
DataChannelInfo.expand = function(plain)
{
	//Ensure it is not already a DataChannelInfo object
	if (plain.constructor.name === "DataChannelInfo")
		// @ts-ignore
		return plain;

	//Create new
	return new DataChannelInfo(
		plain.port,
		plain.maxMessageSize
	);
};

/**
 * Expands a plain JSON object containing an DataChannelInfo or a DataChannelInfo and clone it
 * @param {DataChannelInfoPlain | DataChannelInfo} plain JSON object or DataChannelInfo
 * @returns {DataChannelInfo} Cloned DataChannelInfo
 */
DataChannelInfo.clone = function(plain)
{
	return DataChannelInfo.expand(plain).clone();
}

module.exports = DataChannelInfo;
