import React, { Component } from "react";

// Components
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    this.props.fetchAllAuthors();
  }

  getView = () => {
    if (this.props.loading) {
      return <Loading />;
    } else {
      return (
        <Switch>
          <Redirect exact from="/" to="/authors" />
          <Route path="/authors/:authorID" component={AuthorDetail} />
          <Route
            path="/authors/"
            render={props => (
              <AuthorsList {...props} authors={this.props.authors} />
            )}
          />
        </Switch>
      );
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="content col-10">{this.getView()}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    authors: state.rootAuthors.authors,
    loading: state.rootAuthors.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchAllAuthors: () => dispatch(actionCreators.fetchAuthors())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
