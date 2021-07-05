const SourceGroupInfo	= require("./SourceGroupInfo");
const TrackEncodingInfo = require("./TrackEncodingInfo");
/**
 * Media Track information
 * @namespace
 */
class TrackInfo
{
	/**
	 * @constructor
	 * @alias TrackInfo
	 * @param {String} media	- Media type "audio"|"video"
	 * @param {String} id		- Track id
	 * @returns {TrackInfo}
	 */
	constructor(media,id) {
		this.media	= media;
		this.id		= id;
		this.ssrcs	= [];
		this.groups	= [];
		this.encodings  = [];
	}

	/**
	 * Create a clone of this track info object
	 * @returns {TrackInfo}
	 */
	clone() {
		//Clone
		const cloned =  new TrackInfo(this.media,this.id);
		//Check mediaId
		if (this.mediaId)
			//Set it
			cloned.setMediaId(this.mediaId);
		//Gor each ssrc
		for (let i=0;i<this.ssrcs.length;++i)
			//Add ssrc
			cloned.addSSRC(this.ssrcs[i]);
		//For each group
		for (let i=0;i<this.groups.length;++i)
			//Clone and add grou
			cloned.addSourceGroup(this.groups[i].clone());
		//For each encoding
		for (let i=0;i<this.encodings.length;++i)
		{
			const alternatives = [];
			//For each alternative
			for (let j=0;j<this.encodings[i].length;++j)
				//Append it
				alternatives.push(this.encodings[i][j].clone());
			//Clone and add grou
			cloned.addAlternativeEncodings(alternatives);
		}
		//Return it
		return cloned;
	}


	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {Object} Plain javascript object
	 */
	plain() {
		const plain = {
			media		: this.media,
			id		: this.id,
			ssrcs		: [],
		};
		//Check mediaId
		if (this.mediaId)
			//Set it
			plain.mediaId = this.mediaId;
		//Gor each ssrc
		for (let i=0;i<this.ssrcs.length;++i)
			//Add ssrc
			plain.ssrcs.push(this.ssrcs[i]);
		//For each group
		for (let i=0;i<this.groups.length;++i)
		{
			//If first
			if (!plain.groups) plain.groups = [];
			//Clone and add grou
			plain.groups.push(this.groups[i].plain());
		}
		//For each encoding
		for (let i=0;i<this.encodings.length;++i)
		{
			const alternatives = [];
			//For each alternative
			for (let j=0; j<this.encodings[i].length;++j)
				//Append it
				alternatives.push(this.encodings[i][j].plain());
			//If we have any
			if (alternatives.length)
			{
				//If first
				if (!plain.encodings) plain.encodings = [];
				//Clone and add grou
				plain.encodings.push(alternatives);
			}
		}
		//Return it
		return plain;
	}

	/**
	 * Get media type
	 * @returns {String} - "audio"|"video"
	 */
	getMedia() {
		return this.media;
	}

	/**
	 * Set the media line id this track belongs to. Set to null for first media line of the media type
	 * @param {String} mediaId		- MediaInfo id
	 */
	setMediaId(mediaId) {
		this.mediaId = mediaId;
	}

	/**
	 * Returns the MediaInfo id this track belongs two (unified) or undefined if indiferent (plan B)
	 * @returns {String}
	 */
	getMediaId() {
		return this.mediaId;
	}

	/**
	 * Get track id
	 * @returns {String}
	 */
	getId() {
		return this.id;
	}

	/**
	 * Add ssrc for this track
	 * @param {Number} ssrc
	 */
	addSSRC(ssrc) {
		this.ssrcs.push(ssrc);
	}

	/**
	 * Get all
	 * @returns {Array}
	 */
	getSSRCs() {
		return this.ssrcs;
	}

	/**
	 * Add source group to track
	 * @param {SourceGroupInfo} group
	 */
	addSourceGroup(group) {
		this.groups.push(group);
	}

	/**
	 * Get the source group fot the desired type
	 * @param {String} schematics - Group type
	 * @returns {SourceGroupInfo}
	 */
	getSourceGroup(schematics) {
		for (const group of this.groups)
		{
			if (group.getSemantics().toLowerCase()===schematics.toLowerCase())
				return group;
		}
		return null;
	}

	/**
	 * Get all source groups for this track
	 * @returns {Array<SourceGroupInfo>}
	 */
	getSourceGroups() {
		return this.groups;
	}

	/**
	 * Check if track has a group for this type
	 * @param {String} schematics
	 * @returns {Boolean}
	 */
	hasSourceGroup(schematics) {
		for (const group of this.groups)
		{
			if (group.getSemantics().toLowerCase()===schematics.toLowerCase())
				return true;
		}
		return false;
	}

	/**
	 * Get simulcast encoding information for this track (if any)
	 * @returns {Array<Array<TrackEncodingInfo>>}
	 */
	getEncodings() {
		return this.encodings;
	}

	/**
	 * Add simulcast encoding information for this track
	 * @param {TrackEncodingInfo} encoding - Simulcast encoding info
	 */
	addEncoding(encoding) {
		//Put it
		this.encodings.push([encoding]);
	}
	
	/**
	 * Add simulcast encoding information for this track
	 * @param {Array<TrackEncodingInfo>} alternatives - Simulcast encoding info
	 */
	addAlternativeEncodings(alternatives) {
		//Put it
		this.encodings.push(alternatives);
	}

	/**
	 * Add simulcast encoding information for this track
	 * @param {Array<Array<TrackEncodingInfo>>} encodings - Simulcast encoding info
	 */
	setEncodings(encodings) {
		//Put it
		//TODO: Clone?
		this.encodings = encodings;
	}
}

/**
 * Expands a plain JSON object containing an TrackInfo
 * @param {Object} plain JSON object
 * @returns {TrackInfo} Parsed Track info
 */
TrackInfo.expand = function(plain)
{
	//Create new
	const trackInfo =  new TrackInfo(plain.media,plain.id);
	//Check mediaId
	if (plain.mediaId)
		//Set it
		trackInfo.setMediaId(plain.mediaId);
	//Gor each ssrc
	for (let i=0;plain.ssrcs && i<plain.ssrcs.length;++i)
		//Add ssrc
		trackInfo.addSSRC(plain.ssrcs[i]);
	//For each group
	for (let i=0;plain.groups && i<plain.groups.length;++i)
		//Clone and add grou
		trackInfo.addSourceGroup(SourceGroupInfo.expand(plain.groups[i]));
	//For each encoding
	for (let i=0;plain.encodings && i<plain.encodings.length;++i)
	{
		const alternatives = [];
		//For each alternative
		for (let j=0; j<plain.encodings[i].length;++j)
			//Append it
			alternatives.push(TrackEncodingInfo.expand(plain.encodings[i][j]));
		//Clone and add grou
		trackInfo.addAlternativeEncodings(alternatives);
	}
	//Return it
	return trackInfo;
};

module.exports = TrackInfo;
