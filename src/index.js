import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./styles.css";

const { ManifestVirtualize } = require("./ManifestVirtualize");

axios.defaults.baseURL = "https://hatred-project.herokuapp.com/";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manifests: [],
      activeStep: 0,
      paginationPage: 1,
      isLoading: false,
      error: null
    };
    this.getManifests = this.getManifests.bind(this);
  }

  componentWillMount() {
    this.getManifests();
  }

  componentDidUpdate() {
    const { activeStep, manifests, isLoading, paginationPage } = this.state;
    if (isLoading === false && manifests.length - activeStep < 4) {
      this.getManifests(paginationPage);
    }
  }

  handleChangeIndex = activeStep => {
    this.setState({ activeStep });
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1
    }));
  };

  getManifests = (paginationPage = 1) => {
    console.log("Calling for data. Page: " + paginationPage);

    this.setState({ isLoading: true });
    axios
      .get("manifests?page=" + paginationPage + "&per_page=10")
      .then(res => {
        if (res.data === undefined || res.data.length === 0) {
          return console.log("there is nothing to show");
        }
        let manifests = this.state.manifests.concat(res.data);

        if (paginationPage === 1) {
          manifests = res.data;
        }

        this.setState({
          manifests: manifests,
          isLoading: false,
          paginationPage: paginationPage + 1
        });
      })
      .catch(error => {
        this.setState({ error, isLoading: false });
      });
  };

  render() {
    const { manifests, activeStep, isLoading, error } = this.state;
    console.log(this.state);
    const { handleChangeIndex, getManifests } = this;
    return (
      <div className="container">
        <h1 className="blink">_</h1>
        <ManifestVirtualize
          manifests={manifests}
          activeStep={activeStep}
          isLoading={isLoading}
          error={error}
          onChangeIndex={handleChangeIndex}
        />
        <button onClick={this.handleBack} disabled={activeStep === 0}>
          Back
        </button>
        <button
          onClick={this.handleNext}
          // disabled={activeStep === manifests.length - 1}
        >
          Next
        </button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
