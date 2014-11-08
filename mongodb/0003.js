// 0003

{
    var db = connect('localhost/booklog');

    db.users.find({ Address: /Nullam/ }).forEach(function(user) {
    	print(JSON.stringify(user));
    });

    print('0003-regular-expression finished.')
}