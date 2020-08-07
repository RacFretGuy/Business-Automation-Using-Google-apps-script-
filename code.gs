function onFormSubmit(e) {
  
  try {
    
    var formResponse = e.response;
    var itemResponses = formResponse.getItemResponses();
    var returnObj = formResponseToObject(itemResponses);
    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(APPLICATION_SHEET_NAME);
    var now = new Date();
    var row = findEmpRowById(returnObj.employee_number);
    var supplier_sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SUPP_SHEET);
    var learning_support_manager_emails = supplier_sheet.getRange(2, LEARNING_SUPPORT_MANAGER_COL, 2).getValues(); 

    //update last update value in Applicant form responses Sheet
    sheet.getRange(row, LAST_UPDATE_COL).setValue(now);
    
    //The status value is set to Invoice Added
    sheet.getRange(row, STATUS_COL).setValue('Invoice Added');
    
    var invoice_URL = "https://drive.google.com/open?id=" + returnObj.invoice;
    
    //Please upload your invoice here is copied to the Applicant form responses sheet
    sheet.getRange(row, INVOICE_COL).setValue(invoice_URL);

    //The Applicant final email is sent to the applicant
    sendEmailUsingReplace(employee_final_email_body, employee_final_subject, 
                          sheet.getRange(row, EMPLOYEEMAIL_COL).getValue(),
                          null, null, null, null,learning_support_manager_emails);
    //The Invoice provided email is sent to the Learning Support Managers
    sendEmailUsingReplace(learning_support_manager_invoice_body, learning_support_manager_invoice_subject, 
                          learning_support_manager_emails,
                          sheet.getRange(row, EMPLOYEENAME_COL).getValue(),
                          null,
                          sheet.getRange(row, DATE_OF_APPLICATION_COL).getValue(),
                          invoice_URL, learning_support_manager_emails);

  }catch(e) {
    Logger.log(e);
  }
}

function formResponseToObject(itemResponses) {

  try{  
    
    var returnObj = new Object();
    
    for (var j = 0; j < itemResponses.length; j++)
    {          
      var itemResponse = itemResponses[j];
      //Logger.log('Last response of the form "%s" was "%s"',itemResponse.getItem().getTitle(),itemResponse.getResponse());
      
      switch (itemResponses[j].getItem().getTitle()) 
      {
        case "Name":
          returnObj.application_name = itemResponses[j].getResponse();
          break;
        case "Employee number" :
          returnObj.employee_number = itemResponses[j].getResponse();
          break;
        case "Your Name":
          returnObj.employee_name=itemResponses[j].getResponse();
          break;
        case "Work email":
          returnObj.employee_email = itemResponses[j].getResponse();
          break;
        case "Please upload your invoice here":  
          returnObj.invoice = itemResponses[j].getResponse();
          break;
        default :
          break;
      }
     
    }
    return returnObj;
  }
  catch(e) { 
    Logger.log(e); 
  }
}  


function findEmpRowById(empId) {

  var row = 0;
  
  try {
    
    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(APPLICATION_SHEET_NAME);
    var empIDValues = sheet.getRange(2, EMPLOYEEID_COL, sheet.getDataRange().getLastRow() - 1).getValues();
    
    for(var i = empIDValues.length-1; i >=0; i--)   {
      if(empId == empIDValues[i]) {
        row = i+2;
        break;
      }
    }
    
  }catch(e) {
  }
  
  return row;
}
