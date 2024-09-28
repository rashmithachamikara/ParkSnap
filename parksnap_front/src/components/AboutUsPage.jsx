import React from "react";
import "./AboutUsPage.css";
import image from '../assets/team.jpg';
import NavigationBar from "./Navbar";
import Footer from "./Footer";


const AboutUs = () => {
  return (
    <div className="about-container">
      <NavigationBar/>
      <header className="header">
        <h1>ABOUT <section className="us">US</section></h1>
      </header>

      <div className="content">
        <p>
          Welcome to <b>Park Snap</b>, the vehicle parking management system for LSEG.
          Developed by students from the University of Moratuwa IT Faculty, Park
          Snap is designed to make parking at LSEG easy and efficient.
        
        
          This project combines the innovative spirit of our students with the
          expertise of LSEG to create a smart, user-friendly parking solution.
          We're proud to offer a system that simplifies parking management and
          enhances the overall experience for everyone.
        </p>
        
        <img
          className="team-photo"
          src={image}
          alt="Team"
          
        /> 
      </div>

    <Footer/> 
    </div>
  );
};

export default AboutUs;
