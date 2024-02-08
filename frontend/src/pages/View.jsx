import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import Loadingspinner from '../components/Loadingspinner';
import { useParams } from 'react-router-dom';
import { allusers } from '../services/allapi';
import { BASE_URL } from '../services/baseUrl';

const View = () => {

  const [showSpin, setShowSpin] = useState(true);
  const [user,setUser]=useState({})

  const { id } = useParams()
  
  console.log(id);
 

  useEffect(() => {
    getUser()
    setTimeout(() => {
      setShowSpin(false);
    }, 2000);
  }, []);

  // api call

  const getUser = async () => {
    const { data } = await allusers("")
    // console.log(data);
    setUser(data.find((item) => item._id === id));

    // console.log(data.find(item=>item._id === id));
    
  }

  console.log(user);
  return (
    <>
      {showSpin ? (
        <Loadingspinner />
      ) : (
        <div className="container " style={{ height: "80vh" }}>
            {

              user?
              <Card className="shadow col-lg-6 ms-auto mt-5 p-3">
            <div className="text-center">
              <img
                alt="no-img"
                src={`${BASE_URL}/uploads/${user.profile}`}
                style={{ width: "70px", height: "70px", borderRadius: "50%" }}
              />
            </div>
            <div className="text-center">
                    <h2>{user.fname}{user.lname }</h2>
                    <h5>Email:{user.email }</h5>
                    <h5>Mobile:{ user.mobile}</h5>
                    <h5>Gender:{user.gender }</h5>
                    <h5>Status:{user.status }</h5>
                    <h5>Location:{ user.location}</h5>
            </div>
          </Card>:""}
        </div>
      )}
    </>
  );
}

export default View