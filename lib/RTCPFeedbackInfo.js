/** @typedef {import(".").RTCPFeedbackInfoPlain} RTCPFeedbackInfoPlain */
/** @typedef {import(".").RTCPFeedbackInfoLike} RTCPFeedbackInfoLike */

/**
 * RTCP Feedback parameter
 * @namespace
 */
class RTCPFeedbackInfo
{
	/**
	 * @constructor
	 * @alias RTCPFeedbackInfo
	 * @param {String} id		- RTCP feedback id
	 * @param {Array<String>} params - RTCP feedback params
	 */
	constructor(id, params) {
		this.id	= id;
		this.params = params || [];
	}
	
	/**
	 * Create a clone of this RTCPFeedbackParameter info object
	 * @returns {RTCPFeedbackInfo}
	 */
	clone() {
		//Return cloned one
		return new RTCPFeedbackInfo(this.id,this.params);
	}


	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {RTCPFeedbackInfoPlain} Plain javascript object
	 */
	plain() {
		if (this.params.length)
			return {
				id	: this.id,
				params	: this.params
			};
		else 
			return {
				id	: this.id
			};
	}
	
	/**
	 * Get id fo the rtcp feedback parameter
	 * @returns {String}
	 */
	getId() {
		return this.id;
	}
	
	/**
	 * Get codec  rtcp feedback parameters
	 * @returns {Array<String>} parameters
	 */
	getParams() {
		return this.params;
	}
}

/**
 * Expands a plain JSON object containing an CodecInfo
 * @param {RTCPFeedbackInfoLike} plain JSON object
 * @returns {RTCPFeedbackInfo} Parsed Codec info
 */
RTCPFeedbackInfo.expand = function(plain)
{
	//Ensure it is not already a RTCPFeedbackInfo object
	if (plain.constructor.name === "RTCPFeedbackInfo")
		return /** @type {RTCPFeedbackInfo} */ (plain);

	//Otherwise it is a plain object
	plain = /** @type {RTCPFeedbackInfoPlain} */ (plain);

	//Create new
	return new RTCPFeedbackInfo(
		plain.id,
		plain.params
	);
};

/**
 * Expands a plain JSON object containing an RTCPFeedbackInfo or a RTCPFeedbackInfo and clone it
 * @param {RTCPFeedbackInfoLike} plain JSON object or RTCPFeedbackInfo
 * @returns {RTCPFeedbackInfo} Cloned RTCPFeedbackInfo
 */
RTCPFeedbackInfo.clone = function(plain)
{
	return plain.constructor.name === "RTCPFeedbackInfo"  
		? /** @type {RTCPFeedbackInfo} */ (plain).clone()
		: RTCPFeedbackInfo.expand(plain);
}

module.exports = RTCPFeedbackInfo;
