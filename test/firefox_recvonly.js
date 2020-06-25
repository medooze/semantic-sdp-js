const SemanticSDP = require("../index");

const SDPInfo		= SemanticSDP.SDPInfo;
const MediaInfo		= SemanticSDP.MediaInfo;
const CodecInfo		= SemanticSDP.CodecInfo;
const CandidateInfo	= SemanticSDP.CandidateInfo;
const DTLSInfo		= SemanticSDP.DTLSInfo;
const ICEInfo		= SemanticSDP.ICEInfo;
const StreamInfo	= SemanticSDP.StreamInfo;
const TrackInfo		= SemanticSDP.TrackInfo;
const Setup		= SemanticSDP.Setup;


const sdp = 
	"v=0\r\n" +
	"o=mozilla...THIS_IS_SDPARTA-70.0.1 122600549385334820 2 IN IP4 0.0.0.0\r\n" +
	"s=-\r\n" +
	"t=0 0\r\n" +
	"a=fingerprint:sha-256 A7:0C:21:9A:5F:B9:C5:90:C4:FF:F9:AC:E8:CF:E8:23:81:D8:35:04:42:DF:12:C8:E3:3F:6F:5A:19:9C:FB:DC\r\n" +
	"a=group:BUNDLE 0 1 2 3\r\n" +
	"a=ice-options:trickle\r\n" +
	"a=msid-semantic:WMS *\r\n" +
	"m=audio 49698 UDP/TLS/RTP/SAVPF 109 9 0 8 101\r\n" +
	"c=IN IP4 178.62.245.74\r\n" +
	"a=candidate:0 1 UDP 2122252543 192.168.1.3 55750 typ host\r\n" +
	"a=candidate:4 1 TCP 2105524479 192.168.1.3 9 typ host tcptype active\r\n" +
	"a=candidate:1 1 UDP 1686052863 176.105.212.140 52685 typ srflx raddr 192.168.1.3 rport 55750\r\n" +
	"a=candidate:3 1 UDP 92217087 178.62.245.74 49698 typ relay raddr 178.62.245.74 rport 49698\r\n" +
	"a=candidate:5 1 UDP 8331263 178.62.245.74 59390 typ relay raddr 178.62.245.74 rport 59390\r\n" +
	"a=sendrecv\r\n" +
	"a=end-of-candidates\r\n" +
	"a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level\r\n" +
	"a=extmap:2/recvonly urn:ietf:params:rtp-hdrext:csrc-audio-level\r\n" +
	"a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=fmtp:109 maxplaybackrate=48000;stereo=1;useinbandfec=1\r\n" +
	"a=fmtp:101 0-15\r\n" +
	"a=ice-pwd:d5ea1f15306e4f2cc013f77d6914ec36\r\n" +
	"a=ice-ufrag:c4ae2ae0\r\n" +
	"a=mid:0\r\n" +
	"a=msid:{3ec30f9c-6c14-d743-b9c9-90f36b1e2ba4} {f44e4f2a-5d92-f545-8715-17e8988fa2b2}\r\n" +
	"a=rtcp-mux\r\n" +
	"a=rtpmap:109 opus/48000/2\r\n" +
	"a=rtpmap:9 G722/8000/1\r\n" +
	"a=rtpmap:0 PCMU/8000\r\n" +
	"a=rtpmap:8 PCMA/8000\r\n" +
	"a=rtpmap:101 telephone-event/8000/1\r\n" +
	"a=setup:actpass\r\n" +
	"a=ssrc:2746367267 cname:{9f2de3e2-cf24-4748-8b39-765f807dbb6e}\r\n" +
	"m=video 0 UDP/TLS/RTP/SAVPF 120 121 126 97\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=bundle-only\r\n" +
	"a=sendrecv\r\n" +
	"a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=extmap:4 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n" +
	"a=extmap:5 urn:ietf:params:rtp-hdrext:toffset\r\n" +
	"a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\r\n" +
	"a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1\r\n" +
	"a=fmtp:120 max-fs=12288;max-fr=60\r\n" +
	"a=fmtp:121 max-fs=12288;max-fr=60\r\n" +
	"a=ice-pwd:d5ea1f15306e4f2cc013f77d6914ec36\r\n" +
	"a=ice-ufrag:c4ae2ae0\r\n" +
	"a=mid:1\r\n" +
	"a=msid:{3ec30f9c-6c14-d743-b9c9-90f36b1e2ba4} {82619ebd-4389-5c41-b538-9edee0292ecb}\r\n" +
	"a=rtcp-fb:120 nack\r\n" +
	"a=rtcp-fb:120 nack pli\r\n" +
	"a=rtcp-fb:120 ccm fir\r\n" +
	"a=rtcp-fb:120 goog-remb\r\n" +
	"a=rtcp-fb:121 nack\r\n" +
	"a=rtcp-fb:121 nack pli\r\n" +
	"a=rtcp-fb:121 ccm fir\r\n" +
	"a=rtcp-fb:121 goog-remb\r\n" +
	"a=rtcp-fb:126 nack\r\n" +
	"a=rtcp-fb:126 nack pli\r\n" +
	"a=rtcp-fb:126 ccm fir\r\n" +
	"a=rtcp-fb:126 goog-remb\r\n" +
	"a=rtcp-fb:97 nack\r\n" +
	"a=rtcp-fb:97 nack pli\r\n" +
	"a=rtcp-fb:97 ccm fir\r\n" +
	"a=rtcp-fb:97 goog-remb\r\n" +
	"a=rtcp-mux\r\n" +
	"a=rtpmap:120 VP8/90000\r\n" +
	"a=rtpmap:121 VP9/90000\r\n" +
	"a=rtpmap:126 H264/90000\r\n" +
	"a=rtpmap:97 H264/90000\r\n" +
	"a=setup:actpass\r\n" +
	"a=ssrc:4045336274 cname:{9f2de3e2-cf24-4748-8b39-765f807dbb6e}\r\n" +
	"m=audio 0 UDP/TLS/RTP/SAVPF 109 9 0 8 101\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=bundle-only\r\n" +
	"a=recvonly\r\n" +
	"a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level\r\n" +
	"a=extmap:2/recvonly urn:ietf:params:rtp-hdrext:csrc-audio-level\r\n" +
	"a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=fmtp:109 maxplaybackrate=48000;stereo=1;useinbandfec=1\r\n" +
	"a=fmtp:101 0-15\r\n" +
	"a=ice-pwd:d5ea1f15306e4f2cc013f77d6914ec36\r\n" +
	"a=ice-ufrag:c4ae2ae0\r\n" +
	"a=mid:2\r\n" +
	"a=rtcp-mux\r\n" +
	"a=rtpmap:109 opus/48000/2\r\n" +
	"a=rtpmap:9 G722/8000/1\r\n" +
	"a=rtpmap:0 PCMU/8000\r\n" +
	"a=rtpmap:8 PCMA/8000\r\n" +
	"a=rtpmap:101 telephone-event/8000/1\r\n" +
	"a=setup:actpass\r\n" +
	"a=ssrc:2910176372 cname:{9f2de3e2-cf24-4748-8b39-765f807dbb6e}\r\n" +
	"m=video 0 UDP/TLS/RTP/SAVPF 120 121 126 97\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=bundle-only\r\n" +
	"a=sendrecv\r\n" +
	"a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=extmap:4 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n" +
	"a=extmap:5 urn:ietf:params:rtp-hdrext:toffset\r\n" +
	"a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\r\n" +
	"a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1\r\n" +
	"a=fmtp:120 max-fs=12288;max-fr=60\r\n" +
	"a=fmtp:121 max-fs=12288;max-fr=60\r\n" +
	"a=ice-pwd:d5ea1f15306e4f2cc013f77d6914ec36\r\n" +
	"a=ice-ufrag:c4ae2ae0\r\n" +
	"a=mid:3\r\n" +
	"a=msid:{4c532b2a-5368-f149-ba49-4da54835e807} {8d42cc7c-9b24-6b41-b824-96e7b4e15fd2}\r\n" +
	"a=rtcp-fb:120 nack\r\n" +
	"a=rtcp-fb:120 nack pli\r\n" +
	"a=rtcp-fb:120 ccm fir\r\n" +
	"a=rtcp-fb:120 goog-remb\r\n" +
	"a=rtcp-fb:121 nack\r\n" +
	"a=rtcp-fb:121 nack pli\r\n" +
	"a=rtcp-fb:121 ccm fir\r\n" +
	"a=rtcp-fb:121 goog-remb\r\n" +
	"a=rtcp-fb:126 nack\r\n" +
	"a=rtcp-fb:126 nack pli\r\n" +
	"a=rtcp-fb:126 ccm fir\r\n" +
	"a=rtcp-fb:126 goog-remb\r\n" +
	"a=rtcp-fb:97 nack\r\n" +
	"a=rtcp-fb:97 nack pli\r\n" +
	"a=rtcp-fb:97 ccm fir\r\n" +
	"a=rtcp-fb:97 goog-remb\r\n" +
	"a=rtcp-mux\r\n" +
	"a=rtpmap:120 VP8/90000\r\n" +
	"a=rtpmap:121 VP9/90000\r\n" +
	"a=rtpmap:126 H264/90000\r\n" +
	"a=rtpmap:97 H264/90000\r\n" +
	"a=setup:actpass\r\n" +
	"a=ssrc:1428875895 cname:{9f2de3e2-cf24-4748-8b39-765f807dbb6e}\r\n";


//Process the sdp
const offer = SDPInfo.process(sdp);

console.dir(offer.plain(), {depth: null, colors: true});
console.log(offer.toString());



const answer = offer.answer({
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
			codecs		: CodecInfo.MapFromNames(["vp9","vp8","h264"],true,[
				{ "id": "transport-cc"},
				{ "id": "ccm", "params": ["fir"]},
				{ "id": "nack"},
				{ "id": "nack", "params": ["pli"]}
			]),
			extensions	: [ "urn:3gpp:video-orientation", "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01"]
		}
	}
});

console.dir(answer.plain(),{depth: null, colors: true});
console.log(answer.toString());
