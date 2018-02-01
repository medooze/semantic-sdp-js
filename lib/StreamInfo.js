const TrackInfo = require("./TrackInfo");
/**
 * Media Stream information
 * @namespace
 */
class StreamInfo {

	/**
	 * @constructor
	 * @alias StreamInfo
	 * @param {String} id
	 * @returns {StreamInfo}
	 */
	constructor(id) {
		this.id = id;
		this.tracks = new Map();
	}

	/**
	 * Create a clone of this stream info object
	 * @returns {StreamInfo}
	 */
	clone() {
		//Clone
		const cloned = new StreamInfo(this.id);
		//For each track
		for (const track of this.tracks.values())
			//Add track
			cloned.addTrack(track.clone());
		//Return cloned object
		return cloned;
	}


	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {Object} Plain javascript object
	 */
	plain() {
		const plain = {
			id	: this.id,
			tracks	: []
		};
		//For each track
		for (const track of this.tracks.values())
			//Add track
			plain.tracks.push(track.plain());
		//return plain object
		return plain;

	}
	/**
	 * Get the media stream id
	 * @returns {String}
	 */
	getId() {
		return this.id;
	}

	/**
	 * Add media track
	 * @param {TrackInfo} track
	 */
	addTrack(track) {
		this.tracks.set(track.getId(),track);
	}

	/**
	 * Get firs track for the media type
	 * @param {String} media - Media type "audio"|"video"
	 * @returns {TrackInfo}
	 */
	getFirstTrack(media) {
		for(let track of this.tracks.values())
		{
			if (track.getMedia().toLowerCase()===media.toLowerCase())
				return this.track;
		}
		return this.null;
	}

	/**
	 * Get all tracks from the media stream
	 * @returns {Map.TrackInfo}
	 */
	getTracks() {
		return this.tracks;
	}

	/**
	 * Remove all tracks from media sream
	 */
	removeAllTracks() {
		this.tracks.clear();
	}

	/**
	 * Get track by id
	 * @param {String} trackId
	 * @returns {TrackInfo}
	 */
	getTrack(trackId) {
		return this.tracks.get(trackId);
	}
}

/**
 * Expands a plain JSON object containing an StreamInfo
 * @param {Object} plain JSON object
 * @returns {StreamInfo} Parsed Stream info
 */
StreamInfo.expand = function(plain)
{
	//Create new
	const streamInfo = new StreamInfo(
		plain.id,
		plain.paused
	);

	//For each track
	for (let i=0; i<plain.tracks.length; ++i)
	{
		//Expand track info
		const trackInfo = TrackInfo.expand(plain.tracks[i]);
		//Check
		if (trackInfo)
			//Add track
			streamInfo.addTrack(trackInfo);
	}

	//Done
	return streamInfo;
};

module.exports = StreamInfo;