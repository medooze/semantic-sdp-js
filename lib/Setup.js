const Enum = require("es6-enum");

const Setup = Enum("ACTIVE","PASSIVE","ACTPASS","INACTIVE");

Setup.byValue = function(setup)
{
	return Setup[setup.toUpperCase()];
};

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