/*
 ***********************************************************************************************************************
 Plugin Tab
 ***********************************************************************************************************************
 */
(function ($) {
    $.fn.tabParent = function () {
        return $(this.parents("table")[0])
    }
    $.fn.tbodyParent = function () {
        return $(this.parents("tbody")[0])
    }
    $.fn.rowParent = function () {
        return $(this.parent()[0])
    }
    $.fn.createTr = function (length) {
        var str = "<tr>"
        for (var i = 0; i < length; i++) {
            str += "<td></td>"
        }
        return str + "</tr>"
    }
    $.fn.tabWith = function () {
        return this.rowParent().children().length
    }
    $.fn.tabHeigth = function () {
        return this.tbodyParent().children().length
    }
    $.fn.insertRowBefor = function () {
        $(this).tbodyParent()[0].insertBefore($($().createTr($(this).tabWith()))[0], $(this).rowParent()[0])
    }
    $.fn.insertRowAfter = function () {
        $(this).tbodyParent()[0].insertBefore($($().createTr($(this).tabWith()))[0], $(this).rowParent()[0].nextSibling)
    }
    $.fn.insertColumnBefor = function () {
        this.tabParent().find("tr td:nth-child(" + ($(this).index() + 1) + ")").each(function () {
            $(this).before('<td></td>')
        })
    }
    $.fn.insertColumnAfter = function () {
        this.tabParent().find("tr td:nth-child(" + ($(this).index() + 1) + ")").each(function () {
            $(this).after('<td></td>')
        })
    }
    $.fn.removeRow = function () {
        console.log(this.tabHeigth())
        if (this.tabHeigth() <= 1) {
            this.removeTable()
        }
        this.rowParent().remove()
    }
    $.fn.removeColumn = function () {
        if (this.tabWith() <= 1) {
            this.removeTable()
        }
        console.log("width", $(this).tabWith())
        var str = "tr td:nth-child(" + ($(this).index() + 1) + ")"
        str += ", tr th:nth-child(" + ($(this).index() + 1) + ")"
        this.tabParent().find(str).each(function () {
            $(this).remove()
        })
    }
    $.fn.removeTable = function () {
        this.tabParent().remove()
    }
})(jQuery);