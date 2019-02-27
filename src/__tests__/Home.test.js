import React from "react";
import { create } from "react-test-renderer";
import Home from "../containers/Home";
import configureStore from "../storeConfig";

const store = configureStore();

it("Home component snapshot", () => {
    const c = create(<Home store={store} />);
    expect(c.toJSON()).toMatchSnapshot();
});
