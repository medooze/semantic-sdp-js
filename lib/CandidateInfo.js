

 class CandidateInfo {
	
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

	getFundation() {
		return this.fundation;
	}

	getComponentId() {
		return this.componentId;
	}

	getTransport() {
		return this.transport;
	}

	getPriority() {
		return this.priority;
	}

	getAddress() {
		return this.address;
	}

	getPort() {
		return this.port;
	}

	getType() {
		return this.type;
	}

	getRelAddr() {
		return this.relAddr;
	}

	getRelPort() {
		return this.relPort;
	}
	
}

module.exports = CandidateInfo;