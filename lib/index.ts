export import SDPInfo = require("./SDPInfo");
export import CandidateInfo = require("./CandidateInfo");
export import CodecInfo = require("./CodecInfo");
export import DTLSInfo = require("./DTLSInfo");
export import CryptoInfo = require("./CryptoInfo");
export import ICEInfo = require("./ICEInfo");
export import MediaInfo = require("./MediaInfo");
export import Setup = require("./Setup");
export import SourceGroupInfo = require("./SourceGroupInfo");
export import SourceInfo = require("./SourceInfo");
export import StreamInfo = require("./StreamInfo");
export import TrackInfo = require("./TrackInfo");
export import RTCPFeedbackInfo = require("./RTCPFeedbackInfo");
export import TrackEncodingInfo = require("./TrackEncodingInfo");
export import Direction = require("./Direction");

// Manually defined types

export type MediaType = 'audio'|'video'|'application';

export interface SDPInfoParams {
	// ICE info object
	ice?: ICEInfo;
	// DTLS info object
	dtls?: DTLSInfo;
	// Array of Ice candidates
	candidates?: CandidateInfo[];
	// Capabilities for each media type
	capabilities?: {[k in MediaType]?: SupportedMedia};

	crypto?: CryptoInfo;
}

export interface RTCPFeedbackInfoPlain {
	id: string;
	params?: string[];
}

export interface SupportedMedia {
	// Map or codecInfo or list of strings with the supported codec names
	codecs: Map<number, CodecInfo> | string[];
	// List of strings with the supported extensions
	extensions: Iterable<string>;
	// Simulcast is enabled
	simulcast?: boolean;
	// Supported RTCP feedback params
	rtcpfbs: RTCPFeedbackInfoPlain[];
	// If rtx is supported for codecs (only needed if passing codec names
	// instead of CodecInfo)
	rtx?: boolean;
	// Data channel is supported
	dataChannel?: DataChannelInfoPlain;
}

export type DirectionPlain =|'sendrecv'|'sendonly'|'recvonly'|'inactive';

export interface CodecInfoPlain {
	codec: string;
	type: string;
	rtx?: number;
	params?: {[k: string]: string};
	rtcpfbs?: RTCPFeedbackInfoPlain[];
	channels?: number;
}
export interface StreamInfoPlain {
	id: string;
	tracks: TrackInfoPlain[];
}
export interface RIDInfoPlain {
	id: string;
	direction: DirectionPlain;
	formats: number[];
	params: {[k: string]: string};
}
export interface SimulcastInfoPlain {
	send: SimulcastStreamInfoPlain[][];
	recv: SimulcastStreamInfoPlain[][];
}
export interface MediaInfoPlain {
	id: string;
	type: MediaType;
	direction: DirectionPlain;
	bitrate?: number;
	codecs: CodecInfoPlain[];
	extensions?: {[extID: number]: string};
	rids?: RIDInfoPlain[];
	simulcast?: SimulcastInfoPlain;
	dataChannel?: DataChannelInfoPlain;
	control?: string;
}
export interface CandidateInfoPlain {
	foundation: string;
	componentId: number;
	transport: string;
	priority: number;
	address: string;
	port: number;
	type: string;
	relAddr?: string;
	relPort?: string;
}
export interface SourceGroupInfoPlain {
	semantics: string;
	ssrcs: number[];
}
export interface ICEInfoPlain {
	ufrag: string;
	pwd: string;
	lite?: boolean;
	endOfCandidates?: boolean;
}
export interface DTLSInfoPlain {
	setup: string;
	hash: string;
	fingerprint: string;
}
export interface CryptoInfoPlain {
	tag?: number;
	suite?: string;
	keyParams?: string;
	sessionParams?: string;
}
export interface TrackEncodingInfoPlain {
	id: string;
	paused: boolean;
	codecs: {[id: string]: CodecInfoPlain};
	params: {[k: string]: string};
}
export interface TrackInfoPlain {
	id: string;
	media: MediaType;
	mediaId?: string;
	ssrcs: number[];
	groups?: SourceGroupInfoPlain[];
	encodings?: TrackEncodingInfoPlain[][];
}
export interface SDPInfoPlain {
	version: number;
	streams: StreamInfoPlain[];
	medias: MediaInfoPlain[];
	candidates: CandidateInfoPlain[];
	crypto?: CryptoInfoPlain;
	ice?: ICEInfoPlain;
	dtls?: DTLSInfoPlain;
	extmapAllowMixedNotSupported?: boolean;
}

export interface SimulcastStreamInfoPlain {
	id: string;
	paused: boolean;
}

export interface DataChannelInfoPlain {
	port: number;
	maxMessageSize: number;
}

export interface SourceInfoPlain {
	ssrc: number;
	cname: string;
	streamId: string;
	trackId: string;
}
