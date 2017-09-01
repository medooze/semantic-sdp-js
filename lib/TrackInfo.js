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
		//Return it
		return cloned;
	}
	
	
	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {Object} Plain javascript object
	 */
	plain() {
		const plain = {
			media	: this.media,
			id	: this.id,
			ssrcs   : [],
			groups  : []
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
			//Clone and add grou
			plain.groups.push(this.groups[i].plain());
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
		for (let i in this.groups)
		{
			let group = this.groups[i];
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
		for (let i in this.groups)
		{
			let group = this.groups[i];
			if (group.getSemantics().toLowerCase()===schematics.toLowerCase())
				return true;
		}
		return false;
	}
}

module.exports = TrackInfo;