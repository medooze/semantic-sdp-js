

class StreamInfo {
	
	constructor(id) {
		this.id = id;
		this.tracks = new Map();
	}
	
	getId() {
		return this.id;
	}
	
	addTrack(track) {
		this.tracks.set(track.getId(),track);
	}

	getFirstTrack(media) {
		for(let i in this.tracks.values())
		{
			let track = this.tracks[i];
			if (track.getMedia().toLowerCase()===media.toLowerCase())
				return this.track;
		}
		return this.null;
	}

	getTracks() {
		return this.tracks;
	}

	removeAllTracks() {
		this.tracks.clear();
	}

	getTrack(trackId) {
		return this.tracks.get(trackId);
	}
}

module.exports = StreamInfo;