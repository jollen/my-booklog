// 0006

{
    var db = connect('localhost/booklog');

    db.posts.mapReduce(
		function() { 
			emit( this.uid, 1 ); 	
		},
		function(key, values) { 
			return Array.sum(values);
		},
		{
			out: 'userPosts'
		}
    );

    print('0006-users-posts-mapreduce finished.')
}