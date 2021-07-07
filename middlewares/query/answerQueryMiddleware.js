const asyncErrorWrapper = require("express-async-handler");
const {
  searchHelper,
  populateHelper,
  questionSortHelper,
  pagenationHelper,
} = require("./queryMiddlewareHelpers");
const answerQueryMiddleware = function (model, options) {
  return asyncErrorWrapper(async function (req, res, next) {
    const { id } = req.params;

    const arrayName = "answers";

    const total = (await model.findById(id))["answerCount"];

    const pagenationResult = await pagenationHelper(total, undefined, req);

    const startIndex = pagenationResult.startIndex;
    const limit = pagenationResult.limit;

    let queryObject = {};
    queryObject[arrayName] = { $slice: [startIndex, limit] };

    let query = model.find({ _id: id }, queryObject);

    query = populateHelper(query, options.population);

    const queryResults = await query;

    res.queryResults = {
      success: true,
      pagenation: pagenationResult.pagination,
      data: queryResults,
    };

    next();
  });
};

module.exports = answerQueryMiddleware;
