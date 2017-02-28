
/**
 * Group of SSRCS info
 * @namespace
 */
class SourceGroupInfo {
	/**
	 * @constructor
	 * @alias SourceGroupInfo
	 * @alias SourceGroupInfo
	 * @param {String} semantics	- Group semantics
	 * @param {Array} ssrcs		- SSRC list
	 * @returns {nm$_SourceGroupInfo.SourceGroupInfo}
	 */
	 constructor(semantics, ssrcs) {
		this.semantics = semantics;
		this.ssrcs = [];
		//Populte
		for (let i=0; i<ssrcs.length; ++i)
			this.ssrcs.push(parseInt(ssrcs[i]));
	}
	
	/**
	 * Get group semantics
	 * @returns {String}
	 */
	getSemantics() {
		return this.semantics;
	}

	/**
	 * Get list of ssrcs from this group
	 * @returns {Array.Number}
	 */
	getSSRCs() {
		return this.ssrcs;
	}
}

module.exports = SourceGroupInfo;