const Validate = (values) => {
    let errors = {};
    if (!values.firstname) {
      errors.firstname = "Firstname is Required.";
    }
  
    if (!values.lastname) {
      errors.lastname = "Lastname is Required.";
    }
    if (!values.email) {
      errors.email = "Email is Required.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid.";
    }
    if (!values.password) {
      errors.password = "Password is Required.";
    } else if (values.password.length < 5) {
      errors.password = "Password must be more than five characters.";
    }
    if (!values.confirmpassword) {
      errors.confirmpassword = "Confirmpassword is Required.";
    }
     else if (values.confirmpassword.length !== values.password.length) {
      errors.confirmpassword = "Password do not match.";
    }
    if (!values.phonenumber) {
      errors.phonenumber = "Phonenumber is Required.";
    } else if (values.phonenumber.length < 5) {
      errors.phonenumber = "Enter ten digit phonenumber.";
    }
  
    if (!values.age) {
      errors.age = "Age limit should be 18 to 100.";
    }
    // else if (values.age.length<=18) {
    //   errors.age = "Age limit should be 18 to 100.";
    // }
    if (!values.gender) {
      errors.gender = "Select Gender Option.";
    }
    if (!values.upi) {
      errors.upi = "Enter valid ID.";
    }
    return errors;
  };
  
  export default Validate;
  