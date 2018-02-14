const SemanticSDP = require("../index");

const SDPInfo		= SemanticSDP.SDPInfo;
const MediaInfo		= SemanticSDP.MediaInfo;
const CandidateInfo	= SemanticSDP.CandidateInfo;
const DTLSInfo		= SemanticSDP.DTLSInfo;
const ICEInfo		= SemanticSDP.ICEInfo;
const StreamInfo	= SemanticSDP.StreamInfo;
const CodecInfo		= SemanticSDP.CodecInfo;
const TrackInfo		= SemanticSDP.TrackInfo;
const Setup		= SemanticSDP.Setup;
const Direction		= SemanticSDP.Direction;
const SourceGroupInfo   = SemanticSDP.SourceGroupInfo;

//Create SDP Info
const sdpInfo = SDPInfo.create({
	dtls		: {
		"hash"        : "sha-256",
		"fingerprint" : "F2:AA:0E:C3:22:59:5E:14:95:69:92:3D:13:B4:84:24:2C:C2:A2:C0:3E:FD:34:8E:5E:EA:6F:AF:52:CE:E6:0F"
	},
	ice		: {
		"ufrag" : "af46F",
		"pwd"   : "a34FasdS++jdfofdslkjsd\/SDV"
	},
	candidates	: [{
		"foundation"	: 1,
		"componentId"	: 1,
		"transport"	: "udp",
		"priority"	: 2122260223,
		"address"	: "192.168.0.196",
		"port"		: 56143,
		"type"		: "host"
	}],
	capabilities	: {
		audio : {
			codecs		: ["opus"],
			extensions	: ["urn:ietf:params:rtp-hdrext:ssrc-audio-level","http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01"],
		},
		video : {
			codecs		: ["vp9","vp8"],
			rtx		: true,
			rtcpfbs		:  [
				{ "id": "transport-cc"},
				{ "id": "ccm", "params": ["fir"]},
				{ "id": "nack"},
				{ "id": "nack", "params": ["pli"]}
			],
			extensions	: [ "urn:3gpp:video-orientation", "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01"]
		}
	}
});

console.dir(sdpInfo.plain(),{depth: null, colors: true});

//Create SDP Info
const sdpInfo2 = SDPInfo.create({
	dtls		: DTLSInfo.expand({
		"hash"        : "sha-256",
		"fingerprint" : "F2:AA:0E:C3:22:59:5E:14:95:69:92:3D:13:B4:84:24:2C:C2:A2:C0:3E:FD:34:8E:5E:EA:6F:AF:52:CE:E6:0F"
	}),
	ice		: ICEInfo.expand({
		"ufrag" : "af46F",
		"pwd"   : "a34FasdS++jdfofdslkjsd\/SDV"
	}),
	candidates	: [CandidateInfo.expand({
		"foundation"	: 1,
		"componentId"	: 1,
		"transport"	: "udp",
		"priority"	: 2122260223,
		"address"	: "192.168.0.196",
		"port"		: 56143,
		"type"		: "host"
	})],
	capabilities	: {
		audio : {
			codecs		: CodecInfo.MapFromNames(["opus"]),
			extensions	: ["urn:ietf:params:rtp-hdrext:ssrc-audio-level","http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01"],
		},
		video : {
			codecs		: CodecInfo.MapFromNames(["vp9","vp8"],true,[
				{ "id": "transport-cc"},
				{ "id": "ccm", "params": ["fir"]},
				{ "id": "nack"},
				{ "id": "nack", "params": ["pli"]}
			]),
			extensions	: [ "urn:3gpp:video-orientation", "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01"]
		}
	}
});

console.dir(sdpInfo2.plain(),{depth: null, colors: true});


const answer1 = sdpInfo.answer({
	dtls		: {
		"hash"        : "sha-256",
		"fingerprint" : "F2:AA:0E:C3:22:59:5E:14:95:69:92:3D:13:B4:84:24:2C:C2:A2:C0:3E:FD:34:8E:5E:EA:6F:AF:52:CE:E6:0F"
	},
	ice		: {
		"ufrag" : "af46F",
		"pwd"   : "a34FasdS++jdfofdslkjsd\/SDV"
	},
	candidates	: [{
		"foundation"	: 1,
		"componentId"	: 1,
		"transport"	: "udp",
		"priority"	: 2122260223,
		"address"	: "192.168.0.196",
		"port"		: 56143,
		"type"		: "host"
	}],
	capabilities	: {
		audio : {
			codecs		: ["opus"],
			extensions	: ["urn:ietf:params:rtp-hdrext:ssrc-audio-level","http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01"],
		},
		video : {
			codecs		: ["vp9"],
			rtx		: true,
			rtcpfbs		:  [
				{ "id": "transport-cc"},
				{ "id": "ccm", "params": ["fir"]},
				{ "id": "nack"},
				{ "id": "nack", "params": ["pli"]}
			],
			extensions	: [ "urn:3gpp:video-orientation", "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01"]
		}
	}
});
console.dir(answer1.plain(),{depth: null, colors: true});
console.log(answer1.toString());


const answer2 = sdpInfo2.answer({
	dtls		: DTLSInfo.expand({
		"hash"        : "sha-256",
		"fingerprint" : "F2:AA:0E:C3:22:59:5E:14:95:69:92:3D:13:B4:84:24:2C:C2:A2:C0:3E:FD:34:8E:5E:EA:6F:AF:52:CE:E6:0F"
	}),
	ice		: ICEInfo.expand({
		"ufrag" : "af46F",
		"pwd"   : "a34FasdS++jdfofdslkjsd\/SDV"
	}),
	candidates	: [CandidateInfo.expand({
		"foundation"	: 1,
		"componentId"	: 1,
		"transport"	: "udp",
		"priority"	: 2122260223,
		"address"	: "192.168.0.196",
		"port"		: 56143,
		"type"		: "host"
	})],
	capabilities	: {
		audio : {
			codecs		: CodecInfo.MapFromNames(["opus"]),
			extensions	: ["urn:ietf:params:rtp-hdrext:ssrc-audio-level","http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01"],
		},
		video : {
			codecs		: CodecInfo.MapFromNames(["vp9"],true,[
				{ "id": "transport-cc"},
				{ "id": "ccm", "params": ["fir"]},
				{ "id": "nack"},
				{ "id": "nack", "params": ["pli"]}
			]),
			extensions	: [ "urn:3gpp:video-orientation", "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01"]
		}
	}
});

console.dir(answer2.plain(),{depth: null, colors: true});
console.log(answer2.toString());