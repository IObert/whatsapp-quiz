const airtable = require("airtable");

exports.handler = function (context, event, callback) {
  const base = new airtable({ apiKey: context.AIRTABLE_API_KEY }).base(
    context.AIRTABLE_BASE_ID
  );
  base(context.QUESTIONS_TABLE_NAME)
    .select({
      filterByFormula: `AND(({question_num} = "${event.question_num}"), ({quiz_num} = "${event.quiz_num}") )`,
    })
    .firstPage((err, questions) => {
      if (err) {
        callback("Error in your request", err);
      }
      if (questions.length < 1) {
        callback("Question not found");
      } else {
        callback(null, questions[0].fields);
      }
    });
};
