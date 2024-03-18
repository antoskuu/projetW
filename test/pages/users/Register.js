import React from "react";

const Register = (props) => {
  return (
    <div className="tab-content">
      <form className="form-profile">
        <fieldset>
          <legend>S'enregistrer</legend>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="mail@mail.fr"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Save
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
