import React, { useEffect, useState } from 'react'
import { Button, Form, Row } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Select from "react-select";
import Loadingspinner from '../components/Loadingspinner';
import { AddUser, allusers, editUser } from "../services/allapi";
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../services/baseUrl';


const Edit = () => {

  const [showspin, setshowSpin] = useState(true);

  // create state for hold normal inputs

  const [normaluserInput, setnormaluserInput] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });
  // create a state for hold status
  const [status, setStatus] = useState("");

  // create a state for holding uploading files

  const [profile, setprofile] = useState();
  // define normal input function

  const [preview, setPreview] = useState("");

  const getandsetNormalInputs = (e) => {
    const { name, value } = e.target;

    setnormaluserInput({ ...normaluserInput, [name]: value });
  };

  // console.log(normaluserInput, status);

  const handleFile = (e) => {
    console.log(e.target.files[0]);
    setprofile(e.target.files[0]);
  };

  // console.log(profile);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, lname, email, gender, mobile, location } = normaluserInput;

    if (
      !fname ||
      !lname ||
      !email ||
      !mobile ||
      !gender ||
      !location ||
      !profile ||
      !status
    ) {
      alert("please fill the form completely");
    } else {
      // alert("form filled completely")

      //create formdata

      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("gender", gender);
      data.append("location", location);
      profile ? data.append("profile", profile) : data.append("profile", existingimage)
      data.append("status", status);

      //header

      if (profile) {
        var headers = {
          "content-type": "multipart/form-data",
        };
      } else {
        var headers = ""
      }


      const response = await editUser(id, data, headers)
      console.log(response);
        

      //api call

      //   const res = await AddUser(data, headers);
      //   console.log(res);
      }
    };

    useEffect(() => {
      if (profile) {
        URL.createObjectURL(profile);
        setPreview(URL.createObjectURL(profile));
      }
      setTimeout(() => {
        setshowSpin(false);
      }, 2000);
    }, [profile]);

    const options = [
      { value: "Active", label: "Active" },
      { value: "InActive", label: "InActive" },
    ];

  
    useEffect(() => {
   
      getUser()
   
    }, [])
  

    //edit a single employee

    const { id } = useParams()
    console.log(id)

    //call to get all users from database

    const [existingimage, setExistingimage] = useState('')

    const getUser = async () => {
      const { data } = await allusers("")
      console.log(data);

      let existingUser = data.find(item => item._id === id)
      console.log(existingUser);
      setnormaluserInput(existingUser)
      setStatus(existingUser.status)
      setExistingimage(existingUser.profile)
    }

 
    return (
      <>
        {showspin ? (
          <Loadingspinner />
        ) : (
          <div className="container mt-3">
            <h1 className="text-center fw-bolder">Updata employee details!!</h1>
            <div className="mnt-3 shadow border rounded p-2">
              <div className="text-center">
                <img
                  style={{ width: "70px", height: "70px", borderRadius: "50%" }}
                  src={
                    preview
                      ? preview
                      : `${BASE_URL}/uploads/${existingimage}`
                  }
                  alt="no img"
                />
              </div>

              <Form className="mt-3">
                <Row>
                  {/* first name */}
                  <FloatingLabel
                    controlId="floatingInputfname"
                    label="fname"
                    className="mb-3 col-lg-6"
                  >
                    <Form.Control
                      type="text"
                      name="fname"
                      onChange={(e) => getandsetNormalInputs(e)}
                      value={normaluserInput.fname}
                      placeholder="fname"
                    />
                  </FloatingLabel>
                  {/* last name */}
                  {/* first name */}
                  <FloatingLabel
                    controlId="floatingInputlname"
                    label="lname"
                    className="mb-3 col-lg-6"
                  >
                    <Form.Control
                      type="text"
                      name="lname"
                      onChange={(e) => getandsetNormalInputs(e)}
                      value={normaluserInput.lname}
                      placeholder="lname"
                    />
                  </FloatingLabel>
                  {/* email */}
                  {/* first name */}
                  <FloatingLabel
                    controlId="floatingInputemail"
                    label="email"
                    className="mb-3 col-lg-6"
                  >
                    <Form.Control
                      type="email"
                      name="email"
                      onChange={(e) => getandsetNormalInputs(e)}
                      value={normaluserInput.email}
                      placeholder="email"
                    />
                  </FloatingLabel>
                  {/* mobile */}
                  <FloatingLabel
                    controlId="floatingInputmobile"
                    label="mobile"
                    className="mb-3 col-lg-6"
                  >
                    <Form.Control
                      type="mobile"
                      name="mobile"
                      onChange={(e) => getandsetNormalInputs(e)}
                      value={normaluserInput.mobile}
                      placeholder="mobile"
                    />
                  </FloatingLabel>
                  {/* gender */}
                  <Form.Group className="mb-3 col-lg-6">
                    <Form.Label>select gender</Form.Label>
                    {/* male */}
                    <Form.Check
                      type={"radio"}
                      name="gender"
                      value={"male"}
                      label={"male"}
                      onChange={(e) => getandsetNormalInputs(e)}
                      checked={normaluserInput.gender === "male" ? true : false}
                    />
                    {/* female */}
                    <Form.Check
                      type={"radio"}
                      name="gender"
                      value={"female"}
                      label={"female"}
                      onChange={(e) => getandsetNormalInputs(e)}
                      checked={normaluserInput.gender === "female" ? true : false}
                    />
                  </Form.Group>

                  {/* status */}
                  <Form.Group className="mb-3 col-lg-6">
                    <Form.Label>select employee status</Form.Label>
                    <Select
                      options={options}
                      onChange={(e) => setStatus(e.value)}
                      placeholder={status}
                    />
                  </Form.Group>

                  {/* upload a file */}
                  <Form.Group className="mb-3 col-lg-6">
                    <Form.Label>choose a profile picture</Form.Label>
                    <Form.Control
                      type="file"
                      name="profile"
                      onChange={(e) => handleFile(e)}
                    />
                  </Form.Group>

                  {/* location */}

                  <FloatingLabel
                    controlId="floatingInputlocation"
                    label="location"
                    className="mb-3 col-lg-6 mt-3"
                  >
                    <Form.Control
                      type="text"
                      name="location"
                      onChange={(e) => getandsetNormalInputs(e)}
                      value={normaluserInput.location}
                      placeholder="location"
                    />
                  </FloatingLabel>

                  <Button
                    type="submit"
                    variant="info"
                    onClick={(e) => handleSubmit(e)}
                  >
                    submit
                  </Button>
                </Row>
              </Form>
            </div>
          </div>
        )}
      </>
    );
  }

export default Edit