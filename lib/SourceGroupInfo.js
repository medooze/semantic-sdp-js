

class SourceGroupInfo {
	 constructor(semantics, ssrcs) {
		this.semantics = semantics;
		this.ssrcs = ssrcs;
	}
	
	getSemantics() {
		return this.semantics;
	}

	getSSRCs() {
		return this.ssrcs;
	}
}

module.exports = SourceGroupInfo;