import React from "react";
import { Spinner } from "reactstrap";
import "./Loader.css";

const Loader = () => {
    return (
        <div className="spinner">
            <Spinner
                className="spinner-img"
                type="grow"
                style={{ height: "100px", width: "100px" }}
            />
            <h2>LOADING...</h2>
        </div>
    );
};

export default Loader;
