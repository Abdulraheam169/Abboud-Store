import React from "react";
export default function About() {
  return (
    <div className="about-me">
      <img className="a-img" src="public/personal.png" alt="" width={"100px"} />
      <h1 className="a-name">Abd Al-Raheam Al-Ruqaya</h1>

      <ul className="a-personal">
        <h3>Personal Info</h3>
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
        <h3>Academic Info </h3>
        <li>ITE Student at SVU</li>
      </ul>

      <ul className="a-skills">
        <h3>Skills</h3>
        <li>HTML</li>
        <li>Java Script</li>
        <li>CSS</li>
        <li>React - React Router</li>
        <li>git - github</li>
      </ul>
      <ul className="a-projects">
        <h3>Some Projects</h3>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://abdulraheam169.github.io/Hangman-/"
          >
            <img src="public/hangman.webp" alt="" />
            <span>Hangman Game</span>
          </a>
        </li>

        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://abdulraheam169.github.io/html-css-template-1/"
          >
            <img src="public/template.webp" alt="" />
            <span>HTML/CSS Template 1</span>
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://abdulraheam169.github.io/html-css-Template-3/"
          >
            <img src="public/template-2.webp" alt="" />
            <span>HTML/CSS Template 2</span>
          </a>
        </li>

        <li>
          <a target="_blank" rel="noopener noreferrer" href="">
            <img src="public/dice.jpg" alt="" />
            <span>Tenzies</span>
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://abdulraheam169.github.io/ToDo-List/"
          >
            <img
              src="
            public/to-do-list-icon-vector.webp"
              alt=""
            />
            <span>ToDo List</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
