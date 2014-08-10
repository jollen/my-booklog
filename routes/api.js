
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

exports.readByUserId = function(req, res) {
  var model = req.app.db.models.User;
  var userId = req.params.userId;

  model
  .find({ _id: userId })
  .exec(function(err, user) {
    res.send(user);
    res.end();
  });
};

/**
 * GET /1/post/age
 */
exports.readByAge = function(req, res) {
  var model = req.app.db.models.User;

  model
  .aggregate([
      { $project: { Age: 1 } },
      { $match: { $or: [{'Age': 30}, {'Age': 50}] } },
      { $group: { _id: '$Age', total: { $sum: 1 } } },
    ])
  .exec(function(err, users) {
    res.send(users);
    res.end();
  });
};

exports.readByAgeMapReduce = function(req, res) {
  var model = req.app.db.models.User;

  model
  .mapReduce(
      function() { emit( this.Age ); },
      function(key, values) { return Array.length(values) },
      {
        query: { 'Age': '30' },
        out: 'userTotals'
      }
    );
};

exports.createOne = function(req, res){
  var model = req.app.db.models.Post;
  var query = req.query;
  var post;

  post = {
    uid: '53e6d2e88c55227d75a661f6',
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
  .select('Name Email Age')
  .sort('Name')
  .exec(function(err, users) {
    
    //users.forEach(function(user) {
    //  user.Email = model.trunkEmail(user.Email);
    //});

    res.send(users);
    res.end();
  });
};








