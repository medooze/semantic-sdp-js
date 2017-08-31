const DirectionWay		 = require("./DirectionWay");

/**
 * RID info
 * @namespace
 */
class RIDInfo
{
	/**
	 * @constructor
	 * @alias DTLSInfo
	 * @param {String} id		- rid value
	 * @param {DirectionWay} direction	- direction
	 * @returns {RIDInfo}
	 */
	constructor(id,direction)
	{
		//store properties
   		this.id		= id;
		this.direction	= direction;
		this.formats	= [];
		this.params	= new Map();
	}
	
	/**
	 * Create a clone of this RID info object
	 * @returns {RIDInfo}
	 */
	clone() {
		//Clone
		var cloned = new RIDInfo(this.id,this.direction);
		//Add formats and formats
		cloned.setFormat(this.formats);
		cloned.setParams(this.params);
		//return cloned object
		return cloned;
	}
	
	
	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {Object} Plain javascript object
	 */
	plain() {
		var plain =  {
			id		: this.id,
			direction	: DirectionWay.toString(this.direction),
			formats		: this.formats,
			params		: {}
		};
		//Add params
		for (var [id,param] of this.params.entries())
			//Add it
			plain.params[id] = param;
		//Return plain object
		return plain;
	}
	
	/**
	 * Get the rid id value
	 * @returns {String}
	 */
	getId() {
		return this.id;
	}

	/**
	 * Get rid direction
	 * @returns {DirectionWay}
	 */
	getDirection() {
		return this.direction;
	}

	/**
	 * Set direction setup
	 * @param {DirectionWay} direction
	 */
	setDirection(direction) {
		this.direction = direction;
	}
	
	/**
	 * Get pt formats for rid
	 * @returns {Array.Number}
	 */
	getFormats() {
		return this.formats;
	}

	/**
	 * Set pt formats for rid
	 * @param {Array} formats
	 */
	setFormats(formats) {
		this.formats = [];
		//Populte
		for (let i=0; i<formats.length; ++i)
			this.formats.push(parseInt(formats[i]));
	}
	
	/**
	 * Get the rid params
	 * @returns {Map<String,String>} The params map
	 */
	getParams() {
		return this.params;
	}

	/**
	 * Set the rid params
	 * @param {Map<String,String>} params - rid params map
	 */
	setParams(params) {
		this.params = new Map(params);
	}
	
	/**
	 * Get rid direction
	 * @returns {DirectionWay}
	 */
	getDirection() {
		return this.direction;
	}

	/**
	 * Set direction setup
	 * @param {DirectionWay} direction
	 */
	setDirection(direction) {
		this.direction = direction;
	}
	
	
}


module.exports = RIDInfo;