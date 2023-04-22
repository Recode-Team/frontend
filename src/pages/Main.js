import React from 'react'
import { Container } from "react-bootstrap";
import mainImage from './mainImage.png';

function Main() {
  return (
    // <Container style={{ minHeight: "75vh" }}>
    //   <img src={mainImage} alt="main" style={{ maxWidth: "100%", height: "auto" }}/>
    // </Container>
    <img src={mainImage} alt="main" style={{ maxWidth: "100%", height: "auto" }}/>
  )
}

export default Main