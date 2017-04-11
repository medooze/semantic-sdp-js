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
		this.params	= params || {};
	}
	
	/**
	 * Create a clone of this Codec info object
	 * @returns {CodecInfo}
	 */
	clone() {
		//Clone
		const cloned =  new CodecInfo(this.codec,this.type,this.params);
		//Set rtx
		if (this.rtx)
			//Set it
			cloned.setRTX(this.rtx);
		//Return cloned one
		return cloned;
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
	 * Set the payload type for codec
	 * @params {Number} type
	 */
	setType(type) {
		this.type = type;
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


/**
 * Create a map of CodecInfo from codec names.
 * Payload type is assigned dinamically
 * @param {Array<String>} names 
 * @return Map<String,CodecInfo> 
 * @params {Boolean} rtx - Should we add rtx?
 */
CodecInfo.MapFromNames = function(names,rtx)
{
	//The codec map
	const codecs = new Map();
	
	//Base dyn payload
	let dyn = 96;
	//For each name
	for (let i=0;i<names.length;++i)
	{
		let pt;
		//Get codec name
		const name = names[i].toLowerCase();
		//Check name
		if (name==='pcmu')
			pt = 0;
		else if (name==='pcma')
			pt = 8;
		else 
			//Dynamic
			pt = ++dyn;
		//Create new codec
		const codec = new CodecInfo(name,pt);
		//Check if we have to add rtx
		if (rtx && name!=="ulpfec" && name!=="flexfec-03" && name!=="red")
			//Add it
			codec.setRTX(++dyn);
		//Append
		codecs.set(codec.getCodec().toLowerCase(),codec);
	}
	//Get the map
	return codecs;
};

module.exports = CodecInfo;
