
class TrackInfo 
{
	constructor(media,id) {
		this.media	= media;
		this.id		= id;
		this.ssrcs	= []; 
		this.groups	= [];
	}
	
	getMedia() {
		return this.media;
	}

	getId() {
		return this.id;
	}

	addSSRC(ssrc) {
		this.ssrcs.push(ssrc);
	}

	getSSRCs() {
		return this.ssrcs;
	}
	
	addSourceGroup(group) {
		this.groups.push(group);
	}
	
	getSourceGroup(schematics) {
		for (let i in this.groups)
		{
			let group = this.groups[i];
			if (group.getSemantics().toLowerCase()===schematics.toLowerCase())
				return group;
		}
		return null;
	}
	
	getSourceGroups() {
		return this.groups;
	}

	hasSourceGroup(schematics) {
		for (let i in this.groups)
		{
			let group = this.groups[i];
			if (group.getSemantics().toLowerCase()===schematics.toLowerCase())
				return true;
		}
		return false;
	}
	
}

module.exports = TrackInfo;