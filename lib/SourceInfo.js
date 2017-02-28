/**
 * Strem Source information
 * @namespace
 */
class SourceInfo {
	/**
	 * @constructor
	 * @alias SourceInfo
	 * @param {Number} ssrc
	 * @returns {SourceInfo}
	 */
	constructor(ssrc) {
		this.ssrc = ssrc;
	}

	/**
	 * Get source CName
	 * @returns {String}
	 */
	getCName() {
		return this.cname;
	}

	/**
	 * Set source CName
	 * @param {String} cname
	 */
	setCName(cname) {
		this.cname = cname;
	}

	/**
	 * Get associated stream id
	 * @returns {Number}
	 */
	getStreamId() {
		return this.streamId;
	}

	/**
	 * Set associated stream id for this ssrc
	 * @param {String} streamId
	 */
	setStreamId(streamId) {
		this.streamId = streamId;
	}
	
	/**
	 * Get associated track id
	 * @returns {Number}
	 */
	getTrackId() {
		return this.trackId;
	}
	
	/**
	 * Set associated track id for this ssrc
	 * @param {String} trackId
	 */
	setTrackId(trackId) {
		this.trackId = trackId;
	}

	/**
	 * Get ssrc from source
	 * @returns {Number}
	 */
	getSSRC() {
		return this.ssrc;
	}
	
}

module.exports = SourceInfo;