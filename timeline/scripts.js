function handleArtifactClick(event) {
	var artifact = event.target;
	while (!artifact.classList.contains("artifact")) artifact = artifact.parentNode;

	if (artifact.classList.contains("active")) {
		artifact.classList.remove("active");
		return;
	}

	var artifacts = document.getElementsByClassName("artifact");
    for (var i = 0; i < artifacts.length; i++) {
    	artifacts[i].classList.remove("active");
    }

    window.scrollTo({top: artifact.offsetTop - 10, behavior: "smooth"});
    artifact.classList.add("active");
    setTimeout(function() {
    	window.scrollTo({top: artifact.offsetTop - 10, behavior: "smooth"});
    }, 500);
}

function handleSectionTitleClick(event) {
    var sectionTitle = event.target;
    var contents = sectionTitle.parentNode.querySelector(".contents");
    contents.classList.toggle("expanded");
}

window.addEventListener("DOMContentLoaded", function() {
    var artifacts = document.getElementsByClassName("artifact");
    for (var i = 0; i < artifacts.length; i++) {
    	artifacts[i].addEventListener("click", handleArtifactClick);
    }

    var sections = document.querySelectorAll(".section > .title");
    for (var i = 0; i < sections.length; i++) {
        sections[i].addEventListener("click", handleSectionTitleClick);
    }
});