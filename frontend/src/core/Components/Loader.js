import React, {Component} from "react";

export class Loader extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center">
        <div class="spinner-border  text-warning" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}

export default Loader;
