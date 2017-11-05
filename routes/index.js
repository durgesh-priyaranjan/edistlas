var express = require("express");
var router = express.Router();
var api = require("../lib/api");
var utils = require("../lib/utils");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index");
});

/*
* Task 1:
* Make models alphabetically sortable (ascending, descending, default)
*/
router.get("/models", function(req, res, next) {
  // use api to get models and render output
  var sortBy = req.query.sortBy;
  api.fetchModels().then(response => {
    var viewData = {
      models: response
    };

    viewData.models = utils.sortBy(sortBy, viewData.models);

    res.render("models", viewData);
  });
});

/*
* Task 2:
* Make services filterable by type (repair, maintenance, cosmetic)
*/
router.get("/services", function(req, res, next) {
  // use api to get services and render output

  var filterBy = req.query.filter;

  api.fetchServices().then(function(response) {
    var viewData = {
      services: response
    };

    if (filterBy) {
      viewData.services = viewData.services.filter(function(service) {
        return service.type === filterBy;
      });
    }
    res.render("services", viewData);
  });
});

/*
* Task 3:
* Bugfix: Something prevents reviews from being rendered
* Make reviews searchable (content and source)
*/
router.get("/reviews", function(req, res, next) {
  var oSearchTerm = req.query.search || "";
  var searchTerm = oSearchTerm.toLowerCase();

  return Promise.all([
    api.fetchCustomerReviews(),
    api.fetchCorporateReviews()
  ]).then(function(reviews) {
    var reviewsData = {
      searchTerm: oSearchTerm,
      reviews: utils.flattenArray(reviews)
    };

    reviewsData.reviews = reviewsData.reviews.filter(function(review) {
      if (
        review.content.toLowerCase().indexOf(searchTerm) > -1 ||
        review.source.toLowerCase().indexOf(searchTerm) > -1
      ) {
        return true;
      } else {
        return false;
      }
    });

    res.render("reviews", reviewsData);
  });
});

module.exports = router;
