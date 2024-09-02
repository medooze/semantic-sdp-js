const SourceGroupInfo	= require("./SourceGroupInfo");
const TrackEncodingInfo = require("./TrackEncodingInfo");

/** @typedef {import(".").TrackType} TrackType */
/** @typedef {import(".").TrackInfoPlain} TrackInfoPlain */
/** @typedef {import(".").TrackInfoLike} TrackInfoLike */
/** @typedef {import(".").TrackEncodingInfoPlain} TrackEncodingInfoPlain */

/**
 * Media Track information
 * @namespace
 */
class TrackInfo
{
	/**
	 * @constructor
	 * @alias TrackInfo
	 * @param {TrackType} media	- Media type "audio"|"video"
	 * @param {String} id		- Track id
	 */
	constructor(media,id) {
		this.media	= media;
		this.id		= id;
		this.ssrcs	= /** @type {number[]} */ ([]);
		this.groups	= /** @type {SourceGroupInfo[]} */ ([]);
		this.encodings  = /** @type {TrackEncodingInfo[][]} */ ([]);
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
	 * @returns {TrackInfoPlain} Plain javascript object
	 */
	plain() {
		const plain = /** @type {TrackInfoPlain} */ ({
			media		: this.media,
			id		: this.id,
			ssrcs		: [],
		});
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
			const alternatives = /** @type {TrackEncodingInfoPlain[]} */ ([]);
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
	 * @returns {TrackType} - "audio"|"video"
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
	 * @returns {Array<Number>}
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
 * @param {TrackInfoLike} plain JSON object
 * @returns {TrackInfo} Parsed Track info
 */
TrackInfo.expand = function(plain)
{
	//Ensure it is not already a TrackInfo object
	if (plain.constructor.name === "TrackInfo")
		return /** @type {TrackInfo} */ (plain);

	//Otherwise it is a plain object
	plain = /** @type {TrackInfoPlain} */ (plain);

	//Create new
	const trackInfo =  new TrackInfo(plain.media,plain.id);
	//Check mediaId
	if (plain.mediaId)
		//Set it
		trackInfo.setMediaId(plain.mediaId);
	//Gor each ssrc
	for (const ssrc of plain.ssrcs || [])
		//Add ssrc
		trackInfo.addSSRC(ssrc);
	//For each group
	for (const group of plain.groups || [])
		//Clone and add grou
		trackInfo.addSourceGroup(SourceGroupInfo.expand(group));
	//For each encoding
	for (const encodings of plain.encodings || [])
	{
		const alternatives = [];
		//For each alternative
		for (const encoding of encodings)
			//Append it
			alternatives.push(TrackEncodingInfo.expand(encoding));
		//Clone and add grou
		trackInfo.addAlternativeEncodings(alternatives);
	}
	//Return it
	return trackInfo;
};

/**
 * Expands a plain JSON object containing an TrackInfo or a TrackInfo and clone it
 * @param {TrackInfoLike} plain JSON object or TrackInfo
 * @returns {TrackInfo} Cloned TrackInfo
 */
TrackInfo.clone = function(plain)
{
	return plain.constructor.name === "TrackInfo"  
		? /** @type {TrackInfo} */ (plain).clone()
		: TrackInfo.expand(plain);
}

module.exports = TrackInfo;
