var current_page;

window.onload = setup;

function setup() {
    jsh.get("#content").classList.remove("transparent");

    var nav_items = jsh.get(".nav_item");
    for (var i in nav_items) {
        if (!nav_items.hasOwnProperty(i)) continue;
        nav_items[i].addEventListener("click", function(e) {
            if (e.target.parentNode.tagName.toLowerCase() != "a") {
                jsh.pages[e.target.innerHTML].open();
            }
            move_mobile_tray(true);
        });
    }

    var project_images = jsh.get(".projects_page_image");
    for (i in project_images) {
        if (!project_images.hasOwnProperty(i)) continue;
        project_images[i].addEventListener("click", function(e) {
            var height = e.target.clientHeight;
            var width = e.target.clientWidth;
            var ratio = e.target.naturalWidth / e.target.naturalHeight;

            e.target.style.height = (height == 250) ? (width / ratio) + "px" : "250px";
        });
    }

    jsh.get("#mobile_nav_button").addEventListener("click", function() {
        move_mobile_tray();
    });

    jsh.get("#mobile_nav_button").addEventListener("touchstart", function(e) {
        var moved = false;

        var nav = jsh.get("#nav");
        var content = jsh.get("#content");

        var move_listener = function(e) {
            var displacement = Math.max((e.pageX - window.innerWidth), -200);
            nav.style.transform = "translateX(" + displacement + "px)";
            content.style.transform = "translateX(" + displacement + "px)";

            moved = true;
            e.preventDefault();
        };

        var end_listener = function(e) {
            e.target.removeEventListener("touchmove", move_listener);
            e.target.removeEventListener("touchend", end_listener);
            nav.style.transform = "";
            nav.style.transition = "";
            content.style.transform = "";
            content.style.transition = "";
            if (moved) {
                move_mobile_tray();
            }
        };

        e.target.addEventListener("touchmove", move_listener);
        e.target.addEventListener("touchend", end_listener);
        nav.style.transition = "none";
        content.style.transition = "none";
    });

    if (location.href.indexOf('#') == -1) {
        jsh.pages.rsvp.open();
    }

}

function move_mobile_tray(close) {
    var nav = jsh.get("#nav");
    if (nav.classList.contains("show_nav")) {
        nav.classList.remove("show_nav");
    } else if (!close) {
        nav.classList.add("show_nav");
    }
}
