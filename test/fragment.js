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
});


console.log(sdpInfo.toIceFragmentString());


const sdp = "a=ice-ufrag:cB7q\r\n" +
	"a=ice-pwd:DtBRorOM5cdJTSAN8lDqIpqI\r\n" +
	"m=audio RTP/AVP 0\r\n" +
	"a=mid:0\r\n" +
	"a=candidate:1387637174 1 udp 2122260223 192.168.0.39 52564 typ host generation 0 ufrag MS47 network-id 1\r\n" +
	"a=candidate:3471623853 1 udp 2122194687 192.168.64.1 52565 typ host generation 0 ufrag MS47 network-id 2\r\n" +
	"a=end-of-candiadates\r\n" +
	"m=video RTP/AVP 0\r\n" +
	"a=mid:1\r\n" +
	"a=candidate:1387637174 1 udp 2122260223 192.168.0.39 52566 typ host generation 0 ufrag MS47 network-id 1\r\n" +
	"a=candidate:3471623853 1 udp 2122194687 192.168.64.1 52567 typ host generation 0 ufrag MS47 network-id 2\r\n" +
	"a=end-of-candiadates\r\n";


//Process the sdp
var offer = SDPInfo.process(sdp);

console.log("Offer:"+offer.toIceFragmentString());
console.dir(offer, {depth: null, colors: true});
console.dir(offer.plain(), {depth: null, colors: true});
