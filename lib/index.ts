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
export import RIDInfo = require("./RIDInfo");
export import SimulcastInfo = require("./SimulcastInfo");
export import SimulcastStreamInfo = require("./SimulcastStreamInfo");
export import DataChannelInfo = require("./DataChannelInfo");
export import Direction = require("./Direction");

// Manually defined types

export type TrackType = 'audio'|'video';

export type MediaType = 'audio'|'video'|'application';

export type Capabilities = { [k in MediaType]?: SupportedMedia };

export type SDPParams = { [k: string]: string };

export interface SDPInfoParams {
	/** ICE info object */
	ice?: ICEInfoLike;
	/** DTLS info object */
	dtls?: DTLSInfoLike;
	/** Array of ICE candidates */
	candidates?: CandidateInfoLike[];
	/** Capabilities for each media type */
	capabilities?: Capabilities;

	crypto?: CryptoInfoLike;
}

export interface RTCPFeedbackInfoPlain {
	id: string;
	params?: string[];
}

export interface SupportedMedia {
	/** Map or codecInfo or list of strings with the supported codec names */
	codecs?: Map<number, CodecInfo> | string[];
	/** List of strings with the supported extension URIs */
	extensions?: Iterable<string>;
	/** Simulcast is enabled */
	simulcast?: boolean;
	/** Supported RTCP feedback params (only used if passing codec names instead of CodecInfo) */
	rtcpfbs?: RTCPFeedbackInfoPlain[];
	/** If rtx is supported for codecs (only used if passing codec names instead of CodecInfo) */
	rtx?: boolean;
	/** Data channel is supported */
	dataChannel?: DataChannelInfoPlain;
}

export type SetupPlain = 'active'|'passive'|'actpass'|'inactive';
export type DirectionWayPlain = 'send'|'recv';
export type DirectionPlain = 'sendrecv'|'sendonly'|'recvonly'|'inactive';

export interface CodecInfoPlain {
	codec: string;
	type: number;
	rtx?: number;
	params?: SDPParams;
	rtcpfbs?: RTCPFeedbackInfoPlain[];
	channels?: number;
}
export interface StreamInfoPlain {
	id: string;
	tracks: TrackInfoPlain[];
}
export interface RIDInfoPlain {
	id: string;
	direction: DirectionWayPlain;
	formats: number[];
	params: SDPParams;
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
	relPort?: number;
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
	setup?: SetupPlain;
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
	params: SDPParams;
}
export interface TrackInfoPlain {
	id: string;
	media: TrackType;
	mediaId?: string;
	ssrcs?: number[];
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
	maxMessageSize?: number;
}

export interface SourceInfoPlain {
	ssrc: number;
	cname: string;
	streamId: string;
	trackId: string;
}

// TypeLike is an alias for "Type | TypePlain"

export type RTCPFeedbackInfoLike = RTCPFeedbackInfo | RTCPFeedbackInfoPlain;
export type CodecInfoLike = CodecInfo | CodecInfoPlain;
export type StreamInfoLike = StreamInfo | StreamInfoPlain;
export type RIDInfoLike = RIDInfo | RIDInfoPlain;
export type SimulcastInfoLike = SimulcastInfo | SimulcastInfoPlain;
export type MediaInfoLike = MediaInfo | MediaInfoPlain;
export type CandidateInfoLike = CandidateInfo | CandidateInfoPlain;
export type SourceGroupInfoLike = SourceGroupInfo | SourceGroupInfoPlain;
export type ICEInfoLike = ICEInfo | ICEInfoPlain;
export type DTLSInfoLike = DTLSInfo | DTLSInfoPlain;
export type CryptoInfoLike = CryptoInfo | CryptoInfoPlain;
export type TrackEncodingInfoLike = TrackEncodingInfo | TrackEncodingInfoPlain;
export type TrackInfoLike = TrackInfo | TrackInfoPlain;
export type SDPInfoLike = SDPInfo | SDPInfoPlain;
export type SimulcastStreamInfoLike = SimulcastStreamInfo | SimulcastStreamInfoPlain;
export type DataChannelInfoLike = DataChannelInfo | DataChannelInfoPlain;
export type SourceInfoLike = SourceInfo | SourceInfoPlain;
