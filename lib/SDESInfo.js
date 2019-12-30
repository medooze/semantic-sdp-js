/**
 * SDES peer info
 * @namespace
 */
class SDESInfo
{
	/**
	 * @constructor
	 * @alias SDESInfo
	 * @param {int} tag
	 * @param {String} cipher_suite
	 * @param {String} key_params
	 * @param {String} session_params
	 * @returns {SDESInfo}
	 */
	constructor(tag,cipher_suite,key_params,session_params)
	{
		//store properties
		this.tag			= tag;
		this.cipher_suite	= cipher_suite;
		this.key_params		= key_params;
		this.session_params	= session_params;
	}

	/**
	 * Create a clone of this SDES info object
	 * @returns {SDESInfo}
	 */
	clone() {
		//Clone
		return new SDESInfo(this.tag,this.cipher_suite,this.key_params,this.session_params);
	}


	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {Object} Plain javascript object
	 */
	plain() {
		return {
			tag		: this.tag,
			cipher_suite	: this.cipher_suite,
			key_params 	: this.key_params,
			session_params	: this.session_params
		};
	}

	/**

	 * @returns {String}
	 */
	getSessionParams() {
		return this.session_params;
	}

	/**

	 * @returns {String}
	 */
	getKeyParams() {
		return this.key_params;
	}

	/**
	 * @returns {String}
	 */
	getSuite() {
		return this.cipher_suite;
	}

	/**
	 * @returns {int}
	 */
	getTag() {
		return this.tag;
	}
}

/**
 * Expands a plain JSON object containing an SDESInfo
 * @param {Object} plain JSON object
 * @returns {SDESInfo} Parsed SDES info
 */
SDESInfo.expand = function(plain)
{
	//Create new
	return new SDESInfo(
		plain.tag,
		plain.cipher_suite,
		plain.key_params,
		plain.session_params
	);
};

module.exports = SDESInfo;