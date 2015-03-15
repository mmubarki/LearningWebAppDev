var main = function(){
"use strict";
$("#choice").on("change",
			function(event){
				if($("#choice option:selected").text()!="select"){
					$("#gameForm").attr("action","/play/"+$("#choice option:selected").text());
					$("#gameForm").submit();
				}
			}
);
setInterval(
	function fetchGameResult(){
		$.ajax({
				url:"/gameResult",
				error : function () {
							$("#result").empty();$("#result").text("error ajax call");
				},dataType: "json",
				success: function (data) {
							var className="tie";
							if(data.outcome.indexOf("WIN") ===0)className="win";
							if(data.outcome.indexOf("LOSS") ===0)className="loss";
 							$("#result").addClass(className);
 							$("#result").empty();
							$("#result").append("<p>"+data.outcome+"</p>");
							$("#result").append("<p>WINS:"+data.wins+"  LOSSES:"+
												data.losses+"  TIES:"+data.ties+"</p>");
				},type: "post"
		});
	},200);
};
$(document).ready(main);