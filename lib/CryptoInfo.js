/** @typedef {import(".").CryptoInfoPlain} CryptoInfoPlain */
/** @typedef {import(".").CryptoInfoLike} CryptoInfoLike */

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
	 * @returns {CryptoInfoPlain} Plain javascript object
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
 * @param {CryptoInfoLike} plain JSON object
 * @returns {CryptoInfo} Parsed SDES info
 */
CryptoInfo.expand = function(plain)
{
	//Ensure it is not already a CryptoInfo object
	if (plain.constructor.name === "CryptoInfo")
		return /** @type {CryptoInfo} */ (plain);

	//Otherwise it is a plain object
	plain = /** @type {CryptoInfoPlain} */ (plain);

	//Create new
	return new CryptoInfo(
		plain.tag,
		plain.suite,
		plain.keyParams,
		plain.sessionParams
	);
};

/**
 * Expands a plain JSON object containing an CryptoInfo or a CryptoInfo and clone it
 * @param {CryptoInfoLike} plain JSON object or CryptoInfo
 * @returns {CryptoInfo} Cloned CryptoInfo
 */
CryptoInfo.clone = function(plain)
{
	return plain.constructor.name === "CryptoInfo"  
		? /** @type {CryptoInfo} */ (plain).clone()
		: CryptoInfo.expand(plain);
}

module.exports = CryptoInfo;
