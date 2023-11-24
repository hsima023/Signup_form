function validateInputs() {
    //declaration of variables
    var SubmitForm;
    var FormErrors;

    //Initially set SubmitForm to true. 
    SubmitForm = true;

    //Retrieve variables to be validated and sanitized
    //Assume they are dangerous for now
    var fullname = new String(document.MyForm.fullname.value);
    var email = new String(document.MyForm.email.value);
    var phone = new String(document.MyForm.phone.value);

    //Check that the user inputs are not blank
    //JavaScript logical operator for OR : ||
    if (fullname.length < 1 || email.length < 1 || phone.length < 1 || phone.length < 10) {
        FormErrors = "All fields are mandatory. Please complete the form.";
        SubmitForm = false;
    } else {
        //Set up a filter for the pattern of an email
        //Learn more about referencing characters:          //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes

        var filter_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        var filter_name = /^[a-z ,.'-]+$/i;
        var filter_phone = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i;

        //Use test() method to check user email against the filter
        //test() method: https://www.w3schools.com/jsref/jsref_regexp_test.asp     
        if (!filter_name.test(fullname)) {
            FormErrors = "Your form contains invalid NAME entries. Please correct your form before submitting";
            SubmitForm = false;
        }
        else if (!filter_email.test(email)) {
            FormErrors = "Your form contains invalid EMAIL entries. Please correct your form before submitting";
            SubmitForm = false;
        }

        else if (!filter_phone.test(phone)) {
            FormErrors = "Your form contains invalid PHONE entries. Please correct your form before submitting";
            SubmitForm = false;
        }

    }

    if (SubmitForm == false) {
        //The form cannot be submitted.
        alert(FormErrors);
        return false;
    } else {
        //SANITIZE user inputs by allowing only [a-z 0-9 _ - . @] 
        //strip forbidden characters
        fullname = fullname.replace(/[^a-z0-9\s\-]/gim, "");
        fullname = fullname.trim();
        email = email.replace(/[^a-z0-9_@.-]/gim, "");
        email = email.trim();
        phone = phone.replace(/[^a-z0-9_@.-]/gim, "");
        phone = phone.trim();

        //ready to submit
        document.MyForm.submit();
    }
}