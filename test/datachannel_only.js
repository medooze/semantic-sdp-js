const SemanticSDP = require("../index");

const SDPInfo		= SemanticSDP.SDPInfo;
const MediaInfo		= SemanticSDP.MediaInfo;
const CandidateInfo	= SemanticSDP.CandidateInfo;
const DTLSInfo		= SemanticSDP.DTLSInfo;
const ICEInfo		= SemanticSDP.ICEInfo;
const StreamInfo	= SemanticSDP.StreamInfo;
const TrackInfo		= SemanticSDP.TrackInfo;
const Setup		= SemanticSDP.Setup;
const Direction		= SemanticSDP.Direction;
const SourceGroupInfo   = SemanticSDP.SourceGroupInfo;
const CodecInfo		= SemanticSDP.CodecInfo;

const sdp = "v=0\r\n" +
		"o=- 5636137646675714991 2 IN IP4 127.0.0.1\r\n" +
		"s=-\r\n" +
		"t=0 0\r\n" +
		"a=group:BUNDLE data\r\n" +
		"a=msid-semantic: WMS\r\n" +
		"m=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\n" +
		"c=IN IP4 0.0.0.0\r\n" +
		"a=ice-ufrag:8qF7\r\n" +
		"a=ice-pwd:zjQd1U0/CufgXINHcPcdd0Bd\r\n" +
		"a=ice-options:trickle\r\n" +
		"a=fingerprint:sha-256 10:8E:F5:D7:A2:B3:63:EF:BD:64:8C:5F:56:A0:66:05:9F:B1:5C:1A:C5:79:BD:EE:90:92:C4:1A:C4:B7:1F:58\r\n" +
		"a=setup:actpass\r\n" +
		"a=mid:data\r\n" +
		"a=sctp-port:5000\r\n" +
		"a=max-message-size:100000\r\n";
	
	

//Process the sdp
const offer = SDPInfo.process(sdp);
console.dir(offer.plain(),{depth: null, colors: true});
console.log(offer.toString());

const answer1 = offer.answer({
	dtls		: {
		"setup"	      : "PASSIVE",
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
		application : {
			dataChannel	: { maxMessageSize: 100}
		}
	}
});
console.dir(answer1.plain(),{depth: null, colors: true});
console.log(answer1.toString());