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
	 * @returns {TrackEncodingInfo}
	 */
	constructor(id,paused)
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
			cloned.addCodec(codec.cloned());
		//Add params
		cloned.setParams(this.params);
		//return cloned object
		return cloned;
	}
	
	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {Object} Plain javascript object
	 */
	plain() {
		var plain =  {
			id		: this.id,
			paused		: this.paused,
			codecs		: {},
			params		: {}
		};
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
	 * @returns {Map<String,CodecInfo>}
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
	 * Is the stream paused
	 * @returns {Boolean}
	 */
	isPaused() {
		return this.paused;
	}
}

module.exports = TrackEncodingInfo;