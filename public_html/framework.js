var current_page;

window.onload = setup;

function setup() {
    jsh.get("#content").classList.remove("transparent");

    var nav_items = jsh.get(".nav_item");
    for (var i in nav_items) {
        if (!nav_items.hasOwnProperty(i)) continue;
        nav_items[i].addEventListener("click", function(e) {
            if (e.target.parentNode.tagName.toLowerCase() != "a") {
                open_page(e.target.innerHTML + "_page");
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

    if ("onhashchange" in window) {
        window.addEventListener("hashchange", on_hash_change);
    }
    on_hash_change();
}

function open_page(page_div_id) {
    if (page_div_id.length > 2 && page_div_id[1] == "/") {
        open_page(page_div_id.slice(2));
        return;
    }

    if (page_div_id == "terminal_page") {
        terminal.open();
        return
    }

    if (page_div_id == "404_page") {
        setTimeout(function() {
            alert("I have no idea where that page went, so I'm taking you back home. Sorry about that.", "Oops!", {button_text: "no worries, dude"});
        }, 1000);
        return open_page("home_page");
    } else if (page_div_id == "403_page") {
        setTimeout(function() {
            alert("You don't have permission to view this page. " +
                "If you're looking for a way to hack me, " +
                "I would recommend browsing through the " +
                "<a href=\"https://github.com/dotjoshua/joshua.diaddigo.com\">source code</a> " +
                "of this website for a vulnerability.",
                "Hm...", {button_text: "cool, thanks"});
        }, 1000);
        return open_page("home_page");
    }

    if (jsh.get("#" + page_div_id) == undefined) {
        alert("Page does not exist.", "Oops!");
        return;
    }

    if (current_page == page_div_id) {
        return;
    }

    current_page = page_div_id;

    var pages = jsh.get(".page");
    for (var i in pages) {
        if (!pages.hasOwnProperty(i)) continue;
        pages[i].classList.add("transparent");
        pages[i].classList.remove(pages[i].id + "_loading");
    }

    setTimeout(function() {
        var pages = jsh.get(".page");
        for (var i in pages) {
            if (!pages.hasOwnProperty(i)) continue;
            pages[i].classList.add("display_none");
        }

        jsh.get("#" + page_div_id).classList.remove("display_none");
        jsh.get("#" + page_div_id).classList.add(page_div_id + "_loading");
        setTimeout(function() {
            jsh.get("#" + page_div_id).classList.remove("transparent");
        }, 10);

        setTimeout(function() {
            window.dispatchEvent(new Event('page_opened'));
        }, 500);
    }, 500);

    window.location.hash = page_div_id.substring(0, page_div_id.length - 5);
}

function on_hash_change() {
    if (location.href.indexOf('#') != -1) {
        open_page(location.href.substring(location.href.indexOf("#") + 1) + "_page");
    } else {
        open_page("home_page");
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
