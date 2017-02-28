/**
 * ICE candidate information
 * @namespace
 */
 class CandidateInfo {
	
	/**
	 * CanditateInfo constructor
	 * @constructor
	 * @alias CandidateInfo
	 * @param {String} fundation
	 * @param {Number} componentId
	 * @param {String} transport
	 * @param {Number} priority
	 * @param {String} address
	 * @param {Number} port
	 * @param {String} type
	 */
	constructor(fundation, componentId, transport, priority, address, port, type) {
		this.fundation		= fundation;
		this.componentId	= componentId;
		this.transport		= transport;
		this.priority		= priority;
		this.address		= address;
		this.port		= port;
		this.type		= type;
		this.relAddr		= null;
		this.relPort		= null;
	}

	/**
	 * Get the candidate fundation
	 * @returns {String}
	 */
	getFundation() {
		return this.fundation;
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
	 * @returns {String}
	 */
	getRelAddr() {
		return this.relAddr;
	}

	/**
	 * Get the candidate related IP port for relfexive candidates
	 * @returns {Number}
	 */
	getRelPort() {
		return this.relPort;
	}
	
}

module.exports = CandidateInfo;