require('@testing-library/jest-dom');
console.log('OKAY jest.setup.cjs loaded');

const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
