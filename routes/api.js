
/*
 * GET home page.
 */


exports.readAll = function(req, res) {
  var model = req.app.db.models.Post;

  model
  .find({})
  .populate('uid')
  .exec(function(err, posts) {
    res.send(posts);
    res.end();
  });

};

exports.createOne = function(req, res){
  var model = req.app.db.models.Post;
  var query = req.query;
  var post;

  post = {
    uid: '53c1fcc363993b2789650d81',
    title: query.title,
    content: query.content
  };

  // Output: { title: 'Hello', content: 'A new post' }
  console.log(post);

  var postDocument = new model(post);
  postDocument.save();

  res.send({status: 'OK'});
};

exports.readAllUsers = function(req, res){
  var model = req.app.db.models.User;
  var query = req.query;
  var filter = {};

  if (typeof(query.age) !== 'undefined') {
    filter['Age'] = query.age;
  }

  if (typeof(query.addr) !== 'undefined') {
    // Escape string for use in regular expression
    filter['Address'] = new RegExp(query.addr);
  }

  if (typeof(query.interests) !== 'undefined') {
    // Escape string for use in regular expression
    filter['Interests'] = {$in: ['sport']};
  }

  console.log(filter);

  model
  .find(filter)
  .select('Name Email')
  .sort('Name')
  .exec(function(err, users) {
    
    users.forEach(function(user) {
      user.Email = model.trunkEmail(user.Email);
    });

    res.send(users);
    res.end();
  });
};








