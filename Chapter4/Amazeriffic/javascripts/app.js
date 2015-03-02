var main = function () {
    var toDos = ["Get groceries",
                 "Make up some new ToDos",
                 "Prep for Monday's class",
                 "Answer emails",
                 "Take Gracie to the park",
                 "Finish writing this book"];

    $(".tabs a span").toArray().forEach(function (element) {
        var $element = $(element);

        // create a click handler for this element
        $element.on("click", function () {
            var $content,
                $input,
                $button,
                i;

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
                // newest first, so we have to go through
                // the array backwards
                $content = $("<ul>");
                for (i = toDos.length-1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
            } else if ($element.parent().is(":nth-child(2)")) {
                // oldest first, so we go through the array forwards
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
            } else if ($element.parent().is(":nth-child(3)")) {
                // input a new to-do
                $input = $("<input>"),
                $button = $("<button>").text("+");

                $button.on("click", function () {
                    if ($input.val() !== "") {
                        toDos.push($input.val());
                        $input.val("");
                    }
                });

                $content = $("<div>").append($input).append($button);
               /* Alternatively append() allows multiple arguments so the above
                can be done with $content = $("<div>").append($input, $button); */
            }else if ($element.parent().is(":nth-child(4)")) {
                //Demonstration tab
                // add screenshots 
                $content = $("<div>").append(addLink('screenshots/newest.png', 'newest page')).
                    append(addLink('screenshots/oldest.png', 'oldest page')).
                    append(addLink('screenshots/add.png', 'add page')).
                    append(addLink('screenshots/newest_add.png', 'newest add page'));
    
            }

            $("main .content").append($content);
            // after append tap to main .content, it have to call colorbox inside function onclicked for tab. 
            $('a.screenshots').colorbox({rel:'screenshots', slideshow:true});


            return false;
        });
    });
    function addLink(imageURL, title){
        return $("<p>").append($("<a>").addClass("screenshots").attr("href",imageURL).text(title).attr("title",title));
    }
    $(".tabs a:first-child span").trigger("click");

};

// This call for step 8: Create a web page using 
//the Colorbox plugin to show your four screenshots as a slideshow.
$('a.screenshots').colorbox({rel:'screenshots', slideshow:true});

$(document).ready(main);
