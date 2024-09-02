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
	"v=0\r\n" +
	"o=- 6196790088784933128 4 IN IP4 127.0.0.1\r\n" +
	"s=-\r\n" +
	"t=0 0\r\n" +
	"a=group:BUNDLE 0 1 2 3\r\n" +
	"a=msid-semantic: WMS\r\n" +
	"m=audio 56071 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 110 112 113 126\r\n" +
	"c=IN IP4 192.168.0.11\r\n" +
	"a=rtcp:9 IN IP4 0.0.0.0\r\n" +
	"a=candidate:3988902457 1 udp 2113937151 192.168.0.11 56071 typ host generation 0 network-cost 999\r\n" +
	"a=ice-ufrag:SM3w\r\n" +
	"a=ice-pwd:iJpD5EkDA1eSPIbR7Mzkzwwr\r\n" +
	"a=ice-options:trickle\r\n" +
	"a=fingerprint:sha-256 6F:25:D8:09:B2:0E:57:CC:80:EC:CB:E3:CF:00:95:04:4A:15:AE:CA:5E:BD:70:A6:DD:16:22:95:F8:CD:05:67\r\n" +
	"a=setup:actpass\r\n" +
	"a=mid:0\r\n" +
	"a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level\r\n" +
	"a=extmap:9 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=inactive\r\n" +
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
	"m=video 9 UDP/TLS/RTP/SAVPF 96 97 98 99 100 101 102 122 127 121 125 107 108 109 124 120 123 119 114\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=rtcp:9 IN IP4 0.0.0.0\r\n" +
	"a=ice-ufrag:SM3w\r\n" +
	"a=ice-pwd:iJpD5EkDA1eSPIbR7Mzkzwwr\r\n" +
	"a=ice-options:trickle\r\n" +
	"a=fingerprint:sha-256 6F:25:D8:09:B2:0E:57:CC:80:EC:CB:E3:CF:00:95:04:4A:15:AE:CA:5E:BD:70:A6:DD:16:22:95:F8:CD:05:67\r\n" +
	"a=setup:actpass\r\n" +
	"a=mid:1\r\n" +
	"a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n" +
	"a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n" +
	"a=extmap:4 urn:3gpp:video-orientation\r\n" +
	"a=extmap:5 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01\r\n" +
	"a=extmap:6 http://www.webrtc.org/experiments/rtp-hdrext/playout-delay\r\n" +
	"a=extmap:7 http://www.webrtc.org/experiments/rtp-hdrext/video-content-type\r\n" +
	"a=extmap:8 http://www.webrtc.org/experiments/rtp-hdrext/video-timing\r\n" +
	"a=extmap:9 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=inactive\r\n" +
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
	"a=fmtp:98 x-google-profile-id=0\r\n" +
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
	"a=fmtp:102 level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42001f\r\n" +
	"a=rtpmap:122 rtx/90000\r\n" +
	"a=fmtp:122 apt=102\r\n" +
	"a=rtpmap:127 H264/90000\r\n" +
	"a=rtcp-fb:127 goog-remb\r\n" +
	"a=rtcp-fb:127 transport-cc\r\n" +
	"a=rtcp-fb:127 ccm fir\r\n" +
	"a=rtcp-fb:127 nack\r\n" +
	"a=rtcp-fb:127 nack pli\r\n" +
	"a=fmtp:127 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f\r\n" +
	"a=rtpmap:121 rtx/90000\r\n" +
	"a=fmtp:121 apt=127\r\n" +
	"a=rtpmap:125 H264/90000\r\n" +
	"a=rtcp-fb:125 goog-remb\r\n" +
	"a=rtcp-fb:125 transport-cc\r\n" +
	"a=rtcp-fb:125 ccm fir\r\n" +
	"a=rtcp-fb:125 nack\r\n" +
	"a=rtcp-fb:125 nack pli\r\n" +
	"a=fmtp:125 level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42e01f\r\n" +
	"a=rtpmap:107 rtx/90000\r\n" +
	"a=fmtp:107 apt=125\r\n" +
	"a=rtpmap:108 H264/90000\r\n" +
	"a=rtcp-fb:108 goog-remb\r\n" +
	"a=rtcp-fb:108 transport-cc\r\n" +
	"a=rtcp-fb:108 ccm fir\r\n" +
	"a=rtcp-fb:108 nack\r\n" +
	"a=rtcp-fb:108 nack pli\r\n" +
	"a=fmtp:108 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=4d0032\r\n" +
	"a=rtpmap:109 rtx/90000\r\n" +
	"a=fmtp:109 apt=108\r\n" +
	"a=rtpmap:124 H264/90000\r\n" +
	"a=rtcp-fb:124 goog-remb\r\n" +
	"a=rtcp-fb:124 transport-cc\r\n" +
	"a=rtcp-fb:124 ccm fir\r\n" +
	"a=rtcp-fb:124 nack\r\n" +
	"a=rtcp-fb:124 nack pli\r\n" +
	"a=fmtp:124 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=640032\r\n" +
	"a=rtpmap:120 rtx/90000\r\n" +
	"a=fmtp:120 apt=124\r\n" +
	"a=rtpmap:123 red/90000\r\n" +
	"a=rtpmap:119 rtx/90000\r\n" +
	"a=fmtp:119 apt=123\r\n" +
	"a=rtpmap:114 ulpfec/90000\r\n" +
	"m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 110 112 113 126\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=rtcp:9 IN IP4 0.0.0.0\r\n" +
	"a=ice-ufrag:SM3w\r\n" +
	"a=ice-pwd:iJpD5EkDA1eSPIbR7Mzkzwwr\r\n" +
	"a=ice-options:trickle\r\n" +
	"a=fingerprint:sha-256 6F:25:D8:09:B2:0E:57:CC:80:EC:CB:E3:CF:00:95:04:4A:15:AE:CA:5E:BD:70:A6:DD:16:22:95:F8:CD:05:67\r\n" +
	"a=setup:actpass\r\n" +
	"a=mid:2\r\n" +
	"a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level\r\n" +
	"a=extmap:9 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=sendonly\r\n" +
	"a=msid:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC 2e41d5b1-4e7f-4e48-b26a-eff059689494\r\n" +
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
	"a=ssrc:942638783 cname:4uV9shnqJ09Jny5w\r\n" +
	"a=ssrc:942638783 msid:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC 2e41d5b1-4e7f-4e48-b26a-eff059689494\r\n" +
	"a=ssrc:942638783 mslabel:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC\r\n" +
	"a=ssrc:942638783 label:2e41d5b1-4e7f-4e48-b26a-eff059689494\r\n" +
	"m=video 9 UDP/TLS/RTP/SAVPF 96 97 98 99 100 101 102 122 127 121 125 107 108 109 124 120 123 119 114\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=rtcp:9 IN IP4 0.0.0.0\r\n" +
	"a=ice-ufrag:SM3w\r\n" +
	"a=ice-pwd:iJpD5EkDA1eSPIbR7Mzkzwwr\r\n" +
	"a=ice-options:trickle\r\n" +
	"a=fingerprint:sha-256 6F:25:D8:09:B2:0E:57:CC:80:EC:CB:E3:CF:00:95:04:4A:15:AE:CA:5E:BD:70:A6:DD:16:22:95:F8:CD:05:67\r\n" +
	"a=setup:actpass\r\n" +
	"a=mid:3\r\n" +
	"a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n" +
	"a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n" +
	"a=extmap:4 urn:3gpp:video-orientation\r\n" +
	"a=extmap:5 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01\r\n" +
	"a=extmap:6 http://www.webrtc.org/experiments/rtp-hdrext/playout-delay\r\n" +
	"a=extmap:7 http://www.webrtc.org/experiments/rtp-hdrext/video-content-type\r\n" +
	"a=extmap:8 http://www.webrtc.org/experiments/rtp-hdrext/video-timing\r\n" +
	"a=extmap:9 urn:ietf:params:rtp-hdrext:sdes:mid\r\n" +
	"a=inactive\r\n" +
	"a=msid:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC 8b9dfcbc-d1aa-4b12-b330-6231313b00f3\r\n" +
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
	"a=fmtp:98 x-google-profile-id=0\r\n" +
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
	"a=fmtp:102 level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42001f\r\n" +
	"a=rtpmap:122 rtx/90000\r\n" +
	"a=fmtp:122 apt=102\r\n" +
	"a=rtpmap:127 H264/90000\r\n" +
	"a=rtcp-fb:127 goog-remb\r\n" +
	"a=rtcp-fb:127 transport-cc\r\n" +
	"a=rtcp-fb:127 ccm fir\r\n" +
	"a=rtcp-fb:127 nack\r\n" +
	"a=rtcp-fb:127 nack pli\r\n" +
	"a=fmtp:127 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f\r\n" +
	"a=rtpmap:121 rtx/90000\r\n" +
	"a=fmtp:121 apt=127\r\n" +
	"a=rtpmap:125 H264/90000\r\n" +
	"a=rtcp-fb:125 goog-remb\r\n" +
	"a=rtcp-fb:125 transport-cc\r\n" +
	"a=rtcp-fb:125 ccm fir\r\n" +
	"a=rtcp-fb:125 nack\r\n" +
	"a=rtcp-fb:125 nack pli\r\n" +
	"a=fmtp:125 level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42e01f\r\n" +
	"a=rtpmap:107 rtx/90000\r\n" +
	"a=fmtp:107 apt=125\r\n" +
	"a=rtpmap:108 H264/90000\r\n" +
	"a=rtcp-fb:108 goog-remb\r\n" +
	"a=rtcp-fb:108 transport-cc\r\n" +
	"a=rtcp-fb:108 ccm fir\r\n" +
	"a=rtcp-fb:108 nack\r\n" +
	"a=rtcp-fb:108 nack pli\r\n" +
	"a=fmtp:108 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=4d0032\r\n" +
	"a=rtpmap:109 rtx/90000\r\n" +
	"a=fmtp:109 apt=108\r\n" +
	"a=rtpmap:124 H264/90000\r\n" +
	"a=rtcp-fb:124 goog-remb\r\n" +
	"a=rtcp-fb:124 transport-cc\r\n" +
	"a=rtcp-fb:124 ccm fir\r\n" +
	"a=rtcp-fb:124 nack\r\n" +
	"a=rtcp-fb:124 nack pli\r\n" +
	"a=fmtp:124 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=640032\r\n" +
	"a=rtpmap:120 rtx/90000\r\n" +
	"a=fmtp:120 apt=124\r\n" +
	"a=rtpmap:123 red/90000\r\n" +
	"a=rtpmap:119 rtx/90000\r\n" +
	"a=fmtp:119 apt=123\r\n" +
	"a=rtpmap:114 ulpfec/90000\r\n" +
	"a=ssrc-group:FID 2783061729 2439441231\r\n" +
	"a=ssrc-group:FID 1 2\r\n" +
	"a=ssrc-group:FID 3 4\r\n" +
	"a=ssrc-group:SIM 2783061729 1 3\r\n" +
	"a=ssrc:2783061729 cname:4uV9shnqJ09Jny5w\r\n" +
	"a=ssrc:2783061729 msid:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC 8b9dfcbc-d1aa-4b12-b330-6231313b00f3\r\n" +
	"a=ssrc:2783061729 mslabel:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC\r\n" +
	"a=ssrc:2783061729 label:8b9dfcbc-d1aa-4b12-b330-6231313b00f3\r\n" +
	"a=ssrc:2439441231 cname:4uV9shnqJ09Jny5w\r\n" +
	"a=ssrc:2439441231 msid:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC 8b9dfcbc-d1aa-4b12-b330-6231313b00f3\r\n" +
	"a=ssrc:2439441231 mslabel:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC\r\n" +
	"a=ssrc:2439441231 label:8b9dfcbc-d1aa-4b12-b330-6231313b00f3\r\n" +
	"a=ssrc:1 cname:4uV9shnqJ09Jny5w\r\n" +
	"a=ssrc:1 msid:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC 8b9dfcbc-d1aa-4b12-b330-6231313b00f3\r\n" +
	"a=ssrc:1 mslabel:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC\r\n" +
	"a=ssrc:1 label:8b9dfcbc-d1aa-4b12-b330-6231313b00f3\r\n" +
	"a=ssrc:2 cname:4uV9shnqJ09Jny5w\r\n" +
	"a=ssrc:2 msid:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC 8b9dfcbc-d1aa-4b12-b330-6231313b00f3\r\n" +
	"a=ssrc:2 mslabel:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC\r\n" +
	"a=ssrc:2 label:8b9dfcbc-d1aa-4b12-b330-6231313b00f3\r\n" +
	"a=ssrc:3 cname:4uV9shnqJ09Jny5w\r\n" +
	"a=ssrc:3 msid:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC 8b9dfcbc-d1aa-4b12-b330-6231313b00f3\r\n" +
	"a=ssrc:3 mslabel:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC\r\n" +
	"a=ssrc:3 label:8b9dfcbc-d1aa-4b12-b330-6231313b00f3\r\n" +
	"a=ssrc:4 cname:4uV9shnqJ09Jny5w\r\n" +
	"a=ssrc:4 msid:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC 8b9dfcbc-d1aa-4b12-b330-6231313b00f3\r\n" +
	"a=ssrc:4 mslabel:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC\r\n" +
	"a=ssrc:4 label:8b9dfcbc-d1aa-4b12-b330-6231313b00f3\r\n" +
	"a=ssrc-group:FID 5 6\r\n" +
	"a=ssrc:5 cname:4uV9shnqJ09Jny5w\r\n" +
	"a=ssrc:5 msid:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC 8b9dfcbc-d1aa-4b12-b330-6231313b00f3\r\n" +
	"a=ssrc:5 mslabel:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC\r\n" +
	"a=ssrc:5 label:8b9dfcbc-d1aa-4b12-b330-6231313b00f3\r\n" +
	"a=ssrc:6 cname:4uV9shnqJ09Jny5w\r\n" +
	"a=ssrc:6 msid:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC 8b9dfcbc-d1aa-4b12-b330-6231313b00f3\r\n" +
	"a=ssrc:6 mslabel:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC\r\n" +
	"a=ssrc:6 label:8b9dfcbc-d1aa-4b12-b330-6231313b00f3\r\n" +
	"a=ssrc-group:FID 7 8\r\n" +
	"a=ssrc:7 cname:4uV9shnqJ09Jny5w\r\n" +
	"a=ssrc:7 msid:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC 8b9dfcbc-d1aa-4b12-b330-6231313b00f3\r\n" +
	"a=ssrc:7 mslabel:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC\r\n" +
	"a=ssrc:7 label:8b9dfcbc-d1aa-4b12-b330-6231313b00f3\r\n" +
	"a=ssrc:8 cname:4uV9shnqJ09Jny5w\r\n" +
	"a=ssrc:8 msid:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC 8b9dfcbc-d1aa-4b12-b330-6231313b00f3\r\n" +
	"a=ssrc:8 mslabel:y9XXeFHMhQYuCUo3QXYN5YLY81jCNFf1K8IC\r\n" +
	"a=ssrc:8 label:8b9dfcbc-d1aa-4b12-b330-6231313b00f3\r\n" +
	"a=ssrc-group:SIM 2783061729 5 7\r\n" +
	"a=simulcast:send a;b;c\r\n" +
	"a=rid:a send ssrc=2783061729\r\n" +
	"a=rid:b send ssrc=5\r\n" +
	"a=rid:c send ssrc=7\r\n" +
	"a=x-google-flag:conference\r\n";


//Process the sdp
var offer = SDPInfo.process(sdp);

console.log("Offer:\r\n" +offer.toString());
const plain = offer.plain();
console.dir(plain, {depth: null, colors: true});
