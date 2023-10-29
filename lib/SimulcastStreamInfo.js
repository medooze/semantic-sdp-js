/** @typedef {import(".").SimulcastStreamInfoPlain} SimulcastStreamInfoPlain */
/** @typedef {import(".").SimulcastStreamInfoLike} SimulcastStreamInfoLike */

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
	 * @returns {SimulcastStreamInfoPlain} Plain javascript object
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
 * @param {SimulcastStreamInfoLike} plain JSON object
 * @returns {SimulcastStreamInfo} Parsed SimulcastStream info
 */
SimulcastStreamInfo.expand = function(plain)
{
	//Ensure it is not already a SimulcastStreamInfo object
	if (plain.constructor.name === "SimulcastStreamInfo")
		return /** @type {SimulcastStreamInfo} */ (plain);

	//Otherwise it is a plain object
	plain = /** @type {SimulcastStreamInfoPlain} */ (plain);

	//Create new
	return new SimulcastStreamInfo(
		plain.id,
		plain.paused
	);
};

/**
 * Expands a plain JSON object containing an SimulcastStreamInfo or a SimulcastStreamInfo and clone it
 * @param {SimulcastStreamInfoLike} plain JSON object or SimulcastStreamInfo
 * @returns {SimulcastStreamInfo} Cloned SimulcastStreamInfo
 */
SimulcastStreamInfo.clone = function(plain)
{
	return plain.constructor.name === "SimulcastStreamInfo"  
		? /** @type {SimulcastStreamInfo} */ (plain).clone()
		: SimulcastStreamInfo.expand(plain);
}

module.exports = SimulcastStreamInfo;
