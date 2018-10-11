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
		"m=application 9 DTLS/SCTP 5000\r\n" +
		"c=IN IP4 0.0.0.0\r\n" +
		"a=ice-ufrag:8qF7\r\n" +
		"a=ice-pwd:zjQd1U0/CufgXINHcPcdd0Bd\r\n" +
		"a=ice-options:trickle\r\n" +
		"a=fingerprint:sha-256 10:8E:F5:D7:A2:B3:63:EF:BD:64:8C:5F:56:A0:66:05:9F:B1:5C:1A:C5:79:BD:EE:90:92:C4:1A:C4:B7:1F:58\r\n" +
		"a=setup:actpass\r\n" +
		"a=mid:data\r\n" +
		"a=sctpmap:5000 webrtc-datachannel 1024\r\n";
	
	
const iceInfo = new ICEInfo("a", "v");
const dtlsInfo = new DTLSInfo(Setup.ACTIVE, 'sha-256', "10:8E:F5:D7:A2:B3:63:EF:BD:64:8C:5F:56:A0:66:05:9F:B1:5C:1A:C5:79:BD:EE:90:92:C4:1A:C4:B7:1F:58");

const offer = SDPInfo.parse(sdp);
	
const answer = offer.answer({ ice: iceInfo, dtls: dtlsInfo });
	
console.log("Answer:"+answer.toString());