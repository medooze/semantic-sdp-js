const TrackInfo = require("./TrackInfo");

/** @typedef {import(".").TrackType} TrackType */
/** @typedef {import(".").StreamInfoPlain} StreamInfoPlain */
/** @typedef {import(".").StreamInfoLike} StreamInfoLike */

/**
 * Media Stream information
 * @namespace
 */
class StreamInfo {

	/**
	 * @constructor
	 * @alias StreamInfo
	 * @param {String} id
	 */
	constructor(id) {
		this.id = id;
		this.tracks = /** @type {Map<String, TrackInfo>} */ (new Map());
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
	 * @returns {StreamInfoPlain} Plain javascript object
	 */
	plain() {
		const plain = /** @type {StreamInfoPlain} */ ({
			id	: this.id,
			tracks	: []
		});
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
	 * Remove a media track from stream
	 * @param {TrackInfo} track - Info object from the track
	 * @returns {Boolean} if the track was present on track map or not
	 */
	removeTrack(track) {
		return this.tracks.delete(track.getId());
	}
	
	/**
	 * Remove a media track from stream
	 * @param {String} trackId - Id of the track to remote
	 * @returns {Boolean} if the track was present on track map or not
	 */
	removeTrackById(trackId) {
		return this.tracks.delete(trackId);
	}
	/**
	 * Get first track for the media type
	 * @param {TrackType} media - Media type "audio"|"video"
	 * @returns {TrackInfo}
	 */
	getFirstTrack(media) {
		for(let track of this.tracks.values())
		{
			if (track.getMedia().toLowerCase()===media.toLowerCase())
				return track;
		}
		return null;
	}

	/**
	 * Get all tracks from the media stream
	 * @returns {Map<String, TrackInfo>}
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
 * @param {StreamInfoLike} plain JSON object
 * @returns {StreamInfo} Parsed Stream info
 */
StreamInfo.expand = function(plain)
{
	//Ensure it is not already a StreamInfo object
	if (plain.constructor.name === "StreamInfo")
		return /** @type {StreamInfo} */ (plain);

	//Otherwise it is a plain object
	plain = /** @type {StreamInfoPlain} */ (plain);

	//Create new
	const streamInfo = new StreamInfo(plain.id);

	//For each track
	for (const track of plain.tracks || [])
	{
		//Expand track info
		const trackInfo = TrackInfo.expand(track);
		//Check
		if (trackInfo)
			//Add track
			streamInfo.addTrack(trackInfo);
	}

	//Done
	return streamInfo;
};

/**
 * Expands a plain JSON object containing an StreamInfo or a StreamInfo and clone it
 * @param {StreamInfoLike} plain JSON object or StreamInfo
 * @returns {StreamInfo} Cloned StreamInfo
 */
StreamInfo.clone = function(plain)
{
	return plain.constructor.name === "StreamInfo"  
		? /** @type {StreamInfo} */ (plain).clone()
		: StreamInfo.expand(plain);
}

module.exports = StreamInfo;
