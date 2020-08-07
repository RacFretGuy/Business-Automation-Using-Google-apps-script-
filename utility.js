function sendEmail(body,subject,to,opt_param1, opt_param2, opt_param3, opt_param4) 
{
  try
  {  
    var message = body;
    
    if(opt_param4 != null)
      message = Utilities.formatString(body,opt_param1, opt_param2, opt_param3, opt_param4);
    else if(opt_param3 != null)
      message = Utilities.formatString(body,opt_param1, opt_param2, opt_param3);    
    else if(opt_param2 != null)
      message = Utilities.formatString(body,opt_param1, opt_param2);
    else if(opt_param1 != null)
      message = Utilities.formatString(body,opt_param1);
    
    GmailApp.sendEmail(to, subject, message, {htmlBody: message, name:"Learning Support Team", replyTo:"PPDT@johnlewis.co.uk", noReply: true}); 
  }
  catch(e) { Logger.log(e); }
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function sendEmailUsingReplace(body,subject,to,name, empid, date_of_application, invoice, lsAdminEmail) 
{
  try
  {  
    var message = body;
    
    if(name != null)
      message = message.replaceAll("{{Name [Column C] }}", name);
    if(empid != null)
      message = message.replaceAll("{{Employee Number [Column D] }}", empid);    
    if(date_of_application != null)
      message = message.replaceAll("{{Date of Application [Column B] }}", date_of_application);    
    if(invoice != null)
      message = message.replaceAll("{{Please upload your invoice here [Column AH] }}", invoice);    
    if(lsAdminEmail != null)
      message = message.replaceAll("{{lsAdminEmail}}", invoice);    
    
    GmailApp.sendEmail(to, subject, message, {htmlBody: message, name:"Learning Support Team", replyTo:lsAdminEmail, noReply: true}); 
  }
  catch(e) { Logger.log(e); }
}

function printFormResponse(itemResponses) {
  try{  
    
    for (var j = 0; j < itemResponses.length; j++)
    {          
      var itemResponse = itemResponses[j];
      Logger.log('Last response of the form "%s" was "%s"',itemResponse.getItem().getTitle(),itemResponse.getResponse());
    }
  }
  catch(e) { 
    Logger.log(e); 
  }
}
