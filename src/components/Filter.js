import React, { Component } from "react";
import "../../assets/css/Filter.scss";

class Filter extends Component {
    setFilter = e => {
        if (e.target.name === "price") this.props.sortByPrice(e.target.value);
        else this.props.filterBySize(e.target.value);
    };

    render() {
        return (
            <div className="filter-block">
                <div className="input-row">
                    <div className="column">
                        <label>Sort By</label>
                        <select
                            className="input-control"
                            name="price"
                            onChange={this.setFilter}
                        >
                            <option value="">Select</option>
                            <option value="low_to_high">low to high $</option>
                            <option value="high_to_low">hight to low $</option>
                        </select>
                    </div>
                    <div className="column">
                        <label>Filter By</label>
                        <select
                            className="input-control"
                            name="size"
                            onChange={this.setFilter}
                        >
                            <option value="">filter Size</option>
                            <option value="XS">Xtra Small</option>
                            <option value="S">Small</option>
                            <option value="M">Medium</option>
                            <option value="L">Large</option>
                            <option value="XL">Xtra Large</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;
