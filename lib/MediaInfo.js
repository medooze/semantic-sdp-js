const Direction = require ("./Direction");
/**
 * Media information (relates to a m-line in SDP)
 * @namespace
 */
class MediaInfo {
	/**
	 * @constructor
	 * @alias MediaInfo
	 * @param {String} id	- Media id
	 * @param {String} type	- Media type "audio"|"video"
	 * @returns {MediaInfo}
	 */
	constructor(id, type) {
		this.id		= id;
		this.type	= type;
		this.direction  = Direction.SENDRECV;
		this.extensions = new Map();
		this.codecs	= new Map();
		this.bitrate	= 0;
	}
	
	/**
	 * Clone MediaInfo object
	 * @returns {MediaInfo} cloned object
	 */
	clone() {
		//Cloned object
		const cloned = new MediaInfo(this.id, this.type);
		//Set direction
		cloned.setDirection(this.direction);
		//Set bitrate
		cloned.setBitrate(this.bitrate);
		//For each codec
		for (const codec of this.codecs.values())
			//Push cloned stream
			cloned.addCodec(codec.clone());
		//For each extension
		for (const [id,name] of this.extensions.entries())
			//Push cloned extension
			cloned.addExtension(id,name);
		//Return cloned object
		return cloned;
	}
	
	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {Object} Plain javascript object
	 */
	plain() {
		//Cloned object
		const plain = {
			id		: this.id,
			type		: this.type,
			direction	: Direction.toString (this.direction),
			extensions	: {},
			codecs		: []
		};
		//Check bitrate
		if (this.bitrate)
			//Add it
			plain.bitrate = this.bitrate;
		//For each codec
		for (const codec of this.codecs.values())
			//Push plain codec
			plain.codecs.push(codec.plain());
			
		//For each extension
		for (const [id,name] of this.extensions.entries())
			//Push extension
			plain.extensions[id] = name;
		//Return cloned object
		return plain;
	}

	/**
	 * Get media type "audio"|"video"
	 * @returns {String}
	 */
	getType() {
		return this.type;
	}

	/**
	 * Get id (msid) for the media info
	 * @returns {String}
	 */
	getId() {
		return this.id;
	}

	/**
	 * Add rtp header extension support
	 * @param {Number} id
	 * @param {String} name
	 */
	addExtension(id, name) {
		this.extensions.set(id, name);
	}

	/**
	 * Add Codec support information
	 * @param {CodecInfo} codecInfo - Codec info object
	 */
	addCodec(codecInfo) {
		this.codecs.set(codecInfo.getType(), codecInfo);
	}

	/**
	 * Get codec for payload type number
	 * @param {Number} type - Payload type number
	 * @returns {CodecInfo} codec info object
	 */
	getCodecForType(type) {
		return this.codecs.get(type);
	}
	
	/**
	 * Get codec by codec name
	 * @param {String} codec - Codec name (eg: "vp8")
	 * @returns {CodecInfo}
	 */
	getCodec(codec) {
		for (let info of this.codecs.values())
			if (info.getCodec().toLowerCase()===codec.toLowerCase())
				return info;
		return null;
	}
	
	/**
	 * Check if this media has information for this codec
	 * @param {String} codec - Codec name
	 * @returns {Boolean}
	 */
	hasCodec(codec) {
		return this.getCodec(codec)!==null;
	}

	/** 
	 * Get all codecs in this media
	 * @returns {Map<Number,CodecInfo>}
	 */
	getCodecs() {
		return this.codecs;
	}

	/**
	 * Get all extensions registered in  this media info
	 * @returns {Map<Number,String>}
	 */
	getExtensions() {
		return this.extensions;
	}

	/**
	 * Returns maximum bitrate for this media
	 * @returns {Number}
	 */
	getBitrate() {
		return this.bitrate;
	}

	/**
	 * Set maximum bitrate for this media
	 * @param {Number} bitrate
	 */
	setBitrate(bitrate) {
		this.bitrate = bitrate;
	}
	
	/**
	 * Get media direction
	 * @returns {Direction}
	 */
	getDirection() {
		return this.direction;
	}
	
	/**
	 * Set media direction
	 * @param {Direction} direction
	 */
	setDirection(direction) {
		this.direction = direction;
	}
	
}

MediaInfo.SupportedExtensions = 
[
	"urn:ietf:params:rtp-hdrext:ssrc-audio-level",
	"urn:ietf:params:rtp-hdrext:toffset",
	"http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time",
	"urn:3gpp:video-orientation",
	"http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01"
	//"http://www.webrtc.org/experiments/rtp-hdrext/playout-delay"
];

module.exports = MediaInfo;