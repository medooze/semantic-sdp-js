const SemanticSDP = require("../index");

const SDPInfo		= SemanticSDP.SDPInfo;
const MediaInfo		= SemanticSDP.MediaInfo;
const CandidateInfo	= SemanticSDP.CandidateInfo;
const DTLSInfo		= SemanticSDP.DTLSInfo;
const ICEInfo		= SemanticSDP.ICEInfo;
const StreamInfo	= SemanticSDP.StreamInfo;
const TrackInfo		= SemanticSDP.TrackInfo;
const Setup		= SemanticSDP.Setup;


const sdp = 
	"v=0\r\n" +
	"o=mozilla...THIS_IS_SDPARTA-48.0.2 9127260475635174214 0 IN IP4 0.0.0.0\r\n" +
	"s=-\r\n" +
	"t=0 0\r\n" +
	"a=fingerprint:sha-256 1A:5E:AF:59:E2:53:C4:C1:85:9B:95:26:DF:5B:94:10:78:F6:45:B1:9C:FE:82:BD:EB:6B:45:81:44:5D:83:80\r\n" +
	"a=group:BUNDLE sdparta_0 sdparta_1\r\n" +
	"a=ice-options:trickle\r\n" +
	"a=msid-semantic:WMS *\r\n" +
	"m=audio 9 UDP/TLS/RTP/SAVPF 109 9 0 8\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=sendrecv\r\n" +
	"a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level\r\n" +
	"a=fmtp:109 maxplaybackrate=48000;stereo=1\r\n" +
	"a=ice-pwd:9ad296b1c4d8ceb0258c48c44677612a\r\n" +
	"a=ice-ufrag:cc685491\r\n" +
	"a=mid:sdparta_0\r\n" +
	"a=msid:{b96c6194-ae4a-461b-8c4f-888437515a7a} {6db3ef81-e7d1-4cb8-9ed9-4707d9bbe4cf}\r\n" +
	"a=rtcp-mux\r\n" +
	"a=rtpmap:109 opus/48000/2\r\n" +
	"a=rtpmap:9 G722/8000/1\r\n" +
	"a=rtpmap:0 PCMU/8000\r\n" +
	"a=rtpmap:8 PCMA/8000\r\n" +
	"a=setup:actpass\r\n" +
	"a=ssrc:1169438075 cname:{2b0a446c-c6af-495a-8462-d09dd2a14020}\r\n" +
	"m=video 9 UDP/TLS/RTP/SAVPF 120 126 97\r\n" +
	"c=IN IP4 0.0.0.0\r\n" +
	"a=bundle-only\r\n" +
	"a=sendrecv\r\n" +
	"a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\r\n" +
	"a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1\r\n" +
	"a=fmtp:120 max-fs=12288;max-fr=60\r\n" +
	"a=ice-pwd:9ad296b1c4d8ceb0258c48c44677612a\r\n" +
	"a=ice-ufrag:cc685491\r\n" +
	"a=mid:sdparta_1\r\n" +
	"a=msid:{b96c6194-ae4a-461b-8c4f-888437515a7a} {69e9a92d-056b-4a2d-bf58-5b26dc779cd5}\r\n" +
	"a=rtcp-fb:120 nack\r\n" +
	"a=rtcp-fb:120 nack pli\r\n" +
	"a=rtcp-fb:120 ccm fir\r\n" +
	"a=rtcp-fb:126 nack\r\n" +
	"a=rtcp-fb:126 nack pli\r\n" +
	"a=rtcp-fb:126 ccm fir\r\n" +
	"a=rtcp-fb:97 nack\r\n" +
	"a=rtcp-fb:97 nack pli\r\n" +
	"a=rtcp-fb:97 ccm fir\r\n" +
	"a=rtcp-mux\r\n" +
	"a=rtpmap:120 VP8/90000\r\n" +
	"a=rtpmap:126 H264/90000\r\n" +
	"a=rtpmap:97 H264/90000\r\n" +
	"a=setup:actpass\r\n" +
	"a=ssrc:226975506 cname:{2b0a446c-c6af-495a-8462-d09dd2a14020}\r\n";

//Process the sdp
var offer = SDPInfo.process(sdp);

//Get local DTLS and ICE info
const dtls = new DTLSInfo(Setup.PASSIVE,"sha-256","F2:AA:0E:C3:22:59:5E:14:95:69:92:3D:13:B4:84:24:2C:C2:A2:C0:3E:FD:34:8E:5E:EA:6F:AF:52:CE:E6:0F");
const ice  = new ICEInfo("af46F","a34FasdS++jdfofdslkjsd/SDV");

//Get local candidte
const candidate = new CandidateInfo(1,1, "udp", 2122260223, "192.168.0.196", 56143, "host");

//Create local SDP info
let answer = new SDPInfo();

//Add ice and dtls info
answer.setDTLS(dtls);
answer.setICE(ice);
answer.addCandidate(candidate);

//Get remote audio m-line info 
let audioOffer = offer.getMedia("audio");

//If we have audio
if (audioOffer)
{
	//Create audio media
	let audio = new MediaInfo("audio", "audio");
	
	//Get codec type
	let opus = audioOffer.getCodec("opus");
	//Add opus codec
	audio.addCodec(opus);

	//Add audio extensions
	for (let extension of audioOffer.getExtensions().entries())
		//Add it
		audio.addExtension(extension[0], extension[1]);
	//Add it to answer
	answer.addMedia(audio);
}

//Get remote video m-line info 
let videoOffer = offer.getMedia("video")

//If offer had video
if (videoOffer)
{
	//Create video media
	let  video = new MediaInfo("video", "video");
	//Get codec types
	let vp8 = videoOffer.getCodec("vp8");
	//Add video codecs
	video.addCodec(vp8);

	//Add video extensions
	for (let [id,uri] of videoOffer.getExtensions().entries())
		//Add it
		video.addExtension(id, uri);

	//Add it to answer
	answer.addMedia(video);
}

let ssrc = 1000;
//For each stream
for (let i=1;i<4;i++)
{
	let track;
	//Create stream
	let stream = new StreamInfo("sream"+i);
	//Create track
	track = new TrackInfo("video", "track1");
	//Add ssrc
	track.addSSRC(ssrc++);
	//Add it
	stream.addTrack(track);
	//Create track
	track = new TrackInfo("audio", "track2");
	//Add ssrc
	track.addSSRC(ssrc++);
	//Add it
	stream.addTrack(track);
	//Add stream
	answer.addStream(stream);
}
		
console.log("Answer:"+answer.toString());
const plain = answer.plain();
console.dir(plain, {depth: null, colors: true});

const cloned = answer.clone();
console.log("Cloned:"+cloned.toString());

const expanded = SDPInfo.expand(plain);
console.log("Expanded:"+expanded.toString());
