import React from 'react';
import Button from 'react-bootstrap/Button';
import {connect} from "react-redux";
import { userLogout } from "../store/actions/auth";

export const Logout = (props) => {
    return (
      <Button variant="danger" onClick={props.userLogout}>Logout</Button>
    );
}

export default connect(null, {userLogout})(Logout);
