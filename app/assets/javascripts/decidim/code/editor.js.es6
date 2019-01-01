// = require_self
// = require ./bundle

window.DecidimCode =  window.DecidimCode || {};

$(() => {
  const { renderEditors } = window.DecidimCode;
  renderEditors('[data-plugin="editor"]');
});
