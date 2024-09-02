const SemanticSDP = require("..");
const {
	SDPInfo,
	MediaInfo,
	CandidateInfo,
	DTLSInfo,
	ICEInfo,
	StreamInfo,
	TrackInfo,
	Setup,
} = require("..");


const sdp = 
	"v=0\r\n" +
	"o=mozilla...THIS_IS_SDPARTA-59.0.2 2650013724804333730 0 IN IP4 0.0.0.0\r\n" +
	"s=-\r\n" +
	"t=0 0\r\n" +
	"a=fingerprint:sha-256 85:AF:A1:85:F0:48:ED:26:2C:EB:AD:DF:40:EE:60:B9:5E:05:3F:89:71:54:96:02:BA:B1:F7:68:DA:4F:73:4B\r\n" +
	"a=group:BUNDLE sdparta_0 sdparta_1 sdparta_2 sdparta_3 sdparta_4 sdparta_5 sdparta_6 sdparta_7 sdparta_8 sdparta_9 sdparta_10 sdparta_11 sdparta_12 sdparta_13 sdparta_14 sdparta_15 sdparta_16\r\n" +
	"a=ice-options:trickle\r\n" +
	"a=msid-semantic:WMS *\r\n" +
	"m=audio 9 UDP/TLS/RTP/SAVPF 109 9 0 8 101\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=recvonly\r\n" +
	"a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level\r\n" +
	"a=extmap:2 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=fmtp:109 maxplaybackrate=48000;stereo=1;useinbandfec=1\r\n" +
	"a=fmtp:101 0-15\r\n" +
	"a=ice-pwd:1b8ed1ac7d9c1611a8dd6046ed71da44\r\n" +
	"a=ice-ufrag:886f20a4\r\n" +
	"a=mid:sdparta_0\r\n" +
	"a=rtcp-mux\r\n" +
	"a=rtpmap:109 opus/48000/2\r\n" +
	"a=rtpmap:9 G722/8000/1\r\n" +
	"a=rtpmap:0 PCMU/8000\r\n" +
	"a=rtpmap:8 PCMA/8000\r\n" +
	"a=rtpmap:101 telephone-event/8000/1\r\n" +
	"a=setup:actpass\r\n" +
	"a=ssrc:3111865932 cname:{f968ce49-49b9-4750-a4e2-4915e5b382cf}\r\n" +
	"m=video 0 UDP/TLS/RTP/SAVPF 120 121 126 97\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=bundle-only\r\n" +
	"a=recvonly\r\n" +
	"a=extmap:1 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n" +
	"a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n" +
	"a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\r\n" +
	"a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1\r\n" +
	"a=fmtp:120 max-fs=12288;max-fr=60\r\n" +
	"a=fmtp:121 max-fs=12288;max-fr=60\r\n" +
	"a=ice-pwd:1b8ed1ac7d9c1611a8dd6046ed71da44\r\n" +
	"a=ice-ufrag:886f20a4\r\n" +
	"a=mid:sdparta_1\r\n" +
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
	"a=ssrc:660632173 cname:{f968ce49-49b9-4750-a4e2-4915e5b382cf}\r\n" +
	"m=video 0 UDP/TLS/RTP/SAVPF 120 121 126 97\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=bundle-only\r\n" +
	"a=recvonly\r\n" +
	"a=extmap:1 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n" +
	"a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n" +
	"a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\r\n" +
	"a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1\r\n" +
	"a=fmtp:120 max-fs=12288;max-fr=60\r\n" +
	"a=fmtp:121 max-fs=12288;max-fr=60\r\n" +
	"a=ice-pwd:1b8ed1ac7d9c1611a8dd6046ed71da44\r\n" +
	"a=ice-ufrag:886f20a4\r\n" +
	"a=mid:sdparta_2\r\n" +
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
	"a=ssrc:353229044 cname:{f968ce49-49b9-4750-a4e2-4915e5b382cf}\r\n" +
	"m=video 0 UDP/TLS/RTP/SAVPF 120 121 126 97\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=bundle-only\r\n" +
	"a=recvonly\r\n" +
	"a=extmap:1 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n" +
	"a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n" +
	"a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\r\n" +
	"a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1\r\n" +
	"a=fmtp:120 max-fs=12288;max-fr=60\r\n" +
	"a=fmtp:121 max-fs=12288;max-fr=60\r\n" +
	"a=ice-pwd:1b8ed1ac7d9c1611a8dd6046ed71da44\r\n" +
	"a=ice-ufrag:886f20a4\r\n" +
	"a=mid:sdparta_3\r\n" +
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
	"a=ssrc:3423538333 cname:{f968ce49-49b9-4750-a4e2-4915e5b382cf}\r\n" +
	"m=video 0 UDP/TLS/RTP/SAVPF 120 121 126 97\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=bundle-only\r\n" +
	"a=recvonly\r\n" +
	"a=extmap:1 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n" +
	"a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n" +
	"a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\r\n" +
	"a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1\r\n" +
	"a=fmtp:120 max-fs=12288;max-fr=60\r\n" +
	"a=fmtp:121 max-fs=12288;max-fr=60\r\n" +
	"a=ice-pwd:1b8ed1ac7d9c1611a8dd6046ed71da44\r\n" +
	"a=ice-ufrag:886f20a4\r\n" +
	"a=mid:sdparta_4\r\n" +
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
	"a=ssrc:2241808863 cname:{f968ce49-49b9-4750-a4e2-4915e5b382cf}\r\n" +
	"m=video 0 UDP/TLS/RTP/SAVPF 120 121 126 97\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=bundle-only\r\n" +
	"a=recvonly\r\n" +
	"a=extmap:1 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n" +
	"a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n" +
	"a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\r\n" +
	"a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1\r\n" +
	"a=fmtp:120 max-fs=12288;max-fr=60\r\n" +
	"a=fmtp:121 max-fs=12288;max-fr=60\r\n" +
	"a=ice-pwd:1b8ed1ac7d9c1611a8dd6046ed71da44\r\n" +
	"a=ice-ufrag:886f20a4\r\n" +
	"a=mid:sdparta_5\r\n" +
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
	"a=ssrc:733392172 cname:{f968ce49-49b9-4750-a4e2-4915e5b382cf}\r\n" +
	"m=video 0 UDP/TLS/RTP/SAVPF 120 121 126 97\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=bundle-only\r\n" +
	"a=recvonly\r\n" +
	"a=extmap:1 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n" +
	"a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n" +
	"a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\r\n" +
	"a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1\r\n" +
	"a=fmtp:120 max-fs=12288;max-fr=60\r\n" +
	"a=fmtp:121 max-fs=12288;max-fr=60\r\n" +
	"a=ice-pwd:1b8ed1ac7d9c1611a8dd6046ed71da44\r\n" +
	"a=ice-ufrag:886f20a4\r\n" +
	"a=mid:sdparta_6\r\n" +
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
	"a=ssrc:917232228 cname:{f968ce49-49b9-4750-a4e2-4915e5b382cf}\r\n" +
	"m=video 0 UDP/TLS/RTP/SAVPF 120 121 126 97\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=bundle-only\r\n" +
	"a=recvonly\r\n" +
	"a=extmap:1 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n" +
	"a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n" +
	"a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\r\n" +
	"a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1\r\n" +
	"a=fmtp:120 max-fs=12288;max-fr=60\r\n" +
	"a=fmtp:121 max-fs=12288;max-fr=60\r\n" +
	"a=ice-pwd:1b8ed1ac7d9c1611a8dd6046ed71da44\r\n" +
	"a=ice-ufrag:886f20a4\r\n" +
	"a=mid:sdparta_7\r\n" +
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
	"a=ssrc:237406101 cname:{f968ce49-49b9-4750-a4e2-4915e5b382cf}\r\n" +
	"m=video 0 UDP/TLS/RTP/SAVPF 120 121 126 97\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=bundle-only\r\n" +
	"a=recvonly\r\n" +
	"a=extmap:1 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n" +
	"a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n" +
	"a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\r\n" +
	"a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1\r\n" +
	"a=fmtp:120 max-fs=12288;max-fr=60\r\n" +
	"a=fmtp:121 max-fs=12288;max-fr=60\r\n" +
	"a=ice-pwd:1b8ed1ac7d9c1611a8dd6046ed71da44\r\n" +
	"a=ice-ufrag:886f20a4\r\n" +
	"a=mid:sdparta_8\r\n" +
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
	"a=ssrc:632214852 cname:{f968ce49-49b9-4750-a4e2-4915e5b382cf}\r\n" +
	"m=video 0 UDP/TLS/RTP/SAVPF 120 121 126 97\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=bundle-only\r\n" +
	"a=recvonly\r\n" +
	"a=extmap:1 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n" +
	"a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n" +
	"a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\r\n" +
	"a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1\r\n" +
	"a=fmtp:120 max-fs=12288;max-fr=60\r\n" +
	"a=fmtp:121 max-fs=12288;max-fr=60\r\n" +
	"a=ice-pwd:1b8ed1ac7d9c1611a8dd6046ed71da44\r\n" +
	"a=ice-ufrag:886f20a4\r\n" +
	"a=mid:sdparta_9\r\n" +
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
	"a=ssrc:2885876268 cname:{f968ce49-49b9-4750-a4e2-4915e5b382cf}\r\n" +
	"m=video 0 UDP/TLS/RTP/SAVPF 120 121 126 97\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=bundle-only\r\n" +
	"a=recvonly\r\n" +
	"a=extmap:1 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n" +
	"a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n" +
	"a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\r\n" +
	"a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1\r\n" +
	"a=fmtp:120 max-fs=12288;max-fr=60\r\n" +
	"a=fmtp:121 max-fs=12288;max-fr=60\r\n" +
	"a=ice-pwd:1b8ed1ac7d9c1611a8dd6046ed71da44\r\n" +
	"a=ice-ufrag:886f20a4\r\n" +
	"a=mid:sdparta_10\r\n" +
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
	"a=ssrc:4042595964 cname:{f968ce49-49b9-4750-a4e2-4915e5b382cf}\r\n" +
	"m=video 0 UDP/TLS/RTP/SAVPF 120 121 126 97\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=bundle-only\r\n" +
	"a=recvonly\r\n" +
	"a=extmap:1 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n" +
	"a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n" +
	"a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\r\n" +
	"a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1\r\n" +
	"a=fmtp:120 max-fs=12288;max-fr=60\r\n" +
	"a=fmtp:121 max-fs=12288;max-fr=60\r\n" +
	"a=ice-pwd:1b8ed1ac7d9c1611a8dd6046ed71da44\r\n" +
	"a=ice-ufrag:886f20a4\r\n" +
	"a=mid:sdparta_11\r\n" +
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
	"a=ssrc:845564788 cname:{f968ce49-49b9-4750-a4e2-4915e5b382cf}\r\n" +
	"m=video 0 UDP/TLS/RTP/SAVPF 120 121 126 97\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=bundle-only\r\n" +
	"a=recvonly\r\n" +
	"a=extmap:1 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n" +
	"a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n" +
	"a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\r\n" +
	"a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1\r\n" +
	"a=fmtp:120 max-fs=12288;max-fr=60\r\n" +
	"a=fmtp:121 max-fs=12288;max-fr=60\r\n" +
	"a=ice-pwd:1b8ed1ac7d9c1611a8dd6046ed71da44\r\n" +
	"a=ice-ufrag:886f20a4\r\n" +
	"a=mid:sdparta_12\r\n" +
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
	"a=ssrc:1785805616 cname:{f968ce49-49b9-4750-a4e2-4915e5b382cf}\r\n" +
	"m=video 0 UDP/TLS/RTP/SAVPF 120 121 126 97\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=bundle-only\r\n" +
	"a=recvonly\r\n" +
	"a=extmap:1 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n" +
	"a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n" +
	"a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\r\n" +
	"a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1\r\n" +
	"a=fmtp:120 max-fs=12288;max-fr=60\r\n" +
	"a=fmtp:121 max-fs=12288;max-fr=60\r\n" +
	"a=ice-pwd:1b8ed1ac7d9c1611a8dd6046ed71da44\r\n" +
	"a=ice-ufrag:886f20a4\r\n" +
	"a=mid:sdparta_13\r\n" +
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
	"a=ssrc:3185230423 cname:{f968ce49-49b9-4750-a4e2-4915e5b382cf}\r\n" +
	"m=video 0 UDP/TLS/RTP/SAVPF 120 121 126 97\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=bundle-only\r\n" +
	"a=recvonly\r\n" +
	"a=extmap:1 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n" +
	"a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n" +
	"a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\r\n" +
	"a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1\r\n" +
	"a=fmtp:120 max-fs=12288;max-fr=60\r\n" +
	"a=fmtp:121 max-fs=12288;max-fr=60\r\n" +
	"a=ice-pwd:1b8ed1ac7d9c1611a8dd6046ed71da44\r\n" +
	"a=ice-ufrag:886f20a4\r\n" +
	"a=mid:sdparta_14\r\n" +
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
	"a=ssrc:2452169771 cname:{f968ce49-49b9-4750-a4e2-4915e5b382cf}\r\n" +
	"m=video 0 UDP/TLS/RTP/SAVPF 120 121 126 97\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=bundle-only\r\n" +
	"a=recvonly\r\n" +
	"a=extmap:1 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n" +
	"a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n" +
	"a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\r\n" +
	"a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1\r\n" +
	"a=fmtp:120 max-fs=12288;max-fr=60\r\n" +
	"a=fmtp:121 max-fs=12288;max-fr=60\r\n" +
	"a=ice-pwd:1b8ed1ac7d9c1611a8dd6046ed71da44\r\n" +
	"a=ice-ufrag:886f20a4\r\n" +
	"a=mid:sdparta_15\r\n" +
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
	"a=ssrc:2340896924 cname:{f968ce49-49b9-4750-a4e2-4915e5b382cf}\r\n" +
	"m=video 0 UDP/TLS/RTP/SAVPF 120 121 126 97\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=bundle-only\r\n" +
	"a=recvonly\r\n" +
	"a=extmap:1 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n" +
	"a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n" +
	"a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\r\n" +
	"a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1\r\n" +
	"a=fmtp:120 max-fs=12288;max-fr=60\r\n" +
	"a=fmtp:121 max-fs=12288;max-fr=60\r\n" +
	"a=ice-pwd:1b8ed1ac7d9c1611a8dd6046ed71da44\r\n" +
	"a=ice-ufrag:886f20a4\r\n" +
	"a=mid:sdparta_16\r\n" +
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
	"a=ssrc:2313724476 cname:{f968ce49-49b9-4750-a4e2-4915e5b382cf}\r\n";


//Process the sdp
var offer = SDPInfo.process(sdp);


console.log("Offer:"+offer.toString());
const plain = offer.plain();
console.dir(plain, {depth: null, colors: true});

console.log("Track for sdparta_4")
const track = offer.getTrackByMediaId("sdparta_4");
console.dir(track.plain(), {depth: null, colors: true});
