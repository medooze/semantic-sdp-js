class MediaInfo {
	constructor(id, type) {
		this.id		= id;
		this.type	= type;
		this.extensions = new Map();
		this.codecs	= new Map();
		this.candidates = new Array();
		this.bitrate	= 0;
	}

	getType() {
		return this.type;
	}

	getId() {
		return this.id;
	}

	getDTLS() {
		return this.dtls;
	}

	setDTLS(dtlsInfo) {
		this.dtls = dtlsInfo;
	}

	getICE() {
		return this.ice;
	}

	setICE(iceInfo) {
		this.ice = iceInfo;
	}

	addExtension(id, name) {
		this.extensions.set(id, name);
	}

	addCodec(codecInfo) {
		this.codecs.set(codecInfo.getType(), codecInfo);
	}

	getCodecForType(type) {
		return this.codecs.get(type);
	}
	
	getCodec(codec) {
		for (let info of this.codecs.values())
			if (info.getCodec().toLowerCase()===codec.toLowerCase())
				return info;
		return null;
	}
	
	hasCodec(codec) {
		return this.getCodec(codec)!=null;
	}

	getCodecs() {
		return this.codecs;
	}
	
	addCandidate(candidate) {
		this.candidates.push(candidate);
	}

	getCandidates() {
		return this.candidates;
	}

	getExtensions() {
		return this.extensions;
	}

	getBitrate() {
		return this.bitrate;
	}

	setBitrate(bitrate) {
		this.bitrate = bitrate;
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