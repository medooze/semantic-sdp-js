const SDPTransform	 = require("sdp-transform");

const CandidateInfo	 = require("./CandidateInfo");
const CodecInfo		 = require("./CodecInfo");
const RTCPFeedbackInfo	 = require("./RTCPFeedbackInfo");
const DTLSInfo		 = require("./DTLSInfo");
const ICEInfo		 = require("./ICEInfo");
const MediaInfo		 = require("./MediaInfo");
const Setup		 = require("./Setup");
const Direction		 = require("./Direction");
const DirectionWay	 = require("./DirectionWay");
const SourceGroupInfo	 = require("./SourceGroupInfo");
const SourceInfo	 = require("./SourceInfo");
const StreamInfo	 = require("./StreamInfo");
const TrackInfo		 = require("./TrackInfo");
const TrackEncodingInfo	 = require("./TrackEncodingInfo");
const SimulcastInfo	 = require("./SimulcastInfo");
const SimulcastStreamInfo= require("./SimulcastStreamInfo");
const RIDInfo		 = require("./RIDInfo");

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
		plain.ice = this.ice && this.ice.plain();
		plain.dtls = this.dtls && this.dtls.plain();
		//Return plain object
		return plain;
	}
	
	/**
	 * Returns an unified plan version of the SDP info
	 * @returns {SDPInfo} Unified version
	 */
	unify()
	{
		//Cloned object
		const cloned = new SDPInfo(this.version);
		//For each media
		for (let i=0;i<this.medias.length;++i)
			//Push cloned
			cloned.addMedia(this.medias[i].clone());
		//Get audio and video medias
		const medias = {
			audio : cloned.getMediasByType("audio"),
			video : cloned.getMediasByType("video")
		};
		
		//For each stream
		for (const stream of this.streams.values())
		{
			//Clone stream
			const clonedStream = stream.clone();
			//For each track
			for (const clonedTrack of clonedStream.getTracks().values())
			{
				//Get first free media
				let clonedMedia = medias[clonedTrack.getMedia()].pop();
				//If we don't have a free media
				if (!clonedMedia)
				{
					//Get associated media on us
					const media = this.getMedia(clonedTrack.getMedia());
					//Clone it
					clonedMedia = media.clone();
					//Set the mid to the stream id
					clonedMedia.setId(clonedTrack.getId());
					//Add media
					cloned.addMedia(clonedMedia);
				}
				//Set track media id
				clonedTrack.setMediaId(clonedMedia.getId());
			}
			//Push cloned stream
			cloned.addStream(clonedStream);
		}
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
	getMediasByType(type)
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
		//For each media
		for (let i in this.medias)
		{
			//The media
			let media = this.medias[i];
			//Check if the same id
			if (media.getId().toLowerCase()===msid.toLowerCase())
				//Found
				return media;
		}
		//Not found
		return null;
	}
	
	/**
	 * Replace media with same id with the new one
	 * @param {MediaInfo} media - The new media
	 * @returns {boolean} true if the media was replaced, false if not found
	 */
	replaceMedia(media)
	{
		//For each media
		for (let i in this.medias)
		{
			//If it has the same id
			if (this.medias[i].getId()==media.getId())
			{
				//Change it
				this.medias[i] = media;
				//Found
				return true;
			}
		}
		//Not found
		return false;
	}

	/**
	 * Return all media description information
	 * @returns {Array<MediaInfo>}
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
	 * @param {CandidateInfo} candidate - ICE candidate
	 */
	addCandidate(candidate) {
		//For each one
		for (let i=0;i<this.candidates.length;++i)
			//Check it is not already there
			if (this.candidates[i].equals(candidate))
				//Skip it
				return;
			
		//Check there is no same candidate
		this.candidates.push(candidate);
	}

	/**
	 * Add ICE candidates for transport
	 * @param {Array<{CandidateInfo>} candidates - ICE candidates
	 */
	addCandidates(candidates) {
		//For each one
		for (let i=0;i<candidates.length;++i)
			//Add candidate
			this.addCandidate(candidates[i]);
	}

	/**
	 * Get all ICE candidates for this transport
	 * @returns {Array<CandidateInfo>}
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
	 * @returns {boolean}
	 */
	removeStream(stream)
	{
		return this.streams.delete(stream.getId());
	}
	
	/**
	 * Remove all streams
	 */
	removeAllStreams()
	{
		this.streams.clear();
	}
	
	/**
	 * 
	 * @param {String} mid Media Id
	 * @returns {TrackInfo| Track info
	 */
	getTrackByMediaId(mid)
	{
		for (let stream of this.streams.values())
			for (let [trackId,track] of stream.getTracks())
				if (track.getMediaId()==mid)
					return track;
		return null;
	}
	
	/**
	 * 
	 * @param {String} mid Media Id
	 * @returns {TrackInfo| Streaminfo
	 */
	getStreamByMediaId(mid)
	{
		for (let stream of this.streams.values())
			for (let [trackId,track] of stream.getTracks())
				if (track.getMediaId()==mid)
					return stream;
		return null;
	}
	
	
	/**
	 * Create answer to this SDP
	 * @param {Object} params		- Parameters to create ansser
	 * @param {ICEInfo} params.ice		- ICE info object
	 * @param {DTLSInfo} params.dtls	- DTLS info object
	 * @params{Array<CandidateInfo> params.candidates - Array of Ice candidates
	 * @param {Map<String,DTLSInfo} params.capabilites - Capabilities for each media type
	 * @returns {SDPInfo} answer
	 */
	answer(params) {
		//Create local SDP info
		const answer = new SDPInfo();

		//Add ice 
		if (params.ice)
		{
			if (params.ice instanceof ICEInfo)
				answer.setICE(params.ice.clone());
			else
				answer.setICE(ICEInfo.expand(params.ice));
		}
		//Add dtls
		if (params.dtls)
		{
			if (params.dtls instanceof DTLSInfo)
				answer.setDTLS(params.dtls);
			else
				answer.setDTLS(DTLSInfo.expand(params.dtls));
		}

		//Add candidates to media info
		for (let i = 0; params.candidates && i<params.candidates.length; ++i)
			if (params.candidates[i] instanceof CandidateInfo)
				answer.addCandidate(params.candidates[i].clone());
			else
				answer.addCandidate(CandidateInfo.expand(params.candidates[i]));

		//For each offered media
		for (let i in this.medias)
		{
			//Our media
			const media = this.medias[i];
			//The supported capabilities
			const supported = params && params.capabilities && params.capabilities[media.getType()];
			//Anser it
			answer.addMedia(media.answer(supported));
		}
		//Done
		return answer;
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
				ssrcs		: [],
				rids		: []
			};

			//Send and receive
			md.direction = Direction.toString(media.getDirection());

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
			for (let j=0; j<candidates.length; ++j)
			{
				//Get candidates
				let candidate = candidates[j];
				//Add host candidate for RTP
				md.candidates.push(
					{
						foundation	: candidate.getFoundation(),
						component	: candidate.getComponentId(),
						transport	: candidate.getTransport(),
						priority	: candidate.getPriority(),
						ip		: candidate.getAddress(),
						port		: candidate.getPort(),
						type		: candidate.getType(),
						raddr		: candidate.getRelAddr(),
						rport		: candidate.getRelPort()
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
						codec	: codec.getCodec().toUpperCase(),
						rate	: 90000
					});
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
				//For each rtcp fb
				for (const rtcpfb of codec.getRTCPFeedbacks())
					//Add it
					md.rtcpFb.push({ payload:  codec.getType(), type: rtcpfb.getId() , subtype: rtcpfb.getParams().join(" ")});

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
				//Get codec params
				const params = codec.getParams();

				//If it has params
				if (Object.keys(params).length)
				{
					//Create ftmp attribute
					const fmtp = {
						payload : codec.getType(),
						config  : ""
					};

					//Add params
					for (const k in params)
					{
						//Add separator
						if (fmtp.config.length)
							fmtp.config += ";";
						//If key+val
						if (params.hasOwnProperty(k))
							//Add config
							fmtp.config += k + "=" + params[k];
						else
							//Add config
							fmtp.config += k;
					}
					//Add it
					md.fmtp.push(fmtp);
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

			//Process rids now
			for (let ridInfo of media.getRIDs().values())
			{
				//Create object
				let rid = {
					id		: ridInfo.getId(),
					direction	: DirectionWay.toString (ridInfo.getDirection()),
					params		: ""
				};
				//Check if it has formats
				if (ridInfo.getFormats().length)
					rid.params = "pt=" +ridInfo.getFormats().join(',');
				//For each format
				for (let [key,val] of ridInfo.getParams().entries())
					//Add it
					rid.params += (rid.params.length ? ";" : "") + key + "=" +val;

				//Push back
				md.rids.push(rid);
			}

			//Get simulcast info
			const simulcast = media.getSimulcast();
			//If it has simulcast info
			if (simulcast)
			{
				let index = 1;
				//Create simulcast attribute
				md.simulcast = {};
				//Get send streams
				const send = simulcast.getSimulcastStreams(DirectionWay.SEND);
				const recv = simulcast.getSimulcastStreams(DirectionWay.RECV);

				//Check if we have send streams
				if (send && send.length)
				{
					let list = "";
					//Create list
					for (let j=0;j<send.length;++j)
					{
						//Create list
						let alternatives = "";
						//For each alternative
						for (let k=0;k<send[j].length;++k)
							//Add it
							alternatives += (alternatives.length ? "," : "") + (send[j][k].isPaused() ? "~" : "") + send[j][k].getId();
						//Add stream alternatives
						list += (list.length ? ";" : "") + alternatives;
					}
					//Set attributes
					md.simulcast["dir" +index] = "send";
					md.simulcast["list"+index] = list;
					//Inc index
					index++;
				}

				//Check if we have rec sreams
				if (recv && recv.length)
				{
					let list = [];
					//Create list
					for (let j=0;j<recv.length;++j)
					{
						//Create list
						let alternatives = "";
						//For each alternative
						for (let k=0;k<recv[j].length;++k)
							//Add it
							alternatives += (alternatives.length ? "," : "") + (recv[j][k].isPaused() ? "~" : "") + recv[j][k].getId();
						//Add stream alternatives
						list += (list.length ? ";" : "") + alternatives;
					}
					//Set attributes
					md.simulcast["dir" +index] = "recv";
					md.simulcast["list"+index] = list;
					//Inc index
					index++;
				}
			}

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
						//Unified, check if it is bounded to an specific line
						if ( track.getMediaId()==md.mid)
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
							//Add msid
							md.msid = stream.getId() + " " + track.getId();
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
* Create sdp based on the following info
* @param {Object} params		- Parameters to create ansser
* @param {ICEInfo|Object} params.ice		- ICE info object
* @param {DTLSInfo|Object} params.dtls	- DTLS info object
* @params{Array<CandidateInfo> params.candidates - Array of Ice candidates
* @param {Map<String,DTLSInfo} params.capabilites - Capabilities for each media type
* @returns {SDPInfo} answer
*/
SDPInfo.create = function(params) 
{
	//Create local SDP info
	const sdp = new SDPInfo();

	//Add ice 
	if (params.ice)
	{
		if (params.ice instanceof ICEInfo)
			sdp.setICE(params.ice.clone());
		else
			sdp.setICE(ICEInfo.expand(params.ice));
	}
	//Add dtls
	if (params.dtls)
	{
		if (params.dtls instanceof DTLSInfo)
			sdp.setDTLS(params.dtls);
		else
			sdp.setDTLS(DTLSInfo.expand(params.dtls));
	}

	//Add candidates to media info
	for (let i = 0; params.candidates && i<params.candidates.length; ++i)
		if (params.candidates[i] instanceof CandidateInfo)
			sdp.addCandidate(params.candidates[i].clone());
		else
			sdp.addCandidate(CandidateInfo.expand(params.candidates[i]));

	//Fix dynamic payload types for bundle
	let dyn = 96;
	
	//For each supported media type
	for (let i in params.capabilities)
	{
		//Create media
		const media = MediaInfo.create(i,params.capabilities[i]);
		
		//For each codec
		for (const [codecId,codec] of media.getCodecs())
		{
			//Check if it is dynamic
			if (codec.getType()>=96)
				//Update it
				codec.setType(dyn++);
			//If it has rtx
			if (codec.getRTX())
				//Update it too
				codec.setRTX(dyn++);
			
		}
		
		//Create info object and add media
		sdp.addMedia(media);
	}
	
	//Done
	return sdp;
};
	
/**
 * Expands a plain JSON object containing an SDP INFO
 * @param {Object} plain JSON object
 * @returns {SDPInfo} Parsed SDP info
 */
SDPInfo.expand = function(plain)
{
	//Create sdp info object
	const sdpInfo = new SDPInfo(plain.version);

	//For each media
	for (let i=0;plain.medias && i<plain.medias.length;++i)
	{
		//Expand media
		const mediaInfo = MediaInfo.expand(plain.medias[i]);
		//If ok
		if (mediaInfo)
			//Push it
			sdpInfo.addMedia(mediaInfo);
	}
	//For each stream
	for (let i=0;plain.streams && i<plain.streams.length;++i)
	{
		//Expand stream
		const streamInfo = StreamInfo.expand(plain.streams[i]);
		//If ok
		if (streamInfo)
			//Push it
			sdpInfo.addStream(streamInfo);
	}

	//For each candiadte
	for (let i=0;plain.candidates && i<plain.candidates.length;++i)
	{
		//Expand candidate info
		const candidateInfo = CandidateInfo.expand(plain.candidates[i]);
		//If ok
		if (candidateInfo)
			//Push it
			sdpInfo.addCandidate(candidateInfo);
	}
	//Add ICE and DLTS
	if (plain.ice)
		sdpInfo.setICE(ICEInfo.expand(plain.ice));
	if (plain.dtls)
		sdpInfo.setDTLS(DTLSInfo.expand(plain.dtls));
	//Return expanded object
	return sdpInfo;
};

/**
 * Process an SDP string and convert it to a semantic SDP info
 * @deprecated Use SDPInfo.parse instead
 * @param {String} string SDP
 * @returns {SDPInfo} Parsed SDP info
 */
SDPInfo.process = function(string)
{
	return SDPInfo.parse(string);
};

/**
 * Parses an SDP string and convert it to a semantic SDP info
 * @param {String} string SDP
 * @returns {SDPInfo} Parsed SDP info
 */
SDPInfo.parse = function(string)
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
		const md = sdp.media[i];

		//Get media type
		const media = md.type;

		//And media id
		const mid = md.mid.toString();

		//Create media info
		const mediaInfo = new MediaInfo(mid,media);

		//Get ICE info
		const ufrag = String(md.iceUfrag);
		const pwd = String(md.icePwd);

		//Create iceInfo
		sdpInfo.setICE(new ICEInfo(ufrag,pwd));
		
		//Check cnadidates
		for (let j=0; md.candidates && j<md.candidates.length; ++j)
		{
			//Get candidate
			const candidate = md.candidates[j];
			//Create new candidate
			const candidateInfo = new  CandidateInfo(
				candidate.foundation,
				candidate.component,
				candidate.transport,
				candidate.priority,
				candidate.ip,
				candidate.port,
				candidate.type,
				candidate.raddr,
				candidate.rport
			);
			//Add it
			sdpInfo.addCandidate(candidateInfo);
		}

		//Check media fingerprint attribute or the global one
		const fingerprintAttr = md.fingerprint || sdp.fingerprint;

		//Get remote fingerprint and hash function
		const remoteHash        = fingerprintAttr.type;
		const remoteFingerprint = fingerprintAttr.hash;

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
		const apts = new Map();

		//For each format
		for (let j in md.rtp)
		{
			//Get format
			const fmt = md.rtp[j];

			//Get codec and type
			const type  = fmt.payload;
			const codec = fmt.codec;

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
				const fmtp = md.fmtp[k];

				//If it is this one
				if (fmtp.payload === type)
				{
					//Get list parameters
					const list = fmtp.config.split(";");
					//Parse them
					for(let k in list)
					{
						//Parse param
						const param = list[k].split("=");
						//Append param
						params[param[0].trim()] = (param[1] || "").trim();
					}
				}
			}
			//If it is RTX
			if ("RTX" === codec.toUpperCase())
				//Store atp
				apts.set(parseInt(params.apt),type);
			else
				//Create codec
				mediaInfo.addCodec(new CodecInfo(codec,type,params));
		}

		//Set the rtx
		for (let apt of apts.entries())
		{
			//Get codec
			const codecInfo = mediaInfo.getCodecForType(apt[0]);
			//IF it was not red
			if (codecInfo)
				//Set rtx codec
				codecInfo.setRTX(apt[1]);
		}
		
		//Set rtcpfs
		for (let j=0; md.rtcpFb && j<md.rtcpFb.length;++j)
		{
			//Get codec
			const codecInfo = mediaInfo.getCodecForType(md.rtcpFb[j].payload);
			//IF found
			if (codecInfo)
			{
				//Get params
				const id = md.rtcpFb[j].type;
				const params = md.rtcpFb[j].subtype ? md.rtcpFb[j].subtype.split(" ") : null;
				//Set rtx codec
				codecInfo.addRTCPFeedback( new RTCPFeedbackInfo(id, params));
			}
		}

		//Get extmap atrributes
		const extmaps = md.ext;
		//For each one
		for (let j in extmaps)
		{
			//Get map
			const extmap = extmaps[j];
			//Add it
			mediaInfo.addExtension(extmap.value,extmap.uri);
		}

		//Get rid atrributes
		const rids = md.rids;
		//For each one
		for (let j in rids)
		{
			//Get map
			const rid = rids[j];
			//Crate info
			const ridInfo = new RIDInfo(rid.id,DirectionWay.byValue(rid.direction));
			//Create format info and param map
			let formats = [];
			const params = new Map();
			//If it has params
			if (rid.params)
			{
				//Process formats and params
				const list = SDPTransform.parseParams(rid.params);
				//For each rid param
				for (let k in list)
					//Check type
					if (k==='pt')
						//Get formats
						formats = list[k].split(',');
					else
						//Add it to params
						params.set(k,list[k]);
				//Add formats and params
				ridInfo.setFormats(formats);
				ridInfo.setParams(params);
			}
			//Add rid info
			mediaInfo.addRID(ridInfo);
		}

		//Get sending encodings
		const encodings = [];

		//Check if it has simulcast info
		if (md.simulcast)
		{
			//Create simulcast object
			const simulcast = new SimulcastInfo();

			//Check dir1 attr
			if (md.simulcast.dir1)
			{
				//Get direction
				const direction = DirectionWay.byValue (md.simulcast.dir1);
				//Parse simulcast streamlist
				const list = SDPTransform.parseSimulcastStreamList(md.simulcast.list1);
				//for each alternative stream set
				for (let j=0; j<list.length; ++j)
				{
					//Create the list of alternatie streams
					const alternatives = [];
					//For each alternative
					for (let k=0; k<list[j].length; ++k)
						//Push new alternative stream
						alternatives.push(new SimulcastStreamInfo(list[j][k].scid, list[j][k].paused));
					//Add alternative
					simulcast.addSimulcastAlternativeStreams(direction, alternatives);
				}
			}
			//Check dir2 attr
			if (md.simulcast.dir2)
			{
				//Get direction
				const direction = DirectionWay.byValue (md.simulcast.dir2);
				//Parse simulcast streamlist
				const list = SDPTransform.parseSimulcastStreamList(md.simulcast.list2);
				//for each alternative stream set
				for (let j=0; j<list.length; ++j)
				{
					//Create the list of alternatie streams
					const alternatives = [];
					//For each alternative
					for (let k=0; k<list[j].length; ++k)
						//Push new alternative stream
						alternatives.push(new SimulcastStreamInfo(list[j][k].scid, list[j][k].paused));
					//Add alternative
					simulcast.addSimulcastAlternativeStreams(direction, alternatives);
				}
			}

			//For all sending encodings
			for (let streams of simulcast.getSimulcastStreams(DirectionWay.SEND))
			{
				//Create encoding alternatives
				const alternatives = [];
				//for all rid info
				for (let j=0; j<streams.length; j++)
				{
					//Create new encoding
					const encoding = new TrackEncodingInfo(streams[j].getId(),streams[j].isPaused());
					//Get the rid info for that
					const ridInfo = mediaInfo.getRID(encoding.getId());
					//If found
					if (ridInfo)
					{
						//Get associated payloads, jic
						const formats = ridInfo.getFormats();
						//If it had formats associated
						for (let k=0; formats && k<formats.length; ++k)
						{
							//Get codec info
							const codecInfo = mediaInfo.getCodecForType(formats[k]);
							//If found
							if (codecInfo)
								//Set into encoding
								encoding.addCodec(codecInfo);
						}
						//Add them
						encoding.setParams(ridInfo.getParams());
						//Push it
						alternatives.push(encoding);
					}
				}
				//If any
				if (alternatives.length)
					//Add it
					encodings.push(alternatives);
			}

			//Add it
			mediaInfo.setSimulcast(simulcast);
		}

		//Temporal source list
		const sources = new Map();
		
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
						//Set the media id
						track.setMediaId(mid);
						//Set simulcast encodings (if any)
						track.setEncodings(encodings);
						//Append to stream
						stream.addTrack(track);
					}
					//Add ssrc
					track.addSSRC(ssrc);
					//We have found msid
					msid = streamId;
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
				//Set encodings (if any)
				track.setEncodings(encodings);
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
		
		//Check if we need we are in unified plan
		for (let [ssrc,source] of sources.entries())
		{
			//If it was assigned to any stream
			if (!source.getStreamId())
			{
				//Get stream from cname and track from media mid
				let streamId = source.getCName();
				let trackId  = mid;
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
					//Set the media id
					track.setMediaId(mid);
					//Set simulcast encodings (if any)
					track.setEncodings(encodings);
					//Append to stream
					stream.addTrack(track);
				}
				//Add ssrc
				track.addSSRC(ssrc);
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
