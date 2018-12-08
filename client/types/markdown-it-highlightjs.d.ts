// Type definitions for MarkdownItContainer (markdown-it-container) 2.0
// Project: https://github.com/markdown-it/markdown-it-container
// Definitions by: Vyacheslav Demot <https://github.com/hronex>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

declare module 'markdown-it-highlightjs' {
  import MarkdownIt = require('markdown-it');
  import Renderer = require('markdown-it/lib/renderer');
  import Token = require('markdown-it/lib/token');

  namespace markdownItHighlightJs {
    interface HighlightJsOpts {
      auto?: boolean,
      code?: boolean,
    }
  
    function container_plugin(md: MarkdownIt, opts: HighlightJsOpts): void;
  }
  
  var MarkdownItHighlightJs: typeof markdownItHighlightJs.container_plugin;
  export = MarkdownItHighlightJs;
}
