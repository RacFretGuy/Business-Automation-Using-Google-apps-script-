function testEmail() {
    //The Applicant final email is sent to the applicant
    sendEmailUsingReplace(employee_final_email_body, employee_final_subject, 
                          "rachitagarwal80@gmail.com",
                          null, null,null,null);

    //The Invoice provided email is sent to the Learning Support Managers
    sendEmailUsingReplace(learning_support_manager_invoice_body, learning_support_manager_invoice_subject, 
                          "rachitagarwal80@gmail.com",
                          "rachit agarwal",
                          null,
                          "5-10-2019",
                          "https://google.com");

}
