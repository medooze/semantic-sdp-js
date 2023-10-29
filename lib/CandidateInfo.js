/** @typedef {import(".").CandidateInfoPlain} CandidateInfoPlain */
/** @typedef {import(".").CandidateInfoLike} CandidateInfoLike */

/**
 * ICE candidate information
 * @namespace
 */
 class CandidateInfo {

	/**
	 * CanditateInfo constructor
	 * @constructor
	 * @alias CandidateInfo
	 * @param {String} foundation
	 * @param {Number} componentId
	 * @param {String} transport
	 * @param {Number} priority
	 * @param {String} address
	 * @param {Number} port
	 * @param {String} type
	 * @param {String} [relAddr]
	 * @param {Number} [relPort]
	 */
	constructor(foundation, componentId, transport, priority, address, port, type, relAddr, relPort) {
		this.foundation		= foundation;
		this.componentId	= componentId;
		this.transport		= transport;
		this.priority		= priority;
		this.address		= address;
		this.port		= port;
		this.type		= type;
		this.relAddr		= relAddr;
		this.relPort		= relPort;
	}
	
	/**
	 * Check if the ice candadate has same info as us
	 * @param {CandidateInfo} candidate - ICE candadate to check against
	 * @returns {Boolean} 
	 */
	equals(candidate) {
		//Check
		return	candidate.foundation	=== this.foundation	&&
			candidate.componentId	=== this.componentId	&&
			candidate.transport	=== this.transport	&&
			candidate.priority	=== this.priority	&&
			candidate.address	=== this.address	&&
			candidate.port		=== this.port		&&
			candidate.type		=== this.type		&&
			candidate.relAddr	=== this.relAddr	&&
			candidate.relPort	=== this.relPort;
	}

	/**
	 * Create a clone of this Candidate info object
	 * @returns {CandidateInfo}
	 */
	clone() {
		//Clone
		return new CandidateInfo(this.foundation,this.componentId,this.transport,this.priority,this.address,this.port,this.type,this.relAddr,this.relPort);
	}

	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {CandidateInfoPlain} Plain javascript object
	 */
	plain() {
		const plain = /** @type {CandidateInfoPlain} */ ({
			foundation	: this.foundation,
			componentId	: this.componentId,
			transport	: this.transport,
			priority	: this.priority,
			address		: this.address,
			port		: this.port,
			type		: this.type
		});
		//Add rel addr and port
		if (this.relAddr) plain.relAddr = this.relAddr;
		if (this.relPort) plain.relPort = this.relPort;
		//Return plain object
		return  plain;
	}

	/**
	 * Get the candidate foundation
	 * @returns {String}
	 */
	getFoundation() {
		return this.foundation;
	}

	/**
	 * Get the candidate component id
	 * @returns {Number}
	 */
	getComponentId() {
		return this.componentId;
	}

	/**
	 * Get the candidate transport type
	 * @returns {String}
	 */
	getTransport() {
		return this.transport;
	}

	/**
	 * Get the candidate priority
	 * @returns {Number}
	 */
	getPriority() {
		return this.priority;
	}

	/**
	 * Get the candidate IP address
	 * @returns {String}
	 */
	getAddress() {
		return this.address;
	}

	/**
	 * Get the candidate IP port
	 * @returns {Number}
	 */
	getPort() {
		return this.port;
	}

	/**
	 * Get the candidate type
	 * @returns {String}
	 */
	getType() {
		return this.type;
	}

	/**
	 * Get the candidate related IP address for relfexive candidates
	 * @returns {String | undefined}
	 */
	getRelAddr() {
		return this.relAddr;
	}

	/**
	 * Get the candidate related IP port for relfexive candidates
	 * @returns {Number | undefined}
	 */
	getRelPort() {
		return this.relPort;
	}

}

/**
 * Expands a plain JSON object containing an CandidateInfo
 * @param {CandidateInfoLike} plain JSON object
 * @returns {CandidateInfo} Parsed Candidate info
 */
CandidateInfo.expand = function(plain)
{
	//Ensure it is not already a CandidateInfo object
	if (plain.constructor.name === "CandidateInfo")
		return /** @type {CandidateInfo} */ (plain);

	//Otherwise it is a plain object
	plain = /** @type {CandidateInfoPlain} */ (plain);

	//Create new
	return new CandidateInfo(
		plain.foundation,
		plain.componentId,
		plain.transport,
		plain.priority,
		plain.address,
		plain.port,
		plain.type,
		plain.relAddr,
		plain.relPort
	);
};

/**
 * Expands a plain JSON object containing an CandidateInfo or a CandidateInfo and clone it
 * @param {CandidateInfoLike} plain JSON object or CandidateInfo
 * @returns {CandidateInfo} Cloned Candidate info
 */
CandidateInfo.clone = function(plain)
{
	return plain.constructor.name === "CandidateInfo"  
		? /** @type {CandidateInfo} */ (plain).clone()
		: CandidateInfo.expand(plain);
}

module.exports = CandidateInfo;
