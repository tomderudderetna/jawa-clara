function overlay_show(id) {
    make(function () {
        $( "#page2 > iframe" ).attr("src",$( "#page2 > iframe" ).attr("src"))
        document.getElementById(id).style.display = "block";
    });
}

function overlay_hide(id) {
    document.getElementById(id).style.display = "none";
}