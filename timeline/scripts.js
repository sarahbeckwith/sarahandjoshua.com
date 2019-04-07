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

    var scrollSettings = {top: artifact.offsetTop - 10, behavior: "smooth"};
    window.scrollTo(scrollSettings);
    artifact.classList.add("active");
    setTimeout(function() {
    	window.scrollTo(scrollSettings);
    }, 500);
}

window.addEventListener("DOMContentLoaded", function() {
    var artifacts = document.getElementsByClassName("artifact");
    for (var i = 0; i < artifacts.length; i++) {
    	artifacts[i].addEventListener("click", handleArtifactClick);
    }
});