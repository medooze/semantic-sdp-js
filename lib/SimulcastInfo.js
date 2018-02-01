const SimulcastStreamInfo	= require("./SimulcastStreamInfo");
const DirectionWay		= require("./DirectionWay");
/**
 * Simulcast information
 * @namespace
 */
class SimulcastInfo
{
	/**
	 * @constructor
	 * @alias SimulcastInfo
	 * @returns {SimulcastInfo}
	 */
	constructor() {
		this.send	= [];
		this.recv	= [];
	}

	/**
	 * Create a clone of this track info object
	 * @returns {SimulcastInfo}
	 */
	clone() {
		//Clone
		const cloned =  new SimulcastInfo();
		//For each sending streams
		for (let i=0;i<this.send.length;++i)
		{
			let alternatives = [];
			//For each alternative
			for (let j=0;i<this.send[j].length;++i)
				//Add sream info
				alternatives.push(this.send[i][j].clone());
			//Push it
			cloned.addSimulcastAlternativeStreams(DirectionWay.SEND,alternatives);
		}
		//For each receiving streams
		for (let i=0;i<this.recv.length;++i)
		{
			let alternatives = [];
			//For each alternative
			for (let j=0;i<this.recv[j].length;++i)
				//Add sream info
				alternatives.push(this.recv[i][j].clone());
			//Push it
			cloned.addSimulcastAlternativeStreams(DirectionWay.RECV,alternatives);
		}
		//Return it
		return cloned;
	}


	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {Object} Plain javascript object
	 */
	plain() {
		const plain = {
			send : [],
			recv : []
		};
		//For each sending streams
		for (let i=0;i<this.send.length;++i)
		{
			let alternatives = [];
			//For each alternative
			for (let j=0;j<this.send[i].length;++j)
				//Add sream info
				alternatives.push(this.send[i][j].plain());
			//Push it
			plain.send.push(alternatives);
		}
		//For each receiving streams
		for (let i=0;i<this.recv.length;++i)
		{
			let alternatives = [];
			//For each alternative
			for (let j=0;j<this.recv[i].length;++j)
				//Add sream info
				alternatives.push(this.recv[i][j].plain());
			//Push it
			plain.recv.push(alternatives);
		}
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
	 * @param {Array<SimulcastStreamInfo>} stream - Stream info of all the alternatives
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
 * @param {Object} plain JSON object
 * @returns {SimulcastInfo} Parsed Simulcast info
 */
SimulcastInfo.expand = function(plain)
{
	//Create new
	const simulcastInfo = new SimulcastInfo();

	//For each sending streams
	for (let i=0;i<plain.send.length;++i)
	{
		let alternatives = [];
		//For each alternative
		for (let j=0;j<plain.send[i].length;++j)
			//Add sream info
			alternatives.push(SimulcastStreamInfo.expand(plain.send[i][j]));
		//Push it
		simulcastInfo.addSimulcastAlternativeStreams(DirectionWay.SEND, alternatives);
	}
	//For each receiving streams
	for (let i=0;i<plain.recv.length;++i)
	{
		let alternatives = [];
		//For each alternative
		for (let j=0;j<plain.recv[i].length;++j)
			//Add sream info
			alternatives.push(SimulcastStreamInfo.expand(plain.recv[i][j]));
		//Push it
		simulcastInfo.addSimulcastAlternativeStreams(DirectionWay.RECV, alternatives);
	}

	//Done
	return simulcastInfo;
};

module.exports = SimulcastInfo;