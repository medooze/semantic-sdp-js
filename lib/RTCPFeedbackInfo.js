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
	 * @returns {RTCPFeedbackInfo}
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
	 * @returns {Object} Plain javascript object
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
 * @param {Object} plain JSON object
 * @returns {CodecInfo} Parsed Codec info
 */
RTCPFeedbackInfo.expand = function(plain)
{
	//Create new
	return new RTCPFeedbackInfo(
		plain.id,
		plain.params
	);
};

module.exports = RTCPFeedbackInfo;