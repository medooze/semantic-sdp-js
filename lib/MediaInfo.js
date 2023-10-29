const CodecInfo		= require ("./CodecInfo");
const RIDInfo		= require ("./RIDInfo");
const SimulcastInfo	= require ("./SimulcastInfo");
const Direction		= require ("./Direction");
const DirectionWay	= require ("./DirectionWay");
const RTCPFeedbackInfo  = require ("./RTCPFeedbackInfo");
const DataChannelInfo   = require ("./DataChannelInfo");

/** @typedef {import(".").MediaType} MediaType */
/** @typedef {import(".").SupportedMedia} SupportedMedia */
/** @typedef {import(".").MediaInfoPlain} MediaInfoPlain */
/** @typedef {import(".").MediaInfoLike} MediaInfoLike */

/**
 * Media information (relates to a m-line in SDP)
 * @namespace
 */
class MediaInfo {
	/**
	 * @constructor
	 * @alias MediaInfo
	 * @param {String} id	- Media id
	 * @param {MediaType} type	- Media type "audio"|"video"|"application"
	 */
	constructor(id, type) {
		this.id		= id;
		this.type	= type;
		this.direction  = Direction.SENDRECV;
		this.extensions = /** @type {Map<Number, String>} */ (new Map());
		this.codecs	= /** @type {Map<Number, CodecInfo>} */ (new Map());
		this.rids	= /** @type {Map<String, RIDInfo>} */ (new Map());
		this.simulcast  = null;
		this.bitrate	= 0;
		this.control	= null;
		this.dataChannel= null;
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
		//If it has a control attribute
		if (this.control)
			//Set control attribute
			cloned.setControl(this.control);
		//If it has datachannel info
		if (this.dataChannel)
			//Clone it
			cloned.setDataChannel(this.dataChannel.clone());
		//Return cloned object
		return cloned;
	}

	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {MediaInfoPlain} Plain javascript object
	 */
	plain() {
		//Cloned object
		const plain = /** @type {MediaInfoPlain} */ ({
			id		: this.id,
			type		: this.type,
			direction	: Direction.toString (this.direction),
			codecs		: []
		});
		//If it is a data dataChannel
		if (this.dataChannel)
			//add it
			plain.dataChannel = this.dataChannel.plain();
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
		//If it has a control attribute
		if (this.control)
			//Set control attribute
			plain.control = this.control;
		//Return cloned object
		return plain;
	}

	/**
	 * Get media type "audio"|"video"|"application"
	 * @returns {MediaType}
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
	 * @param {Map<Number,CodecInfo>} codecs - Map of codec info objecs
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
	 * Check if media has control attribute
	 * @returns {Boolean}
	 */
	hasControl() {
		return !!this.control;
	}
	
	/**
	 * Get control attribute
	 * @returns {String}
	 */
	getControl() {
		return this.control;
	}

	/**
	 * Set control attribute
	 * @param {String} control
	 */
	setControl(control) {
		this.control = control;
	}

	/**
	 * Check if media has a dataChannel
	 * @returns {Boolean}
	 */
	hasDataChannel() {
		return !!this.dataChannel;
	}
	
	/**
	 * Get dataChannel info
	 * @returns {DataChannelInfo}
	 */
	getDataChannel() {
		return this.dataChannel;
	}

	/**
	 * Set dataChannel info
	 * @param {DataChannelInfo} dataChannel info
	 */
	setDataChannel(dataChannel) {
		this.dataChannel = dataChannel;
	}


	/**
	 * Helper usefull for creating media info answers.
	 * - Will reverse the direction
	 * - For each supported codec, it will change the payload type to match the offer and append it to the answer
	 * - For each supported extension, it will append the ones present on the offer with the id offered
	 * @param {SupportedMedia} [supported] - Supported codecs and extensions to be included on answer
	 * @returns {MediaInfo}
	 */
	answer(supported)
	{
		//Create new media
		const answer = new MediaInfo(this.id, this.type);

		if (supported)
		{
			//Set reverse direction
			answer.setDirection(Direction.reverse(this.direction));

			const { codecs, dataChannel } = supported;

			//If we have supported codecs
			if (codecs)
			{
				let supportedCodecs;
				
				//If we are set an array of names
				if (Array.isArray(codecs))
					//Generate set
					supportedCodecs = CodecInfo.MapFromNames(codecs,supported.rtx,supported.rtcpfbs);
				else
					//It is a set
					supportedCodecs = codecs;
				
				//For each codec on offer
				for (let codec of this.codecs.values())
				{
					//Try to find a matching supported codec
					for (let supported of supportedCodecs.values())
					{
						//Codec name must match
						if (supported.getCodec().toLowerCase() !== codec.getCodec().toLowerCase())
							continue;
						//If it is h264, check packetization mode
						if (supported.getCodec()==="h264" && supported.hasParam("packetization-mode") && supported.getParam("packetization-mode")!=codec.getParam("packetization-mode","0"))
							//Ignore
							continue;
						//If it is h264, check profile-level-id
						if (supported.getCodec()==="h264" && supported.hasParam("profile-level-id") && codec.hasParam("profile-level-id") && supported.getParam("profile-level-id")!=codec.getParam("profile-level-id"))
							continue;
						//If it is multiopus, check num_streams
						if (supported.getCodec()==="multiopus" && supported.hasParam("num_streams") && codec.hasParam("num_streams") && supported.getParam("num_streams")!=codec.getParam("num_streams"))
							continue;
						//Clone codec
						const cloned = supported.clone();
						//Change payload type number
						cloned.setType(codec.getType());
						//If we had rtx
						if (cloned.hasRTX())
							//Change payload type also
							cloned.setRTX(codec.getRTX());
						//Use same number of channels
						if (codec.hasChannels())
							//Change payload type also
							cloned.setChannels(codec.getChannels());
						//Clone also config
						cloned.addParams(codec.getParams());
						//Add to answer
						answer.addCodec(cloned);
						break;
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
					for (const stream of send)
					{
						//Clone streams
						const cloned = stream.map(alternative => alternative.clone());
						//Add alternatives in reverse order
						simulcast.addSimulcastAlternativeStreams(DirectionWay.RECV,cloned);
					}

				//Get recv streams
				const recv = this.simulcast.getSimulcastStreams(DirectionWay.RECV);
				//If it had
				if (recv)
					//for each one
					for (const stream of recv)
					{
						//Clone streams
						const cloned = stream.map(alternative => alternative.clone());
						//Add alternatives in reverse order
						simulcast.addSimulcastAlternativeStreams(DirectionWay.SEND,cloned);
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

			//If we support datachannel
			if (dataChannel && this.dataChannel)
			{	
				//Crate info
				const dataChannelInfo = new DataChannelInfo(this.dataChannel.getPort(), dataChannel.maxMessageSize ? dataChannel.maxMessageSize : this.dataChannel.getMaxMessageSize());
				//Create it on answer
				answer.setDataChannel(dataChannelInfo);
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
* @param {MediaType} type - Media type
* @param {SupportedMedia} [supported] - Supported media capabilities to be included on media info
* @returns {MediaInfo}
*/
MediaInfo.create = function(type,supported)
{
       //Create new media
       const mediaInfo = new MediaInfo(type,type);

       if (supported)
       {
		const { codecs } = supported;
		//If we have supported codecs
		if (codecs)
		{
			//If we are set an array of names
			if (Array.isArray(codecs))
			{
				//Add all codecs
				mediaInfo.setCodecs(CodecInfo.MapFromNames(codecs,supported.rtx,supported.rtcpfbs));
			 } else {
				 //Add codecs
				 mediaInfo.setCodecs(codecs);
			 }
		 }
       } else {
	       //Inactive
	       mediaInfo.setDirection(Direction.INACTIVE);
       }
       //Add it to answer
       return mediaInfo;
};

/**
 * Expands a plain JSON object containing an MediaInfo
 * @param {MediaInfoLike} plain JSON object
 * @returns {MediaInfo} Parsed Media info
 */
MediaInfo.expand = function(plain)
{
	//Ensure it is not already a MediaInfo object
	if (plain.constructor.name === "MediaInfo")
		return /** @type {MediaInfo} */ (plain);

	//Otherwise it is a plain object
	plain = /** @type {MediaInfoPlain} */ (plain);

	//Create new
	const mediaInfo = new MediaInfo(plain.id, plain.type);

	//Set direction
	if (plain.direction)
		mediaInfo.setDirection(Direction.byValue(plain.direction));
	//Set bitrate
	mediaInfo.setBitrate(plain.bitrate);
	//If it has dataChannel
	if (plain.dataChannel)
	{
		//Parse info
		const dataChannelInfo = DataChannelInfo.expand(plain.dataChannel);
		//If ok
		if (dataChannelInfo)
			//Push info
			mediaInfo.setDataChannel(dataChannelInfo);
	}

	//For each extension
	for (const [id, extension] of Object.entries(plain.extensions))
		//Push cloned extension
		mediaInfo.addExtension(strictParseInt(id), extension);

	//For each codec
	for (const codec of plain.codecs)
	{
		//Parse codec
		const codecInfo = CodecInfo.expand(codec);
		//If ok
		if (codecInfo)
			//Push cloned stream
			mediaInfo.addCodec(codecInfo);
	}
	//For each rid
	for (const rid of plain.rids||[])
	{
		//Parse codec
		const ridInfo = RIDInfo.expand(rid);
		//Push cloned extension
		mediaInfo.addRID(ridInfo);
	}

	//If it has simulcast stream info
	if (plain.simulcast)
		//The simulcast info
		mediaInfo.setSimulcast(SimulcastInfo.expand(plain.simulcast));
	
	//If it has control attribute
	if (plain.control)
		//The control atttibute
		mediaInfo.setControl(plain.control);

	//Done
	return mediaInfo;
};

/**
 * Expands a plain JSON object containing an MediaInfo or a MediaInfo and clone it
 * @param {MediaInfoLike} plain JSON object or MediaInfo
 * @returns {MediaInfo} Cloned MediaInfo
 */
MediaInfo.clone = function(plain)
{	
	return plain.constructor.name === "MediaInfo"  
		? /** @type {MediaInfo} */ (plain).clone()
		: MediaInfo.expand(plain);
}

function strictParseInt(/** @type {string | number} */ x)
{
	const xStr = x.toString();
	if (!/^\d+$/.test(xStr))
		throw new Error(`invalid integer ${xStr}`);
	return parseInt(xStr);
}

module.exports = MediaInfo;
