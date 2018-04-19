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
	"o=- 8839390934212201487 2 IN IP4 127.0.0.1\r\n" +
	"s=-\r\n" +
	"t=0 0\r\n" +
	"a=group:BUNDLE audio video\r\n" +
	"a=msid-semantic: WMS C4riY03fbhoDsnzfJioOY1fv8gEJqY6ataNY\r\n" +
	"m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 110 112 113 126\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=rtcp:9 IN IP4 0.0.0.0\r\n" +
	"a=ice-ufrag:GYTy\r\n" +
	"a=ice-pwd:NG3S0e1G38tJW5V4Rx4vt+D4\r\n" +
	"a=ice-options:trickle\r\n" +
	"a=fingerprint:sha-256 DC:E4:2F:94:4D:AB:31:BD:CB:6B:1C:8F:C3:55:46:C2:45:05:8D:56:6D:35:8B:D5:17:71:FA:06:1D:BB:5C:11\r\n" +
	"a=setup:actpass\r\n" +
	"a=mid:audio\r\n" +
	"a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level\r\n" +
	"a=sendrecv\r\n" +
	"a=rtcp-mux\r\n" +
	"a=rtpmap:111 opus/48000/2\r\n" +
	"a=rtcp-fb:111 transport-cc\r\n" +
	"a=fmtp:111 minptime=10;useinbandfec=1\r\n" +
	"a=rtpmap:103 ISAC/16000\r\n" +
	"a=rtpmap:104 ISAC/32000\r\n" +
	"a=rtpmap:9 G722/8000\r\n" +
	"a=rtpmap:0 PCMU/8000\r\n" +
	"a=rtpmap:8 PCMA/8000\r\n" +
	"a=rtpmap:106 CN/32000\r\n" +
	"a=rtpmap:105 CN/16000\r\n" +
	"a=rtpmap:13 CN/8000\r\n" +
	"a=rtpmap:110 telephone-event/48000\r\n" +
	"a=rtpmap:112 telephone-event/32000\r\n" +
	"a=rtpmap:113 telephone-event/16000\r\n" +
	"a=rtpmap:126 telephone-event/8000\r\n" +
	"a=ssrc:2079201489 cname:V3/ssavMvLVkYOpu\r\n" +
	"a=ssrc:2079201489 msid:C4riY03fbhoDsnzfJioOY1fv8gEJqY6ataNY 903b0fe2-5f44-45ae-a0b6-35930cd9ec2b\r\n" +
	"a=ssrc:2079201489 mslabel:C4riY03fbhoDsnzfJioOY1fv8gEJqY6ataNY\r\n" +
	"a=ssrc:2079201489 label:903b0fe2-5f44-45ae-a0b6-35930cd9ec2b\r\n" +
	"m=video 9 UDP/TLS/RTP/SAVPF 96 97 98 99 100 101 102 123 127 122 125 107 108 109 124\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=rtcp:9 IN IP4 0.0.0.0\r\n" +
	"a=ice-ufrag:GYTy\r\n" +
	"a=ice-pwd:NG3S0e1G38tJW5V4Rx4vt+D4\r\n" +
	"a=ice-options:trickle\r\n" +
	"a=fingerprint:sha-256 DC:E4:2F:94:4D:AB:31:BD:CB:6B:1C:8F:C3:55:46:C2:45:05:8D:56:6D:35:8B:D5:17:71:FA:06:1D:BB:5C:11\r\n" +
	"a=setup:actpass\r\n" +
	"a=mid:video\r\n" +
	"a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n" +
	"a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n" +
	"a=extmap:4 urn:3gpp:video-orientation\r\n" +
	"a=extmap:5 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01\r\n" +
	"a=extmap:6 http://www.webrtc.org/experiments/rtp-hdrext/playout-delay\r\n" +
	"a=extmap:7 http://www.webrtc.org/experiments/rtp-hdrext/video-content-type\r\n" +
	"a=extmap:8 http://www.webrtc.org/experiments/rtp-hdrext/video-timing\r\n" +
	"a=sendrecv\r\n" +
	"a=rtcp-mux\r\n" +
	"a=rtcp-rsize\r\n" +
	"a=rtpmap:96 VP8/90000\r\n" +
	"a=rtcp-fb:96 goog-remb\r\n" +
	"a=rtcp-fb:96 transport-cc\r\n" +
	"a=rtcp-fb:96 ccm fir\r\n" +
	"a=rtcp-fb:96 nack\r\n" +
	"a=rtcp-fb:96 nack pli\r\n" +
	"a=rtpmap:97 rtx/90000\r\n" +
	"a=fmtp:97 apt=96\r\n" +
	"a=rtpmap:98 VP9/90000\r\n" +
	"a=rtcp-fb:98 goog-remb\r\n" +
	"a=rtcp-fb:98 transport-cc\r\n" +
	"a=rtcp-fb:98 ccm fir\r\n" +
	"a=rtcp-fb:98 nack\r\n" +
	"a=rtcp-fb:98 nack pli\r\n" +
	"a=rtpmap:99 rtx/90000\r\n" +
	"a=fmtp:99 apt=98\r\n" +
	"a=rtpmap:100 H264/90000\r\n" +
	"a=rtcp-fb:100 goog-remb\r\n" +
	"a=rtcp-fb:100 transport-cc\r\n" +
	"a=rtcp-fb:100 ccm fir\r\n" +
	"a=rtcp-fb:100 nack\r\n" +
	"a=rtcp-fb:100 nack pli\r\n" +
	"a=fmtp:100 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42001f\r\n" +
	"a=rtpmap:101 rtx/90000\r\n" +
	"a=fmtp:101 apt=100\r\n" +
	"a=rtpmap:102 H264/90000\r\n" +
	"a=rtcp-fb:102 goog-remb\r\n" +
	"a=rtcp-fb:102 transport-cc\r\n" +
	"a=rtcp-fb:102 ccm fir\r\n" +
	"a=rtcp-fb:102 nack\r\n" +
	"a=rtcp-fb:102 nack pli\r\n" +
	"a=fmtp:102 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f\r\n" +
	"a=rtpmap:123 rtx/90000\r\n" +
	"a=fmtp:123 apt=102\r\n" +
	"a=rtpmap:127 H264/90000\r\n" +
	"a=rtcp-fb:127 goog-remb\r\n" +
	"a=rtcp-fb:127 transport-cc\r\n" +
	"a=rtcp-fb:127 ccm fir\r\n" +
	"a=rtcp-fb:127 nack\r\n" +
	"a=rtcp-fb:127 nack pli\r\n" +
	"a=fmtp:127 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=4d0032\r\n" +
	"a=rtpmap:122 rtx/90000\r\n" +
	"a=fmtp:122 apt=127\r\n" +
	"a=rtpmap:125 H264/90000\r\n" +
	"a=rtcp-fb:125 goog-remb\r\n" +
	"a=rtcp-fb:125 transport-cc\r\n" +
	"a=rtcp-fb:125 ccm fir\r\n" +
	"a=rtcp-fb:125 nack\r\n" +
	"a=rtcp-fb:125 nack pli\r\n" +
	"a=fmtp:125 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=640032\r\n" +
	"a=rtpmap:107 rtx/90000\r\n" +
	"a=fmtp:107 apt=125\r\n" +
	"a=rtpmap:108 red/90000\r\n" +
	"a=rtpmap:109 rtx/90000\r\n" +
	"a=fmtp:109 apt=108\r\n" +
	"a=rtpmap:124 ulpfec/90000\r\n" +
	"a=ssrc-group:FID 3509170687 2383738853\r\n" +
	"a=ssrc:3509170687 cname:V3/ssavMvLVkYOpu\r\n" +
	"a=ssrc:3509170687 msid:C4riY03fbhoDsnzfJioOY1fv8gEJqY6ataNY 2922fc49-acf5-4070-8545-7beea24f233a\r\n" +
	"a=ssrc:3509170687 mslabel:C4riY03fbhoDsnzfJioOY1fv8gEJqY6ataNY\r\n" +
	"a=ssrc:3509170687 label:2922fc49-acf5-4070-8545-7beea24f233a\r\n" +
	"a=ssrc:2383738853 cname:V3/ssavMvLVkYOpu\r\n" +
	"a=ssrc:2383738853 msid:C4riY03fbhoDsnzfJioOY1fv8gEJqY6ataNY 2922fc49-acf5-4070-8545-7beea24f233a\r\n" +
	"a=ssrc:2383738853 mslabel:C4riY03fbhoDsnzfJioOY1fv8gEJqY6ataNY\r\n" +
	"a=ssrc:2383738853 label:2922fc49-acf5-4070-8545-7beea24f233a\r\n" +
	"a=ssrc-group:FID 3677511777 3228776611\r\n" +
	"a=ssrc:3677511777 cname:V3/ssavMvLVkYOpu\r\n" +
	"a=ssrc:3677511777 msid:C4riY03fbhoDsnzfJioOY1fv8gEJqY6ataNY ce6ec12b-fd71-404e-a45f-1a45ff2e8e38\r\n" +
	"a=ssrc:3677511777 mslabel:C4riY03fbhoDsnzfJioOY1fv8gEJqY6ataNY\r\n" +
	"a=ssrc:3677511777 label:ce6ec12b-fd71-404e-a45f-1a45ff2e8e38\r\n" +
	"a=ssrc:3228776611 cname:V3/ssavMvLVkYOpu\r\n" +
	"a=ssrc:3228776611 msid:C4riY03fbhoDsnzfJioOY1fv8gEJqY6ataNY ce6ec12b-fd71-404e-a45f-1a45ff2e8e38\r\n" +
	"a=ssrc:3228776611 mslabel:C4riY03fbhoDsnzfJioOY1fv8gEJqY6ataNY\r\n" +
	"a=ssrc:3228776611 label:ce6ec12b-fd71-404e-a45f-1a45ff2e8e38\r\n" +
	"a=ssrc-group:FID 100 101\r\n" +
	"a=ssrc:100 cname:V3/ssavMvLVkYOpu\r\n" +
	"a=ssrc:100 msid:C4riY03fbhoDsnzfJioOY1fv8gEJqY6ataNY 2922fc49-acf5-4070-8545-7beea24f233a\r\n" +
	"a=ssrc:100 mslabel:C4riY03fbhoDsnzfJioOY1fv8gEJqY6ataNY\r\n" +
	"a=ssrc:100 label:2922fc49-acf5-4070-8545-7beea24f233a\r\n" +
	"a=ssrc:101 cname:V3/ssavMvLVkYOpu\r\n" +
	"a=ssrc:101 msid:C4riY03fbhoDsnzfJioOY1fv8gEJqY6ataNY 2922fc49-acf5-4070-8545-7beea24f233a\r\n" +
	"a=ssrc:101 mslabel:C4riY03fbhoDsnzfJioOY1fv8gEJqY6ataNY\r\n" +
	"a=ssrc:101 label:2922fc49-acf5-4070-8545-7beea24f233a\r\n" +
	"a=ssrc-group:FID 102 103\r\n" +
	"a=ssrc:102 cname:V3/ssavMvLVkYOpu\r\n" +
	"a=ssrc:102 msid:C4riY03fbhoDsnzfJioOY1fv8gEJqY6ataNY 2922fc49-acf5-4070-8545-7beea24f233a\r\n" +
	"a=ssrc:102 mslabel:C4riY03fbhoDsnzfJioOY1fv8gEJqY6ataNY\r\n" +
	"a=ssrc:102 label:2922fc49-acf5-4070-8545-7beea24f233a\r\n" +
	"a=ssrc:103 cname:V3/ssavMvLVkYOpu\r\n" +
	"a=ssrc:103 msid:C4riY03fbhoDsnzfJioOY1fv8gEJqY6ataNY 2922fc49-acf5-4070-8545-7beea24f233a\r\n" +
	"a=ssrc:103 mslabel:C4riY03fbhoDsnzfJioOY1fv8gEJqY6ataNY\r\n" +
	"a=ssrc:103 label:2922fc49-acf5-4070-8545-7beea24f233a\r\n" +
	"a=ssrc-group:SIM 3509170687 100 102\r\n" +
	"a=simulcast:send l0;l1;l2\r\n" +
	"a=rid:l0 send ssrc=3509170687\r\n" +
	"a=rid:l1 send ssrc=100\r\n" +
	"a=rid:l2 send ssrc=102\r\n" +
	"a=x-google-flag:conference\r\n" +

//Process the sdp
var offer = SDPInfo.process(sdp);

console.dir(offer.plain(), {depth: null, colors: true});
console.log(offer.toString());