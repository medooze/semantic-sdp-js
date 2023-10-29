const Setup		 = require("./Setup");

/** @typedef {import(".").DTLSInfoPlain} DTLSInfoPlain */
/** @typedef {import(".").DTLSInfoLike} DTLSInfoLike */

/**
 * DTLS peer info
 * @namespace
 */
class DTLSInfo
{
	/**
	 * @constructor
	 * @alias DTLSInfo
	 * @param {Setup} setup		- Setup type
	 * @param {String} hash		- Hash function
	 * @param {String} fingerprint	- Peer fingerprint
	 */
	constructor(setup,hash,fingerprint)
	{
		//store properties
   		this.setup		= setup;
		this.hash		= hash;
		this.fingerprint	= fingerprint;
	}

	/**
	 * Create a clone of this DTLS info object
	 * @returns {DTLSInfo}
	 */
	clone() {
		//Clone
		return new DTLSInfo(this.setup,this.hash,this.fingerprint);
	}


	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {DTLSInfoPlain} Plain javascript object
	 */
	plain() {
		return {
			setup		: Setup.toString (this.setup),
			hash		: this.hash,
			fingerprint	: this.fingerprint
		};
	}

	/**
	 * Get peer fingerprint
	 * @returns {String}
	 */
	getFingerprint() {
		return this.fingerprint;
	}

	/**
	 * Get hash function name
	 * @returns {String}
	 */
	getHash() {
		return this.hash;
	}

	/**
	 * Get connection setup
	 * @returns {Setup}
	 */
	getSetup() {
		return this.setup;
	}

	/**
	 * Set connection setup
	 * @param {Setup} setup
	 */
	setSetup(setup) {
		this.setup = setup;
	}

}

/**
 * Expands a plain JSON object containing an DTLSInfo
 * @param {DTLSInfoLike} plain JSON object
 * @returns {DTLSInfo} Parsed DTLS info
 */
DTLSInfo.expand = function(plain)
{
	//Ensure it is not already a DTLSInfo object
	if (plain.constructor.name === "DTLSInfo")
		return /** @type {DTLSInfo} */ (plain);

	//Otherwise it is a plain object
	plain = /** @type {DTLSInfoPlain} */ (plain);

	//Create new
	return new DTLSInfo(
		plain.setup ? Setup.byValue(plain.setup) : Setup.ACTPASS,
		plain.hash,
		plain.fingerprint
	);
};

/**
 * Expands a plain JSON object containing an DTLSInfo or a DTLSInfo and clone it
 * @param {DTLSInfoLike} plain JSON object or DTLSInfo
 * @returns {DTLSInfo} Cloned DTLSInfo
 */
DTLSInfo.clone = function(plain)
{
	return plain.constructor.name === "DTLSInfo"  
		? /** @type {DTLSInfo} */ (plain).clone()
		: DTLSInfo.expand(plain);
}

module.exports = DTLSInfo;
