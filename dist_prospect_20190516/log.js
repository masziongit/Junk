'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var accessLogStream = _fs2.default.createWriteStream(_path2.default.join(__dirname, 'access.log'), { flags: 'a' });
//# sourceMappingURL=log.js.map