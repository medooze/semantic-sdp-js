
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
	 * @returns {SourceGroupInfo}
	 */
	 constructor(semantics, ssrcs) {
		this.semantics = semantics;
		this.ssrcs = [];
		//Populte
		for (let i=0; i<ssrcs.length; ++i)
			this.ssrcs.push(parseInt(ssrcs[i]));
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
	 * @returns {Object} Plain javascript object
	 */
	plain() {
		const plain = {
			semantics	: this.semantics,
			ssrcs		: []
		};
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
 * @param {Object} plain JSON object
 * @returns {SourceGroupInfo} Parsed SourceGroup info
 */
SourceGroupInfo.expand = function(plain)
{
	//Create new
	return new SourceGroupInfo(
		plain.semantics,
		plain.ssrcs
	);
};

module.exports = SourceGroupInfo;