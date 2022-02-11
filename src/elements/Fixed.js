import React from "react";
import styled from "styled-components";


const Fixed = (props) => {
    const {children, _onClick, margin, width, height, bottom, left } = props;
    const styles = {
        margin: margin,
        width: width,
        height: height,
        bottom:bottom,
        left:left,
    }
    
    return(
        <React.Fragment>
            <DefaultButton {...styles} onClick={_onClick}>{children}</DefaultButton>
        </React.Fragment>
    );
};

Fixed.defaultProps = {    
    children: null,
    _onClick: () => {},  
    margin: false,
    width: "100%",
    height: '',
    bottom: "0",
    left: "0",
};

const DefaultButton = styled.button`    
    width: ${(props) => props.width};
    ${(props) => (props.height? `height: ${props.height};` : '')};
    box-sizing: border-box;
    border: none;
    ${(props) => (props.margin? `margin: ${props.margin};` : '')};
    position: fixed;
    bottom: ${(props) => props.bottom};
    left: ${(props) => props.left};
`;


export default Fixed;