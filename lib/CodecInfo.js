const RTCPFeedbackInfo = require("./RTCPFeedbackInfo");
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
	 * @param {Object} params	- Format params for codec
	 * @returns {CodecInfo}
	 */
	constructor(codec, type, params) {
		this.codec	= codec;
		this.type	= type;
		this.params	= {};
		this.rtcpfbs	= new Set(); 
		//Add params if any
		if (params) this.addParams(params);
	}

	/**
	 * Create a clone of this Codec info object
	 * @returns {CodecInfo}
	 */
	clone() {
		//Clone
		const cloned =  new CodecInfo(this.codec,this.type,this.params);
		//Set rtx
		if (this.hasRTX())
			//Set it
			cloned.setRTX(this.getRTX());
		//For each rtcp fb parameter
		for (const rtcfb of this.rtcpfbs)
			//Add it
			cloned.addRTCPFeedback(rtcfb.clone());
		
		//If we have channles
		if (this.hasChannels())
			//Set them
			cloned.setChannels(this.getChannels());
		//Return cloned one
		return cloned;
	}

	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {Object} Plain javascript object
	 */
	plain() {
		//Plain object
		const plain = {
			codec	: this.codec,
			type	: this.type
		};
		//Set rtx
		if (this.rtx)
			//Set it
			plain.rtx = this.rtx;
		//Set channels
		if (this.channels)
			//Set it
			plain.channels = this.channels;
		//If we have params
		if (Object.keys(this.params).length)
			//Add params
			plain.params = this.params;
		//For each rtcp fb parameter
		for (const rtcfb of this.rtcpfbs)
		{
			//If first
			if (!plain.rtcpfbs) plain.rtcpfbs = [];
			//Add it
			plain.rtcpfbs.push(rtcfb.plain());
		}
		//Done
		return plain;
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
	 * @param {Number} type
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
	
	/*
	 * Add codec info params
	 * @returns {Object} params
	 */
	addParams(params) {
		for (const k in params)
			this.params[k] = params[k];
	}

	/**
	 * Add codec info param
	 * @param {String} key
	 * @param {String} value
	 */
	addParam(key,value) {
		this.params[key] = value;
	}
	
	/**
	 * Check if codec has requested param
	 * @param {String} key
	 * @returns {Boolean} 
	 */
	hasParam(key) {
		return this.params.hasOwnProperty(key);
	}
	
	/**
	 * Get param
	 * @param {String} key
	 * @param {String} defaultValue default value if param is not found
	 * @returns {Boolean} 
	 */
	getParam(key,defaultValue) {
		return this.hasParam(key) ? this.params[key] : "" + defaultValue;
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
	
	/**
	 * Check if this codec has number of channels
	 * @returns {Number}
	 */
	hasChannels() {
		return this.channels;
	}

	/**
	 * Get the number of channels
	 * @returns {Number}
	 */
	getChannels() {
		return this.channels;
	}
	
	
	/**
	 * Set the number of channels
	 * @param {Number} channels
	 */
	setChannels(channels) {
		this.channels = channels;
	}
	
	/**
	 * Add an RTCP feedback parameter to this codec type
	 * @param {RTCPFeedbackInfo} rtcpfb - RTCP feedback info object
	 */
	addRTCPFeedback(rtcpfb) {
		this.rtcpfbs.add(rtcpfb);
		
	}
	
	/**
	 * Get all extensions rtcp feedback parameters in this codec info
	 * @returns {Set<RTCPFeedbackInfo>}
	 */
	getRTCPFeedbacks() {
		return this.rtcpfbs;
	}
}

/**
 * Expands a plain JSON object containing an CodecInfo
 * @param {Object} plain JSON object
 * @returns {CodecInfo} Parsed Codec info
 */
CodecInfo.expand = function(plain)
{
	//Create new
	const codecInfo = new CodecInfo(
		plain.codec,
		plain.type,
		plain.params
	);

	//If they have rtx
	if (plain.rtx)
		//Set it
		codecInfo.setRTX(plain.rtx);
	//If we have number of channels
	if (plain.channels)
		//Set it
		codecInfo.setChannels(plain.channels);
	
	//For each rtfpcfb
	for (let i=0; plain.rtcpfbs && i<plain.rtcpfbs.length;++i)
	{
		//Expand rtcp feedback
		const rtcpFeedbackInfo = RTCPFeedbackInfo.expand(plain.rtcpfbs[i]);
		//Push cloned extension
		codecInfo.addRTCPFeedback(rtcpFeedbackInfo);
	}
	
	return codecInfo;
};

/**
 * Create a map of CodecInfo from codec names.
 * Payload type is assigned dinamically
 * @param {Array<String>} names
 * @param {Boolean} rtx - Should we add rtx?
 * @param {Array<String>} params - RTCP feedback params
 * @returns {Map<String,CodecInfo>}
 */
CodecInfo.MapFromNames = function(names,rtx,rtcpfbs)
{
	//The codec map
	const codecs = new Map();

	//Base dyn payload
	let dyn = 96;
	//For each name
	for (let i=0;i<names.length;++i)
	{
		let pt;
		//We can add params to codec names
		const params = names[i].split(";");
		//Get codec name
		const name = params[0].toLowerCase().trim();
		//Check name
		if (name==="pcmu")
			pt = 0;
		else if (name==="pcma")
			pt = 8;
		else
			//Dynamic
			pt = ++dyn;
		//Create new codec
		const codec = new CodecInfo(name,pt);
		//Set default number of channels
		if (name==="opus")
			//two
			codec.setChannels(2);
		else if (name==="multiopus")
			//5.1 by default
			codec.setChannels(6);
		//Check if we have to add rtx
		if (rtx && name!=="ulpfec" && name!=="flexfec-03" && name!=="red")
			//Add it
			codec.setRTX(++dyn);
		
		//Append all the  rtcp feedback info
		for (let j=0;rtcpfbs && j<rtcpfbs.length;++j)
			//Add rtcp feednack
			codec.addRTCPFeedback(new RTCPFeedbackInfo(rtcpfbs[j].id, rtcpfbs[j].params));
		//Add params if any
		for (let j=1;j<params.length;++j)
		{
			//Split it
			let param = params[j].split("=");
			//Add it
			codec.addParam(param[0].trim(),param[1].trim());
		}
		//Append
		codecs.set(codec.getCodec().toLowerCase(),codec);
	}
	//Get the map
	return codecs;
};

module.exports = CodecInfo;
