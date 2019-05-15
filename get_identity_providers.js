'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _package = require('../../../package.json');

var _express = require('express');

var _fs = require('fs');

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  var dir = '../mock/img_base64/';
  var type = '.txt';

  api.post('/', function (req, res) {
    var json = [{
      "id": "F0804491-368F-41D0-8253-6A4AD5600863",
      "provider": "kbank",
      "industry_code": "001",
      "company_code": "004",
      "application_code": "k_plus",
      "application_name": "K PLUS",
      "description": "Kasikorn Bank"
    }, {
      "id": "c9dac0c8-d4b9-4df2-9bc2-56fc9426b38c",
      "provider": "scb",
      "industry_code": "001",
      "company_code": "014",
      "application_code": "scb_easy",
      "application_name": "SCB EASY",
      "description": "Siam Commercial Bank"
    }, {
      "id": "477A14A5-44A0-43D4-B544-2A31E6C624A4",
      "provider": "bay",
      "industry_code": "001",
      "company_code": "025",
      "application_code": "kma",
      "application_name": "KMA",
      "description": "Bank of Ayudhya (Krungsri)"
    }, {
      "id": "6777104E-F3A4-4863-AE46-D01ABE96C930",
      "provider": "bbl",
      "industry_code": "001",
      "company_code": "002",
      "application_code": "bualuang_m",
      "application_name": "Bualuang M",
      "description": "Bangkok Bank"
    }, {
      "id": "1B819430-B8F8-4DAA-9EF2-EA8A233E3082",
      "provider": "ktb",
      "industry_code": "001",
      "company_code": "006",
      "application_code": "next",
      "application_name": "NEXT",
      "description": "Krung Thai Bank"
    }, {
      "id": "B320E9CD-9A1F-4355-BE3D-79D269EE961F",
      "provider": "uob",
      "industry_code": "001",
      "company_code": "024",
      "application_code": "uob_thailand",
      "application_name": "UOB Thailand",
      "description": "UOB Bank"
    }, {
      "id": "77AA9DE9-B7B4-4DEC-A654-EF07CFC29976",
      "provider": "tmb",
      "industry_code": "001",
      "company_code": "011",
      "application_code": "tmb",
      "application_name": "TMB Touch",
      "description": "TMB"
    }];

    for (var i = 0; i < json.length; i++) {
      try {
        var file = dir + json[i].application_code + type;
        var logo = _fs.fs.readFileSync(file, 'utf8');
        console.log(logo);
      } catch (e) {
        console.error(e);
      }
    }

    res.json(json);
  });

  return api;
};
//# sourceMappingURL=get_identity_providers.js.map