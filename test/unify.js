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
	Direction,
	SourceGroupInfo,
} = require("..");


const sdp =
	"v=0\r\n" +
	"o=- 1522158106049 1 IN IP4 127.0.0.1\r\n" +
	"s=semantic-sdp\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"t=0 0\r\n" +
	"a=msid-semantic: WMS *\r\n" +
	"a=group:BUNDLE audio video\r\n" +
	"m=audio 9 UDP/TLS/RTP/SAVPF 111\r\n" +
	"a=rtpmap:111 opus/48000/2\r\n" +
	"a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level\r\n" +
	"a=setup:passive\r\n" +
	"a=mid:audio\r\n" +
	"a=sendonly\r\n" +
	"a=ice-ufrag:bb9eb98c9fdcec5a\r\n" +
	"a=ice-pwd:b47b5a7e9ee620dad08d20a4d4ed712837726eba1404c8c9\r\n" +
	"a=fingerprint:sha-256 D7:2F:B7:AE:1C:8A:62:80:A0:C1:73:8A:03:7B:88:EB:D3:8F:3D:8A:F1:9A:59:2A:74:6A:23:7A:EA:FF:EC:41\r\n" +
	"a=candidate:1 1 UDP 33554431 35.230.191.149 65452 typ host\r\n" +
	"a=rtcp-mux\r\n" +
	"a=rtcp-rsize\r\n" +
	"m=video 9 UDP/TLS/RTP/SAVPF 96 97\r\n" +
	"a=rtpmap:96 vp8/90000\r\n" +
	"a=rtpmap:97 rtx/90000\r\n" +
	"a=fmtp:97 apt=96\r\n" +
	"a=rtcp-fb:96 goog-remb \r\n" +
	"a=rtcp-fb:96 ccm fir\r\n" +
	"a=rtcp-fb:96 nack \r\n" +
	"a=rtcp-fb:96 nack pli\r\n" +
	"a=extmap:4 urn:3gpp:video-orientation\r\n" +
	"a=setup:passive\r\n" +
	"a=mid:video\r\n" +
	"a=sendonly\r\n" +
	"a=ice-ufrag:bb9eb98c9fdcec5a\r\n" +
	"a=ice-pwd:b47b5a7e9ee620dad08d20a4d4ed712837726eba1404c8c9\r\n" +
	"a=fingerprint:sha-256 D7:2F:B7:AE:1C:8A:62:80:A0:C1:73:8A:03:7B:88:EB:D3:8F:3D:8A:F1:9A:59:2A:74:6A:23:7A:EA:FF:EC:41\r\n" +
	"a=candidate:1 1 UDP 33554431 35.230.191.149 65452 typ host\r\n" +
	"a=ssrc:279434614 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:279434614 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-0\r\n" +
	"a=ssrc:362380999 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:362380999 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-0\r\n" +
	"a=ssrc:961710332 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:961710332 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-0\r\n" +
	"a=ssrc:1942408987 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:1942408987 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-1\r\n" +
	"a=ssrc:1844492229 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:1844492229 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-1\r\n" +
	"a=ssrc:41224685 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:41224685 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-1\r\n" +
	"a=ssrc:299714180 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:299714180 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-2\r\n" +
	"a=ssrc:523727525 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:523727525 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-2\r\n" +
	"a=ssrc:1720510347 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:1720510347 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-2\r\n" +
	"a=ssrc:1391188950 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:1391188950 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-3\r\n" +
	"a=ssrc:1169491298 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:1169491298 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-3\r\n" +
	"a=ssrc:1746742900 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:1746742900 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-3\r\n" +
	"a=ssrc:687103446 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:687103446 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-4\r\n" +
	"a=ssrc:1867952992 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:1867952992 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-4\r\n" +
	"a=ssrc:367208545 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:367208545 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-4\r\n" +
	"a=ssrc:989490026 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:989490026 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-5\r\n" +
	"a=ssrc:1831415868 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:1831415868 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-5\r\n" +
	"a=ssrc:73445852 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:73445852 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-5\r\n" +
	"a=ssrc:660946750 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:660946750 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-6\r\n" +
	"a=ssrc:474793679 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:474793679 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-6\r\n" +
	"a=ssrc:2116743344 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:2116743344 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-6\r\n" +
	"a=ssrc:259880240 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:259880240 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-7\r\n" +
	"a=ssrc:1956043959 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:1956043959 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-7\r\n" +
	"a=ssrc:1344289034 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:1344289034 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-7\r\n" +
	"a=ssrc:1361178975 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:1361178975 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-8\r\n" +
	"a=ssrc:1479441314 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:1479441314 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-8\r\n" +
	"a=ssrc:425567923 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:425567923 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-8\r\n" +
	"a=ssrc:1404080942 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:1404080942 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-9\r\n" +
	"a=ssrc:1312033370 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:1312033370 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-9\r\n" +
	"a=ssrc:1066686601 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:1066686601 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-9\r\n" +
	"a=ssrc:1127652549 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:1127652549 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-10\r\n" +
	"a=ssrc:1518500584 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:1518500584 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-10\r\n" +
	"a=ssrc:244428200 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:244428200 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-10\r\n" +
	"a=ssrc:2048704751 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:2048704751 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-11\r\n" +
	"a=ssrc:721078165 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:721078165 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-11\r\n" +
	"a=ssrc:2100099898 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:2100099898 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-11\r\n" +
	"a=ssrc:340468459 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:340468459 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-12\r\n" +
	"a=ssrc:907163056 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:907163056 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-12\r\n" +
	"a=ssrc:109287472 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:109287472 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-12\r\n" +
	"a=ssrc:849303987 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:849303987 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-13\r\n" +
	"a=ssrc:644191273 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:644191273 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-13\r\n" +
	"a=ssrc:357119328 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:357119328 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-13\r\n" +
	"a=ssrc:1057005155 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:1057005155 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-14\r\n" +
	"a=ssrc:1191472511 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:1191472511 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-14\r\n" +
	"a=ssrc:2133264000 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:2133264000 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-14\r\n" +
	"a=ssrc:102707840 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:102707840 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-15\r\n" +
	"a=ssrc:921085571 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:921085571 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-15\r\n" +
	"a=ssrc:30642843 cname:008184b8-3a72-4d6d-8088-aca0a907f15e\r\n" +
	"a=ssrc:30642843 msid:008184b8-3a72-4d6d-8088-aca0a907f15e thumb-15\r\n" +
	"a=ssrc-group:FID 279434614 362380999\r\n" +
	"a=ssrc-group:FEC-FR 279434614 961710332\r\n" +
	"a=ssrc-group:FID 1942408987 1844492229\r\n" +
	"a=ssrc-group:FEC-FR 1942408987 41224685\r\n" +
	"a=ssrc-group:FID 299714180 523727525\r\n" +
	"a=ssrc-group:FEC-FR 299714180 1720510347\r\n" +
	"a=ssrc-group:FID 1391188950 1169491298\r\n" +
	"a=ssrc-group:FEC-FR 1391188950 1746742900\r\n" +
	"a=ssrc-group:FID 687103446 1867952992\r\n" +
	"a=ssrc-group:FEC-FR 687103446 367208545\r\n" +
	"a=ssrc-group:FID 989490026 1831415868\r\n" +
	"a=ssrc-group:FEC-FR 989490026 73445852\r\n" +
	"a=ssrc-group:FID 660946750 474793679\r\n" +
	"a=ssrc-group:FEC-FR 660946750 2116743344\r\n" +
	"a=ssrc-group:FID 259880240 1956043959\r\n" +
	"a=ssrc-group:FEC-FR 259880240 1344289034\r\n" +
	"a=ssrc-group:FID 1361178975 1479441314\r\n" +
	"a=ssrc-group:FEC-FR 1361178975 425567923\r\n" +
	"a=ssrc-group:FID 1404080942 1312033370\r\n" +
	"a=ssrc-group:FEC-FR 1404080942 1066686601\r\n" +
	"a=ssrc-group:FID 1127652549 1518500584\r\n" +
	"a=ssrc-group:FEC-FR 1127652549 244428200\r\n" +
	"a=ssrc-group:FID 2048704751 721078165\r\n" +
	"a=ssrc-group:FEC-FR 2048704751 2100099898\r\n" +
	"a=ssrc-group:FID 340468459 907163056\r\n" +
	"a=ssrc-group:FEC-FR 340468459 109287472\r\n" +
	"a=ssrc-group:FID 849303987 644191273\r\n" +
	"a=ssrc-group:FEC-FR 849303987 357119328\r\n" +
	"a=ssrc-group:FID 1057005155 1191472511\r\n" +
	"a=ssrc-group:FEC-FR 1057005155 2133264000\r\n" +
	"a=ssrc-group:FID 102707840 921085571\r\n" +
	"a=ssrc-group:FEC-FR 102707840 30642843\r\n" +
	"a=rtcp-mux\r\n" +
	"a=rtcp-rsize\r\n";

//Process the sdp
const offer = SDPInfo.process(sdp);

//Unify it
const unified = offer.unify();

console.log("Unified:"+unified.toString());
console.dir(unified.plain(), {depth: null, colors: true});
