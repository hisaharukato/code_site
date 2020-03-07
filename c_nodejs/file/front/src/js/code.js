import 'babel-polyfill';
import { constant } from '../constant';

const main = async () => {
  // クエリパラメータがついてなかったら
  if (!location.search) {
    location.href = '/index.html';
  }

  // highlight.js初期化
  hljs.initHighlighting();

  // リクエストを投げる
  const res = await fetch(
    `${constant.URL[process.env.NODE_ENV]}/search?${location.search.substring(
      1,
      location.search.length
    )}`,
    {
      method: 'get',
      headers: {
        Authorization: constant.AUTHORIZATION_KEY,
        'Content-Type': 'application/json'
      }
    }
  );

  if (res.status !== 200) {
    location.href = '/index.html';
    return;
  }

  const _ret = await res.json();

  // ソースコード
  document.getElementById(
    'highlight'
  ).innerHTML = `<pre style="color:#f8f8f2;background-color:#272822;-moz-tab-size:4;-o-tab-size:4;tab-size:4"><code>${
    hljs.highlight(constant.LANG[Number(_ret['genreId'])], _ret['source']).value
  }</code></pre>`;

  // タイトル
  document.getElementById('input0').value = _ret['title'];

  // 言語
  document.getElementById('input1').value =
    constant.LANG[Number(_ret['genreId'])];

  // urlコピー
  document.getElementById('url_button').addEventListener('click', e => {
    clipboard.writeText(location.href).then();
    alert('URLをコピーしました。');
  });

  // ソースコピー
  document.querySelectorAll('pre > code').forEach(function(codeBlock) {
    document
      .getElementById('source_button')
      .addEventListener('click', function() {
        clipboard.writeText(codeBlock.innerText).then();
        alert('ソースをコピーしました。');
      });
  });

  document.getElementById('input_area').style.display = 'block';
  document.getElementById('loading').style.display = 'none';
};

main();
