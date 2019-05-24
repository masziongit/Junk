"use strict";

var PROSPECT_PROFILE = "  CREATE TABLE \"PROSPECT_PROFILE\" \n   (\t\n    \"PROSPECT_ID\" NUMBER(*,0) NOT NULL ENABLE, \n\t\"CRM_ID\" NVARCHAR2(30) DEFAULT NULL, \n\t\"CITIZEN_ID\" NVARCHAR2(20) DEFAULT NULL, \n\t\"CID_ISSUE_DATE\" DATE DEFAULT NULL, \n\t\"CID_EXPIRY_DATE\" DATE DEFAULT NULL, \n\t\"PASSPORT_NO\" NVARCHAR2(20) DEFAULT NULL, \n\t\"PP_ISSUE_DATE\" DATE DEFAULT NULL, \n\t\"PP_EXPIRY_DATE\" DATE DEFAULT NULL, \n\t\"TITLE_TH\" NVARCHAR2(40) DEFAULT NULL, \n\t\"FIRSTNAME_TH\" NVARCHAR2(255) DEFAULT NULL, \n\t\"LASTNAME_TH\" NVARCHAR2(255) DEFAULT NULL, \n\t\"TITLE_EN\" NVARCHAR2(40) DEFAULT NULL, \n\t\"FIRSTNAME_EN\" NVARCHAR2(35) DEFAULT NULL, \n\t\"LASTNAME_EN\" NVARCHAR2(35) DEFAULT NULL, \n\t\"BIRTH_DATE\" DATE DEFAULT NULL, \n\t\"BIRTH_PLACE\" CHAR(50 BYTE), \n\t\"REG_ADDR_NMBR\" NVARCHAR2(35) DEFAULT NULL, \n\t\"REG_ADDR_MOO\" NVARCHAR2(35) DEFAULT NULL, \n\t\"REG_ADDR_BUILDING\" NVARCHAR2(35) DEFAULT NULL, \n\t\"REG_ADDR_SOI\" NVARCHAR2(35) DEFAULT NULL, \n\t\"REG_ADDR_ROAD\" NVARCHAR2(35) DEFAULT NULL, \n\t\"REG_DISTRICT\" NVARCHAR2(40) DEFAULT NULL, \n\t\"REG_SUBDISTRICT\" NVARCHAR2(40) DEFAULT NULL, \n\t\"REG_COUNTRY\" NVARCHAR2(35) DEFAULT NULL, \n\t\"REG_PROVINCE\" NVARCHAR2(20) DEFAULT NULL, \n\t\"REG_POSTAL_CD\" NVARCHAR2(11) DEFAULT NULL, \n\t\"MOBILE_NO\" NVARCHAR2(18) DEFAULT NULL, \n\t\"GENDER\" NVARCHAR2(10) DEFAULT NULL, \n\t\"MARITAL_STATUS\" NVARCHAR2(10) DEFAULT NULL, \n\t\"NATIONALITY\" NVARCHAR2(30) DEFAULT NULL, \n\t\"OTHER_NATIONALITY\" NVARCHAR2(30) DEFAULT NULL, \n\t\"EDUCATION\" NVARCHAR2(20) DEFAULT NULL, \n\t\"OCCUPATION\" NVARCHAR2(20) DEFAULT NULL, \n\t\"INCOME\" NVARCHAR2(20) DEFAULT NULL, \n\t\"COUNTRY_INCOME\" NVARCHAR2(20) DEFAULT NULL, \n\t\"SOURCE_INCOME\" NVARCHAR2(20) DEFAULT NULL, \n\t\"PURPOSE_FOR_OPEN_ACCOUNT\" NVARCHAR2(10) DEFAULT NULL, \n\t\"PURPOSE_FOR_OTHER\" NVARCHAR2(255) DEFAULT NULL, \n\t\"PERS_PH_NBR\" NVARCHAR2(18) DEFAULT NULL, \n\t\"PERS_PH_EXT\" NVARCHAR2(18) DEFAULT NULL, \n\t\"OFFICE_PH_NBR\" NVARCHAR2(18) DEFAULT NULL, \n\t\"OFFICE_PH_EXT\" NVARCHAR2(18) DEFAULT NULL, \n\t\"CON_ADDR_NMBR\" NVARCHAR2(35) DEFAULT NULL, \n\t\"CON_ADDR_MOO\" NVARCHAR2(35) DEFAULT NULL, \n\t\"CON_ADDR_BUILDING\" NVARCHAR2(35) DEFAULT NULL, \n\t\"CON_ADDR_SOI\" NVARCHAR2(35) DEFAULT NULL, \n\t\"CON_ADDR_ROAD\" NVARCHAR2(35) DEFAULT NULL, \n\t\"CON_DISTRICT\" NVARCHAR2(40) DEFAULT NULL, \n\t\"CON_SUBDISTRICT\" NVARCHAR2(40) DEFAULT NULL, \n\t\"CON_COUNTRY\" NVARCHAR2(35) DEFAULT NULL, \n\t\"CON_PROVINCE\" NVARCHAR2(20) DEFAULT NULL, \n\t\"CON_POSTAL_CD\" NVARCHAR2(11) DEFAULT NULL, \n\t\"COMPANY_NAME\" NVARCHAR2(256) DEFAULT NULL, \n\t\"OFF_ADDR_NMBR\" NVARCHAR2(35) DEFAULT NULL, \n\t\"OFF_ADDR_MOO\" NVARCHAR2(35) DEFAULT NULL, \n\t\"OFF_ADDR_BUILDING\" NVARCHAR2(35) DEFAULT NULL, \n\t\"OFF_ADDR_SOI\" NVARCHAR2(35) DEFAULT NULL, \n\t\"OFF_ADDR_ROAD\" NVARCHAR2(35) DEFAULT NULL, \n\t\"OFF_DISTRICT\" NVARCHAR2(40) DEFAULT NULL, \n\t\"OFF_SUBDISTRICT\" NVARCHAR2(40) DEFAULT NULL, \n\t\"OFF_COUNTRY\" NVARCHAR2(35) DEFAULT NULL, \n\t\"OFF_PROVINCE\" NVARCHAR2(20) DEFAULT NULL, \n\t\"OFF_POSTAL_CD\" NVARCHAR2(11) DEFAULT NULL, \n\t\"CURRENT_SAME_REGISTERED_FLAG\" CHAR(1 BYTE), \n\t\"OFFICE_SAME_REGISTERED_FLAG\" CHAR(1 BYTE), \n\t\"FATCA_ANS\" NVARCHAR2(9) DEFAULT NULL, \n\t\"LASER_NUMBER\" NVARCHAR2(14) DEFAULT NULL, \n\t\"DOPA_FLAG\" NUMBER(4,0) DEFAULT NULL, \n\t\"RISKLEVEL\" NUMBER(10,0) DEFAULT NULL, \n\t\"RISK_CALCULATION_DATE\" DATE DEFAULT NULL, \n\t\"SWF_STATUS\" NVARCHAR2(35) DEFAULT NULL, \n\t\"EMAIL\" NVARCHAR2(70) DEFAULT NULL, \n\t\"OCCUPATION_SPECIFY\" NVARCHAR2(50) DEFAULT NULL, \n\t\"FLOW_STATUS\" NVARCHAR2(30) DEFAULT NULL, \n\t\"E_CONSENT_FLAG\" NUMBER(1,0) DEFAULT NULL, \n\t\"EKYC_CONSENT_FLAG\" NUMBER(1,0) DEFAULT NULL, \n\t\"EKYC_CONSENT_DATE\" DATE DEFAULT NULL, \n\t\"CONFIDENCE_SCORE\" NUMBER(10,2) DEFAULT NULL, \n\t\"PROSPECT_STATUS\" NVARCHAR2(30) NOT NULL ENABLE, \n\t\"CREATE_DATE\" TIMESTAMP (6) NOT NULL ENABLE, \n\t\"UPDATE_DATE\" TIMESTAMP (6) NOT NULL ENABLE, \n\t\"APP_ID\" NVARCHAR2(2) NOT NULL ENABLE, \n\t\"CHANNEL\" NVARCHAR2(10) DEFAULT NULL, \n\t CONSTRAINT \"PROSPECT_PROFILE_PK\" PRIMARY KEY (\"PROSPECT_ID\")\n )";

var PROSPECT_IDP_LOG = "CREATE TABLE  PROSPECT_IDP_LOG ( \n        PROSPECT_ID INTEGER NOT NULL , \n        REFERENCE_ID VARCHAR(40)  NOT NULL, \n        IDENTIFIER VARCHAR(40)  NOT NULL, \n        NAMESPACE VARCHAR(40)  NOT NULL, \n        STATUS VARCHAR(20)  NOT NULL, \n        REQUEST_DATE DATE  NOT NULL, \n        EXP_DATE DATE  NOT NULL  ,\n        CREATE_DATE  TIMESTAMP (6) NOT NULL ,\n        UPDATE_DATE  TIMESTAMP (6) NOT NULL \n    )";

module.exports.sql = [PROSPECT_PROFILE, PROSPECT_IDP_LOG];
//# sourceMappingURL=script_db.js.map