function style(selector, style) {
  $('<style>' + selector + ' { ' + style + ' ! important }</style>').appendTo('head');
}

function hide(selector) {
  style(selector, 'display:none');
}
