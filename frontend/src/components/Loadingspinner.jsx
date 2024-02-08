import React from 'react'
import Spinner from "react-bootstrap/Spinner";

const Loadingspinner = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-5 ">
        <Spinner animation="grow" variant="warning" />
        Loading.......
      </div>
    </>
  );
}

export default Loadingspinner