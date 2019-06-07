import React from 'react';
import {connect} from "react-redux";
import { userLogout } from "../store/actions/auth";

const Logout = (props) => {
    return (
      <button onClick={props.userLogout}>Logout</button>
    );
}


export default connect(null, {userLogout})(Logout);
