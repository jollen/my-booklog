(function($) {
	var jsonCallback = function(msg) {
		alert(msg);
	};

	$.ajax({
		dataType: 'json',
		url: 'http://booklog.io/1/post',
	    success: function(response) {
			var content = $('#content');
			var posts = response.posts;		// array
			var html = '';

			posts.forEach(function (post) {
				html += '<h2>';
				html += post.subject;
				html += '</h2>' 
			});

			content.html(html);
	    }
	});
}) ($);