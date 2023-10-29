const randomBytes = require('randombytes');

/** @typedef {import(".").ICEInfoPlain} ICEInfoPlain */
/** @typedef {import(".").ICEInfoLike} ICEInfoLike */

/**
 * ICE information for a peer
 * @namespace
 */
class ICEInfo
{
	//TODO: ice-options: trickle
	
	/**
	 * @constructor
	 * @alias ICEInfo
	 * @param {String} ufrag	- Peer ICE username framgent
	 * @param {String} pwd		- Peer ICE password
	 */
	constructor(ufrag, pwd) {
		this.ufrag	= ufrag;
		this.pwd	= pwd;
		this.lite	= false;
		this.endOfCandidates = false;
	}

	/**
	 * Create a clone of this Codec info object
	 * @returns {ICEInfo}
	 */
	clone() {
		//Clone
		const cloned =  new ICEInfo(this.ufrag,this.pwd);
		//Set ice lite and end of canddiates
		cloned.setLite (this.lite);
		cloned.setEndOfCandidates (this.endOfCandidates);
		//Return it
		return cloned;
	}

	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {ICEInfoPlain} Plain javascript object
	 */
	plain() {
		const plain = /** @type {ICEInfoPlain} */ ({
			ufrag	: this.ufrag,
			pwd	: this.pwd
		});
		//Set ice lite and end of canddiates only if true
		if (this.lite) plain.lite = this.lite;
		if (this.endOfCandidates) plain.endOfCandidates = this.endOfCandidates;
		//Return plain object
		return plain;
	}

	/**
	 * Get username fragment
	 * @returns {String} ufrag
	 */
	getUfrag() {
		return this.ufrag;
	}

	/**
	 * Get username password
	 * @returns {String}	password
	 */
	getPwd() {
		return this.pwd;
	}

	/**
	 * Is peer ICE lite
	 * @returns {Boolean}
	 */
	isLite() {
		return this.lite;
	}

	/**
	 * Set peer as ICE lite
	 * @param {boolean} lite
	 */
	setLite(lite) {
		this.lite = lite;
	}

	isEndOfCandidates() {
		return this.endOfCandidates;
	}

	/**
	 * @param {Boolean} endOfCandidates
	 */
	setEndOfCandidates(endOfCandidates) {
		 this.endOfCandidates = endOfCandidates;
	}

}
/**
 * Genereate a new peer ICE info with ramdom values
 * @param {Boolean} lite - Set ICE lite flag
 * @returns {ICEInfo}
 */
ICEInfo.generate = function(lite)
{
	//Create ICE info for media
	//@ts-expect-error
	const info = new ICEInfo();
	//Create key and pwd bytes
	const frag = randomBytes(8);
	const pwd = randomBytes(24);
	//Create ramdom pwd
	info.ufrag = frag.toString('hex');
	info.pwd   = pwd.toString('hex');
	info.lite  = lite;
	//return it
	return info;
};


/**
 * Expands a plain JSON object containing an ICEInfo
 * @param {ICEInfoLike} plain JSON object
 * @returns {ICEInfo} Parsed ICE info
 */
ICEInfo.expand = function(plain)
{
	//Ensure it is not already a ICEInfo object
	if (plain.constructor.name === "ICEInfo")
		return /** @type {ICEInfo} */ (plain);

	//Otherwise it is a plain object
	plain = /** @type {ICEInfoPlain} */ (plain);

	//Create new
	const info = new ICEInfo(
		plain.ufrag,
		plain.pwd
	);
	//Set ice lite and end of canddiates
	info.setLite(plain.lite);
	info.setEndOfCandidates(plain.endOfCandidates);
	//return it
	return info;
};

/**
 * Expands a plain JSON object containing an ICEInfo or a ICEInfo and clone it
 * @param {ICEInfoLike} plain JSON object or ICEInfo
 * @returns {ICEInfo} Cloned ICEInfo
 */
ICEInfo.clone = function(plain)
{
	return plain.constructor.name === "ICEInfo"  
		? /** @type {ICEInfo} */ (plain).clone()
		: ICEInfo.expand(plain);
}

module.exports = ICEInfo;
