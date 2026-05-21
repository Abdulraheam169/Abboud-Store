import React from "react";

export default function About() {
  return (
    <div className="about-me">
      <img
        className="a-img"
        src="src/images/personal.png"
        alt=""
        width={"100px"}
      />
      <h1 className="a-name">Abd Al-Raheam Al-Ruqaya</h1>

      <ul className="a-personal">
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
      <ul className="a-info">
        <h3>info </h3>
        <li>ITE Student at SVU</li>
        <li> Fresh Front-End Developer</li>
      </ul>

      <ul className="a-skills">
        <h3>Skilles</h3>
        <li>HTML</li>
        <li>Java Script</li>
        <li>CSS</li>
        <li>React - React Router</li>
        <li>git - github</li>
      </ul>
      <ul className="a-projects">
        <h3>My Projects</h3>
        <li>
          <a target="_blank" href="https://abdulraheam169.github.io/Hangman-/">
            <img src="../images/hangman.webp" alt="" />
            <span>Hangman Game</span>
          </a>
        </li>

        <li>
          <a
            target="_blank"
            href="https://abdulraheam169.github.io/html-css-template-1/"
          >
            <img src="../images/template.webp" alt="" />
            <span>HTML/CSS Template 1</span>
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://abdulraheam169.github.io/html-css-Template-3/"
          >
            <img src="../images/template (1).webp" alt="" />
            <span>HTML/CSS Template 2</span>
          </a>
        </li>

        <li>
          <a target="_blank" href="">
            <img src="../images/dice.jpg" alt="" />
            <span>Tenzies</span>
          </a>
        </li>
        <li>
          <a target="_blank" href="https://abdulraheam169.github.io/ToDo-List/">
            <img src="../images/to-do-list-icon-vector.webp" alt="" />
            <span>ToDo List</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
