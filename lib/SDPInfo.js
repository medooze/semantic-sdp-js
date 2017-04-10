const SDPTransform	 = require("sdp-transform");

const CandidateInfo	 = require("./CandidateInfo");
const CodecInfo		 = require("./CodecInfo");
const DTLSInfo		 = require("./DTLSInfo");
const ICEInfo		 = require("./ICEInfo");
const MediaInfo		 = require("./MediaInfo");
const Setup		 = require("./Setup");
const Direction		 = require("./Direction");
const SourceGroupInfo	 = require("./SourceGroupInfo");
const SourceInfo	 = require("./SourceInfo");
const StreamInfo	 = require("./StreamInfo");
const TrackInfo		 = require("./TrackInfo");

/**
 * SDP semantic info object
 *	This object represent the minimal information of an WebRTC SDP in a semantic hierarchy
 * @namespace
 */
class SDPInfo 
{
	/**
	 * @constructor
	 * @alias SDPInfo
	 * @param {Number} version SDP version attribute
	 */
	constructor(version)
	{
		this.version		= version || 1;
		this.streams		= new Map();
		this.medias		= new Array(); //Array as we need to keep order
		this.candidates		= new Array(); //Array as we need to keep order
		this.ice		= null;
		this.dtls		= null;
	}
	
	/**
	 * Clone SDPinfo object
	 * @returns {SDPInfo} cloned object
	 */
	clone() {
		//Cloned object
		const cloned = new SDPInfo(this.version);
		//For each media
		for (let i=0;i<this.medias.length;++i)
			//Push cloned 
			cloned.addMedia(this.medias[i].clone());
		//For each stream
		for (const stream of this.streams.values())
			//Push cloned stream
			cloned.addStream(stream.clone());
		//For each candiadte
		for (let i=0;i<this.candidates.length;++i)
			//Push cloned candidate
			cloned.addCandidate(this.candidates[i].clone());
		//Clone ICE and DLTS
		cloned.setICE(this.ice.clone());
		cloned.setDTLS(this.dtls.clone());
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
			version		: this.version,
			streams		: [],
			medias		: [],
			candidates	: []
		};
		//For each media
		for (let i=0;i<this.medias.length;++i)
			//Push plain
			plain.medias.push(this.medias[i].plain());
		//For each stream
		for (const stream of this.streams.values())
			//Push cloned stream
			plain.streams.push(stream.plain());
		//For each candiadte
		for (let i=0;i<this.candidates.length;++i)
			//Push cloned candidate
			plain.candidates.push(this.candidates[i].plain());
		//Add ICE and DLTS
		plain.ice = this.ice.plain();
		plain.dtls = this.dtls.plain();
		//Return plain object
		return plain;
	}
	
	/**
	 * Set SDP version 
	 * @param {Number} version
	 */
	setVersion(version) 
	{
		this.version = version;
	}
	
	/**
	 * Add a new media description information to this sdp info
	 * @param {MediaInfo} media
	 */
	addMedia(media)
	{
		//Store media
		this.medias.push(media);
	}
	
	/**
	 * Get first media description info associated to the media type
	 * @param {String} type - Media type ('audio'|'video')
	 * @returns {MediaInfo} or null if not found
	 */
	getMedia(type)
	{
		for (let i in this.medias)
		{
			let media = this.medias[i];
			if (media.getType().toLowerCase()===type.toLowerCase())
				return media;
		}
		return null;
	}
	
	/**
	 * Get all media description info associated to the media type
	 * @param {String} type - Media type ('audio'|'video')
	 * @returns {Array<MediaInfo>} or null if not found
	 */
	getMedias(type)
	{
		var medias = [];
		for (let i in this.medias)
		{
			let media = this.medias[i];
			if (media.getType().toLowerCase()===type.toLowerCase())
				medias.push(media);
		}
		return medias;
	}
	
	/**
	 * Get media description info associated by media Ide
	 * @param {String} msid - Media type ('audio'|'video')
	 * @returns {MediaInfo} or null if not found
	 */
	getMediaById(msid)
	{
		for (let i in this.medias)
		{
			let media = this.medias[i];
			if (media.getId().toLowerCase()===msid.toLowerCase())
				return this.media;
		}
		return null;
	}

	/**
	 * Return all media description information
	 * @returns {Map<String,MediaInfo>}
	 */
	getMedias()
	{
		return this.medias;
	}
	
	/**
	 * Return SDP version attribute
	 * @returns {Number}
	 */
	getVersion() 
	{
		return this.version;
	}

	/**
	 * Get DTLS info for the transport bundle
	 * @returns {DTLSInfo} DTLS info object
	 */
	getDTLS() {
		return this.dtls;
	}

	/**
	 * Set DTLS info object for the transport bundle
	 * @param {DTLSInfo}  dtlsInfo - DTLS info object
	 */
	setDTLS(dtlsInfo) {
		this.dtls = dtlsInfo;
	}

	/**
	 * Get the ICE info object for the transport bundle
	 * @returns {ICEInfo} ICE info object
	 */
	getICE() {
		return this.ice;
	}

	/**
	 * Set ICE info object for the transport bundle
	 * @param {ICEInfo} iceInfo - ICE info object
	 */
	setICE(iceInfo) {
		this.ice = iceInfo;
	}

	/**
	 * Add ICE candidate for transport
	 * @param {ICECandidate} candidate - ICE candidate
	 */
	addCandidate(candidate) {
		this.candidates.push(candidate);
	}

	/**
	 * Get all ICE candidates for this transport
	 * @returns {Array<ICECandidate>}
	 */
	getCandidates() {
		return this.candidates;
	}

	
	/**
	 * Get announced stream 
	 * @param {String} id
	 * @returns {StreamInfo}
	 */
	getStream(id)
	{
		return this.streams.get(id);
	}
	
	/**
	 * Get all announced stream 
	 * @returns {Array<StreamInfo>}
	 */
	getStreams()
	{
		return this.streams;
	}
	
	/**
	 * Get first announced stream
	 * @returns {StreamInfo}
	 */
	getFirstStream()
	{
		for (let stream of this.streams.values())
			return stream;
		return null;
	}

	/**
	 * Announce a new stream in SDP
	 * @param {StreamInfo} stream
	 */
	addStream(stream)
	{
		this.streams.set(stream.getId(), stream);
	}
	
	/**
	 * Remove an announced stream from SDP
	 * @param {StreamInfo} stream
	 */
	removeStream(stream) 
	{
		this.streams.delete(stream.getId());
	}
	
	/**
	 * Convert to an SDP string
	 * @returns {String}
	 */
	toString() 
	{
		//Create base SDP for transform
		let sdp =  {
			version : 0,
			media : []
		};
			
		//Set version
		sdp.version = 0;
		//Set origin
		sdp.origin =  {
			username	: "-",
			sessionId	: (new Date()).getTime(),
			sessionVersion	: this.version,
			netType		: "IN",
			ipVer		: 4,
			address		: "127.0.0.1"
		};
		
		//Set name
		sdp.name = "semantic-sdp";
		
		//Set connection info
		sdp.connection =  { version: 4, ip: '0.0.0.0' };
		//Set time
		sdp.timing = { start: 0, stop: 0 };
		
		//Check if it is ice lite
		if (this.getICE().isLite())
			//Add ice lite attribute
			sdp.icelite = "ice-lite";
		
		//Enable msids
		sdp.msidSemantic = { semantic : "WMS", token: "*"};
		//Create groups
		sdp.groups = [];
		
		//Bundle
		let bundle = {type : "BUNDLE", mids: []};
		
		//For each media
		for (let i in this.medias)
		{
			//Get media
			let media = this.medias[i];
			
			//Create new meida description with default values
			let  md = {
				type		: media.getType(),
				port		: 9,
				protocol	: 'UDP/TLS/RTP/SAVPF',
				fmtp		: [],
				rtp		: [],
				rtcpFb		: [],
				ext		: [],
				bandwidth	: [],
				candidates	: [],
				ssrcGroups	: [],
				ssrcs		: []
			};
		
			//Send and receive
			md.direction = "sendrecv";

			//Enable rtcp muxing
			md.rtcpMux = "rtcp-mux";
			
			//Enable rtcp reduced size
			md.rtcpRsize = "rtcp-rsize";
			
			//Enable x-google-flag
			//md.addAttribute("x-google-flag","conference");

			//Set media id semantiv
			md.mid = media.getId();
			
			//Add to bundle
			bundle.mids.push(media.getId());
			
			//If present
			if (media.getBitrate()>0)
				//Add attribute
				md.bandwidth.push({
					type: "AS",
					limit: media.getBitrate()
				});

			//Get media candidates
			let candidates = this.getCandidates();
			//For each candidate
			for (let j in candidates)
			{
				//Get candidates
				let candidate = candidates[j];
			
				//Add host candidate for RTP
				md.candidates.push(
					{
						foundation	: candidate.getFundation(),
						component	: candidate.getComponentId(),
						transport	: candidate.getTransport(),
						priority	: candidate.getPriority(),
						ip		: candidate.getAddress(),
						port		: candidate.getPort(),
						type		:candidate.getType()
					});
			}
			
			//Set ICE credentials
			md.iceUfrag = this.getICE().getUfrag();
			md.icePwd   = this.getICE().getPwd();
			
			//Add fingerprint attribute
			md.fingerprint = { 
				type : this.getDTLS().getHash(),
				hash :  this.getDTLS().getFingerprint()
			};
			
			//Add setup atttribute
			md.setup = Setup.toString(this.getDTLS().getSetup());
			
			//for each codec one
			for(let codec of media.getCodecs().values())
			{
				//Only for video
				if ("video" === media.getType().toLowerCase())
				{
					//Add rtmpmap
					md.rtp.push({
						payload	: codec.getType(),
						codec	: codec.getCodec(),
						rate	: 90000
					});
					
					//No rtx for rtx of flex fec
					if (!"rtx"=== codec.getCodec().toLowerCase() && !"flex-fec"===codec.getCodec ().toLowerCase())
					{
						//Add rtcp-fb nack support
						md.rtcpFb.push({ payload:  codec.getType(), type: "nack", subtype: "pli"});
						//Add Remb
						md.rtcpFb.push({ payload:  codec.getType(), type: "goog-remb"});
					}
				} else {
					//Check codec
					if ("opus" === codec.getCodec().toLowerCase())
						//Add rtmpmap
						md.rtp.push({
							payload	: codec.getType(),
							codec	: codec.getCodec(),
							rate	: 48000,
							encoding: 2
						});
					else 
						//Add rtmpmap
						md.rtp.push({
							payload	: codec.getType(),
							codec	: codec.getCodec(),
							rate	: 8000
						});
				} 
				//Add transport wide cc
				md.rtcpFb.push({ payload:  codec.getType(), type: "transport-cc"});
				
				//If it has rtx
				if (codec.hasRTX())
				{
					//Add it also
					md.rtp.push({
						payload	: codec.getRTX(),
						codec	: "rtx",
						rate	: 90000
					});
					//Add apt
					md.fmtp.push({
						payload	: codec.getRTX(),
						config  : "apt="+codec.getType()
					});
				}
			}
			//Create the payload array
			const payloads = [];
			
			//For each codec
			for (let j=0; j<md.rtp.length; ++j)
				//Push payload type
				payloads.push(md.rtp[j].payload);
						
			//Set it on description
			md.payloads = payloads.join(" ");
				
			//For each extension
			for (let [id,uri] of media.getExtensions().entries())
				//Add new extension attribute
				md.ext.push({
					value : id,
					uri   : uri
				});
			
			//add media description
			sdp.media.push(md);
		}
		
		//Process streams now
		for (let stream of this.streams.values())
		{
			//For each track
			for (let track of stream.getTracks().values())
			{
				//Get media
				for (let i in sdp.media)
				{
					//Get media description
					let md = sdp.media[i];
					
					//Check if it is unified or plan B
					if (track.getMediaId())
					{
						console.log(track.getMediaId(),md.mid);
						//Unified, check if it is bounded to an specific line
						if ( track.getMediaId()===md.mid)
						{
							//Get groups
							let groups = track.getSourceGroups()

							//For each group
							for (let j in groups)
							{
								//Get group
								let group = groups[j];

								//Add ssrc group 
								md.ssrcGroups.push({
									semantics	: group.getSemantics(),
									ssrcs		: group.getSSRCs().join(" ")
								});
							}

							//Get ssrcs for that group
							let ssrcs = track.getSSRCs();

							//for each one
							for (let j in ssrcs)
							{
								//Add ssrc info
								md.ssrcs.push({
									id		: ssrcs[j],
									attribute	: "cname",
									value		: stream.getId()
								});
							}
							//Add msid
							md.msid =  stream.getId() + " " + track.getId();
							//Done
							break;
						}
					}
					//Plan B, check if it is same type
					else  if (md.type.toLowerCase() === track.getMedia().toLowerCase())
					{

						//Get groups
						let groups = track.getSourceGroups()

						//For each group
						for (let j in groups)
						{
							//Get group
							let group = groups[j];

							//Add ssrc group 
							md.ssrcGroups.push({
								semantics	: group.getSemantics(),
								ssrcs		: group.getSSRCs().join(" ")
							});
						}

						//Get ssrcs for that group
						let ssrcs = track.getSSRCs();

						//for each one
						for (let j in ssrcs)
						{
							//Add ssrc info
							md.ssrcs.push({
								id		: ssrcs[j],
								attribute	: "cname",
								value		: stream.getId()
							});
							md.ssrcs.push({
								id		: ssrcs[j],
								attribute	: "msid",
								value		: stream.getId() + " " + track.getId()
							});
						}
						//Done
						break;
					}
				}
			}
		}
		
		//Compress
		bundle.mids = bundle.mids.join(" ");
		
		//Add bundle
		sdp.groups.push(bundle);

		//Convert to string
		return SDPTransform.write(sdp);
	}
}

/**
 * Process an SDP stream and convert it to a semantic SDP info
 * @param {String} string SDP
 * @returns {SDPInfo} Parsed SDP info
 */
SDPInfo.process = function(string)
{
	//Parse SDP
	const sdp = SDPTransform.parse(string);
	
 	//Create sdp info object
	const sdpInfo = new SDPInfo();

	//Set version
	sdpInfo.setVersion(sdp.version);
	
	//For each media description
	for (let i in sdp.media)
	{
		//Get media description
		let md = sdp.media[i];

		//Get media type
		let media = md.type;

		//And media id
		let mid = md.mid;

		//Create media info
		let mediaInfo = new MediaInfo(mid,media);

		//Get ICE info
		let ufrag = md.iceUfrag;
		let pwd = md.icePwd;

		//Create iceInfo
		sdpInfo.setICE(new ICEInfo(ufrag,pwd));

		//Check media fingerprint attribute or the global one
		let fingerprintAttr = md.fingerprint || sdp.fingerprint;

		//Get remote fingerprint and hash function
		let remoteHash        = fingerprintAttr.type;
		let remoteFingerprint = fingerprintAttr.hash;

		//Set deault setup
		let setup = Setup.ACTPASS;

		//Check setup attribute
		if (md.setup)
			//Set it
			setup = Setup.byValue(md.setup);
		
		//Create new DTLS info
		sdpInfo.setDTLS(new DTLSInfo(setup,remoteHash,remoteFingerprint));
		
		//Media direction
		let direction = Direction.SENDRECV;
		
		//Check setup attribute
		if (md.direction)
			//Set it
			direction = Direction.byValue(md.direction);
		
		//Set direction
		mediaInfo.setDirection(direction);

		//Store RTX apts so we can associate them later
		let apts = new Map();

		//For each format
		for (let j in md.rtp)
		{
			//Get format
			let fmt = md.rtp[j];
			
			//Get codec and type
			let type  = fmt.payload;
			let codec = fmt.codec;

			//If it is RED or ULPFEC
			if ("RED" === codec.toUpperCase() || "ULPFEC" === codec.toUpperCase())
				//FUCK YOU!!!
				continue;
			
			//Get format parameters
			let params = {};
			
			//Does it has config
			for (let k in md.fmtp)
			{
				//Get format
				let fmtp = md.fmtp[k];
				
				//If it is this one
				if (fmtp.payload === type)
				{
					//Get list parameters
					let list = fmtp.config.split(";");
					//Parse them
					for(let k in list)
					{
						//Parse param
						let param = list[k].split("=");
						//Append param
						params[param[0].trim()] = (param[1] || "").trim();
					}
				}
			}
			//If it is RTX
			if ("RTX" === codec.toUpperCase())
				//Store atp
				apts.set(parseInt(params.apt),type);

			//Create codec
			mediaInfo.addCodec(new CodecInfo(codec,type,params));
		}

		//Set the rtx
		for (let apt of apts.entries())
		{
			//Get codec
			let codecInfo = mediaInfo.getCodecForType(apt[0]);
			//IF it was not red
			if (codecInfo)
				//Set rtx codec
				codecInfo.setRTX(apt[1]);
		}

		//Get extmap atrributes
		let extmaps = md.ext;
		//For each one
		for (let j in extmaps)
		{
			//Get map
			let extmap = extmaps[j];
			//Add it
			mediaInfo.addExtension(extmap.value,extmap.uri);
		}

		//Temporal source list
		let sources = new Map();

		//Doubel check
		if (md.ssrcs)
		{
			//Get all ssrcs
			for (let j in md.ssrcs)
			{
				//Get attribute
				let ssrcAttr = md.ssrcs[j];
				//Get data
				let ssrc  = ssrcAttr.id;
				let key   = ssrcAttr.attribute;
				let value = ssrcAttr.value;
				//Try to get it
				let source = sources.get(ssrc);
				//If we dont have ssrc yet
				if (!source)
				{
					//Create one
					source = new SourceInfo(ssrc);
					//Add it
					sources.set(source.getSSRC(),source);
				} 
				//Check key
				if ("cname" === key.toLowerCase())
				{
					//Set it
					source.setCName(value);
				} else if ("msid" === key.toLowerCase()) {
					//Split
					let ids = value.split(" ");
					//Get stream and track ids
					let streamId = ids[0];
					let trackId  = ids[1];
					//Set ids
					source.setStreamId(streamId);
					source.setTrackId(trackId);
					//Get stream
					let stream = sdpInfo.getStream(streamId);
					//Check if the media stream exists
					if (!stream)
					{
						//Create one
						stream = new StreamInfo(streamId);
						//Append
						sdpInfo.addStream(stream);
					}
					//Get track
					let track = stream.getTrack(trackId);
					//If not found
					if (!track)
					{
						//Create track
						track = new TrackInfo(media,trackId);
						//Append to stream
						stream.addTrack(track);
					}
					//Add ssrc
					track.addSSRC(ssrc);
				}	
			}
		}
		
		//Check if ther is a global msid
		if (md.msid)
		{
			//Split
			let ids = md.msid.split(" ");
			//Get stream and track ids
			let streamId = ids[0];
			let trackId  = ids[1];
		
			//Get stream
			let stream = sdpInfo.getStream(streamId);
			//Check if the media stream exists
			if (!stream)
			{
				//Create one
				stream = new StreamInfo(streamId);
				//Append
				sdpInfo.addStream(stream);
			}
			//Get track
			let track = stream.getTrack(trackId);
			//If not found
			if (!track)
			{
				//Create track
				track = new TrackInfo(media,trackId);
				//Set the media id
				track.setMediaId(mid);

				//Append to stream
				stream.addTrack(track);
			}
			
			//For each ssrc
			for (let [ssrc,source] of sources.entries())
			{
				//If it was not overrideng
				if (!source.getStreamId())
				{
					//Set ids
					source.setStreamId(streamId);
					source.setTrackId(trackId);
					//Add ssrc
					track.addSSRC(ssrc);
				}
			}
		}

		//Double check
		if (md.ssrcGroups)
		{
			//Get all groups
			for (let j in md.ssrcGroups)
			{
				//Get ssrc group info
				let ssrcGroupAttr = md.ssrcGroups[j];
				
				//Get ssrcs
				let ssrcs = ssrcGroupAttr.ssrcs.split(" ");
				
				//Create new group
				let group = new SourceGroupInfo(ssrcGroupAttr.semantics,ssrcs);
				
				//Get media track for ssrc
				let source = sources.get(parseInt(ssrcs[0]));
				//Add group to track
				sdpInfo
				    .getStream(source.getStreamId())
				    .getTrack(source.getTrackId())
				    .addSourceGroup(group);
			}
		}
		//Append media
		sdpInfo.addMedia(mediaInfo);
	}
	return sdpInfo;
};

module.exports = SDPInfo;
