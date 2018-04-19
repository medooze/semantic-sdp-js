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
	"o=mozilla...THIS_IS_SDPARTA-56.0a1 6842103367782848290 0 IN IP4 0.0.0.0\r\n" + 
	"s=-\r\n" + 
	"t=0 0\r\n" + 
	"a=fingerprint:sha-256 7A:23:AB:6B:FC:CA:C5:21:42:28:8C:1D:CE:CC:17:48:41:38:BD:89:A6:A0:B9:48:3F:3B:52:71:36:21:C1:0B\r\n" + 
	"a=group:BUNDLE sdparta_0 sdparta_1\r\n" + 
	"a=ice-options:trickle\r\n" + 
	"a=msid-semantic:WMS *\r\n" + 
	"m=audio 9 UDP/TLS/RTP/SAVPF 109 9 0 8 101\r\n" + 
	"c=IN IP4 0.0.0.0\r\n" + 
	"a=sendrecv\r\n" + 
	"a=extmap:1/sendonly urn:ietf:params:rtp-hdrext:ssrc-audio-level\r\n" + 
	"a=fmtp:109 maxplaybackrate=48000;stereo=1;useinbandfec=1\r\n" + 
	"a=fmtp:101 0-15\r\n" + 
	"a=ice-pwd:4caefce9e4e140554a3d521a2ed39d08\r\n" + 
	"a=ice-ufrag:d8289e69\r\n" + 
	"a=mid:sdparta_0\r\n" + 
	"a=msid:{cb25209c-85a0-4206-b7fa-a60d9f86af44} {85211739-1f21-4dd9-b67f-e46cb5da7cdf}\r\n" + 
	"a=rtcp-mux\r\n" + 
	"a=rtpmap:109 opus/48000/2\r\n" + 
	"a=rtpmap:9 G722/8000/1\r\n" + 
	"a=rtpmap:0 PCMU/8000\r\n" + 
	"a=rtpmap:8 PCMA/8000\r\n" + 
	"a=rtpmap:101 telephone-event/8000/1\r\n" + 
	"a=setup:actpass\r\n" + 
	"a=ssrc:1426416515 cname:{6af8befe-6c10-4eaf-8f5b-df07ea6f7bed}\r\n" + 
	"m=video 9 UDP/TLS/RTP/SAVPF 120 121 126 97\r\n" + 
	"c=IN IP4 0.0.0.0\r\n" + 
	"a=sendrecv\r\n" + 
	"a=extmap:1 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n" + 
	"a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n" + 
	"a=extmap:3/sendonly urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id\r\n" + 
	"a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\r\n" + 
	"a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1\r\n" + 
	"a=fmtp:120 max-fs=12288;max-fr=60\r\n" + 
	"a=fmtp:121 max-fs=12284;max-fr=63\r\n" + 
	"a=ice-pwd:4caefce9e4e140554a3d521a2ed39d08\r\n" + 
	"a=ice-ufrag:d8289e69\r\n" + 
	"a=mid:sdparta_1\r\n" + 
	"a=msid:{cb25209c-85a0-4206-b7fa-a60d9f86af44} {bda117ec-857c-456c-b944-e5d354f51ddc}\r\n" + 
	"a=rid:f send\r\n" + 
	"a=rid:h send\r\n" + 
	"a=rid:i send\r\n" + 
	"a=rid:q send pt=120,121;max-width=1280;max-height=720;max-fps=15\r\n" + 
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
	//"a=simulcast:send 1,~4;2;3 recv c\r\n" +
	"a=simulcast:send f,~h;i;q\r\n" +
	"a=ssrc:2169237449 cname:{6af8befe-6c10-4eaf-8f5b-df07ea6f7bed}\r\n" + 
	"a=ssrc:3812576694 cname:{6af8befe-6c10-4eaf-8f5b-df07ea6f7bed}\r\n" + 
	"a=ssrc:3431483321 cname:{6af8befe-6c10-4eaf-8f5b-df07ea6f7bed}\r\n";

//Process the sdp
var offer = SDPInfo.process(sdp);

console.dir(offer.plain(), {depth: null, colors: true});
console.log(offer.toString());

//Get local DTLS and ICE info
const dtls = new DTLSInfo(Setup.reverse(offer.getDTLS().getSetup()),"sha-256","F2:AA:0E:C3:22:59:5E:14:95:69:92:3D:13:B4:84:24:2C:C2:A2:C0:3E:FD:34:8E:5E:EA:6F:AF:52:CE:E6:0F");
const ice  = new ICEInfo("af46F","a34FasdS++jdfofdslkjsd/SDV");

//Get local candidte
const candidate = new CandidateInfo(1,1, "udp", 2122260223, "192.168.0.196", 56143, "host");

//Create local SDP info
let answer = new SDPInfo();

//Add ice and dtls info
answer.setDTLS(dtls);
answer.setICE(ice);
answer.addCandidate(candidate);

//Add video answer media
answer.addMedia(
	offer.getMedia("video").answer({
		codecs: CodecInfo.MapFromNames(["VP8"], true),
		extensions: new Set([
			"urn:ietf:params:rtp-hdrext:toffset",
			"http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time",
			"urn:3gpp:video-orientation",
			"http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01",
			"http://www.webrtc.org/experiments/rtp-hdrext/playout-delay",	
			"urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id"
		]),
		simulcast: true
	})
);

console.log("Answer:"+answer.toString());
const plain = answer.plain();
console.dir(plain, {depth: null, colors: true});

const cloned = answer.clone();
console.dir(cloned, {depth: null, colors: true});
console.log("Cloned:"+cloned.toString());

const expanded = SDPInfo.expand(plain);
console.log("Expanded:"+expanded.toString());