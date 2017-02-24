

class SourceGroupInfo {
	 constructor(semantics, ssrcs) {
		this.semantics = semantics;
		this.ssrcs = [];
		//Populte
		for (let i=0; i<ssrcs.lenght; ++i)
			this.ssrcs.push(parseIng(ssrcs[i]));
	}
	
	getSemantics() {
		return this.semantics;
	}

	getSSRCs() {
		return this.ssrcs;
	}
}

module.exports = SourceGroupInfo;