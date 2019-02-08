import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../containers/Home";
import "../../assets/css/App.scss";

/** Component: Appe
 *  Arguments: None
 *  Defenition:
 *      Create a browser router and passed the routes to Layout
 *      component as children to render based on the path.
 *  Returns: None
 **/
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default App;
