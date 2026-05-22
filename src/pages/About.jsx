import React from "react";
import personal from "/personal.png";
import hangman from "/hangman.webp";
import template from "/template.webp";
import template2 from "/template-2.webp";
import dice from "/dice.jpg";
import toDoList from "/to-do-list-icon-vector.webp";
export default function About() {
  return (
    <div className="about-me">
      <img className="a-img" src={personal} alt="" width={"100px"} />
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
            <img src={hangman} alt="" />
            <span>Hangman Game</span>
          </a>
        </li>

        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://abdulraheam169.github.io/html-css-template-1/"
          >
            <img src={template} alt="" />
            <span>HTML/CSS Template 1</span>
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://abdulraheam169.github.io/html-css-Template-3/"
          >
            <img src={template2} alt="" />
            <span>HTML/CSS Template 2</span>
          </a>
        </li>

        <li>
          <a target="_blank" rel="noopener noreferrer" href="">
            <img src={dice} alt="" />
            <span>Tenzies</span>
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://abdulraheam169.github.io/ToDo-List/"
          >
            <img src={toDoList} alt="" />
            <span>ToDo List</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
