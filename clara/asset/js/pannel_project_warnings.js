function pnl_proj_warnings(id) {
    var text = ($("#data-warning").attr("data-html"));
    return text.replace(/\$id\$/g, id)
}
