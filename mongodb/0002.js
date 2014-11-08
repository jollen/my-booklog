// 0002

{
    var db = connect('localhost/booklog');

    db.users.save({
      "Name": "jollen",
      "Phone": "1234567890",
      "Email": "jollen@jollen.org",
      "Address": "Taipei, Taiwan",
      "Age": 30
    });

    print('0002-create-one-document finished.')
}