$('.title a').each(function(i,e) {
    if ($(e).text().search(/SOPA/) >= 0) {
	$(e).closest('tr').hide().next().hide().next().hide();
    }
});
