// 0005

{
    var db = connect('localhost/booklog');

    db.users.mapReduce(
		function() { 
			emit( this.Age, this.Name ); 	
		},
		function(key, values) { 
			return values.length;
		},
		{
			query: { $or: [{'Age': 30}, {'Age': 50}] },
			out: 'userTotals'
		}
    );

	/*
	Result:

	> db.userTotals.find()
	{ "_id" : 30, "value" : 21 }
	> 
	*/

    print('0005-users-mapreduce finished.')
}