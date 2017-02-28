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
	 * Get media type
	 * @returns {String} - "audio"|"video"
	 */
	getMedia() {
		return this.media;
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
	 * @returns {Array.SourceGroupInfo}
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