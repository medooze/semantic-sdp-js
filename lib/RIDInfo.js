const DirectionWay		 = require("./DirectionWay");

/** @typedef {import(".").RIDInfoPlain} RIDInfoPlain */
/** @typedef {import(".").RIDInfoLike} RIDInfoLike */

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
	 */
	constructor(id,direction)
	{
		//store properties
   		this.id		= id;
		this.direction	= direction;
		this.formats	= /** @type {number[]} */ ([]);
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
		cloned.setFormats(this.formats);
		cloned.setParams(this.params);
		//return cloned object
		return cloned;
	}


	/**
	 * Return a plain javascript object which can be converted to JSON
	 * @returns {RIDInfoPlain} Plain javascript object
	 */
	plain() {
		var plain = /** @type {RIDInfoPlain} */ ({
			id		: this.id,
			direction	: DirectionWay.toString(this.direction)
		});
		//Add formats
		if (this.formats)
			plain.formats = this.formats;
		//Add params
		for (var [id,param] of this.params.entries())
		{
			//If first
			if (!plain.params) plain.params = {};
			//Add it
			plain.params[id] = param;
		}
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
	 * @returns {Array<Number>}
	 */
	getFormats() {
		return this.formats;
	}

	/**
	 * Set pt formats for rid
	 * @param {Array<Number>} formats
	 */
	setFormats(formats) {
		this.formats = [];
		//Populte
		for (let i=0; i<formats.length; ++i)
			this.formats.push(parseInt(/** @type {any} */ (formats[i])));
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
	 * Add an rid param
	 * @param {String} id
	 * @param {String} param
	 */
	addParam(id,param) {
		this.params.set(id,param);
	}
}

/**
 * Expands a plain JSON object containing an RIDInfo
 * @param {RIDInfoLike} plain JSON object
 * @returns {RIDInfo} Parsed RID info
 */
RIDInfo.expand = function(plain)
{
	//Ensure it is not already a RIDInfo object
	if (plain.constructor.name === "RIDInfo")
		return /** @type {RIDInfo} */ (plain);

	//Otherwise it is a plain object
	plain = /** @type {RIDInfoPlain} */ (plain);

	//Create new
	const ridInfo = new RIDInfo(
		plain.id,
		DirectionWay.byValue(plain.direction)
	);

	//Add params
	for (const [id,param] of Object.entries(plain.params || {}))
		ridInfo.addParam(id,param);

	//Add formats
	if (plain.formats)
		ridInfo.setFormats(plain.formats);

	//Done
	return ridInfo;
};

/**
 * Expands a plain JSON object containing an RIDInfo or a RIDInfo and clone it
 * @param {RIDInfoLike} plain JSON object or RIDInfo
 * @returns {RIDInfo} Cloned RIDInfo
 */
RIDInfo.clone = function(plain)
{
	return plain.constructor.name === "RIDInfo"  
		? /** @type {RIDInfo} */ (plain).clone()
		: RIDInfo.expand(plain);
}

module.exports = RIDInfo;
