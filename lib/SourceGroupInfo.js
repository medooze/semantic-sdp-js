/** @typedef {import(".").SourceGroupInfoPlain} SourceGroupInfoPlain */
/** @typedef {import(".").SourceGroupInfoLike} SourceGroupInfoLike */

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
	 * @param {Array<Number>} ssrcs	- SSRC list
	 */
	constructor(semantics, ssrcs) {
		this.semantics = semantics;
		this.ssrcs = [];
		//Populte
		for (let i=0; i<ssrcs.length; ++i)
			this.ssrcs.push(parseInt(/** @type {any} */ (ssrcs[i])));
	}

	/**
	 * Create a clone of this source group info object
	 * @returns {SourceGroupInfo}
	 */
	clone() {
		//Clone
		return  new SourceGroupInfo(this.semantics,this.ssrcs);
	}


	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {SourceGroupInfoPlain} Plain javascript object
	 */
	plain() {
		const plain = /** @type {SourceGroupInfoPlain} */ ({
			semantics	: this.semantics,
			ssrcs		: []
		});
		//Gor each ssrc
		for (let i=0;i<this.ssrcs.length;++i)
			//Add ssrc
			plain.ssrcs.push(this.ssrcs[i]);
		//Return it
		return plain;
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
	 * @returns {Array<Number>}
	 */
	getSSRCs() {
		return this.ssrcs;
	}
}

/**
 * Expands a plain JSON object containing an SourceGroupInfo
 * @param {SourceGroupInfoLike} plain JSON object
 * @returns {SourceGroupInfo} Parsed SourceGroup info
 */
SourceGroupInfo.expand = function(plain)
{
	//Ensure it is not already a SourceGroupInfo object
	if (plain.constructor.name === "SourceGroupInfo")
		return /** @type {SourceGroupInfo} */ (plain);

	//Otherwise it is a plain object
	plain = /** @type {SourceGroupInfoPlain} */ (plain);

	//Create new
	return new SourceGroupInfo(
		plain.semantics,
		plain.ssrcs
	);
};

/**
 * Expands a plain JSON object containing an SourceGroupInfo or a SourceGroupInfo and clone it
 * @param {SourceGroupInfoLike} plain JSON object or SourceGroupInfo
 * @returns {SourceGroupInfo} Cloned SourceGroupInfo
 */
SourceGroupInfo.clone = function(plain)
{
	return plain.constructor.name === "SourceGroupInfo"  
		? /** @type {SourceGroupInfo} */ (plain).clone()
		: SourceGroupInfo.expand(plain);
}

module.exports = SourceGroupInfo;
