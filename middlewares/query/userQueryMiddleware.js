const asyncErrorWrapper = require("express-async-handler");
const {
  searchHelper,
  populateHelper,
  questionSortHelper,
  pagenationHelper,
} = require("./queryMiddlewareHelpers");
const userQueryMiddleware = function (model, options) {
  return asyncErrorWrapper(async function (req, res, next) {
    let query = model.find();

    //search by  name
    query = searchHelper("name", query, req);

    const total = await model.countDocuments();

    const pagenationResult = await pagenationHelper(total, query, req);

    query = pagenationResult.query;
    pagination = pagenationResult.pagination;

    const queryResults = await query.find();
    res.queryResults = {
      success: true,
      count: queryResults.length,
      pagination: pagination,
      data: queryResults,
    };

    next();
  });
};

module.exports = userQueryMiddleware;
