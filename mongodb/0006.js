// 0006

{
    var db = connect('localhost/booklog');

    db.posts.mapReduce(
		function() { 
			emit( this.uid, this._id ); 	
		},
		function(key, values) { 
			return values.length;
		},
		{
			out: 'userPosts'
		}
    );

    print('0006-users-posts-mapreduce finished.')
}