const axios = require('axios');
const regeneratorRuntime = require('regenerator-runtime');
const config = require('../config.js');

axios.defaults.headers.common.authorization = config.API_TOKEN;

// INTERACTION WIDGET HELPER

const sendClickData = async (data) => {
  try {
    const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/interactions';
    const response = await axios.post(url, data);


  } catch (error) {
    console.log(error);
  }
};

// PRODUCTS DETAIL WIDGET HELPERS

const getProductData = async (id) => {
  try {
    const response = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getStyles = async (id) => {
  try {
    const response = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${id}/styles`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getRelated = async (id) => {
  try {
    const response = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${id}/related`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// RATINGS/REVIEWS WIDGET HELPERS

//get onePage helper function
const getReviews = async (page, id, sort) => {
  // console.log('from inner recursive get next page func: ', sort)
  const oldUrl = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/?sort=${sort}&page=${page}&count=500&product_id=${id}`;
  const newUrl = `http://18.216.182.85:3000/reviews/?product_id=${id}`;
  // console.log(url)
  const response = await axios.get(newUrl);
  return response.data.results;
};

// const getReviews = async (id, sort) => {
//   // console.log(sort)

//     const reviews = [];
//     let page = 0;

//     try {
//       do {
//         var onePage = await getNextPage(page + 1, id, sort);
//         reviews.push(onePage);
//         page++;
//       } while (onePage.length > 0);

//       return reviews.flat();
//     }
//     catch (error) {
//       console.log(error);
//     }

// };

// const getReviewsMeta = async (id) => {
//   try {
//     const response = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/meta?product_id=${id}`);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

const markHelpful = (reviewId, cb) => {
  const oldUrl = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/${reviewId}/helpful`
  const newUrl = `http://18.216.182.85:3000/reviews/${reviewId}/helpful`;
  axios.put(newUrl)
    .then((response) => {
      cb(null, response);
    })
    .catch((err) => {
      cb(err, null);
    });
};

// const reportReview = (reviewId, cb) => {
//   axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/${reviewId}/report`)
//     .then((response) => {
//       cb(null, response);
//     })
//     .catch((err) => {
//       cb(err, null);
//     });
// };

const addReview = (reviewFormObj, cb) => {
  console.log('reviewFormObj:', reviewFormObj);
  const oldUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews';
  const newUrl = 'http://18.216.182.85:3000/reviews';
  axios.post(newUrl, reviewFormObj)
    .then((response) => {
      cb(null, response);
    })
    .catch((err) => {
      cb(err, null);
    })
}

module.exports = {
  getProductData,
  getStyles,
  getRelated,
  getReviews,
  // getReviewsMeta,
  markHelpful,
  // reportReview,
  sendClickData,
  addReview
};
