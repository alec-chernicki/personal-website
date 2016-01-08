export default function (element, func) {
  $(element).one('load', func)
    .each( function() {
      if (this.complete || /*for IE 10-*/ $(this).height() > 0) {
        $(this).load();
      }
    });
};
