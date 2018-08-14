'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const md = require('markdown-it')();
const slugify = require('transliteration').slugify;
const striptags = require('./strip-tags');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const wrap = function (render) {
  return function () {
    return render.apply(this, arguments)
      .replace('<code v-pre class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">');
  };
};
function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, $0 => String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16)));
  return str;
}
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './examples/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('examples'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('examples'), resolve('test'), resolve('packages')]
      },
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options: {
          use: [
            [require('markdown-it-anchor'), {
              level: 2,
              slugify,
              permalink: true,
              permalinkBefore: true
            }],
            [require('markdown-it-container'), 'demo', {
              validate(params) {
                return params.trim().match(/^demo\s*(.*)$/);
              },

              render(tokens, idx) {
                const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
                if (tokens[idx].nesting === 1) {
                  const description = (m && m.length > 1) ? m[1] : '';
                  const content = tokens[idx + 1].content;
                  const html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1');
                  const script = striptags.fetch(content, 'script');
                  const style = striptags.fetch(content, 'style');
                  let jsfiddle = { html, script, style };
                  const descriptionHTML = description
                    ? md.render(description)
                    : '';

                  jsfiddle = md.utils.escapeHtml(JSON.stringify(jsfiddle));

                  return `<div class="demo-box" :jsfiddle="${jsfiddle}">
                            <div class="source" slot="source">${html}</div>
                            ${descriptionHTML}
                            <div class="highlight" slot="highlight">`;
                }
                return '</div></div>\n';
              }
            }],
            [require('markdown-it-container'), 'tip'],
            [require('markdown-it-container'), 'warning']
          ],
          preprocess(MarkdownIt, source) {
            MarkdownIt.renderer.rules.table_open = function () {
              return '<table class="table">';
            };
            MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence);
            return source;
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
