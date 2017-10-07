function pnl_proj_steps(id) {
    var text = ($("#data-step").attr("data-html"));
    return text.replace(/\$id\$/g, id)
}