# WebRTC Semantic SDP
Minimal SDP information semantic data model and parsing tools.

## Motivation
Have you ever tried to mangle or process an SDP and got stuck about how to you change the information instead of what information do you want to access?

This project provies an abstraction layer on top of SDP that allows to acces and modify the information semantically, that is, it stores the SDP information and their relationships and allows you to get free of the acutal SDP semantics.

As it is meant to be used on WebRTC to WebRTC scenarios, so some SDP information can be safelly ignored, allowing to provide a simple and intuitive API.

Both Unified and Plan B are currently supported

## Assumptions

We assume that:
- Bundle is used
- Trickle ICE or ICE lite is used
- DTLS is used
- RTCP mux is used

## For the future
If you think it further exchanging the SDP information is all that it is needed to perform a peer to peer SDP exchange, so the intention is to provide serialization functions to be able to use this over the wire and only parse/serialize it on the endpoints or server side.

Note also that there is some similarity ORTC RTP parameters, but well done ;)

## Install

```
npm i --save semantic-sdp
```

## Usage

```javascript
const SemanticSDP = require('semantic-sdp');
```
## API Documention
You can check the full object documentation [here](https://medooze.github.io/semantic-sdp-js/).

## Example

```javascript
const SemanticSDP	= require("semantic-sdp");

//Process the sdp
var offer = SemanticSDP.SDPInfo.process(sdp);

//Set the local DTLS and ICE info
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
let videoOffer = offer.getMedia("video");

//If offer had video
if (videoOffer)
{
	//Create video media
	let  video = new MediaInfo("video", "video");
	//Get codec types
	let vp9 = videoOffer.getCodec("vp9");
	let fec = videoOffer.getCodec("flexfec-03");
	//Add video codecs
	video.addCodec(vp9);
	if (fec)
		video.addCodec(fec);
	//Limit incoming bitrate
	video.setBitrate(1024);

	//Add video extensions
	for (let extension of videoOffer.getExtensions().entries())
		//Add it
		video.addExtension(extension[0], extension[1]);

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
	//Get ssrc, rtx and fec 
	const media = ssrc++;
	const rtx = ssrc++;
	const fec = ssrc++;
	//Add ssrcs to track
	track.addSSRC(media);
	track.addSSRC(rtx);
	track.addSSRC(fec);
	//Add RTX and FEC group	
	track.addSourceGroup(new SourceGroupInfo("FID",[media,rtx]));
	track.addSourceGroup(new SourceGroupInfo("FEC-FR",[media,fec]));
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

//Get answer SDP
const str = answer.toString();
const json = JSON.stringifu(answer.plain());
```

The SDP output will be :

```
v=0
o=- 1489500633629 1 IN IP4 127.0.0.1
s=semantic-sdp
c=IN IP4 0.0.0.0
t=0 0
a=msid-semantic: WMS *
m=audio 9 UDP/TLS/RTP/SAVPF 111
a=rtpmap:111 opus/48000/2
a=rtcp-fb:111 transport-cc
a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level
a=setup:passive
a=mid:audio
a=sendrecv
a=ice-ufrag:af46F
a=ice-pwd:a34FasdS++jdfofdslkjsd/SDV
a=fingerprint:sha-256 F2:AA:0E:C3:22:59:5E:14:95:69:92:3D:13:B4:84:24:2C:C2:A2:C0:3E:FD:34:8E:5E:EA:6F:AF:52:CE:E6:0F
a=candidate:1 1 udp 2122260223 192.168.0.196 56143 typ host
a=ssrc:1003 cname:sream1
a=ssrc:1003 msid:sream1 track2
a=ssrc:1007 cname:sream2
a=ssrc:1007 msid:sream2 track2
a=ssrc:1011 cname:sream3
a=ssrc:1011 msid:sream3 track2
a=rtcp-mux
a=rtcp-rsize
m=video 9 UDP/TLS/RTP/SAVPF 98 99 125
b=AS:1024
a=rtpmap:98 VP9/90000
a=rtpmap:99 rtx/90000
a=rtpmap:125 flexfec-03/90000
a=fmtp:99 apt=98
a=rtcp-fb:98 transport-cc
a=rtcp-fb:125 transport-cc
a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
a=extmap:4 urn:3gpp:video-orientation
a=extmap:5 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01
a=extmap:6 http://www.webrtc.org/experiments/rtp-hdrext/playout-delay
a=setup:passive
a=mid:video
a=sendrecv
a=ice-ufrag:af46F
a=ice-pwd:a34FasdS++jdfofdslkjsd/SDV
a=fingerprint:sha-256 F2:AA:0E:C3:22:59:5E:14:95:69:92:3D:13:B4:84:24:2C:C2:A2:C0:3E:FD:34:8E:5E:EA:6F:AF:52:CE:E6:0F
a=candidate:1 1 udp 2122260223 192.168.0.196 56143 typ host
a=ssrc:1000 cname:sream1
a=ssrc:1000 msid:sream1 track1
a=ssrc:1001 cname:sream1
a=ssrc:1001 msid:sream1 track1
a=ssrc:1002 cname:sream1
a=ssrc:1002 msid:sream1 track1
a=ssrc:1004 cname:sream2
a=ssrc:1004 msid:sream2 track1
a=ssrc:1005 cname:sream2
a=ssrc:1005 msid:sream2 track1
a=ssrc:1006 cname:sream2
a=ssrc:1006 msid:sream2 track1
a=ssrc:1008 cname:sream3
a=ssrc:1008 msid:sream3 track1
a=ssrc:1009 cname:sream3
a=ssrc:1009 msid:sream3 track1
a=ssrc:1010 cname:sream3
a=ssrc:1010 msid:sream3 track1
a=ssrc-group:FID 1000 1001
a=ssrc-group:FEC-FR 1000 1002
a=ssrc-group:FID 1004 1005
a=ssrc-group:FEC-FR 1004 1006
a=ssrc-group:FID 1008 1009
a=ssrc-group:FEC-FR 1008 1010
a=rtcp-mux
a=rtcp-rsize

```

And the serialized JSON string:
```json
{
  "version": 1,
  "streams": [
    {
      "tracks": [
        {
          "media": "video",
          "id": "track1",
          "ssrcs": [
            1000,
            1001,
            1002
          ],
          "groups": [
            {
              "semantics": "FID",
              "ssrcs": [
                1000,
                1001
              ]
            },
            {
              "semantics": "FEC-FR",
              "ssrcs": [
                1000,
                1002
              ]
            }
          ]
        },
        {
          "media": "audio",
          "id": "track2",
          "ssrcs": [
            1003
          ],
          "groups": [
            
          ]
        }
      ]
    },
    {
      "tracks": [
        {
          "media": "video",
          "id": "track1",
          "ssrcs": [
            1004,
            1005,
            1006
          ],
          "groups": [
            {
              "semantics": "FID",
              "ssrcs": [
                1004,
                1005
              ]
            },
            {
              "semantics": "FEC-FR",
              "ssrcs": [
                1004,
                1006
              ]
            }
          ]
        },
        {
          "media": "audio",
          "id": "track2",
          "ssrcs": [
            1007
          ],
          "groups": [
            
          ]
        }
      ]
    },
    {
      "tracks": [
        {
          "media": "video",
          "id": "track1",
          "ssrcs": [
            1008,
            1009,
            1010
          ],
          "groups": [
            {
              "semantics": "FID",
              "ssrcs": [
                1008,
                1009
              ]
            },
            {
              "semantics": "FEC-FR",
              "ssrcs": [
                1008,
                1010
              ]
            }
          ]
        },
        {
          "media": "audio",
          "id": "track2",
          "ssrcs": [
            1011
          ],
          "groups": [
            
          ]
        }
      ]
    }
  ],
  "medias": [
    {
      "type": "audio",
      "direction": "sendrecv",
      "extensions": {
        "1": "urn:ietf:params:rtp-hdrext:ssrc-audio-level"
      },
      "codecs": [
        {
          "codec": "opus",
          "type": 111,
          "params": {
            "minptime": "10",
            "useinbandfec": "1"
          }
        }
      ]
    },
    {
      "type": "video",
      "direction": "sendrecv",
      "extensions": {
        "2": "urn:ietf:params:rtp-hdrext:toffset",
        "3": "http:\/\/www.webrtc.org\/experiments\/rtp-hdrext\/abs-send-time",
        "4": "urn:3gpp:video-orientation",
        "5": "http:\/\/www.ietf.org\/id\/draft-holmer-rmcat-transport-wide-cc-extensions-01",
        "6": "http:\/\/www.webrtc.org\/experiments\/rtp-hdrext\/playout-delay"
      },
      "codecs": [
        {
          "codec": "VP9",
          "type": 98,
          "params": {
            
          }
        },
        {
          "codec": "flexfec-03",
          "type": 125,
          "params": {
            "repair-window": "10000000"
          }
        }
      ],
      "bitrate": 1024
    }
  ],
  "candidates": [
    {
      "foundation": 1,
      "componentId": 1,
      "transport": "udp",
      "priority": 2122260223,
      "address": "192.168.0.196",
      "port": 56143,
      "type": "host"
    }
  ],
  "ice": {
    "ufrag": "af46F",
    "pwd": "a34FasdS++jdfofdslkjsd\/SDV"
  },
  "dtls": {
    "hash": "sha-256",
    "fingerprint": "F2:AA:0E:C3:22:59:5E:14:95:69:92:3D:13:B4:84:24:2C:C2:A2:C0:3E:FD:34:8E:5E:EA:6F:AF:52:CE:E6:0F"
  }
}
```
## Author

Sergio Garcia Murillo @ Medooze

## License
MIT
