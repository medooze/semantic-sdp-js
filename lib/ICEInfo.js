const randomBytes = require('randombytes');

/**
 * ICE information for a peer
 * @namespace
 */
class ICEInfo
{
	/**
	 * @constructor
	 * @alias ICEInfo
	 * @param {String} ufrag	- Peer ICE username framgent
	 * @param {String} pwd		- Peer ICE password
	 * @returns {ICEInfo}
	 */
	constructor(ufrag, pwd) {
		this.ufrag = ufrag;
		this.pwd = pwd;
		this.lite = false;
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
	getLite() {
		return this.lite;
	}
	
	/**
	 * Set peer as ICE lite
	 * @param {boolean} lite
	 */
	setLite(lite) {
		this.lite = lite;
	}
	
	
}
/**
 * Genereate a new peer ICE info with ramdom values
 * @returns {ICEInfo}
 */
ICEInfo.generate = function()
{
	//Create ICE info for media
	const info = new ICEInfo();
	//Create key and pwd bytes
	const frag = randomBytes(8);
	const pwd = randomBytes(24);
	//Create ramdom pwd
	info.ufrag = frag.toString('hex');
	info.pwd   = pwd.toString('hex');
	//return this.it
	return info;
};

module.exports = ICEInfo;