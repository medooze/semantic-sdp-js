const SemanticSDP = require("..");
const {
	SDPInfo,
	MediaInfo,
	CodecInfo,
	CandidateInfo,
	DTLSInfo,
	ICEInfo,
	StreamInfo,
	TrackInfo,
	Setup,
} = require("..");


const sdp = 
	  "v=0\r\n"
	+ "o=- 8054376556895016084 2 IN IP4 127.0.0.1\r\n"
	+ "s=-\r\n"
	+ "t=0 0\r\n"
	+ "a=group:BUNDLE audio video\r\n"
	+ "a=msid-semantic: WMS stream_label\r\n"
	+ "m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 102 0 8 106 105 13 110 112 113 126\r\n"
	+ "c=IN IP4 0.0.0.0\r\n"
	+ "a=rtcp:9 IN IP4 0.0.0.0\r\n"
	+ "a=ice-ufrag:le8D\r\n"
	+ "a=ice-pwd:dMFJh+92xQ1SocYu58PL218n\r\n"
	+ "a=ice-options:trickle\r\n"
	+ "a=fingerprint:sha-256 D6:1A:F1:10:6C:B4:A8:69:1E:28:68:EF:F7:7B:7D:7C:41:B5:E2:9A:4E:C8:AE:6D:5A:DC:B3:63:5C:58:9B:D3\r\n"
	+ "a=setup:actpass\r\n"
	+ "a=mid:audio\r\n"
	+ "a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level\r\n"
	+ "a=sendrecv\r\n"
	+ "a=rtcp-mux\r\n"
	+ "a=rtpmap:111 opus/48000/2\r\n"
	+ "a=rtcp-fb:111 transport-cc\r\n"
	+ "a=fmtp:111 minptime=10;useinbandfec=1\r\n"
	+ "a=rtpmap:103 ISAC/16000\r\n"
	+ "a=rtpmap:104 ISAC/32000\r\n"
	+ "a=rtpmap:9 G722/8000\r\n"
	+ "a=rtpmap:102 ILBC/8000\r\n"
	+ "a=rtpmap:0 PCMU/8000\r\n"
	+ "a=rtpmap:8 PCMA/8000\r\n"
	+ "a=rtpmap:106 CN/32000\r\n"
	+ "a=rtpmap:105 CN/16000\r\n"
	+ "a=rtpmap:13 CN/8000\r\n"
	+ "a=rtpmap:110 telephone-event/48000\r\n"
	+ "a=rtpmap:112 telephone-event/32000\r\n"
	+ "a=rtpmap:113 telephone-event/16000\r\n"
	+ "a=rtpmap:126 telephone-event/8000\r\n"
	+ "a=ssrc:2985095369 cname:GZKh5LIYoFMab6V/\r\n"
	+ "a=ssrc:2985095369 msid:stream_label audio_label\r\n"
	+ "a=ssrc:2985095369 mslabel:stream_label\r\n"
	+ "a=ssrc:2985095369 label:audio_label\r\n"
	+ "m=video 9 UDP/TLS/RTP/SAVPF 96 97 98 99 100 101 127\r\n"
	+ "c=IN IP4 0.0.0.0\r\n"
	+ "a=rtcp:9 IN IP4 0.0.0.0\r\n"
	+ "a=ice-ufrag:le8D\r\n"
	+ "a=ice-pwd:dMFJh+92xQ1SocYu58PL218n\r\n"
	+ "a=ice-options:trickle\r\n"
	+ "a=fingerprint:sha-256 D6:1A:F1:10:6C:B4:A8:69:1E:28:68:EF:F7:7B:7D:7C:41:B5:E2:9A:4E:C8:AE:6D:5A:DC:B3:63:5C:58:9B:D3\r\n"
	+ "a=setup:actpass\r\n"
	+ "a=mid:video\r\n"
	+ "a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n"
	+ "a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n"
	+ "a=extmap:4 urn:3gpp:video-orientation\r\n"
	+ "a=extmap:5 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01\r\n"
	+ "a=extmap:6 http://www.webrtc.org/experiments/rtp-hdrext/playout-delay\r\n"
	+ "a=extmap:7 http://www.webrtc.org/experiments/rtp-hdrext/video-content-type\r\n"
	+ "a=extmap:8 http://www.webrtc.org/experiments/rtp-hdrext/video-timing\r\n"
	+ "a=sendrecv\r\n"
	+ "a=rtcp-mux\r\n"
	+ "a=rtcp-rsize\r\n"
	+ "a=rtpmap:96 VP8/90000\r\n"
	+ "a=rtcp-fb:96 ccm fir\r\n"
	+ "a=rtcp-fb:96 nack\r\n"
	+ "a=rtcp-fb:96 nack pli\r\n"
	+ "a=rtcp-fb:96 goog-remb\r\n"
	+ "a=rtcp-fb:96 transport-cc\r\n"
	+ "a=rtpmap:97 rtx/90000\r\n"
	+ "a=fmtp:97 apt=96\r\n"
	+ "a=rtpmap:98 VP9/90000\r\n"
	+ "a=rtcp-fb:98 ccm fir\r\n"
	+ "a=rtcp-fb:98 nack\r\n"
	+ "a=rtcp-fb:98 nack pli\r\n"
	+ "a=rtcp-fb:98 goog-remb\r\n"
	+ "a=rtcp-fb:98 transport-cc\r\n"
	+ "a=rtpmap:99 rtx/90000\r\n"
	+ "a=fmtp:99 apt=98\r\n"
	+ "a=rtpmap:100 red/90000\r\n"
	+ "a=rtpmap:101 rtx/90000\r\n"
	+ "a=fmtp:101 apt=100\r\n"
	+ "a=rtpmap:127 ulpfec/90000\r\n"
	+ "a=ssrc-group:FID 3605801057 3768399634\r\n"
	+ "a=ssrc:3605801057 cname:GZKh5LIYoFMab6V/\r\n"
	+ "a=ssrc:3605801057 msid:stream_label video_label\r\n"
	+ "a=ssrc:3605801057 mslabel:stream_label\r\n"
	+ "a=ssrc:3605801057 label:video_label\r\n"
	+ "a=ssrc:3768399634 cname:GZKh5LIYoFMab6V/\r\n"
	+ "a=ssrc:3768399634 msid:stream_label video_label\r\n"
	+ "a=ssrc:3768399634 mslabel:stream_label\r\n"
	+ "a=ssrc:3768399634 label:video_label\r\n"
	+ "a=ssrc-group:SIM 3605801057 1 2\r\n"
	+ "a=ssrc-group:FID 1 3\r\n"
	+ "a=ssrc-group:FID 2 4\r\n"
	+ "a=ssrc:1 cname:GZKh5LIYoFMab6V/\r\n"
	+ "a=ssrc:2 cname:GZKh5LIYoFMab6V/\r\n"
	+ "a=ssrc:3 cname:GZKh5LIYoFMab6V/\r\n"
	+ "a=ssrc:4 cname:GZKh5LIYoFMab6V/\r\n"
	+ "a=ssrc:1 msid:stream_label video_label\r\n"
	+ "a=ssrc:2 msid:stream_label video_label\r\n"
	+ "a=ssrc:3 msid:stream_label video_label\r\n"
	+ "a=ssrc:4 msid:stream_label video_label\r\n";

		

//Process the sdp
var offer = SDPInfo.process(sdp);

console.log("Offer:"+offer.toString());
const plain = offer.plain();
console.dir(plain, {depth: null, colors: true});

const cloned = offer.clone();
console.log("Cloned:"+cloned.toString());

const expanded = SDPInfo.expand(plain);
console.log("Expanded:"+expanded.toString());
