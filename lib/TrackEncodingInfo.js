const CodecInfo = require("./CodecInfo");

/** @typedef {import(".").TrackEncodingInfoPlain} TrackEncodingInfoPlain */
/** @typedef {import(".").TrackEncodingInfoLike} TrackEncodingInfoLike */

/**
 * Simulcast encoding layer information for track
 * @namespace
 */
class TrackEncodingInfo
{
	/**
	 * @constructor
	 * @alias DTLSInfo
	 * @param {String} id		- rid value
	 * @param {Boolean} [paused]
	 */
	constructor(id,paused=false)
	{
		//store properties
   		this.id		= id;
		this.paused	= paused;
		this.codecs	= new Map();
		this.params	= new Map();
	}

	/**
	 * Create a clone of this RID info object
	 * @returns {TrackEncodingInfo}
	 */
	clone() {
		//Clone
		var cloned = new TrackEncodingInfo(this.id,this.paused);
		//For each codec
		for(let codec of this.codecs.values())
			//Add cloned
			cloned.addCodec(codec.clone());
		//Add params
		cloned.setParams(this.params);
		//return cloned object
		return cloned;
	}

	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {TrackEncodingInfoPlain} Plain javascript object
	 */
	plain() {
		var plain = /** @type {TrackEncodingInfoPlain} */ ({
			id		: this.id,
			paused		: this.paused,
			codecs		: {},
			params		: {}
		});
		//Add coces
		for (var [id,codec] of this.codecs.entries())
			//Add it
			plain.codecs[id] = codec.plain();
		//Add params
		for (var [id,param] of this.params.entries())
			//Add it
			plain.params[id] = param;
		//Return plain object
		return plain;
	}

	/**
	 * Get the rid id value
	 * @returns {String}
	 */
	getId() {
		return this.id;
	}


	/**
	 * Get codec information for this encoding (if any)
	 * @returns {Map<Number,CodecInfo>}
	 */
	getCodecs() {
		return this.codecs;
	}

	/**
	 * Add codec info
	 * @param {CodecInfo} codec - Codec Info
	 */
	addCodec(codec) {
		//Put it
		this.codecs.set(codec.getType(),codec);
	}

	/**
	 * Get the rid params
	 * @returns {Map<String,String>} The params map
	 */
	getParams() {
		return this.params;
	}

	/**
	 * Set the rid params
	 * @param {Map<String,String>} params - rid params map
	 */
	setParams(params) {
		this.params = new Map(params);
	}

	/**
	 * Add an rid param
	 * @param {String} id
	 * @param {String} param
	 */
	addParam(id,param) {
		this.params.set(id,param);
	}

	/**
	 * Is the stream paused
	 * @returns {Boolean}
	 */
	isPaused() {
		return this.paused;
	}
}

/**
 * Expands a plain JSON object containing an TrackEncodingInfo
 * @param {TrackEncodingInfoLike} plain JSON object
 * @returns {TrackEncodingInfo} Parsed TrackEncoding info
 */
TrackEncodingInfo.expand = function(plain)
{
	//Ensure it is not already a TrackEncodingInfo object
	if (plain.constructor.name === "TrackEncodingInfo")
		return /** @type {TrackEncodingInfo} */ (plain);

	//Otherwise it is a plain object
	plain = /** @type {TrackEncodingInfoPlain} */ (plain);

	//Create new
	const trackEncodingInfo = new TrackEncodingInfo(
		plain.id,
		plain.paused
	);
	//For each codec
	for(const codec of Object.values(plain.codecs || {}))
		//Add cloned
		trackEncodingInfo.addCodec(CodecInfo.expand(codec));
	//Add params
	for (const [id,param] of Object.entries(plain.params || {}))
		trackEncodingInfo.addParam(id,param);

	//Done
	return trackEncodingInfo;
};

/**
 * Expands a plain JSON object containing an TrackEncodingInfo or a TrackEncodingInfo and clone it
 * @param {TrackEncodingInfoLike} plain JSON object or TrackEncodingInfo
 * @returns {TrackEncodingInfo} Cloned TrackEncodingInfo
 */
TrackEncodingInfo.clone = function(plain)
{
	return plain.constructor.name === "TrackEncodingInfo"  
		? /** @type {TrackEncodingInfo} */ (plain).clone()
		: TrackEncodingInfo.expand(plain);
}

module.exports = TrackEncodingInfo;
