
class SourceInfo {
	
	constructor(ssrc) {
		this.ssrc = ssrc;
	}

	getCName() {
		return this.cname;
	}

	setCName(cname) {
		this.cname = cname;
	}

	getStreamId() {
		return this.streamId;
	}

	setStreamId(streamId) {
		this.streamId = streamId;
	}

	getTrackId() {
		return this.trackId;
	}

	setTrackId(trackId) {
		this.trackId = trackId;
	}

	getSSRC() {
		return this.ssrc;
	}
	
}

module.exports = SourceInfo;