const Enum = require("./Enum");
/**
 * Enum for Setup values.
 * @readonly
 * @enum {number}
 */
const Setup = Enum("ACTIVE","PASSIVE","ACTPASS","INACTIVE");

/**
 * Get Setup by name
 * @memberOf Setup
 * @param {string} setup
 * @returns {Setup}
 */
Setup.byValue = function(setup)
{
	return Setup[setup.toUpperCase()];
};

/**
 * Get Setup name
 * @memberOf Setup
 * @param {Setup} setup
 * @returns {String}
 */
Setup.toString = function(setup)
{
	switch(setup)
	{
		case Setup.ACTIVE: 
			return "active";
		case Setup.PASSIVE: 
			return "passive";
		case Setup.ACTPASS: 
			return "actpass";
		case Setup.INACTIVE: 
			return "inactive";
	}
};

module.exports = Setup;