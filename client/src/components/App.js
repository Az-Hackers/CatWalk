/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-absolute-path */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React from 'react';
import axios from 'axios';
import {
  Link,
  HashRouter as Router,
  Route,
  withRouter
} from 'react-router-dom';
import ApiCheck from './ApiCheck';
import ProductDetails from './ProductDetailsComponents/ProductDetails';
import QA from './QA/QA.js';

const api = require('../../../helpers/api');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: '',
      productData: {},
      styles: { results: [] },
      related: [],
      reviews: {},
      reviewsMeta: {}
    };
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    this.updateData(this.props.match.params.id);
  }

  updateData(id) {
    if (id !== '') {
      api.getProductData(id, (err, results) => {
        this.setState({ productData: results.data });
      });
      api.getStyles(id, (err, results) => {
        this.setState({ styles: results.data });
      });
      api.getRelated(id, (err, results) => {
        this.setState({ related: results.data });
      });
      // api.getReviews(id, (err, results) => {
      //   this.setState({ reviews: results.data });
      // });
      // api.getReviewsMeta(id, (err, results) => {
      //   this.setState({ reviewsMeta: results.data });
      // });
    }
  }

  render() {
    return (
      <div>
        <div className="cssCheck">
          TSVT FTW! 🌴 🏰 🧵 🌩️
        </div>
        <div />
        <ProductDetails
          id={this.props.match.params.id}
          productData={this.state.productData}
          styles={this.state.styles}
        />
        <ApiCheck
          updateData={this.updateData}
          productData={this.state.productData}
          styles={this.state.styles}
          related={this.state.related}

        />
        <QA
          id={this.props.match.params.id}
        />
      </div>
    );
  }
}

export default withRouter(App);
