function pnl_proj_dangers(id) {
    var text = ($("#data-danger").attr("data-html"));
    return text.replace(/\$id\$/g, id)
}