

class CodecInfo {
	
	constructor(codec, type, params) {
		this.codec	= codec;
		this.type	= type;
		this.params	= params;
	}
	
	setRTX(rtx) {
		this.rtx = rtx;
	}

	getType() {
		return this.type;
	}

	getCodec() {
		return this.codec;
	}

	getParams() {
		return this.params;
	}

	hasRtx() {
		return this.rtx;
	}
	
	getRtx() {
		return this.rtx;
	}
}

module.exports = CodecInfo;