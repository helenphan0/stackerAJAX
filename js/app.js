// this function takes the question object returned by the StackOverflow request
// and returns new result to be appended to DOM
var showQuestion = function(question) {
	
	// clone our result template code
	var result = $('.templates .question').clone();
	
	// Set the question properties in result
	var questionElem = result.find('.question-text a');
	questionElem.attr('href', question.link);
	questionElem.text(question.title);

	// set the date asked property in result
	var asked = result.find('.asked-date');
	var date = new Date(1000*question.creation_date);
	asked.text(date.toString());

	// set the .viewed for question property in result
	var viewed = result.find('.viewed');
	viewed.text(question.view_count);

	// set some properties related to asker
	var asker = result.find('.asker');
	asker.html('<p>Name: <a target="_blank" '+
		'href=http://stackoverflow.com/users/' + question.owner.user_id + ' >' +
		question.owner.display_name +
		'</a></p>' +
		'<p>Reputation: ' + question.owner.reputation + '</p>'
	);

	return result;
};


<<<<<<< HEAD
// this function takes the tag object returned by the StackOverflow request
// and returns new result to be appended to DOM
var showAnswerer = function(tag_score) {
	
	// clone our result template code
	var result = $('.templates .inspiration').clone();

	// User profile image and link to profile
	var answererElem = result.find('.answer-text a');
	answererElem.attr('href', tag_score.user.link);
	answererElem.html("<img src='" + tag_score.user.profile_image + "'>");

	// Answerer details and reputation
	var answerer = result.find('.answerer');
	answerer.html('<p>Name: <a target="_blank" '+
		'href=http://stackoverflow.com/users/' + tag_score.user.user_id + ' >' +
		tag_score.user.display_name +
		'</a></p>' +
		'<p>Reputation: ' + tag_score.user.reputation + '</p>'
	);

	// Count of posts
	var count = result.find('.post-count');
	count.text(tag_score.post_count);

	// Score
	var points = result.find('.points');
	points.text(tag_score.score);

	return result;
};


=======
>>>>>>> e1f91494b9ae5a39daee002f6f6c2c2370ec182a
// this function takes the results object from StackOverflow
// and returns the number of results and tags to be appended to DOM
var showSearchResults = function(query, resultNum) {
	var results = resultNum + ' results for <strong>' + query + '</strong>';
	return results;
};

// takes error string and turns it into displayable DOM element
var showError = function(error){
	var errorElem = $('.templates .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElem.append(errorText);
};

// takes a string of semi-colon separated tags to be searched
// for on StackOverflow
var getUnanswered = function(tags) {
	
	// the parameters we need to pass in our request to StackOverflow's API
	var request = { 
		tagged: tags,
		site: 'stackoverflow',
		order: 'desc',
		sort: 'creation'
	};
	
	$.ajax({
		url: "http://api.stackexchange.com/2.2/questions/unanswered",
		data: request,
		dataType: "jsonp",//use jsonp to avoid cross origin issues
		type: "GET",
	})
	.done(function(result){ //this waits for the ajax to return with a succesful promise object
		var searchResults = showSearchResults(request.tagged, result.items.length);

		$('.search-results').html(searchResults);
		//$.each is a higher order function. It takes an array and a function as an argument.
		//The function is executed once for each item in the array.
		$.each(result.items, function(i, item) {
			var question = showQuestion(item);
			$('.results').append(question);
		});
	})
	.fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});
};

<<<<<<< HEAD
var getInspired = function(tags) {
	
	// the parameters we need to pass in our request to StackOverflow's API
	var request = { 
		site: 'stackoverflow'
	};
	
	$.ajax({
		url: "http://api.stackexchange.com/2.2/tags/"+tags+"/top-answerers/all_time",
		data: request,
		dataType: "jsonp",//use jsonp to avoid cross origin issues
		type: "GET",
	})
	.done(function(result){ //this waits for the ajax to return with a succesful promise object
		var searchResults = showSearchResults(tags, result.items.length);

		$('.search-results').html(searchResults);
		//$.each is a higher order function. It takes an array and a function as an argument.
		//The function is executed once for each item in the array.
		$.each(result.items, function(i, item) {
			var question = showAnswerer(item);
			$('.results').append(question);
		});
	})
	.fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});
};

=======
>>>>>>> e1f91494b9ae5a39daee002f6f6c2c2370ec182a

$(document).ready( function() {
	$('.unanswered-getter').submit( function(e){
		e.preventDefault();
		// zero out results if previous search has run
		$('.results').html('');
		// get the value of the tags the user submitted
		var tags = $(this).find("input[name='tags']").val();
		getUnanswered(tags);
	});
<<<<<<< HEAD
	$('.inspiration-getter').submit( function(event){
		event.preventDefault();
		// zero out results if previous search has run
		$('.results').html('');
		// get the value of the tags the user submitted
		var tags = $(this).find("input[name='answerers']").val();
		getInspired(tags);
	});
=======
>>>>>>> e1f91494b9ae5a39daee002f6f6c2c2370ec182a
});
