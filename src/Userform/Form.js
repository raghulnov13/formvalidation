import React from "react";
import "./form.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";

const FormSec = () => {
  // state initialization
  const [activeFilter, setActiveFilter] = useState("ACCOUNT");
  const [radio, setRadio] = useState("");
  const [storeData, setStore] = useState({});
  // const [error, setError] = useState(true);
  // base64 conversion
  const [base64Url, setBase64Url] = useState("");

  // Get data from input box
  const handleChange = (field, event) => {
    event.preventDefault();
    setStore({ ...storeData, [field]: event.target.value });

    //imgage part
    if (event.target.id === "image") {
      let file = event.target.files;
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        var base64Result = reader.result;
        setStore({ ...storeData, Imagepath: reader.result });
        setBase64Url(base64Result);
      };
    }
  };

  // To submit the Account details information
  const Submit = () => {
    const password = Object.values(storeData);
    if (
      Object.keys(storeData).length === 6 &&
      Object.keys(storeData.PhoneNo).length === 10 && parseInt(password[3]) === parseInt(password[4])
    ) {
      let item = JSON.parse(localStorage.getItem("userData"));
      if ( item === null) {
        setActiveFilter("PERSONAL INFO");
      } 

      // user phoneNumber and mail id verification

      if (item !== null) {
        const value = item.map((ele) => {
          if (ele.PhoneNo === storeData.PhoneNo) {
            alert("Your Phone-Number Already Exist's");
          } else if (ele.MailId === storeData.MailId) {
            alert("Your Mail-Id Already Exist's");
          }
          return ele.PhoneNo === storeData.PhoneNo ||
            ele.MailId === storeData.MailId
            ? "notValid"
            : "valid";
        });
        if (value.includes("notValid") !== true) {
          setActiveFilter("PERSONAL INFO");
        }
      }
    }
  };

  // To submit personal information part
  const Submit2 = () => {
    if (
      Object.keys(storeData).length === 9 &&
      Object.keys(storeData.Age).length === 2
    ) {
      setActiveFilter("PAYMENT DETAILS");
    }
  };

  // TO submit final data
  const finalSubmit = () => {
    if (
      (radio === "UPI" && Object.keys(storeData).length === 10) ||
      (radio === "CARD" && Object.keys(storeData).length === 12)
    ) {
      if (JSON.parse(localStorage.getItem("userData")) === null) {
        localStorage.setItem("userData", JSON.stringify([storeData]));
      } else {
        let data = JSON.parse(localStorage.getItem("userData"));
        data.push(storeData);
        localStorage.setItem("userData", JSON.stringify(data));
      }
      setActiveFilter("ACCOUNT");
      window.location.reload(false);
    }
  };

  const btnName = [
    { name: "ACCOUNT" },
    { name: "PERSONAL INFO" },
    { name: "PAYMENT DETAILS" },
  ];
  const radioBtn = [{ name: "UPI" }, { name: "CARD" }, { name: "COD" }];

  return (
    <section>
      {/* initial content for the section */}
      <div className="form-bg-color">
        <div className="form-bg">
          <h1>Sign Up</h1>
          <h6>Let's create your account</h6>
          <div className="d-flex btn-sec">
            {btnName.map((ele, index) => (
              <div
                key={index}
                className={
                  ele.name === activeFilter
                    ? "active text-center"
                    : "non-active text-center"
                }
              >
                <button className="text-center">{ele.name} </button>
              </div>
            ))}
          </div>
          <p>Enter your details below</p>
          <br></br>

          {/* Account details part */}

          {activeFilter === "ACCOUNT" && (
            <form>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="validationCustomUsername">
                    <Form.Label>First Name</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        placeholder=""
                        required
                        onChange={(e) => handleChange("FirstName", e)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="formGridPassword">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => handleChange("LastName", e)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder=""
                  onChange={(e) => handleChange("MailId", e)}
                  required
                />
              </Form.Group>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formGridEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => handleChange("Password", e)}
                      required
                      minLength="5"
                      maxLength="5"
                      autoComplete="on"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formGridPassword">
                    <Form.Label> Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => handleChange("ConfirmPassword", e)}
                      minLength="5"
                      maxLength="5"
                      required
                      autoComplete="on"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  onChange={(e) => handleChange("PhoneNo", e)}
                  minLength="10"
                  maxLength="10"
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button className="next-btn" type="" onClick={Submit}>
                  Next
                </Button>
              </div>
            </form>
          )}

          {/* Persoanl info part */}

          {activeFilter === "PERSONAL INFO" && (
            <form>
              {/* Image uploading part  */}
              <p>
                <label>Upload Image</label>
              </p>
              <p>
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  required
                  onChange={(e) => handleChange("image", e)}
                ></input>
              </p>
              <p>
                <label>preview Image</label>
              </p>
              <p>
                <img
                  alt=""
                  src={base64Url}
                  id="output"
                  name="image"
                  width="200"
                />
              </p>
              <br></br>
              <br></br>
              <label>Select Your GENDER : </label>
              <Form.Select onChange={(e) => handleChange("Gender", e)} required>
                {["-SELECT-", "MALE", "FEMALE", "OTHERS"].map((ele, index) => (
                  <option value={ele} required key={index}>
                    {ele}
                  </option>
                ))}
              </Form.Select>
              <br></br>
              <label>Enter your age : </label>
              <input
                type="tel"
                size="sm"
                className="form-range"
                minLength="2"
                maxLength="3"
                min="18"
                max="100"
                onChange={(e) => handleChange("Age", e)}
                required
              ></input>
              <div className="text-center mt-3">
                <Button className="next-btn" type="" onClick={Submit2}>
                  Next
                </Button>
              </div>
            </form>
          )}

          {/* Payement details part */}

          {activeFilter === "PAYMENT DETAILS" && (
            <form>
              <div className="d-flex justify-content-between">
                {radioBtn.map((ele, index) => (
                  <div key={index} className="mb-3 ">
                    <Form.Check
                      label={ele.name}
                      type="radio"
                      onClick={() => {
                        if (radio === "") {
                          setRadio(ele.name);
                        }
                      }}
                      className={ele.name === radio ? "activeRadio" : null}
                    />
                  </div>
                ))}
              </div>
              {/* UPi part */}

              {radio === "UPI" && (
                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Enter the UPI ID</Form.Label>
                  <Form.Control
                    type="tel"
                    onChange={(e) => handleChange("UPIId", e)}
                    required
                    minLength="12"
                    maxLength="12"
                  />
                </Form.Group>
              )}

              {/* card part */}

              {radio === "CARD" && (
                <form>
                  <label>Enter your Card details below :</label>
                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Account Number</Form.Label>
                    <Form.Control
                      type="tel"
                      onChange={(e) => handleChange("AccountNumber", e)}
                      required
                      minLength="12"
                      maxLength="12"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Account Holder Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => handleChange("AccountHolderName", e)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>IFSC Code</Form.Label>
                    <Form.Control
                      type="tel"
                      onChange={(e) => handleChange("IFSCCode", e)}
                      required
                      minLength="6"
                      maxLength="12"
                    />
                  </Form.Group>
                </form>
              )}

              <div className="text-center mt-3">
                <Button className="next-btn" type="" onClick={finalSubmit}>
                  Submit
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default FormSec;

