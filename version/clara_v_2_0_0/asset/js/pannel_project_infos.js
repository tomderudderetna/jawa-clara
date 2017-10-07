function pnl_proj_infos(id) {
    var text = ($("#data-info").attr("data-html"));
    return text.replace(/\$id\$/g, id)
}