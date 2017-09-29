function pnl_proj_descriptions(id) {
    var text = ($("#data-describ").attr("data-html"));
    return text.replace(/\$id\$/g, id)
}