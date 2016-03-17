/*
 * removeOrphans, created by Colin Miller (cjmil.com, @colinjmiller on Github)
 *
 * Prevents words from appearing on their own new line.
 * window.removeOrphans(CSS selector [, parameters]);
 *
 * e.g. removeOrphans('h1, h2') -> Removes orphans from top- and second-level headings
 * 
 * parameter options:
 *   - allowedLength: If the final word in an element is beyond this length,
 *     then that element will be skipped. Useful if the last word would look
 *     okay on its own line.
 *   - siblings: Be default, the orphan will have one sibling on the new line.
 *     If more than one is required, set sibling to control how many words
 *     should accompany the orphan on the new line.
 */

;(function(window, document, undefined) {

  'use strict';

  function removeOphanFromElement(element, siblings) {
    var orphanHTML = element.innerHTML;
    var inTag = false;
    var siblingsSoFar = 0;
    for (var j = orphanHTML.length - 1; j >= 0; j--) {
      if (orphanHTML.charAt(j) === '>' || orphanHTML.charAt(j) === '<') {
        inTag = !inTag;
        continue;
      }
      if (!inTag && orphanHTML.charAt(j) === ' ') {
        var beginning = orphanHTML.substring(0, j);
        var ending = orphanHTML.substring(j + 1, orphanHTML.lenth);
        orphanHTML = beginning + '&nbsp;' + ending;
        siblingsSoFar++;
        if (siblingsSoFar >= siblings) {
          break;
        }
      }
    }
    return orphanHTML;
  }

  window.removeOrphans = function(elements, options) {
    options = options || {};
    var siblings = options.siblings || 1;
    var allowedLength = options.allowedLength || undefined;
    var orphans = document.querySelectorAll(elements);
    for (var i = 0; i < orphans.length; i++) {
      if (allowedLength) {
        // textContent not supported in IE8, fallback to non-standard innerText
        var words = (orphans[i].textContent || orphans[i].innerText).split(' ');
        if (words[words.length - 1].length < allowedLength) {
          orphans[i].innerHTML = removeOphanFromElement(orphans[i], siblings);
        }
      } else {
        orphans[i].innerHTML = removeOphanFromElement(orphans[i], siblings);
      }
    }
  };
})(window, document);
