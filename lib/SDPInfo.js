const SDPTransform	 = require("sdp-transform");

const CandidateInfo	 = require("./CandidateInfo");
const CodecInfo		 = require("./CodecInfo");
const DTLSInfo		 = require("./DTLSInfo");
const ICEInfo		 = require("./ICEInfo");
const MediaInfo		 = require("./MediaInfo");
const Setup		 = require("./Setup");
const SourceGroupInfo	 = require("./SourceGroupInfo");
const SourceInfo	 = require("./SourceInfo");
const StreamInfo	 = require("./StreamInfo");
const TrackInfo		 = require("./TrackInfo");

class SDPInfo 
{
	constructor(version)
	{
		this.version = version || 1;
		this.audio = null;
		this.video = null;
		this.streams = new Map();
		this.medias = new Array();
	}
	
	setVersion(version) 
	{
		this.version = version;
	}
	
	addMedia(media)
	{
		//Store media
		this.medias.push(media);
		//It is an audio one?
		if ("audio" === media.getType().toLowerCase())
			//Quick access
			this.audio = media;
		//It is an video one?
		if ("video" === media.getType().toLowerCase())
			//Quick access
			this.video = media;
	}
	
	getMedia(type)
	{
		for (let i in this.medias)
		{
			let media = this.medias[i];
			if (media.getType().toLowerCase()===type.toLowerCase())
				return this.media;
		}
		return this.null;
	}

	getMedias()
	{
		return this.medias;
	}
	
	getVersion() 
	{
		return this.version;
	}

	getAudio() 
	{
		return this.audio;
	}

	getVideo()
	{
		return this.video;
	}
	
	getStream(id)
	{
		return this.streams.get(id);
	}
	
	getFirstStream()
	{
		for (let stream of this.streams)
			return stream;
		return this.null;
	}

	addStream(stream)
	{
		this.streams.set(stream.getId(), stream);
	}
	
	removeStream(stream) 
	{
		this.streams.delete(stream.getId());
	}
	
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
		//Add ice lite attribute
		sdp.icelite = "ice-lite";
		//Enable msids
		sdp.msidSemantic = { semantic : "WMS", token: ""};
		//Create groups
		sdp.group = [];
		
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
				candidate	: [],
				ssrcGroup	: [],
				ssrc		: []
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
			let candidates = media.getCandidates();
			//For each candidate
			for (let j in candidates)
			{
				//Get candidates
				let candidates = candidates[j];
			
				//Add host candidate for RTP
				md.candidate.push(
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
			md.iceUfrag = media.getICE().getUfrag();
			md.icePwd   = media.getICE().getPwd();
			
			//Add fingerprint attribute
			md.fingerprint = { 
				type : media.getDTLS().getHash(),
				hash :  media.getDTLS().getFingerprint()
			};
			
			//Add setup atttribute
			md.setup = Setup.toString(media.getDTLS().getSetup());
			
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
				if (codec.hasRtx())
				{
					//Add it also
					md.rtp.push({
						payload	: codec.getRtx(),
						codec	: "rtx",
						rate	: 90000
					});
					//Add apt
					md.fmtp.push({
						payload	: codec.getRtx(),
						config  : "apt="+codec.getType()
					});
				}
			}
						
			//For each extension
			for (let pair of media.getExtensions().entries())
				//Add new extension attribute
				md.ext.push({
					value : pair[0],
					uri   : pair[1]
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
					
					//If it is same type
					if (md.type.toLowerCase() === track.getMedia().toLowerCase())
					{
						//Get groups
						let groups = track.getSourceGroups()

						//For each group
						for (let j in groups)
						{
							//Get group
							let group = groups[j];

							//Add ssrc group 
							md.ssrcGroup.push({
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
							md.ssrc.push({
								id		: ssrcs[j],
								attribute	: "cname",
								value		: stream.getId()
							});
							md.ssrc.push({
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
		sdp.group.push(bundle);
		
		return SDPTransform.write(sdp);
	}
}

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
		mediaInfo.setICE(new ICEInfo(ufrag,pwd));

		//Check media fingerprint attribute
		let fingerprintAttr = md.fingerprint;

		//Get remote fingerprint and hash function
		let remoteHash        = fingerprintAttr.type;
		let remoteFingerprint = fingerprintAttr.hash;

		//Set deault setup
		let setup = Setup.ACTPASS;

		//Get setup attribute
		let setupAttr = md.setup;
		//Chekc it
		if (setupAttr!=null)
			//Set it
			setup = Setup.byValue(setupAttr);

		//Create new DTLS info
		mediaInfo.setDTLS(new DTLSInfo(setup,remoteHash,remoteFingerprint));

		//Store RTX apts so we can associate them later
		let apts = new Map()

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
			if (codecInfo!=null)
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
				if (source==null)
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
					if (stream==null)
					{
						//Create one
						stream = new StreamInfo(streamId);
						//Append
						sdpInfo.addStream(stream);
					}
					//Get track
					let track = stream.getTrack(trackId);
					//If not found
					if (track==null)
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