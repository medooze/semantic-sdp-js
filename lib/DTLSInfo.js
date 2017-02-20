

class DTLSInfo
{
	constructor(setup,hash,fingerprint)
	{
		//store properties
   		this.setup		= setup;
		this.hash		= hash;
		this.fingerprint	= fingerprint;
	}
	
	getFingerprint() {
		return this.fingerprint;
	}

	getHash() {
		return this.hash;
	}

	getSetup() {
		return this.setup;
	}

	setSetup(setup) {
		this.setup = setup;
	}
	
}


module.exports = DTLSInfo;