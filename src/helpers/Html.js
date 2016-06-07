import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
// require.ensure("../utils/ueditor.config.js");
// require.ensure("../utils/ueditor.all.js");

export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object,
  };

  render() {
    const {assets, component, store} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();
console.log('assets =>>>>>',assets);
    return (
      <html lang="en-us">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          <script src="/static/lib/ueditor.config.js" />
          <script src="/static/lib/ueditor.all.js" />
          <script src="/static/lib/zh-cn.js" />

          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="stylesheet" href="/static/css/antd.min.css" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script src="https://as.alipayobjects.com/g/component/??console-polyfill/0.2.2/index.js,es5-shim/4.5.7/es5-shim.min.js,es5-shim/4.5.7/es5-sham.min.js,html5shiv/3.7.2/html5shiv.min.js,media-match/2.0.2/media.match.min.js"></script>
        
         </head>
        <body>
        { Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{__html: assets.assets["./src/containers/main.scss"]._style}}/> : null }
          <div id="content" dangerouslySetInnerHTML={{__html: content}} />
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
          <script src={assets.javascript.main} charSet="UTF-8"/>
        </body>
      </html>
    );
  }
}