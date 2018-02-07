var intervalViews = null;
var intervalPrice = null;

var skills = {
	"Programming paradigms": ["Imperative Programming", "Object-Oriented Programming (OOP)", "Functional Programming (FP)"],
	"Programming languages": ["Python", "Java", "Ruby", "C", "C++", "VB.NET", "C#", "Apache Spark using Scala"],
	"Web technologies, Frameworks & Libraries": ["Node.js (NodeJS)", "Ruby On Rails (RoR)", "Javascript (JS)", "TypeScript", "HTML5", "PHP", "jQuery", "AJAX", "JSON", "CSS3", "SASS", "lodash", "React", "Redux", "SDL", "OpenGL", "PAlib (for Nintendo DS)"],
	"Version Control and Package Management Systems": ["Git (multi-branch workflow through the CLI, GitHub, Bitbucket)", "NPM"],
	"Databases, Caches and Messages Brokers": ["SQL", "Redis", "MongoDB", "RabbitMQ"],
	"Architectures": ["Reactive Microservices", "Model-View-Controller (MVC)"],
	"Concepts & Trends": ["Machine Learning (ML)", "Deep Learning", "Artificial Intelligence (AI)", "Recommendation Systems", "Big Data", "Human-Machine Interface"],
	"Operating systems": ["Linux (command line)", "macOS", "Windows"],
	"Best Practices and Other Tools": [
		"Test-Driven Development (TDD) (RSpec, Mocha, Chai)",
		"Deployment (Kubernetes, Google Cloud Platform (GCP), Amazon Web Services (AWS)",
		"Continuous Integration (CI) (Wercker)",
		"Containerization (Docker)",
		"A/B Testing (AB Testing) (Optimizely)",
		"Business Intelligence (BI) Tools (Looker, BigQuery)",
		"Alerting and Monitoring (Prometheus and Grafana)",
		"Code Review (GitHub)",
		"Pair Programming",
		"Agile methodologies",
		"Algorithms", 
		"Data Structures"
	],
};

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function createNotification(imageSrc, colorClass, text) {
	var notificationTemplate = $("#notification_template");
	$("#notifications").prepend(notificationTemplate.html().replace("{image_src}", imageSrc).replace("{color_class}", colorClass).replace("{notification_content}", text));
	document.getElementById("notification_circle").style.display = "inline-block";
}

function noNotifications() {
	return document.getElementById("notifications").innerText == "";
}

function notificationBellHit() {
	if (noNotifications()) {
		createNotification("assets/notification-bell.svg.png", "blue", "If you have some new notifications, they will pop-up on the top right-hand corner");
	}
	else {
		createNotification("assets/notification-bell.svg.png", "blue", "It seems like you already have some notifications to check!");
	}
}

function escapeRegExp(string){
	return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function createMatchingSearchRegex(string, pluralize) {
	var regex = '\\b';
	regex += escapeRegExp(string);
	if (pluralize && string[string.length - 1].toLowerCase() != 's')
		regex += 's';
	regex += '\(\?\!\\w)';
	return regex;
}

$(document).ready(function() {
	intervalPrice = setInterval(function() {
		var minNumber = 1;
		var maxNumber = 15;
		$("#price_raw_value").html(parseInt($("#price_raw_value").html()) + Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber));
	}, 1000);
	
	intervalViews = setInterval(function() {
		var minNumber = 1;
		var maxNumber = 3;
		var action = "viewed";
		var text = $("#trendy_text").html();
		var number = parseInt(text);
		text = text.substring(text.indexOf(action));
		number += Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
		if (number > 31 && text.indexOf("month") > -1) {
			number = 1;
			text = action + " per day";
		}
		else if (number > 24 && text.indexOf("day") > -1) {
			number = 1;
			text = action + " per hour";
		}
		else if (number > 60 && text.indexOf("hour") > -1) {
			number = 1;
			text = action + " per minute";
		}
		else if (number > 60 && text.indexOf("minute") > -1) {
			number = 1;
			text = action + " per second";
		}
		$("#trendy_text").html(number + " " + text);
	}, 900);
	
	setTimeout(function () { createNotification("assets/notification-bell.svg.png", "blue", "To be done") }, 10000);
	
	setCookie("exit-intent", 0, 365);
	var modal = document.getElementById("exit_intent_modal");
	createNotification("assets/notification-bell.svg.png", "blue", "To be done");

	$("#thumbs *").hover(function() {
		$("#main_picture").attr("src", $(this).attr("src"));
	}, function() {
		$("#main_picture").attr("src", $(".current_displayed_picture").attr("src"));
	});
	
	$("#thumbs *").click(function() {
		$("#main_picture").attr("src", $(this).attr("src"));
		$(".current_displayed_picture").removeClass("current_displayed_picture");
		$(this).addClass("current_displayed_picture");
	});
	
	$(".fake_link").hover(function() {
		$(this).css("color", "rgb(6, 84, 205)");
		$(this).css("cursor", "pointer");
	}, function() {
		$(this).css("color", "black");
		$(this).css("cursor", "auto");
	});
	
	$("#notification_bell").hover(function() {
		$(this).css("cursor", "pointer");
	}, function() {
		$(this).css("cursor", "auto");
	});
	
	$("#notification_circle").hover(function() {
		$(this).css("cursor", "pointer");
	}, function() {
		$(this).css("cursor", "auto");
	});
	
	$(".details_body_content_block").hover(function() {
		$(this).addClass("grey_border");
	}, function() {
		$(this).removeClass("grey_border");
	});
	
	$("#notifications").on("click", ".a_notification", function() {
		$(this).remove();
		if (noNotifications()) {
			document.getElementById("notification_circle").style.display = "none";
		}
	});
	var selectDiv = $("#categories");
	
	for (domainSkill in skills) {
		if (skills.hasOwnProperty(domainSkill)) {
			var option = document.createElement("option");
			option.value = domainSkill;
			option.text = domainSkill;
			selectDiv.append(option);
		}
	}
	
	$("#notification_bell").click(notificationBellHit);
	$("#notification_circle").click(notificationBellHit);
	
	$("#search_button").click(function() {
		var successText = "That's a match! I do have the following skill(s)";
		var search = $("#category_text_search").val().trim();
		if (search.toUpperCase() !== "C" && search.length < 2) {
			createNotification("assets/alert.png", "orange", "Please type at least 2 characters in the search bar before hitting the 'Search' button");
			return;
		}

		var regex = createMatchingSearchRegex(search, false);

		var matchingResults = [];
		var category = $("#categories").find(":selected").text();
		var bypassCategoryCheck = category.indexOf("All Skills") > -1;
		
		for (domainSkill in skills)
			if (skills.hasOwnProperty(domainSkill) && (domainSkill.indexOf(category) > -1 || bypassCategoryCheck))
				for (var i = 0 ; i < skills[domainSkill].length ; i++)
					if (new RegExp(regex, "i").test(skills[domainSkill][i]))
						matchingResults.push(skills[domainSkill][i]);
		
		if (matchingResults.length > 0) {
			createNotification("assets/magnify.svg.png", "green", successText + ": " + matchingResults.join(", "));
			return;
		}
		if (!bypassCategoryCheck) {
			for (domainSkill in skills)
				if (skills.hasOwnProperty(domainSkill))
					for (var i = 0 ; i < skills[domainSkill].length ; i++)
						if (new RegExp(regex, "i").test(skills[domainSkill][i]))
							matchingResults.push(skills[domainSkill][i]);
			if (matchingResults.length > 0) {
				createNotification("assets/magnify.svg.png", "green", "The category that has been picked didn't lead to any matching results, but we changed the category for you to include them all! " +  successText + ": " + matchingResults.join(", "));
				return;
			}
		}
		regex = createMatchingSearchRegex(search, true);
		for (domainSkill in skills)
			if (skills.hasOwnProperty(domainSkill))
				if (new RegExp(regex, "i").test(domainSkill)) {
					createNotification("assets/magnify.svg.png", "green", successText + " in the '" + domainSkill + "' category: " + skills[domainSkill].join(", "));
					return;
				}
		createNotification("assets/magnify.svg.png", "orange", "It seems like I don't have the skill you looked for, even by including all the categories. Maybe that's an exciting skill I could learn with your company!");
	});
	
	$(document).on('mouseleave', function (e) {
		if (e.clientY < 0 || e.clientX < 0 || e.clientX > innerWidth) {
			var exitIntentCookie = getCookie("exit-intent");
			if (exitIntentCookie == "0") {
				modal.style.display = "block";
				setCookie("exit-intent", 1, 1);
			}
		}
	});
	
	$("#exit_intent_modal_close").click(function() {
		modal.style.display = "none";
	});
	
	$("#quantity_field").change(function () {
		createNotification("assets/alert.png", "orange", "This item is unique, you can't order more than one Sébastien Branly");
		$("#quantity_field").val("1");
	});
	
	$(window).click(function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	});
});

$(document).on('close', function () {
	clearInterval(intervalViews);
	clearInterval(intervalPrice);
});