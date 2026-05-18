import React from "react";

export default function About() {
  return (
    <>
      <h1 className="a-h">Abd Al-Raheam Al-Ruqaya</h1>

      <ul className="a-l">
        <h3>personal</h3>
        <li>age: 22</li>
        <li>address: Syria - Damascus</li>
        <li>
          Email:{" "}
          <a href="mailto:abdulraheam.169@gmail.com">
            abdulraheam.169@gmail.com
          </a>
        </li>
      </ul>
      <ul className="a-l">
        <h3>info </h3>
        <li>ITE Student at SVU</li>
        <li> Fresh Front-End Developer</li>
      </ul>

      <ul className="a-l">
        <h3>Skilles</h3>
        <li>HTML</li>
        <li>Java Script</li>
        <li>CSS</li>
        <li>React - React Router</li>
        <li>git - github</li>
      </ul>
    </>
  );
}
