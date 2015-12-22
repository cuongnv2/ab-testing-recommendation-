$(document).ready(function(){	
	var chosenVariation = cxApi.chooseVariation();
	if (chosenVariation === 0)
	{
		$("#status").append("There is no recommendation in B version")		
	}
	else {	
      var sortedData = [];
		 var sortedDataLevel2=[];
        var limitNo = 5;
        var articleId = 3331326;
		var url = "http://123.30.108.126/vnexpress/recommend/" + articleId + "?limit=" + limitNo + "&secret_key=htqLhxV|l3/Q86D";
		$("#status").append("This is A version <br/>")	
        $.ajax({
			 type: "GET",
			 url: url, 
			 contentType: "application/json; charset=utf-8",
			 dataType: "json",
			 success: function (data, status, jqXHR) {	
				$.each(data, function(i, lineResult) {
					var full_api = "http://api3.vnexpress.net/api/article?type=get_full&article_id=" + lineResult.first + "&select=title,share_url,publish_time&app_id=4c02ca";
					
					$.ajax({
					 type: "GET",
					 url: full_api,					 
					 contentType: "application/json; charset=utf-8",
					 dataType: "json",
					 success: function (data, status, jqXHR) {	
						data.data.weight = lineResult.second;
						data.data.created_date = data.data.publish_time * 1000;
						sortedData.push(data);										
						if (sortedData.length == limitNo) {						
										
							sortedData.sort(function(a, b){
								return a.data.weight - b.data.weight;
							});		
									
							for (var counter = 0; counter < 5; counter++) {								
								sortedDataLevel2.push(sortedData[counter]);							
								
							}
							sortedDataLevel2.sort(function(a, b){
								return b.data.created_date - a.data.created_date;
							});	
							
							for (var counter1 = 0; counter1 < 5; counter1++) {	
												
								$("#status").append("<a href='" + sortedDataLevel2[counter1].data.share_url + "'>" + sortedDataLevel2[counter1].data.title +"</a><br/>");
							}
							
							//$("#loading-indicator").hide();
						}
					 }
				 })				
			 });	
				
				// $("#loading-indicator").hide();
			 },
			 error: function (jqXHR, status) {
				$("#status").append("http://123.30.108.126/vnexpress/recommend/" + articleId + "?limit=100&secret_key=htqLhxV|l3/Q86D");		 
			 }
		});
	}	
});	