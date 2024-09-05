const SourceGroupInfo = require("./SourceGroupInfo");
const TrackEncodingInfo = require("./TrackEncodingInfo");

/** @typedef {import(".").TrackType} TrackType */
/** @typedef {import(".").TrackInfoPlain} TrackInfoPlain */
/** @typedef {import(".").TrackInfoLike} TrackInfoLike */
/** @typedef {import(".").TrackEncodingInfoPlain} TrackEncodingInfoPlain */
/** @typedef {import(".").EncodingSourceInfo} EncodingSourceInfo */

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
	constructor(media, id)
	{
		this.media = media;
		this.id = id;
		this.ssrcs = /** @type {number[]} */ ([]);
		this.groups = /** @type {SourceGroupInfo[]} */ ([]);
		this.encodings = /** @type {TrackEncodingInfo[][]} */ ([]);
	}

	/**
	 * Create a clone of this track info object
	 * @returns {TrackInfo}
	 */
	clone()
	{
		//Clone
		const cloned = new TrackInfo(this.media, this.id);
		//Check mediaId
		if (this.mediaId)
			//Set it
			cloned.setMediaId(this.mediaId);
		//Gor each ssrc
		for (let i = 0; i < this.ssrcs.length; ++i)
			//Add ssrc
			cloned.addSSRC(this.ssrcs[i]);
		//For each group
		for (let i = 0; i < this.groups.length; ++i)
			//Clone and add grou
			cloned.addSourceGroup(this.groups[i].clone());
		//For each encoding
		for (let i = 0; i < this.encodings.length; ++i)
		{
			const alternatives = [];
			//For each alternative
			for (let j = 0; j < this.encodings[i].length; ++j)
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
	plain()
	{
		const plain = /** @type {TrackInfoPlain} */ ({
			media: this.media,
			id: this.id,
			ssrcs: [],
		});
		//Check mediaId
		if (this.mediaId)
			//Set it
			plain.mediaId = this.mediaId;
		//Gor each ssrc
		for (let i = 0; i < this.ssrcs.length; ++i)
			//Add ssrc
			plain.ssrcs.push(this.ssrcs[i]);
		//For each group
		for (let i = 0; i < this.groups.length; ++i)
		{
			//If first
			if (!plain.groups) plain.groups = [];
			//Clone and add grou
			plain.groups.push(this.groups[i].plain());
		}
		//For each encoding
		for (let i = 0; i < this.encodings.length; ++i)
		{
			const alternatives = /** @type {TrackEncodingInfoPlain[]} */ ([]);
			//For each alternative
			for (let j = 0; j < this.encodings[i].length; ++j)
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
	getMedia()
	{
		return this.media;
	}

	/**
	 * Set the media line id this track belongs to. Set to null for first media line of the media type
	 * @param {String} mediaId		- MediaInfo id
	 */
	setMediaId(mediaId)
	{
		this.mediaId = mediaId;
	}

	/**
	 * Returns the MediaInfo id this track belongs two (unified) or undefined if indiferent (plan B)
	 * @returns {String}
	 */
	getMediaId()
	{
		return this.mediaId;
	}

	/**
	 * Get track id
	 * @returns {String}
	 */
	getId()
	{
		return this.id;
	}

	/**
	 * Add ssrc for this track
	 * @param {Number} ssrc
	 */
	addSSRC(ssrc)
	{
		this.ssrcs.push(ssrc);
	}

	/**
	 * Get all
	 * @returns {Array<Number>}
	 */
	getSSRCs()
	{
		return this.ssrcs;
	}

	/**
	 * Add source group to track
	 * @param {SourceGroupInfo} group
	 */
	addSourceGroup(group)
	{
		this.groups.push(group);
	}

	/**
	 * Get the source group fot the desired type
	 * @param {String} schematics - Group type
	 * @returns {SourceGroupInfo}
	 */
	getSourceGroup(schematics)
	{
		for (const group of this.groups)
		{
			if (group.getSemantics().toLowerCase() === schematics.toLowerCase())
				return group;
		}
		return null;
	}

	/**
	 * Get all source groups for this track
	 * @returns {Array<SourceGroupInfo>}
	 */
	getSourceGroups()
	{
		return this.groups;
	}

	/**
	 * Get groups for given media ssrc
	 * @param {number} ssrc - Media SSRC
	 * @returns {Array<SourceGroupInfo>}
	 */
	getSourceGroupsForMediaSSRC(ssrc)
	{
		return this.groups.filter(group => group.getSSRCs()[0] === ssrc);
	}

	/**
	 * Check if track has a group for this type
	 * @param {String} schematics
	 * @returns {Boolean}
	 */
	hasSourceGroup(schematics)
	{
		for (const group of this.groups)
		{
			if (group.getSemantics().toLowerCase() === schematics.toLowerCase())
				return true;
		}
		return false;
	}

	/**
	 * Get simulcast encoding information for this track (if any)
	 * @returns {Array<Array<TrackEncodingInfo>>}
	 */
	getEncodings()
	{
		return this.encodings;
	}

	/**
	 * Add simulcast encoding information for this track
	 * @param {TrackEncodingInfo} encoding - Simulcast encoding info
	 */
	addEncoding(encoding)
	{
		//Put it
		this.encodings.push([encoding]);
	}

	/**
	 * Add simulcast encoding information for this track
	 * @param {Array<TrackEncodingInfo>} alternatives - Simulcast encoding info
	 */
	addAlternativeEncodings(alternatives)
	{
		//Put it
		this.encodings.push(alternatives);
	}

	/**
	 * Add simulcast encoding information for this track
	 * @param {Array<Array<TrackEncodingInfo>>} encodings - Simulcast encoding info
	 */
	setEncodings(encodings)
	{
		//Put it
		//TODO: Clone?
		this.encodings = encodings;
	}

	/**
	 * Get parsed encoding sources
	 * @returns {Array<EncodingSourceInfo>}
	 */
	getEncodingSources()
	{
		/** @type {Array<EncodingSourceInfo> */
		const sources = [];
		//If it is a simulcast encoding
		if (this.encodings.length)
		{
			//For each alternative encoding
			for (const alternative of this.encodings)
			{
				//For each encoding
				for (const encoding of alternative)
				{
					/** @type EncodingSourceInfo */
					const source = {
						id : encoding.getId(),
						rid: encoding.getId()
					};
					//Get RID params
					const params = encoding.getParams();
					//If it has ssrc
					const ssrc = params?.get("ssrc");
					//If got any
					if (ssrc !== undefined)
					{
						//Got source ssrc
						source.media = parseInt(ssrc);

						//Check groups
						for (const group of this.getSourceGroupsForMediaSSRC(source.media))
						{
							//Check if it is one of the ones we care
							switch (group.getSemantics())
							{
								case "FID":
									//Set rtx ssrc
									source.rtx = group.getSSRCs()[1];
									break;
								case "FEC-FR":
									//Set rtx ssrc
									source.fec = group.getSSRCs()[1];
									break;
							}
						}
					}
					//Push to sources
					sources.push(source);
				}
			}
		}
		//Check if it is a chrome-like sumulcast
		else if (this.hasSourceGroup("SIM"))
		{
			//Get MID group
			const SIM = this.getSourceGroup("SIM");
			//Get ssrcs
			const ssrcs = SIM.getSSRCs();

			//Check the other groups
			const groups = this.getSourceGroups();

			//For each ssrc in MID
			for (const ssrc of ssrcs)
			{
				/** @type EncodingSourceInfo */
				const source = {
					id    : String(ssrc),
					media : ssrc
				};

				//Check groups
				for (const group of this.getSourceGroupsForMediaSSRC(source.media))
				{
					//Check if it is one of the ones we care
					switch (group.getSemantics())
					{
						case "FID":
							//Set rtx ssrc
							source.rtx = group.getSSRCs()[1];
							break;
						case "FEC-FR":
							//Set rtx ssrc
							source.fec = group.getSSRCs()[1];
							break;
					}
				}

				//Append to sources
				sources.push(source)
			}
		}
		//NO simulcast
		else 
		{
			/** @type EncodingSourceInfo */
			const source = {
				id: ""
			};

			//If got ssrc info
			if (this.ssrcs.length)
			{
				//Set media ssrc
				source.media = this.ssrcs[0];
				//Check groups
				for (const group of this.getSourceGroupsForMediaSSRC(source.media))
				{
					//Check if it is one of the ones we care
					switch (group.getSemantics())
					{
						case "FID":
							//Set rtx ssrc
							source.rtx = group.getSSRCs()[1];
							break;
						case "FEC-FR":
							//Set rtx ssrc
							source.fec = group.getSSRCs()[1];
							break;
					}
				}
			}

			//Append to sources
			sources.push(source)
		}
		//Done
		return sources;
	}
}

/**
 * Expands a plain JSON object containing an TrackInfo
 * @param {TrackInfoLike} plain JSON object
 * @returns {TrackInfo} Parsed Track info
 */
TrackInfo.expand = function (plain)
{
	//Ensure it is not already a TrackInfo object
	if (plain.constructor.name === "TrackInfo")
		return /** @type {TrackInfo} */ (plain);

	//Otherwise it is a plain object
	plain = /** @type {TrackInfoPlain} */ (plain);

	//Create new
	const trackInfo = new TrackInfo(plain.media, plain.id);
	//Check mediaId
	if (plain.mediaId)
		//Set it
		trackInfo.setMediaId(plain.mediaId);

	//If we have an array of ssrcs
	if (Array.isArray(plain.ssrcs))
	{
		//for each ssrc
		for (const ssrc of plain.ssrcs)
			//Add ssrc
			trackInfo.addSSRC(ssrc);
	}
	//Check if we have named ssrcs
	else if (plain.ssrcs && plain.ssrcs.media !== undefined)
	{
		//Get ssrc for media
		const media = plain.ssrcs.media;
		//Append to ssrc list
		trackInfo.addSSRC(media);
		//Check if we have named rtx ssrc
		if (plain.ssrcs.rtx !== undefined) 
		{
			//Get ssrc for rtx
			const rtx = plain.ssrcs.rtx;
			//Append to ssrc list
			trackInfo.addSSRC(rtx);
			//Create a FID group
			trackInfo.addSourceGroup(new SourceGroupInfo("FID", [media, rtx]));
		}
		//Check if we have named fec ssrc
		if (plain.ssrcs.fec !== undefined) 
		{
			//Get ssrc for rtx
			const fec = plain.ssrcs.fec;
			//Append to ssrc list
			trackInfo.addSSRC(fec);
			//Create a FID group
			trackInfo.addSourceGroup(new SourceGroupInfo("FEC-FR", [media, fec]));
		}
	}

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
TrackInfo.clone = function (plain)
{
	return plain.constructor.name === "TrackInfo"
		? /** @type {TrackInfo} */ (plain).clone()
		: TrackInfo.expand(plain);
}

module.exports = TrackInfo;
