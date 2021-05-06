import React from "react";
import Section from "./components/section";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 p-3 text-white bg-dark vh-100">
            <Sidebar />
          </div>
          <div className="col-9 vh-100">
            <Section />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
