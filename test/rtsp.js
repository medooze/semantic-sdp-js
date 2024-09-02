const SemanticSDP = require("..");
const {
	SDPInfo,
} = require("..");

const plain = {
	version: 0,
	medias: [{
		id: '0',
		type: 'video',
		direction: 'sendrecv',
		codecs: [{
			codec: 'H264',
			type: 96,
			params: {
				'packetization-mode': '1',
				'profile-level-id': '420029',
				'sprop-parameter-sets': 'Z0IAKeKQCgDLYC3AQEBpB4kRUA==,aM48gA=='
			}
		}],
		control: 'trackID=1'
	}],
};

const expanded = SDPInfo.expand(plain);
console.dir(expanded, {depth: null, colors: true});
console.log("Expanded:"+expanded.toString());
