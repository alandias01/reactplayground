import React, { useState } from 'react';
import { ReactHooks } from './hooks/ReactHookBase';

const buttonStyle = { margin: "5px 5px 5px 5px" };

export const MAINTEMPLATE = {
  PAGE: {
    MAINPAGE: "main-page",
    REACTBASICS: "react-basics",
    LAYOUT01: "Layout01",
    REDUXEXAMPLE: "REDUXEXAMPLE",
    MATERIALUI: "MATERIALUI",
    MUITHEMING: "MUITHEMING",
    REACTHOOKS: "react-hooks",
  }
};

export function AlternateRouting() {
  const [currentPage, setCurrentPage] = useState(MAINTEMPLATE.PAGE.MAINPAGE)

  const getPage = () => {
    switch (currentPage) {
      case MAINTEMPLATE.PAGE.MAINPAGE:
        return <div>Main Page</div>

      case MAINTEMPLATE.PAGE.REACTHOOKS:
        return <ReactHooks />

      default:
        break;
    }
  }

  return (
    <div>
      <div >
        Current Page: {currentPage}
        <br />
        <button style={buttonStyle} onClick={() => setCurrentPage(MAINTEMPLATE.PAGE.MAINPAGE)}>Main </button>
        <button style={buttonStyle} onClick={() => setCurrentPage(MAINTEMPLATE.PAGE.REACTHOOKS)}>React Hooks</button>
      </div>
      {getPage()}
    </div>
  )
}