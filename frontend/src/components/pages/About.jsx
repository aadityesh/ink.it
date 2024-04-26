import React, { useContext } from "react";
import { Context } from "../../main";

const About = () => {
  const { mode } = useContext(Context);
  return (
    <article className={mode === "dark" ? "dark-bg about" : "light-bg about"}>
      <div className="container">
        <h2>About</h2>
        <p>
          Welcome to Ink.it, your go-to destination for dynamic blogging
          experiences! Crafted with the powerful MERN stack, Ink.it offers a
          robust array of features tailored to both authors and readers alike.
          Data Integrity at its Finest: Rest assured that your content remains
          pristine with our comprehensive input validation measures. Ink.it
          employs rigorous validation techniques to maintain data integrity,
          providing you with a reliable platform for sharing your thoughts and
          ideas. Empowering Authors with an Intuitive Dashboard: Our intuitive
          dashboard puts the power of content curation directly into the hands
          of authors.
        </p>
        <p>
          Our Commitment to Security: At Ink.it, security is our top priority.
          We utilize industry-standard practices such as JWT Authentication and
          password hashing to ensure a secure backend environment. With rigorous
          testing conducted through Postman, you can trust that your data is
          safeguarded every step of the way.
        </p>
        <p>
          Seamless Image Integration: Enhance your blog posts with stunning
          visuals using our seamless image integration feature. With support for
          adding images stored and fetched from Cloudinary, bringing your
          stories to life has never been easier.
        </p>
        <p>
          With a user-friendly interface packed with all the essential features,
          managing and organizing your content has never been more efficient.
          Tech Stack: Ink.it leverages cutting-edge technologies including
          ReactJS, MongoDB, ExpressJS, NodeJS, Chart.js, Axios, and React-toast
          to deliver a seamless and immersive blogging experience. Join us on
          Ink.it and unlock the full potential of your creativity. Whether
          you're a seasoned author or an avid reader, Ink.it welcomes you to
          explore, connect, and share your stories with the world.
        </p>
      </div>
    </article>
  );
};

export default About;
