/*
** NOTE: This file is generated by Gulp and should not be edited directly!
** Any changes made directly to this file will be overwritten next time its asset group is processed by Gulp.
*/

var liquidTags = ['if', 'else', 'elseif', 'endif', 'render', 'assign', 'capture', 'endcapture', 'case', 'endcase', 'comment', 'endcomment', 'cycle', 'decrement', 'for', 'endfor', 'include', 'increment', 'layout', 'raw', 'endraw', 'render', 'tablerow', 'endtablerow', 'unless', 'endunless'];
var liquidFilters = ['abs', 'append', 'at_least', 'at_most', 'capitalize', 'ceil', 'compact', 'date', 'default', 'divided_by', 'downcase', 'escape', 'escape_once', 'first', 'floor', 'join', 'json', 'last', 'lstrip', 'map', 'minus', 'modulo', 'newline_to_br', 'plus', 'prepend', 'remove', 'remove_first', 'replace', 'replace_first', 'reverse', 'round', 'rstrip', 'size', 'slice', 'sort', 'sort_natural', 'split', 'strip', 'strip_html', 'strip_newlines', 'times', 'truncate', 'truncatewords', 'uniq', 'upcase', 'url_decode', 'url_encode', 'where'];
function getLiquidContextInfo(model, position, triggerCharacter) {
  var inTag;
  var inObject;
  var showTags;
  var showFilters;
  var findStart = model.findPreviousMatch('\\{(%|\\{)', position, true, false, null, true);
  if (findStart && findStart.matches && !position.isBefore(findStart.range.getEndPosition())) {
    if (findStart.matches[1] == '%') {
      inTag = true;
    } else if (findStart.matches[1] == '{') {
      inObject = true;
    }
    var searchPattern = inTag ? '%}' : '}}';
    var findEnd = model.findNextMatch(searchPattern, position, false, false, null, true);
    var currentRange = findStart.range.plusRange(findEnd.range);
    if (currentRange.containsPosition(position)) {
      if (inTag) {
        var findTagName = model.findNextMatch('\\{%\\s*([a-zA-Z-_]+)', findStart.range.getStartPosition(), true, false, null, true);
        if (findTagName && currentRange.containsRange(findTagName.range) && findTagName.matches.length > 1) {
          if (findTagName.matches[1] == 'assign') {
            showFilters = true;
          } else {
            showTags = false;
          }
        } else {
          showTags = true;
        }
      } else {
        showFilters = true;
      }
    }
  }
  return {
    showFilters: showFilters,
    showTags: showTags,
    inTag: inTag,
    inObject: inObject
  };
}
var completionItemProvider = {
  triggerCharacters: [' '],
  provideCompletionItems: function provideCompletionItems(model, position, context, token) {
    var items = [];
    if (context.triggerCharacter == ' ') {
      var startTrigger = model.getValueInRange(new monaco.Range(position.lineNumber, position.column - 3, position.lineNumber, position.column - 1));
      if (startTrigger != '{%' && !startTrigger.endsWith('|')) {
        return null;
      }
    }
    var liquidContext = getLiquidContextInfo(model, position, context.triggerCharacter);
    if (liquidContext.showFilters) {
      items = liquidFilters;
    } else if (liquidContext.showTags) {
      items = liquidTags.filter(function (value) {
        return !value.startsWith('end');
      });
    }
    var suggestions = items.map(function (value) {
      return {
        label: value,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: value,
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
      };
    });
    return {
      suggestions: suggestions
    };
  }
};
function ConfigureLiquidIntellisense(monaco, suggestHtml) {
  if (suggestHtml === void 0) {
    suggestHtml = true;
  }
  if (suggestHtml) {
    var modeConfiguration = {
      completionItems: true,
      colors: true,
      foldingRanges: true,
      selectionRanges: true,
      diagnostics: false,
      documentFormattingEdits: true,
      documentRangeFormattingEdits: true
    };
    var options = {
      format: monaco.languages.html.htmlDefaults.options.format,
      suggest: {
        html5: true
      }
    };
    monaco.languages.html.registerHTMLLanguageService('liquid', options, modeConfiguration);
  }
  monaco.languages.registerCompletionItemProvider('liquid', completionItemProvider);
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpcXVpZC1pbnRlbGxpc2Vuc2UudHMiLCJsaXF1aWQtaW50ZWxsaXNlbnNlLmpzIl0sIm5hbWVzIjpbImxpcXVpZFRhZ3MiLCJsaXF1aWRGaWx0ZXJzIiwiZ2V0TGlxdWlkQ29udGV4dEluZm8iLCJtb2RlbCIsInBvc2l0aW9uIiwidHJpZ2dlckNoYXJhY3RlciIsImluVGFnIiwiaW5PYmplY3QiLCJzaG93VGFncyIsInNob3dGaWx0ZXJzIiwiZmluZFN0YXJ0IiwiZmluZFByZXZpb3VzTWF0Y2giLCJtYXRjaGVzIiwiaXNCZWZvcmUiLCJyYW5nZSIsImdldEVuZFBvc2l0aW9uIiwic2VhcmNoUGF0dGVybiIsImZpbmRFbmQiLCJmaW5kTmV4dE1hdGNoIiwiY3VycmVudFJhbmdlIiwicGx1c1JhbmdlIiwiY29udGFpbnNQb3NpdGlvbiIsImZpbmRUYWdOYW1lIiwiZ2V0U3RhcnRQb3NpdGlvbiIsImNvbnRhaW5zUmFuZ2UiLCJsZW5ndGgiLCJjb21wbGV0aW9uSXRlbVByb3ZpZGVyIiwidHJpZ2dlckNoYXJhY3RlcnMiLCJwcm92aWRlQ29tcGxldGlvbkl0ZW1zIiwiY29udGV4dCIsInRva2VuIiwiaXRlbXMiLCJzdGFydFRyaWdnZXIiLCJnZXRWYWx1ZUluUmFuZ2UiLCJtb25hY28iLCJSYW5nZSIsImxpbmVOdW1iZXIiLCJjb2x1bW4iLCJlbmRzV2l0aCIsImxpcXVpZENvbnRleHQiLCJmaWx0ZXIiLCJ2YWx1ZSIsInN0YXJ0c1dpdGgiLCJzdWdnZXN0aW9ucyIsIm1hcCIsImxhYmVsIiwia2luZCIsImxhbmd1YWdlcyIsIkNvbXBsZXRpb25JdGVtS2luZCIsIktleXdvcmQiLCJpbnNlcnRUZXh0IiwiaW5zZXJ0VGV4dFJ1bGVzIiwiQ29tcGxldGlvbkl0ZW1JbnNlcnRUZXh0UnVsZSIsIktlZXBXaGl0ZXNwYWNlIiwiQ29uZmlndXJlTGlxdWlkSW50ZWxsaXNlbnNlIiwic3VnZ2VzdEh0bWwiLCJtb2RlQ29uZmlndXJhdGlvbiIsImNvbXBsZXRpb25JdGVtcyIsImNvbG9ycyIsImZvbGRpbmdSYW5nZXMiLCJzZWxlY3Rpb25SYW5nZXMiLCJkaWFnbm9zdGljcyIsImRvY3VtZW50Rm9ybWF0dGluZ0VkaXRzIiwiZG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdFZGl0cyIsIm9wdGlvbnMiLCJmb3JtYXQiLCJodG1sIiwiaHRtbERlZmF1bHRzIiwic3VnZ2VzdCIsImh0bWw1IiwicmVnaXN0ZXJIVE1MTGFuZ3VhZ2VTZXJ2aWNlIiwicmVnaXN0ZXJDb21wbGV0aW9uSXRlbVByb3ZpZGVyIl0sIm1hcHBpbmdzIjoiOzs7OztBQUVBLElBQU1BLFVBQVUsR0FBRyxDQUNmLElBQUksRUFDSixNQUFNLEVBQ04sUUFBUSxFQUNSLE9BQU8sRUFDUCxRQUFRLEVBQ1IsUUFBUSxFQUNSLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsWUFBWSxFQUNaLE9BQU8sRUFDUCxXQUFXLEVBQ1gsS0FBSyxFQUNMLFFBQVEsRUFDUixTQUFTLEVBQ1QsV0FBVyxFQUNYLFFBQVEsRUFDUixLQUFLLEVBQ0wsUUFBUSxFQUNSLFFBQVEsRUFDUixVQUFVLEVBQ1YsYUFBYSxFQUNiLFFBQVEsRUFDUixXQUFXLENBQ2Q7QUFFRCxJQUFNQyxhQUFhLEdBQUcsQ0FDbEIsS0FBSyxFQUNMLFFBQVEsRUFDUixVQUFVLEVBQ1YsU0FBUyxFQUNULFlBQVksRUFDWixNQUFNLEVBQ04sU0FBUyxFQUNULE1BQU0sRUFDTixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixRQUFRLEVBQ1IsYUFBYSxFQUNiLE9BQU8sRUFDUCxPQUFPLEVBQ1AsTUFBTSxFQUNOLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxFQUNSLEtBQUssRUFDTCxPQUFPLEVBQ1AsUUFBUSxFQUNSLGVBQWUsRUFDZixNQUFNLEVBQ04sU0FBUyxFQUNULFFBQVEsRUFDUixjQUFjLEVBQ2QsU0FBUyxFQUNULGVBQWUsRUFDZixTQUFTLEVBQ1QsT0FBTyxFQUNQLFFBQVEsRUFDUixNQUFNLEVB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ZEosQ0RlQztBQUVELFNBQVNXLDJCQUEyQkEsQ0FBQ3BCLE1BQVcsRUFBRXFCLFdBQTJCLEVBQUE7RUFBM0IsSUFBQUEsV0FBQSxLQUFBLEtBQUEsQ0FBQSxFQUFBO0lBQUFBLFdBQUEsR0FBQSxJQUEyQjtFQUFBO0VBQ3pFLElBQUlBLFdBQVcsRUFBRTtJQUNiLElBQUlDLGlCQUFpQixHQUE0QztNQUM3REMsZUFBZSxFQUFFLElBQUk7TUFDckJDLE1BQU0sRUFBRSxJQUFJO01BQ1pDLGFBQWEsRUFBRSxJQUFJO01BQ25CQyxlQUFlLEVBQUUsSUFBSTtNQUNyQkMsV0FBVyxFQUFFLEtBQUs7TUFDbEJDLHVCQUF1QixFQUFFLElBQUk7TUFDN0JDLDRCQUE0QixFQUFFO0lDZGxDLENEZUM7SUFDRCxJQUFJQyxPQUFPLEdBQWtDO01BQ3pDQyxNQUFNLEVBQUUvQixNQUFNLENBQUNhLFNBQVMsQ0FBQ21CLElBQUksQ0FBQ0MsWUFBWSxDQUFDSCxPQUFPLENBQUNDLE1BQU07TUFDekRHLE9BQU8sRUFBRTtRQUFFQyxLQUFLLEVBQUU7TUFBSTtJQ2QxQixDRGVDO0lBQ0RuQyxNQUFNLENBQUNhLFNBQVMsQ0FBQ21CLElBQUksQ0FBQ0ksMkJBQTJCLENBQUMsUUFBUSxFQUFFTixPQUFPLEVBQUVSLGlCQUFpQixDQUFDO0VBQzNGO0VBRUF0QixNQUFNLENBQUNhLFNBQVMsQ0FBQ3dCLDhCQUE4QixDQUFDLFFBQVEsRUFBRTdDLHNCQUFzQixDQUFDO0FBQ3JGIiwiZmlsZSI6ImxpcXVpZC1pbnRlbGxpc2Vuc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbm9kZV9tb2R1bGVzL21vbmFjby1lZGl0b3IvbW9uYWNvLmQudHNcIiAvPlxyXG5cclxuY29uc3QgbGlxdWlkVGFncyA9IFtcclxuICAgICdpZicsXHJcbiAgICAnZWxzZScsXHJcbiAgICAnZWxzZWlmJyxcclxuICAgICdlbmRpZicsXHJcbiAgICAncmVuZGVyJyxcclxuICAgICdhc3NpZ24nLFxyXG4gICAgJ2NhcHR1cmUnLFxyXG4gICAgJ2VuZGNhcHR1cmUnLFxyXG4gICAgJ2Nhc2UnLFxyXG4gICAgJ2VuZGNhc2UnLFxyXG4gICAgJ2NvbW1lbnQnLFxyXG4gICAgJ2VuZGNvbW1lbnQnLFxyXG4gICAgJ2N5Y2xlJyxcclxuICAgICdkZWNyZW1lbnQnLFxyXG4gICAgJ2ZvcicsXHJcbiAgICAnZW5kZm9yJyxcclxuICAgICdpbmNsdWRlJyxcclxuICAgICdpbmNyZW1lbnQnLFxyXG4gICAgJ2xheW91dCcsXHJcbiAgICAncmF3JyxcclxuICAgICdlbmRyYXcnLFxyXG4gICAgJ3JlbmRlcicsXHJcbiAgICAndGFibGVyb3cnLFxyXG4gICAgJ2VuZHRhYmxlcm93JyxcclxuICAgICd1bmxlc3MnLFxyXG4gICAgJ2VuZHVubGVzcydcclxuXTtcclxuXHJcbmNvbnN0IGxpcXVpZEZpbHRlcnMgPSBbXHJcbiAgICAnYWJzJyxcclxuICAgICdhcHBlbmQnLFxyXG4gICAgJ2F0X2xlYXN0JyxcclxuICAgICdhdF9tb3N0JyxcclxuICAgICdjYXBpdGFsaXplJyxcclxuICAgICdjZWlsJyxcclxuICAgICdjb21wYWN0JyxcclxuICAgICdkYXRlJyxcclxuICAgICdkZWZhdWx0JyxcclxuICAgICdkaXZpZGVkX2J5JyxcclxuICAgICdkb3duY2FzZScsXHJcbiAgICAnZXNjYXBlJyxcclxuICAgICdlc2NhcGVfb25jZScsXHJcbiAgICAnZmlyc3QnLFxyXG4gICAgJ2Zsb29yJyxcclxuICAgICdqb2luJyxcclxuICAgICdqc29uJyxcclxuICAgICdsYXN0JyxcclxuICAgICdsc3RyaXAnLFxyXG4gICAgJ21hcCcsXHJcbiAgICAnbWludXMnLFxyXG4gICAgJ21vZHVsbycsXHJcbiAgICAnbmV3bGluZV90b19icicsXHJcbiAgICAncGx1cycsXHJcbiAgICAncHJlcGVuZCcsXHJcbiAgICAncmVtb3ZlJyxcclxuICAgICdyZW1vdmVfZmlyc3QnLFxyXG4gICAgJ3JlcGxhY2UnLFxyXG4gICAgJ3JlcGxhY2VfZmlyc3QnLFxyXG4gICAgJ3JldmVyc2UnLFxyXG4gICAgJ3JvdW5kJyxcclxuICAgICdyc3RyaXAnLFxyXG4gICAgJ3NpemUnLFxyXG4gICAgJ3NsaWNlJyxcclxuICAgICdzb3J0JyxcclxuICAgICdzb3J0X25hdHVyYWwnLFxyXG4gICAgJ3NwbGl0JyxcclxuICAgICdzdHJpcCcsXHJcbiAgICAnc3RyaXBfaHRtbCcsXHJcbiAgICAnc3RyaXBfbmV3bGluZXMnLFxyXG4gICAgJ3RpbWVzJyxcclxuICAgICd0cnVuY2F0ZScsXHJcbiAgICAndHJ1bmNhdGV3b3JkcycsXHJcbiAgICAndW5pcScsXHJcbiAgICAndXBjYXNlJyxcclxuICAgICd1cmxfZGVjb2RlJyxcclxuICAgICd1cmxfZW5jb2RlJyxcclxuICAgICd3aGVyZSdcclxuXVxyXG5cclxuaW50ZXJmYWNlIElMaXF1aWRDb250ZXh0SW5mbyB7XHJcbiAgICBzaG93RmlsdGVyczogYm9vbGVhbixcclxuICAgIHNob3dUYWdzOiBib29sZWFuLFxyXG4gICAgaW5jbHVkZUVuZFRhZ3M6IGJvb2xlYW4sXHJcbiAgICBpblRhZzogYm9vbGVhbixcclxuICAgIGluT2JqZWN0OiBib29sZWFuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldExpcXVpZENvbnRleHRJbmZvKG1vZGVsOiBtb25hY28uZWRpdG9yLklUZXh0TW9kZWwsIHBvc2l0aW9uOiBtb25hY28uUG9zaXRpb24sIHRyaWdnZXJDaGFyYWN0ZXI6IHN0cmluZyk6IElMaXF1aWRDb250ZXh0SW5mbyB7XHJcbiAgICB2YXIgaW5UYWc6IGJvb2xlYW47XHJcbiAgICB2YXIgaW5PYmplY3Q6IGJvb2xlYW47XHJcbiAgICB2YXIgc2hvd1RhZ3M6IGJvb2xlYW47XHJcbiAgICB2YXIgc2hvd0ZpbHRlcnM6IGJvb2xlYW47XHJcblxyXG4gICAgdmFyIGZpbmRTdGFydCA9IG1vZGVsLmZpbmRQcmV2aW91c01hdGNoKCdcXFxceyglfFxcXFx7KScsIHBvc2l0aW9uLCB0cnVlLCBmYWxzZSwgbnVsbCwgdHJ1ZSk7XHJcbiAgICBpZiAoZmluZFN0YXJ0ICYmIGZpbmRTdGFydC5tYXRjaGVzICYmICFwb3NpdGlvbi5pc0JlZm9yZShmaW5kU3RhcnQucmFuZ2UuZ2V0RW5kUG9zaXRpb24oKSkpIHtcclxuICAgICAgICBpZiAoZmluZFN0YXJ0Lm1hdGNoZXNbMV0gPT0gJyUnKSB7XHJcbiAgICAgICAgICAgIGluVGFnID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGZpbmRTdGFydC5tYXRjaGVzWzFdID09ICd7Jykge1xyXG4gICAgICAgICAgICBpbk9iamVjdCA9IHRydWVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzZWFyY2hQYXR0ZXJuID0gaW5UYWcgPyAnJX0nIDogJ319JztcclxuICAgICAgICB2YXIgZmluZEVuZCA9IG1vZGVsLmZpbmROZXh0TWF0Y2goc2VhcmNoUGF0dGVybiwgcG9zaXRpb24sIGZhbHNlLCBmYWxzZSwgbnVsbCwgdHJ1ZSk7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRSYW5nZSA9IGZpbmRTdGFydC5yYW5nZS5wbHVzUmFuZ2UoZmluZEVuZC5yYW5nZSk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRSYW5nZS5jb250YWluc1Bvc2l0aW9uKHBvc2l0aW9uKSkge1xyXG4gICAgICAgICAgICBpZiAoaW5UYWcpIHtcclxuICAgICAgICAgICAgICAgIHZhciBmaW5kVGFnTmFtZSA9IG1vZGVsLmZpbmROZXh0TWF0Y2goJ1xcXFx7JVxcXFxzKihbYS16QS1aLV9dKyknLCBmaW5kU3RhcnQucmFuZ2UuZ2V0U3RhcnRQb3NpdGlvbigpLCB0cnVlLCBmYWxzZSwgbnVsbCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmluZFRhZ05hbWUgJiYgY3VycmVudFJhbmdlLmNvbnRhaW5zUmFuZ2UoZmluZFRhZ05hbWUucmFuZ2UpICYmIGZpbmRUYWdOYW1lLm1hdGNoZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5kVGFnTmFtZS5tYXRjaGVzWzFdID09ICdhc3NpZ24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dGaWx0ZXJzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93VGFncyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd1RhZ3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2hvd0ZpbHRlcnMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2hvd0ZpbHRlcnMsXHJcbiAgICAgICAgc2hvd1RhZ3MsXHJcbiAgICAgICAgaW5UYWcsXHJcbiAgICAgICAgaW5PYmplY3RcclxuICAgIH0gYXMgSUxpcXVpZENvbnRleHRJbmZvO1xyXG59XHJcblxyXG5jb25zdCBjb21wbGV0aW9uSXRlbVByb3ZpZGVyOiBtb25hY28ubGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtUHJvdmlkZXIgPSB7XHJcbiAgICB0cmlnZ2VyQ2hhcmFjdGVyczogWycgJ10sXHJcbiAgICBwcm92aWRlQ29tcGxldGlvbkl0ZW1zOiAobW9kZWw6IG1vbmFjby5lZGl0b3IuSVRleHRNb2RlbCwgcG9zaXRpb246IG1vbmFjby5Qb3NpdGlvbiwgY29udGV4dDogbW9uYWNvLmxhbmd1YWdlcy5Db21wbGV0aW9uQ29udGV4dCwgdG9rZW46IG1vbmFjby5DYW5jZWxsYXRpb25Ub2tlbikgPT4ge1xyXG4gICAgICAgIHZhciBpdGVtczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRleHQudHJpZ2dlckNoYXJhY3RlciA9PSAnICcpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0VHJpZ2dlciA9IG1vZGVsLmdldFZhbHVlSW5SYW5nZShuZXcgbW9uYWNvLlJhbmdlKHBvc2l0aW9uLmxpbmVOdW1iZXIsIHBvc2l0aW9uLmNvbHVtbiAtIDMsIHBvc2l0aW9uLmxpbmVOdW1iZXIsIHBvc2l0aW9uLmNvbHVtbiAtIDEpKTtcclxuICAgICAgICAgICAgaWYgKHN0YXJ0VHJpZ2dlciAhPSAneyUnICYmICFzdGFydFRyaWdnZXIuZW5kc1dpdGgoJ3wnKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBsaXF1aWRDb250ZXh0OiBJTGlxdWlkQ29udGV4dEluZm8gPSBnZXRMaXF1aWRDb250ZXh0SW5mbyhtb2RlbCwgcG9zaXRpb24sIGNvbnRleHQudHJpZ2dlckNoYXJhY3Rlcik7XHJcbiAgICAgICAgaWYgKGxpcXVpZENvbnRleHQuc2hvd0ZpbHRlcnMpIHtcclxuICAgICAgICAgICAgaXRlbXMgPSBsaXF1aWRGaWx0ZXJzO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGlxdWlkQ29udGV4dC5zaG93VGFncykge1xyXG4gICAgICAgICAgICBpdGVtcyA9IGxpcXVpZFRhZ3MuZmlsdGVyKCh2YWx1ZTogc3RyaW5nKSA9PiB7IHJldHVybiAhdmFsdWUuc3RhcnRzV2l0aCgnZW5kJykgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzdWdnZXN0aW9ucyA9IGl0ZW1zLm1hcCgodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6IHZhbHVlLFxyXG4gICAgICAgICAgICAgICAga2luZDogbW9uYWNvLmxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcclxuICAgICAgICAgICAgICAgIGluc2VydFRleHQ6IHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgaW5zZXJ0VGV4dFJ1bGVzOiBtb25hY28ubGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtSW5zZXJ0VGV4dFJ1bGUuS2VlcFdoaXRlc3BhY2VcclxuICAgICAgICAgICAgfSBhcyBtb25hY28ubGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB7IHN1Z2dlc3Rpb25zIH0gYXMgbW9uYWNvLmxhbmd1YWdlcy5Qcm92aWRlclJlc3VsdDxtb25hY28ubGFuZ3VhZ2VzLkNvbXBsZXRpb25MaXN0PjtcclxuICAgIH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIENvbmZpZ3VyZUxpcXVpZEludGVsbGlzZW5zZShtb25hY286IGFueSwgc3VnZ2VzdEh0bWw6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICBpZiAoc3VnZ2VzdEh0bWwpIHtcclxuICAgICAgICB2YXIgbW9kZUNvbmZpZ3VyYXRpb246IG1vbmFjby5sYW5ndWFnZXMuaHRtbC5Nb2RlQ29uZmlndXJhdGlvbiA9IHtcclxuICAgICAgICAgICAgY29tcGxldGlvbkl0ZW1zOiB0cnVlLFxyXG4gICAgICAgICAgICBjb2xvcnM6IHRydWUsXHJcbiAgICAgICAgICAgIGZvbGRpbmdSYW5nZXM6IHRydWUsXHJcbiAgICAgICAgICAgIHNlbGVjdGlvblJhbmdlczogdHJ1ZSxcclxuICAgICAgICAgICAgZGlhZ25vc3RpY3M6IGZhbHNlLFxyXG4gICAgICAgICAgICBkb2N1bWVudEZvcm1hdHRpbmdFZGl0czogdHJ1ZSxcclxuICAgICAgICAgICAgZG9jdW1lbnRSYW5nZUZvcm1hdHRpbmdFZGl0czogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIG9wdGlvbnM6IG1vbmFjby5sYW5ndWFnZXMuaHRtbC5PcHRpb25zID0ge1xyXG4gICAgICAgICAgICBmb3JtYXQ6IG1vbmFjby5sYW5ndWFnZXMuaHRtbC5odG1sRGVmYXVsdHMub3B0aW9ucy5mb3JtYXQsXHJcbiAgICAgICAgICAgIHN1Z2dlc3Q6IHsgaHRtbDU6IHRydWUgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBtb25hY28ubGFuZ3VhZ2VzLmh0bWwucmVnaXN0ZXJIVE1MTGFuZ3VhZ2VTZXJ2aWNlKCdsaXF1aWQnLCBvcHRpb25zLCBtb2RlQ29uZmlndXJhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgbW9uYWNvLmxhbmd1YWdlcy5yZWdpc3RlckNvbXBsZXRpb25JdGVtUHJvdmlkZXIoJ2xpcXVpZCcsIGNvbXBsZXRpb25JdGVtUHJvdmlkZXIpO1xyXG59XHJcbiIsInZhciBsaXF1aWRUYWdzID0gW1xuICAgICdpZicsXG4gICAgJ2Vsc2UnLFxuICAgICdlbHNlaWYnLFxuICAgICdlbmRpZicsXG4gICAgJ3JlbmRlcicsXG4gICAgJ2Fzc2lnbicsXG4gICAgJ2NhcHR1cmUnLFxuICAgICdlbmRjYXB0dXJlJyxcbiAgICAnY2FzZScsXG4gICAgJ2VuZGNhc2UnLFxuICAgICdjb21tZW50JyxcbiAgICAnZW5kY29tbWVudCcsXG4gICAgJ2N5Y2xlJyxcbiAgICAnZGVjcmVtZW50JyxcbiAgICAnZm9yJyxcbiAgICAnZW5kZm9yJyxcbiAgICAnaW5jbHVkZScsXG4gICAgJ2luY3JlbWVudCcsXG4gICAgJ2xheW91dCcsXG4gICAgJ3JhdycsXG4gICAgJ2VuZHJhdycsXG4gICAgJ3JlbmRlcicsXG4gICAgJ3RhYmxlcm93JyxcbiAgICAnZW5kdGFibGVyb3cnLFxuICAgICd1bmxlc3MnLFxuICAgICdlbmR1bmxlc3MnXG5dO1xudmFyIGxpcXVpZEZpbHRlcnMgPSBbXG4gICAgJ2FicycsXG4gICAgJ2FwcGVuZCcsXG4gICAgJ2F0X2xlYXN0JyxcbiAgICAnYXRfbW9zdCcsXG4gICAgJ2NhcGl0YWxpemUnLFxuICAgICdjZWlsJyxcbiAgICAnY29tcGFjdCcsXG4gICAgJ2RhdGUnLFxuICAgICdkZWZhdWx0JyxcbiAgICAnZGl2aWRlZF9ieScsXG4gICAgJ2Rvd25jYXNlJyxcbiAgICAnZXNjYXBlJyxcbiAgICAnZXNjYXBlX29uY2UnLFxuICAgICdmaXJzdCcsXG4gICAgJ2Zsb29yJyxcbiAgICAnam9pbicsXG4gICAgJ2pzb24nLFxuICAgICdsYXN0JyxcbiAgICAnbHN0cmlwJyxcbiAgICAnbWFwJyxcbiAgICAnbWludXMnLFxuICAgICdtb2R1bG8nLFxuICAgICduZXdsaW5lX3RvX2JyJyxcbiAgICAncGx1cycsXG4gICAgJ3ByZXBlbmQnLFxuICAgICdyZW1vdmUnLFxuICAgICdyZW1vdmVfZmlyc3QnLFxuICAgICdyZXBsYWNlJyxcbiAgICAncmVwbGFjZV9maXJzdCcsXG4gICAgJ3JldmVyc2UnLFxuICAgICdyb3VuZCcsXG4gICAgJ3JzdHJpcCcsXG4gICAgJ3NpemUnLFxuICAgICdzbGljZScsXG4gICAgJ3NvcnQnLFxuICAgICdzb3J0X25hdHVyYWwnLFxuICAgICdzcGxpdCcsXG4gICAgJ3N0cmlwJyxcbiAgICAnc3RyaXBfaHRtbCcsXG4gICAgJ3N0cmlwX25ld2xpbmVzJyxcbiAgICAndGltZXMnLFxuICAgICd0cnVuY2F0ZScsXG4gICAgJ3RydW5jYXRld29yZHMnLFxuICAgICd1bmlxJyxcbiAgICAndXBjYXNlJyxcbiAgICAndXJsX2RlY29kZScsXG4gICAgJ3VybF9lbmNvZGUnLFxuICAgICd3aGVyZSdcbl07XG5mdW5jdGlvbiBnZXRMaXF1aWRDb250ZXh0SW5mbyhtb2RlbCwgcG9zaXRpb24sIHRyaWdnZXJDaGFyYWN0ZXIpIHtcbiAgICB2YXIgaW5UYWc7XG4gICAgdmFyIGluT2JqZWN0O1xuICAgIHZhciBzaG93VGFncztcbiAgICB2YXIgc2hvd0ZpbHRlcnM7XG4gICAgdmFyIGZpbmRTdGFydCA9IG1vZGVsLmZpbmRQcmV2aW91c01hdGNoKCdcXFxceyglfFxcXFx7KScsIHBvc2l0aW9uLCB0cnVlLCBmYWxzZSwgbnVsbCwgdHJ1ZSk7XG4gICAgaWYgKGZpbmRTdGFydCAmJiBmaW5kU3RhcnQubWF0Y2hlcyAmJiAhcG9zaXRpb24uaXNCZWZvcmUoZmluZFN0YXJ0LnJhbmdlLmdldEVuZFBvc2l0aW9uKCkpKSB7XG4gICAgICAgIGlmIChmaW5kU3RhcnQubWF0Y2hlc1sxXSA9PSAnJScpIHtcbiAgICAgICAgICAgIGluVGFnID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmaW5kU3RhcnQubWF0Y2hlc1sxXSA9PSAneycpIHtcbiAgICAgICAgICAgIGluT2JqZWN0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2VhcmNoUGF0dGVybiA9IGluVGFnID8gJyV9JyA6ICd9fSc7XG4gICAgICAgIHZhciBmaW5kRW5kID0gbW9kZWwuZmluZE5leHRNYXRjaChzZWFyY2hQYXR0ZXJuLCBwb3NpdGlvbiwgZmFsc2UsIGZhbHNlLCBudWxsLCB0cnVlKTtcbiAgICAgICAgdmFyIGN1cnJlbnRSYW5nZSA9IGZpbmRTdGFydC5yYW5nZS5wbHVzUmFuZ2UoZmluZEVuZC5yYW5nZSk7XG4gICAgICAgIGlmIChjdXJyZW50UmFuZ2UuY29udGFpbnNQb3NpdGlvbihwb3NpdGlvbikpIHtcbiAgICAgICAgICAgIGlmIChpblRhZykge1xuICAgICAgICAgICAgICAgIHZhciBmaW5kVGFnTmFtZSA9IG1vZGVsLmZpbmROZXh0TWF0Y2goJ1xcXFx7JVxcXFxzKihbYS16QS1aLV9dKyknLCBmaW5kU3RhcnQucmFuZ2UuZ2V0U3RhcnRQb3NpdGlvbigpLCB0cnVlLCBmYWxzZSwgbnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbmRUYWdOYW1lICYmIGN1cnJlbnRSYW5nZS5jb250YWluc1JhbmdlKGZpbmRUYWdOYW1lLnJhbmdlKSAmJiBmaW5kVGFnTmFtZS5tYXRjaGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbmRUYWdOYW1lLm1hdGNoZXNbMV0gPT0gJ2Fzc2lnbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dGaWx0ZXJzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dUYWdzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dUYWdzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaG93RmlsdGVycyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2hvd0ZpbHRlcnM6IHNob3dGaWx0ZXJzLFxuICAgICAgICBzaG93VGFnczogc2hvd1RhZ3MsXG4gICAgICAgIGluVGFnOiBpblRhZyxcbiAgICAgICAgaW5PYmplY3Q6IGluT2JqZWN0XG4gICAgfTtcbn1cbnZhciBjb21wbGV0aW9uSXRlbVByb3ZpZGVyID0ge1xuICAgIHRyaWdnZXJDaGFyYWN0ZXJzOiBbJyAnXSxcbiAgICBwcm92aWRlQ29tcGxldGlvbkl0ZW1zOiBmdW5jdGlvbiAobW9kZWwsIHBvc2l0aW9uLCBjb250ZXh0LCB0b2tlbikge1xuICAgICAgICB2YXIgaXRlbXMgPSBbXTtcbiAgICAgICAgaWYgKGNvbnRleHQudHJpZ2dlckNoYXJhY3RlciA9PSAnICcpIHtcbiAgICAgICAgICAgIHZhciBzdGFydFRyaWdnZXIgPSBtb2RlbC5nZXRWYWx1ZUluUmFuZ2UobmV3IG1vbmFjby5SYW5nZShwb3NpdGlvbi5saW5lTnVtYmVyLCBwb3NpdGlvbi5jb2x1bW4gLSAzLCBwb3NpdGlvbi5saW5lTnVtYmVyLCBwb3NpdGlvbi5jb2x1bW4gLSAxKSk7XG4gICAgICAgICAgICBpZiAoc3RhcnRUcmlnZ2VyICE9ICd7JScgJiYgIXN0YXJ0VHJpZ2dlci5lbmRzV2l0aCgnfCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpcXVpZENvbnRleHQgPSBnZXRMaXF1aWRDb250ZXh0SW5mbyhtb2RlbCwgcG9zaXRpb24sIGNvbnRleHQudHJpZ2dlckNoYXJhY3Rlcik7XG4gICAgICAgIGlmIChsaXF1aWRDb250ZXh0LnNob3dGaWx0ZXJzKSB7XG4gICAgICAgICAgICBpdGVtcyA9IGxpcXVpZEZpbHRlcnM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobGlxdWlkQ29udGV4dC5zaG93VGFncykge1xuICAgICAgICAgICAgaXRlbXMgPSBsaXF1aWRUYWdzLmZpbHRlcihmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuICF2YWx1ZS5zdGFydHNXaXRoKCdlbmQnKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN1Z2dlc3Rpb25zID0gaXRlbXMubWFwKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogdmFsdWUsXG4gICAgICAgICAgICAgICAga2luZDogbW9uYWNvLmxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZCxcbiAgICAgICAgICAgICAgICBpbnNlcnRUZXh0OiB2YWx1ZSxcbiAgICAgICAgICAgICAgICBpbnNlcnRUZXh0UnVsZXM6IG1vbmFjby5sYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1JbnNlcnRUZXh0UnVsZS5LZWVwV2hpdGVzcGFjZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7IHN1Z2dlc3Rpb25zOiBzdWdnZXN0aW9ucyB9O1xuICAgIH1cbn07XG5mdW5jdGlvbiBDb25maWd1cmVMaXF1aWRJbnRlbGxpc2Vuc2UobW9uYWNvLCBzdWdnZXN0SHRtbCkge1xuICAgIGlmIChzdWdnZXN0SHRtbCA9PT0gdm9pZCAwKSB7IHN1Z2dlc3RIdG1sID0gdHJ1ZTsgfVxuICAgIGlmIChzdWdnZXN0SHRtbCkge1xuICAgICAgICB2YXIgbW9kZUNvbmZpZ3VyYXRpb24gPSB7XG4gICAgICAgICAgICBjb21wbGV0aW9uSXRlbXM6IHRydWUsXG4gICAgICAgICAgICBjb2xvcnM6IHRydWUsXG4gICAgICAgICAgICBmb2xkaW5nUmFuZ2VzOiB0cnVlLFxuICAgICAgICAgICAgc2VsZWN0aW9uUmFuZ2VzOiB0cnVlLFxuICAgICAgICAgICAgZGlhZ25vc3RpY3M6IGZhbHNlLFxuICAgICAgICAgICAgZG9jdW1lbnRGb3JtYXR0aW5nRWRpdHM6IHRydWUsXG4gICAgICAgICAgICBkb2N1bWVudFJhbmdlRm9ybWF0dGluZ0VkaXRzOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgICAgZm9ybWF0OiBtb25hY28ubGFuZ3VhZ2VzLmh0bWwuaHRtbERlZmF1bHRzLm9wdGlvbnMuZm9ybWF0LFxuICAgICAgICAgICAgc3VnZ2VzdDogeyBodG1sNTogdHJ1ZSB9XG4gICAgICAgIH07XG4gICAgICAgIG1vbmFjby5sYW5ndWFnZXMuaHRtbC5yZWdpc3RlckhUTUxMYW5ndWFnZVNlcnZpY2UoJ2xpcXVpZCcsIG9wdGlvbnMsIG1vZGVDb25maWd1cmF0aW9uKTtcbiAgICB9XG4gICAgbW9uYWNvLmxhbmd1YWdlcy5yZWdpc3RlckNvbXBsZXRpb25JdGVtUHJvdmlkZXIoJ2xpcXVpZCcsIGNvbXBsZXRpb25JdGVtUHJvdmlkZXIpO1xufVxuIl19