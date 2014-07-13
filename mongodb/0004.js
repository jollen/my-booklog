// 0004

{
    var db = connect('localhost/booklog');

    db.users.find({ Age: 50 }).forEach(function(user) {
    	user['Interests'] = ['sport', 'travel', 'reading'];

    	db.users.save(user);
    });

    print('0004-add-fields finished.')
}