function overlay_show(id) {
    make(function () {
        $("#page2 > iframe").attr("src", "sujet.html");
        document.getElementById(id).style.display = "block";
    });
}

function overlay_hide(id) {
    document.getElementById(id).style.display = "none";
}