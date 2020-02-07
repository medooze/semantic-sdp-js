/**
 * SDES peer info
 * @namespace
 */
class CryptoInfo
{
	/**
	 * @constructor
	 * @alias CryptoInfo
	 * @param {Number} tag
	 * @param {String} suite
	 * @param {String} keyParams
	 * @param {String} sessionParams
	 * @returns {CryptoInfo}
	 */
	constructor(tag,suite,keyParams,sessionParams)
	{
		//store properties
		this.tag		= tag;
		this.suite		= suite;
		this.keyParams		= keyParams;
		this.sessionParams	= sessionParams;
	}

	/**
	 * Create a clone of this SDES info object
	 * @returns {CryptoInfo}
	 */
	clone() {
		//Clone
		return new CryptoInfo(this.tag,this.suite,this.keyParams,this.sessionParams);
	}


	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {Object} Plain javascript object
	 */
	plain() {
		return {
			tag		: this.tag,
			suite		: this.suite,
			keyParams 	: this.keyParams,
			sessionParams	: this.sessionParams
		};
	}

	/**
	 * Return the SDES session params
	 * @returns {String}
	 */
	getSessionParams() {
		return this.sessionParams;
	}

	/**
	 * Return the SDES key params
	 * @returns {String}
	 */
	getKeyParams() {
		return this.keyParams;
	}

	/**
	 * Returns the chypher suite
	 * @returns {String}
	 */
	getSuite() {
		return this.suite;
	}

	/**
	 * Get SDES tag
	 * @returns {Number}
	 */
	getTag() {
		return this.tag;
	}
}

/**
 * Expands a plain JSON object containing an CryptoInfo
 * @param {Object} plain JSON object
 * @returns {CryptoInfo} Parsed SDES info
 */
CryptoInfo.expand = function(plain)
{
	//Create new
	return new CryptoInfo(
		plain.tag,
		plain.suite,
		plain.keyParams,
		plain.sessionParams
	);
};

module.exports = CryptoInfo;
