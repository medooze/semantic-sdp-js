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

export type MediaType = 'audio'|'video';

export interface SDPInfoParams {
	// ICE info object
	ice?: ICEInfo;
	// DTLS info object
	dtls?: DTLSInfo;
	// Array of Ice candidates
	candidates?: CandidateInfo[];
	// Capabilities for each media type
	capabilities?: {[k: string]: SupportedMedia};
}

export interface RTCPFeedbackInfoPlain {
	id: string;
	params?: string[];
}

export interface SupportedMedia {
	// List of strings with the supported codec names
	codecs: {[id: string]: CodecInfo}|string[];
	// List of strings with the supported codec names
	extensions: string[];
	// Simulcast is enabled
	simulcast?: boolean;
	// Supported RTCP feedback params
	rtcpfbs: RTCPFeedbackInfoPlain[];
	// If rtx is supported for codecs (only needed if passing codec names
	// instead of CodecInfo)
	rtx?: boolean;
}

export type DirectionPlain =|'sendrecv'|'sendonly'|'recvonly'|'inactive';

export interface CodecInfoPlain {
	codec: string;
	type: string;
	rtx?: number;
	params?: {[k: string]: string};
	rtcpfbs: RTCPFeedbackInfoPlain[];
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
	send: SimulcastStreamInfo[][];
	recv: SimulcastStreamInfo[][];
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
export interface TrackEncodingInfoPlain {
	id: string;
	paused: boolean;
	codecs: {[id: string]: CodecInfo};
	params: {[k: string]: string};
}
export interface TrackInfoPlain {
	id: string;
	media: MediaType;
	mediaId?: string;
	ssrcs: number[];
	groups?: SourceGroupInfoPlain[];
	encodings?: TrackEncodingInfoPlain[];
}
export interface SDPInfoPlain {
	version: number;
	streams: StreamInfoPlain[];
	medias: MediaInfoPlain[];
	candidates: CandidateInfoPlain[];
	ice?: ICEInfoPlain;
	dtls?: DTLSInfoPlain;
}

export interface SimulcastStreamInfoPlain {
	id: string;
	paused: boolean;
}
