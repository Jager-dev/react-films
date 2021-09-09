import React from 'react';

const Spinner = () => {
  return (
    <div className={"d-flex justify-content-center text-center my-5"}>
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;