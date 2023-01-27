import React from "react";
import "./Form.css";
import { useState } from "react";
import Validate from "./Validate";

const Form = () => {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    phonenumber: "",
    age: "",
    gender: "",
    upi:"",
    imageLink:"",
  
  });
  // Error
  const [errors, setErrors] = useState({});
  console.log(errors);
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
// submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    setErrors(Validate(values));
    
    var users =JSON.parse(localStorage.getItem('users') || "[]" )
  users.push(values)
  localStorage.setItem('users', JSON.stringify(users));
  };
// page
  const [page, setPage] = useState(1);
  const pageDisplay = (index) => {
    setPage(index);
  };
  const [pay, setPay] = useState();
  // Base64
  const [image, setImage] = useState("");
  const convert2base64 = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
    console.log(reader);

    reader.onloadend = () => {
      setImage(reader.result.toString());
      console.log(reader.result.toString());
     
    };

    reader.readAsDataURL(file);
  };
  // Local storage

    // localStorage.setItem('lists',values);
    // var lists=[]
  
  // local storage

  // this will shows in array
  // var users=[]
  // users.push(values)
  // localStorage.setItem('users', JSON.stringify(values));
  return (
    <div className="container">
      <div className="form-valid">
        <div className="heading">
          <h1>
            Sign Up <br /> <label>Let's create your account.</label>
          </h1>
        </div>
        {/* Content Button */}
        <div className="head-btn">
          <button
            className="active"
            onClick={() => {
              pageDisplay(1);
            }}
          >
            ACCOUNT
          </button>
          <button
            className="active1"
            onClick={() => {
              pageDisplay(2);
              
            }}
          >
            PERSONAL INFO
          </button>
          <button
            className="active2"
            onClick={() => {
              pageDisplay(3);
            }}
          >
            PAYMENT DETAILS
          </button>
        </div>

        <div className="formlist" onSubmit={handleSubmit}>
          {/* Account info */}
          <div className={page === 1 ? "form1 active" : "content"}>
            <h4>Enter your details below.</h4>
            <form className="form-box">
              <div className="user">
                <div className="pwd">
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={values.firstname}
                    className="form-controling"
                    onChange={handleChange}
                  />
                  {errors && values.firstname.length <= 0 ? (
                    <p className="error">{errors.firstname}</p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="pwd">
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={values.lastname}
                    className="form-controling"
                    onChange={handleChange}
                  />
                  {errors && values.lastname.length <= 0 ? (
                    <p className="error">{errors.lastname}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/* {errors.firstname && (
                <p className="error">{errors.firstname}</p>
              ) } */}

              <div className="em">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors && values.email.length <= 0 ? (
                  <p className="error">{errors.email}</p>
                ) : (
                  ""
                )}
                {/* {errors.email && <p className="error">{errors.email}</p>} */}
              </div>

              <div className="user">
                <div className="pwd">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    // value={values.password}
                    className="form-controling"
                    onChange={handleChange}
                  />
                  {/* {errors.password && (
                    <p className="error">{errors.password}</p>
                  )} */}
                  {errors && values.password.length <= 5? (
                    <p className="error">{errors.password}</p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="pwd">
                <input
                    type="password"
                    name="confirmpassword"
                    placeholder="confirmPassword"
                    // value={values.cpassword}
                    className="form-controling"
                    onChange={handleChange}
                  />
                  {/* {errors.cpassword && (
                    <p className="error">{errors.cpassword}</p>
                  )} */}
                 

                  {/* {errors.cpassword && <p className="error">{errors.cpassword}</p>} */}
                  {errors && values.confirmpassword.length !== values.password.length ? (
                    <p className="error">{errors.confirmpassword}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              
              <div className="ph">
                <input
                  type="number"
                  name="phonenumber"
                  placeholder="Phone Number"
                  value={values.phonenumber}
                  onChange={handleChange}
                />
                {/* {errors && values.phonenumber.length <= 0 ? (
                  <p className="error">{errors.phonenumber}</p>
                ) : (
                  ""
                )} */}
                {errors.phonenumber && (
                  <p className="error">{errors.phonenumber}</p>
                )}
              </div>
              <div className="footer">
                <button
                  className="btn-submit"
                  onClick={() => {
                    if (Object.keys(errors).length === 3) {
                      setPage((pageDisplay) => pageDisplay + 1);
                    }
                  }}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
          {/* Personal Info */}
          <div className={page === 2 ? "form2" : "content"}>
            <h4>Enter your details below.</h4>
            <form className="form-box">
              <div className="image2">
                    <label htmlFor="uploadimage">Upload Image:</label>
                    <input
                      type="file"
                      id="uploadimage"
                      name="imageLink"
                      placeholder="Image"
                      // value={ values.image}
                      className="form-img"
                      onChange={(e) => convert2base64(e)}
                    />
                    
                    <img src={image} className="preview" alt=""></img>
                  </div>
              {errors.image && <p className="error">{errors.image}</p>}
              <div className="age">
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={values.age}
                  className="form-control"
                  onChange={handleChange}
                />
                {/* {errors.age && <p className="error">{errors.age}</p>} */}
                {errors && values.age.length <=0 ? (
                  <p className="error">{errors.age}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="gender">
                <select
                  name="gender"
                  placeholder="Gender"
                  value={values.gender}
                  onChange={handleChange}
                >
                  <option value="">-Select Gender-</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {/* {errors.gender && <p className="error">{errors.gender}</p>} */}
              {errors && values.gender.length <= 0 ? (
                  <p className="error">{errors.gender}</p>
                ) : (
                  ""
                )}
              <div className="footer">
                <button
                  className="btn-submit"
                  type="submit"
                  onClick={() => {
                    setPage((pageDisplay) => pageDisplay - 1);
                  }}
                >
                  Prev
                </button>
                <button
                  className="btn-submit"
                  onClick={() => {
                    if (Object.keys(errors).length === 1) {
                      setPage((pageDisplay) => pageDisplay + 1);
                    }
                  }}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
          {/* Payment Details */}
          <div className={page === 3 ? "form3" : "content"}>
            <h4>Enter your details below.</h4>
            <form className="form-box">
             
                <div className="pay">
                 <input type="radio" name="payment"  value="upi" className="pay-btn" onClick={() => {setPay("UPI");}}/>
                  UPI
                  <input type="radio" name="payment" value="card" className="pay-btn" onClick={() => {setPay("CARD")}}/>
                  CARD
                   <input type="radio" name="payment"  value="cod" className="pay-btn" onClick={() => {setPay("")}}/>
                  Cash on Delivery(COD)
                </div>
             
            </form>
            {pay === "UPI" && (
              <div>
                <input type="text" name="upi"  placeholder="Enter UPI ID" onChange={handleChange}/>
                {errors && values.upi.length <= 8 ? (
                  <p className="error">{errors.upi}</p>
                ) : (
                  ""
                )}
                {/* {errors.upi && <p className="error">{errors.upi}</p>} */}
               
              </div>
            )}
 
  {pay === "CARD" && (
              <form>
                <div className="acc">
                  <input
                    type="number"
                    id="account"
                    name="accountnumber"
                    placeholder="Enter account number"
                    onChange={handleChange}
                  />
                </div>
                <div className="holdername">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter account holder name"
                    onChange={handleChange}
                  />
                </div>
                <div className="ifsccode">
                  <input
                    type="text"
                    id="code"
                    name="ifsccode"
                    placeholder="IFSC code"
                    onChange={handleChange}
                  />
                </div>
              </form>
            )} 
            <div className="footer">
              <button
                className="btn-submit"
                onClick={() => {
                  setPage((pageDisplay) => pageDisplay - 1);
                }}
              >
                Prev
              </button>
              <button
                className="btn-submit"
                onClick={() => {
                  if (Object.keys(errors).length === 0) {
                    alert("FORM SUBMITTED");
                    console.log(values);
                  }
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
