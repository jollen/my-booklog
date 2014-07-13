
/*
 * GET home page.
 */

var response = {
  "success": true,
  "errors": [],
  "errfor": {},
  "posts": [
    {
      "_id": {
        "subject": "test"
      },
      "subject": "test11111111",
      "date": "2014-07-06T06:43:39.575Z",
      "id": "53b8f01b8ceee0942f000088"
    },
    {
      "_id": {
        "subject": "1111111111111"
      },
      "subject": "1111111111111",
      "date": "2014-07-06T06:23:58.289Z",
      "id": "53b8eb7e9fef421d2e0000fd"
    },
    {
      "_id": {
        "subject": "Starting Github"
      },
      "subject": "Starting Github",
      "date": "2014-07-06T04:57:33.652Z",
      "id": "53b8d73d9fef421d2e00009b"
    },
    {
      "_id": {
        "subject": "2014/02/06 Moko365 開工大吉: 新年充電第一站，就在仕橙3G教室"
      },
      "subject": "2014/02/06 Moko365 開工大吉: 新年充電第一站，就在仕橙3G教室",
      "date": "2014-02-17T15:02:07.390Z",
      "id": "5302246f98b4052056000038"
    },
    {
      "_id": {
        "subject": "test test"
      },
      "subject": "test test",
      "date": "2014-07-06T06:30:16.466Z",
      "id": "53b8ecf88ceee0942f00003f"
    }
  ]
};


exports.readAll = function(req, res){
  res.send(response);
};

exports.createOne = function(req, res){
  var post = req.query;

  response.posts.push(post);

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








