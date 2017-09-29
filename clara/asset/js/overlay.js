function overlay_show(id) {
    make(function () {
        document.getElementById(id).style.display = "block";
    });
}

function overlay_hide(id) {
    document.getElementById(id).style.display = "none";
}