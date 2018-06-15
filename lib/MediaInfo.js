const CodecInfo		= require ("./CodecInfo");
const RIDInfo		= require ("./RIDInfo");
const SimulcastInfo	= require ("./SimulcastInfo");
const Direction		= require ("./Direction");
const DirectionWay	= require ("./DirectionWay");
const RTCPFeedbackInfo  = require ("./RTCPFeedbackInfo");
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
		this.rids	= new Map();
		this.simulcast  = null;
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
		//For each rid
		for (const rid of this.rids.values())
			//Push cloned extension
			cloned.addRID(rid.clone());
		//If it has simulcast stream info
		if (this.simulcast)
			//The simulcast info
			cloned.setSimulcast(this.simulcast.clone());
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
		{
			//if first
			if (!plain.extensions) plain.extensions = {};
			//Push extension
			plain.extensions[id] = name;
		}
		//For each rids
		for (const rid of this.rids.values())
		{
			//if first
			if (!plain.rids) plain.rids = [];
			//Push extension
			plain.rids.push(rid.plain());
		}
		//If it has simulcast stream info
		if (this.simulcast)
			//The simulcast info
			plain.simulcast = this.simulcast.plain();
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
	 * Set id (msid) for the media info
	 * @param {String} id
	 */
	setId(id) {
		this.id = id;
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
	 * Add rid information
	 * @param {RIDInfo} ridInfo
	 */
	addRID(ridInfo) {
		this.rids.set(ridInfo.getId(), ridInfo);
	}

	/**
	 * Add Codec support information
	 * @param {CodecInfo} codecInfo - Codec info object
	 */
	addCodec(codecInfo) {
		this.codecs.set(codecInfo.getType(), codecInfo);
	}

	/**
	 * Set codec map
	 * @param {Map<String,CodecInfo> codecs - Map of codec info objecs
	 */
	setCodecs(codecs) {
		this.codecs = codecs;
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
		for (const info of this.codecs.values())
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
	 * Check if any of the codecs on the media description supports rtx
	 * @returns {Boolean}
	 */
	hasRTX() {
		//Check all codecs
		for (const info of this.codecs.values())
			//Check if it has rtx
			if (info.hasRTX())
				//At least one found
				return true;
		//Not found
		return false;
	}
	
	/**
	 * Get all extensions registered in  this media info
	 * @returns {Map<Number,String>}
	 */
	getExtensions() {
		return this.extensions;
	}

	/**
	 * Get all rids registered in  this media info
	 * @returns {Map<String,RIDInfo>}
	 */
	getRIDs() {
		return this.rids;
	}

	/**
	 * Get rid info for id
	 * @param {String} id - rid value to get info for
	 * @returns {RIDInfo}
	 */
	getRID(id) {
		return this.rids.get(id);
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


	/**
	 * Helper usefull for creating media info answers.
	 * - Will reverse the direction
	 * - For each supported codec, it will change the payload type to match the offer and append it to the answer
	 * - For each supported extension, it will append the ones present on the offer with the id offered
	 * @param {Object} supported - Supported codecs and extensions to be included on answer
	 * @param {Map<String,CodecInfo>} supported.codecs - List of strings with the supported codec names
	 * @param {Set<String>} supported.extensions - List of strings with the supported codec names
	 * @param {Boolean] supported.simulcast - Simulcast is enabled
	 * @param {Array<String>} supported.rtcpfbs - Supported RTCP feedback params
	 * @return {MediaInfo}
	 */
	answer(supported)
	{
		//Create new media
		const answer = new MediaInfo(this.id, this.type);

		if (supported)
		{
			//Set reverse direction
			answer.setDirection(Direction.reverse(this.direction));

			//If we have supported codecs
			if (supported.codecs)
			{
				let supportedCodecs;
				
				//If we are set an array of names
				if (Array.isArray(supported.codecs))
					//Generate set
					supportedCodecs = CodecInfo.MapFromNames(supported.codecs,supported.rtx,supported.rtcpfbs);
				else
					//It is a set
					supportedCodecs = supported.codecs;
				
				//For each codec on offer
				for (let codec of this.codecs.values())
				{
					//If that codec is supported
					if (supportedCodecs.has(codec.getCodec().toLowerCase()))
					{
						//Get supported code
						const supported = supportedCodecs.get(codec.getCodec().toLowerCase());
						//If it is h264, check packetization mode
						if (supported.getCodec()==="h264" && supported.hasParam("packetization-mode") && supported.getParam("packetization-mode")!=codec.getParam("packetization-mode","0"))
							//Ignore
							continue;
						//Clone codec
						const cloned = supported.clone();
						//Change payload type number
						cloned.setType(codec.getType());
						//If we had rtx
						if (cloned.hasRTX())
							//Change payload type also
							cloned.setRTX(codec.getRTX());
						//Clone also config
						cloned.addParams(codec.getParams());
						//Add to answer
						answer.addCodec(cloned);
					}
				}
			}

			//Get extension set
			const extensions = new Set(supported.extensions);
			//Add audio extensions
			for (let [id,uri] of this.extensions)
				//If is supported
				if (extensions.has(uri))
					//Add to answer
					answer.addExtension(id, uri);

			//If simulcast is enabled
			if (supported.simulcast && this.simulcast)
			{
				//Create anser
				const simulcast = new SimulcastInfo();
				//Get send streams
				const send = this.simulcast.getSimulcastStreams(DirectionWay.SEND);
				//If it had
				if (send)
					//for each one
					for (let i=0; i<send.length; ++i)
					{
						var alternatives = [];
						//Clone streams
						for (let j=0; j<send[i].length; ++j)
							//Clone it and add to alternative streams
							alternatives.push(send[i][j].clone());
						//Add alternatives in reverse order
						simulcast.addSimulcastAlternativeStreams(DirectionWay.RECV,alternatives);
					}

				//Get recv streams
				const recv = this.simulcast.getSimulcastStreams(DirectionWay.RECV);
				//If it had
				if (recv)
					//for each one
					for (let i=0; i<recv.length; ++i)
					{
						var alternatives = [];
						//Clone streams
						for (let j=0; j<recv[i].length; ++j)
							//Clone it and add to alternative streams
							alternatives.push(recv[i][j].clone());
						//Add alternatives in reverse order
						simulcast.addSimulcastAlternativeStreams(DirectionWay.SEND,alternatives);
					}

				//Add rids
				//For each rid
				for (const rid of this.rids.values())
				{
					//TODO: check if formats is in supported list
					//CLone rid
					const reversed = rid.clone();
					//Reverse direction
					reversed.setDirection(DirectionWay.reverse(rid.getDirection()));
					//Push cloned extension
					answer.addRID(reversed);
				}

				//Add it to answer
				answer.setSimulcast(simulcast);
			}
		} else {
			//Inactive
			answer.setDirection(Direction.INACTIVE);
		}
		//Add it to answer
		return answer;
	}

	/**
	 * Get Simulcast info
	 * @returns {SimulcastInfo}
	 */
	getSimulcast() {
		return this.simulcast;
	}

	/**
	 * Set stream simulcast info
	 * @param {SimulcastInfo} simulcast - Simulcast stream info
	 */
	setSimulcast(simulcast) {
		this.simulcast = simulcast;
	}
}

/**
* Helper factory for creating media info objects.
* @param {String} - Media type
* @param {Object} supported - Supported media capabilities to be included on media info
* @param {Map<String,CodecInfo> | Array<String>} supported.codecs - Map or codecInfo or list of strings with the supported codec names
* @param {boolean] rtx - If rtx is supported for codecs (only needed if passing codec names instead of CodecInfo)
* @param {Object] rtcpbfs 
* @param {Array<String>} supported.extensions - List of strings with the supported codec names
* @return {MediaInfo}
*/
MediaInfo.create = function(type,supported)
{
       //Create new media
       const mediaInfo = new MediaInfo(type,type);

       if (supported)
       {
		//If we have supported codecs
		if (supported.codecs)
		{
			//If we are set an array of names
			if (Array.isArray(supported.codecs))
			{
				//Add all codecs
				mediaInfo.setCodecs(CodecInfo.MapFromNames(supported.codecs,supported.rtx,supported.rtcpfbs));
			 } else {
				 //Add codecs
				 mediaInfo.setCodecs(supported.codecs);
			 }
		 }
		//Add extensions
		for (let id = 0; supported.extensions && id<supported.extensions.length; ++id)
			//Add to answer
			mediaInfo.addExtension(id, supported.extensions[id]);
       } else {
	       //Inactive
	       mediaInfo.setDirection(Direction.INACTIVE);
       }
       //Add it to answer
       return mediaInfo;
};

/**
 * Expands a plain JSON object containing an MediaInfo
 * @param {Object} plain JSON object
 * @returns {MediaInfo} Parsed Media info
 */
MediaInfo.expand = function(plain)
{
	//Create new
	const mediaInfo = new MediaInfo(plain.id, plain.type);

	//Set direction
	if (plain.direction)
		mediaInfo.setDirection(Direction.byValue(plain.direction));
	//Set bitrate
	mediaInfo.setBitrate(plain.bitrate);

	//For each extension
	for (let id in plain.extensions)
		//Push cloned extension
		mediaInfo.addExtension(id,plain.extensions[id]);

	//For each codec
	for (let i=0; plain.codecs && i<plain.codecs.length;++i)
	{
		//Parse codec
		const codecInfo = CodecInfo.expand(plain.codecs[i]);
		//If ok
		if (codecInfo)
			//Push cloned stream
			mediaInfo.addCodec(codecInfo);
	}
	//For each rid
	for (let i=0; plain.rids && i<plain.rids.length;++i)
	{
		//Parse codec
		const ridInfo = RIDInfo.expand(plain.rids[i]);
		//Push cloned extension
		mediaInfo.addRID(ridInfo);
	}

	//If it has simulcast stream info
	if (plain.simulcast)
		//The simulcast info
		mediaInfo.setSimulcast(SimulcastInfo.expand(plain.simulcast));

	//Done
	return mediaInfo;
};

module.exports = MediaInfo;
