const SimulcastStreamInfo	= require("./SimulcastStreamInfo");
const DirectionWay		= require("./DirectionWay");

/** @typedef {import(".").SimulcastInfoPlain} SimulcastInfoPlain */
/** @typedef {import(".").SimulcastInfoLike} SimulcastInfoLike */
/** @typedef {import(".").SimulcastStreamInfoPlain} SimulcastStreamInfoPlain */

/**
 * Simulcast information
 * @namespace
 */
class SimulcastInfo
{
	/**
	 * @constructor
	 * @alias SimulcastInfo
	 */
	constructor() {
		this.send	= /** @type {SimulcastStreamInfo[][]} */ ([]);
		this.recv	= /** @type {SimulcastStreamInfo[][]} */ ([]);
	}

	/**
	 * Create a clone of this track info object
	 * @returns {SimulcastInfo}
	 */
	clone() {
		//Clone
		const cloned =  new SimulcastInfo();
		//For each sending streams
		for (const stream of this.send)
			//Push it
			cloned.addSimulcastAlternativeStreams(DirectionWay.SEND,stream.map(alternative => alternative.clone()));
		//For each receiving streams
		for (const stream of this.recv)
			//Push it
			cloned.addSimulcastAlternativeStreams(DirectionWay.RECV,stream.map(alternative => alternative.clone()));
		//Return it
		return cloned;
	}


	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {SimulcastInfoPlain} Plain javascript object
	 */
	plain() {
		const plain = /** @type {SimulcastInfoPlain} */ ({
			send : [],
			recv : []
		});
		//For each sending streams
		for (const stream of this.send)
			//Push it
			plain.send.push(stream.map(alternative => alternative.plain()));
		//For each receiving streams
		for (const stream of this.recv)
			//Push it
			plain.recv.push(stream.map(alternative => alternative.plain()));
		//Return it
		return plain;
	}

	/**
	 * Add a simulcast alternative streams for the specific direction
	 * @param {DirectionWay} direction - Which direction you want the streams for
	 * @param {Array<SimulcastStreamInfo>} streams - Stream info of all the alternatives
	 */
	addSimulcastAlternativeStreams(direction,streams) {
		if (direction===DirectionWay.SEND)
			return this.send.push(streams);
		else
			return this.recv.push(streams);
	}

	/**
	 * Add a single simulcast stream for the specific direction
	 * @param {DirectionWay} direction - Which direction you want the streams for
	 * @param {SimulcastStreamInfo} stream - Stream info of the single alternative
	 */
	addSimulcastStream(direction,stream) {
		if (direction===DirectionWay.SEND)
			//Push an array of single stream
			return this.send.push([stream]);
		else
			//Push an array of single stream
			return this.recv.push([stream]);
	}

	/**
	 * Get all simulcast streams by direction
	 * @param {DirectionWay} direction - Which direction you want the streams for
	 * @returns {Array<Array<SimulcastStreamInfo>>}
	 */
	getSimulcastStreams(direction) {
		if (direction===DirectionWay.SEND)
			return this.send;
		else
			return this.recv;
	}
}

/**
 * Expands a plain JSON object containing an SimulcastInfo
 * @param {SimulcastInfoLike} plain JSON object
 * @returns {SimulcastInfo} Parsed Simulcast info
 */
SimulcastInfo.expand = function(plain)
{
	//Ensure it is not already a SimulcastInfo object
	if (plain.constructor.name === "SimulcastInfo")
		return /** @type {SimulcastInfo} */ (plain);

	//Otherwise it is a plain object
	plain = /** @type {SimulcastInfoPlain} */ (plain);

	//Create new
	const simulcastInfo = new SimulcastInfo();

	//For each sending streams
	for (const streams of plain.send || [])
		//Push it
		simulcastInfo.addSimulcastAlternativeStreams(DirectionWay.SEND, streams.map(SimulcastStreamInfo.expand));
	//For each receiving streams
	for (const streams of plain.recv || [])
		//Push it
		simulcastInfo.addSimulcastAlternativeStreams(DirectionWay.RECV, streams.map(SimulcastStreamInfo.expand));

	//Done
	return simulcastInfo;
};

/**
 * Expands a plain JSON object containing an SimulcastInfo or a SimulcastInfo and clone it
 * @param {SimulcastInfoLike} plain JSON object or SimulcastInfo
 * @returns {SimulcastInfo} Cloned SimulcastInfo
 */
SimulcastInfo.clone = function(plain)
{
	return plain.constructor.name === "SimulcastInfo"  
		? /** @type {SimulcastInfo} */ (plain).clone()
		: SimulcastInfo.expand(plain);
}

module.exports = SimulcastInfo;
