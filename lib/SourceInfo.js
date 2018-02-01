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
	 * Create a clone of this source info object
	 * @returns {SourceInfo}
	 */
	clone() {
		//Clone
		const clone = new SourceInfo(this.ssrc);
		//Set properties
		clone.setCName(this.cname);
		clone.setStreamId(this.streamId);
		clone.setTrackId(this.trackId);
	}


	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {Object} Plain javascript object
	 */
	plain() {
		const plain = {
			ssrc	: this.ssrc
		};
		//Set properties
		if (this.cname)		plain.cname = this.cname;
		if (this.streamId)	plain.streamId = this.streamId;
		if (this.trackId)	plain.trackid = this.trackId;
		//return plain object
		return plain;
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

/**
 * Expands a plain JSON object containing an SourceInfo
 * @param {Object} plain JSON object
 * @returns {SourceInfo} Parsed Source info
 */
SourceInfo.expand = function(plain)
{
	//create new
	const sourceInfo = new SourceInfo(plain.ssrc);
	//Set properties
	sourceInfo.setCName(plain.cname);
	sourceInfo.setStreamId(plain.streamId);
	sourceInfo.setTrackId(plain.trackId);

	//Done
	return sourceInfo;
};


module.exports = SourceInfo;