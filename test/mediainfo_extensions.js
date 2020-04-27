const assert = require('assert');
const SemanticSDP = require('../index');

const MediaInfo = SemanticSDP.MediaInfo;

const capabilities = {
  codecs: ['vp9'],
  rtx: true,
  simulcast: true,
  rtcpfbs: [
    { id: 'goog-remb' },
    { id: 'ccm', params: ['fir'] },
    { id: 'nack' },
    { id: 'nack', params: ['pli'] },
  ],
  extensions: [
    'urn:3gpp:video-orientation',
    'http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01',
    'urn:ietf:params:rtp-hdrext:sdes:mid',
    'urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id',
    'urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id',
    'http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time',
    'test:7',
    'test:8',
    'test:9',
    'test:10',
    'test:11',
    'test:12',
    'test:13',
    'test:14',
    'test:15',
  ],
};

const media = MediaInfo.create('video', capabilities);

const extensionIds = Array.from(media.extensions.keys());

assert(!extensionIds.includes(0), 'Extension id MUST NOT be 0');
assert(!extensionIds.includes(15), 'Extension id MUST NOT be 15');
assert(extensionIds.length === 15, `Expected 15 extensions in total, found ${extensionIds.length}`)