
/**
 * Simulcast streams info
 * @namespace
 */
class SimulcastStreamInfo {
	/**
	 * @constructor
	 * @alias SimulcastStreamInfo
	 * @param {String} id		- rid for this simulcast stream
	 * @param {Boolean} paused	- If this stream is initially paused
	 * @returns {SimulcastStreamInfo}
	 */
	 constructor(id,paused) {
		this.paused = paused;
		this.id = id;
	}

	/**
	 * Create a clone of this simulcast stream info object
	 * @returns {SimulcastStreamInfo}
	 */
	clone() {
		//Clone
		return  new SimulcastStreamInfo(this.id, this.paused);
	}


	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {Object} Plain javascript object
	 */
	plain() {
		return {
			id	: this.id,
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
	getId() {
		return this.id;
	}
}

/**
 * Expands a plain JSON object containing an SimulcastStreamInfo
 * @param {Object} plain JSON object
 * @returns {SimulcastStreamInfo} Parsed SimulcastStream info
 */
SimulcastStreamInfo.expand = function(plain)
{
	//Create new
	return new SimulcastStreamInfo(
		plain.id,
		plain.paused
	);
};

module.exports = SimulcastStreamInfo;