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
		case Setup.ACTIVE: 
			return "passive";
		case Setup.ACTIVE: 
			return "actpass";
		case Setup.ACTIVE: 
			return "inactive";
	}
};

module.exports = Setup;