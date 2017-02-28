
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
	 * @returns {DTLSInfo}
	 */
	constructor(setup,hash,fingerprint)
	{
		//store properties
   		this.setup		= setup;
		this.hash		= hash;
		this.fingerprint	= fingerprint;
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


module.exports = DTLSInfo;