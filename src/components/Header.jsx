import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header({ title, backTo }) {
  return (
    <header className="header">
      {backTo && (
        <Link to={backTo} className="header_back">
          ←
        </Link>
      )}
      <h1 className="header_title">
        {title}
      </h1>
    </header>
  );
}
