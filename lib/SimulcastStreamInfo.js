
/**
 * Simulcast streams info
 * @namespace
 */
class SimulcastStreamInfo {
	/**
	 * @constructor
	 * @alias SimulcastStreamInfo
	 * @param {String} rid		- rids list for this simulcast stream
	 * @param {Boolean} paused	- If this stream is initially paused
	 * @returns {SimulcastStreamInfo}
	 */
	 constructor(rid,paused) {
		this.paused = paused;
		this.rid = rid;
	}
	
	/**
	 * Create a clone of this simulcast stream info object
	 * @returns {SimulcastStreamInfo}
	 */
	clone() {
		//Clone
		return  new SimulcastStreamInfo(this.rid, this.paused);
	}
	
	
	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {Object} Plain javascript object
	 */
	plain() {
		return {
			rid	: this.rid,
			paused	: this.paused
		};
	}
	
	/**
	 * Is the stream paused
	 * @returns {Boolean}
	 */
	isPaused() {
		return this.paused;
	}

	/**
	 * Get rid in this stream
	 * @returns {String}
	 */
	getRID() {
		return this.rid;
	}
}

module.exports = SimulcastStreamInfo;