import React from 'react'
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import PropagateLoader from "react-spinners/PropagateLoader";
import ClockLoader from "react-spinners/ClockLoader";
import logo from '../../assets/logo-black.png'
const override = css`
  display: block;
  border-color: white;
  color: white;
  margin: 20px 0;
`;

const Loading = () => {
    return (
        <div className="loading flex-mid flex-column">
            <ClockLoader css={override} size={80} color={'white'} />
            <img src={logo} style={{width:'300px', height: 'auto'}} alt=""/>
            <PropagateLoader css={override} size={20} color={'white'} />
        </div>
    )
}
export default Loading