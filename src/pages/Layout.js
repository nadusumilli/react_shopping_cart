import React from "react";
import Header from "../components/Header";
import Footer from "../pages/Footer";
import "../../assets/css/Layout.scss";

/** Functional Component: Layout
 *  Arguments:
 *      - props: props from the parent component.
 *  Defenition:
 *      Takes in child routes and provides a layout for header,
 *      footer and children.
 *  Returns:
 *      - Jsx to render to the dom.
 **/
const Layout = props => (
    <div>
        <header>
            <Header />
        </header>
        <main>
            <div>{props.children}</div>
        </main>
        <footer className="footer">
            <Footer />
        </footer>
    </div>
);

export default Layout;
