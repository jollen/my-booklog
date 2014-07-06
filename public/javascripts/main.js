(function($) {
	$.ajax({
		dataType: 'json',
		url: 'http://booklog.io/1/post',
	    success: function(response) {
			var content = $('#content');
			var posts = response.posts;		// array
			var html = '';

			posts.forEach(function (post) {
				html += '<div class="alert alert-success">';
				html += post.subject;
				html += '</div>' 
			});

			content.html(html);
	    }
	});
}) ($);