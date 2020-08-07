var SPREADSHEET_ID = "1-Fj23S2MnBaKeDEMUhSCBbR59Hx3ageNtAk255s222E";
var APPLICATION_SHEET_NAME = "Applicant form responses";
var SUPP_SHEET = "Learning Support Admin";
var LEARNING_SUPPORT_MANAGER_COL = 1;

var MANAGER_APPROVE_COL = 32;
var REJECTION_REASON_COL= 33;
var INVOICE_COL = 34;
var LAST_UPDATE_COL = 35;
var STATUS_COL = 36;
var DATE_OF_APPLICATION_COL = 2;
var EMPLOYEEID_COL = 4;
var EMPLOYEEMAIL_COL = 5;
var EMPLOYEENAME_COL = 3;

var employee_final_email_body = HtmlService.createHtmlOutputFromFile('email-applicant-final.html').getContent();
var employee_final_subject = "Vocational Learning Subsidy: Invoice received";
var learning_support_manager_invoice_body = HtmlService.createHtmlOutputFromFile('email-invoice-provided.html').getContent();
var learning_support_manager_invoice_subject = "Vocational Learning Subsidy: Invoice received";
