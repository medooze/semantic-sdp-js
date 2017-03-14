/**
 * Codec information extracted for RTP payloads
 * @namespace
 */
class CodecInfo {

	/**
	 * @constructor
	 * @alias CodecInfo
	 * @param {String} codec	- Codec name
	 * @param {Number} type		- the payload type number
	 * @param {String} params	- Format params for codec
	 * @returns {CodecInfo}
	 */
	constructor(codec, type, params) {
		this.codec	= codec;
		this.type	= type;
		this.params	= params;
	}
	
	/**
	 * Create a clone of this Codec info object
	 * @returns {CodecInfo}
	 */
	clone() {
		//Clone
		return new CodecInfo(this.codec,this.type,this.params);
	}
	
	
	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {Object} Plain javascript object
	 */
	plain() {
		return {
			codec	: this.codec,
			type	: this.type,
			params	: this.params
		};
	}
	
	/**
	 * Set the RTX payload type number for this codec
	 * @param {Number} rtx
	 */
	setRTX(rtx) {
		this.rtx = rtx;
	}

	/**
	 * Get payload type for codec
	 * @returns {Number}
	 */
	getType() {
		return this.type;
	}

	/**
	 * Get codec name
	 * @returns {String}
	 */
	getCodec() {
		return this.codec;
	}

	/**
	 * Get codec format parameters
	 */
	getParams() {
		return this.params;
	}

	/**
	 * Check if this codec has an associated RTX payload type
	 * @returns {Number}
	 */
	hasRTX() {
		return this.rtx;
	}
	
	/**
	 * Get the associated RTX payload type for this codec
	 * @returns {Number}
	 */
	getRTX() {
		return this.rtx;
	}
}

module.exports = CodecInfo;
