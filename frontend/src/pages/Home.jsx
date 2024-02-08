import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Hometable from "../components/Hometable";
import Loadingspinner from "../components/Loadingspinner";
import { allusers, deleteUser } from "../services/allapi";
import { registerContext } from "./Contextshare";
import { Alert } from "react-bootstrap";

const Home = () => {

const { registerData, setRegisterData } = useContext(registerContext);
  const [showSpin, setShowSpin] = useState(true);
  const [allUserData, setAllUserData] = useState([]);

  const [search, setSearch] = useState("");

  const { id } = useParams();
  console.log(id);


  useEffect(() => {
    getAllEmployees();

    setTimeout(() => {
      setShowSpin(false);
    }, 2000);
  }, [search]);

  //to get all data call allusers function

  const getAllEmployees = async () => {
    const res = await allusers(search);
    setAllUserData(res.data);
  };

  console.log(allUserData);

  //to delete a singledata

  const removeUser = async (id) => {
    const res = await deleteUser(id)
    
    if (res.status === 200) {
      getAllEmployees()
    } else {
      alert("Operation failed please try after sometime")
    }
    
  }

  return (
    <>
      
      {
        registerData && <Alert variant="success" onClose={() => setRegisterData("")} dismissible>
          {
            registerData.fname.toUpperCase()
          }
          Register Successfully........................................
        </Alert>
      }
      {showSpin ? (
        <Loadingspinner />
      ) : (
        <div className="container">
          <div className="search-all d-flex align-items-center">
            <div className="search d-flex align-items-center mt-5">
              <span className="fw-bolder">Search</span>
              <input
                type="text"
                placeholder="Search By Employee Name"
                className="form-control ms-3"
                style={{ width: "400px" }}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Link to={"/add"} className="btn btn-warning ms-auto mt-5">
              <i class="fa-solid fa-user-plus "></i>Add
            </Link>
          </div>
          <div className="table mt-5">
            <h1 className="fw-bolder">List Of All Employees</h1>
            <Hometable displayData={allUserData} removeuser={removeUser} />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
