import 'babel-polyfill';
import { constant } from '../constant';

const main = () => {
  let textarea0_len = 1;

  /*
   * デバイス確認
   */
  const get_device = () => {
    const ua = navigator.userAgent;
    if (
      ua.indexOf('iPhone') > 0 ||
      ua.indexOf('iPod') > 0 ||
      (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)
    ) {
      return 'sp';
    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
      return 'tab';
    } else {
      return 'other';
    }
  };

  /*
   * テキストエリアに入力された時の処理
   */
  const text_area_method = () => {
    textarea0_len = document.getElementById('textarea0').value.split('\n')
      .length;
    if (textarea0_len < 7) {
      document.getElementById('textarea0').rows = 7;
    }

    if (textarea0_len > 7) {
      document.getElementById('textarea0').rows = textarea0_len;
    }
  };

  // スマホならreturn
  if (get_device() !== 'sp') {
    document.getElementById('textarea0').addEventListener('change', e => {
      text_area_method();
    });

    document.getElementById('textarea0').addEventListener('keyup', e => {
      text_area_method();
    });
  }

  document.getElementById('button0').addEventListener('click', async e => {
    if (!confirm('送信しますか？')) {
      return;
    }

    // バリデーション
    if (!Number.isInteger(Number(document.getElementById('select0').value))) {
      alert('不正な処理がされました。');
      return;
    }

    if (document.getElementById('input0').value.length === 0) {
      alert('タイトルが入力されていません。');
      return;
    }

    if (document.getElementById('input0').value.length > 15) {
      alert('タイトルは15文字以内です。');
      return;
    }

    if (document.getElementById('textarea0').value.length === 0) {
      alert('ソースコードが入力されていません。');
      return;
    }

    if (document.getElementById('textarea0').value.length > 2000) {
      alert('ソースコードは2000文字以内です。');
      return;
    }

    // ローディング
    document.getElementById('input_area').style.display = 'none';
    document.getElementById('loading').style.display = 'block';

    // postリクエストを投げる
    const _res = await fetch(`${constant.URL[process.env.NODE_ENV]}/post`, {
      method: 'post',
      headers: {
        Authorization: constant.AUTHORIZATION_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        genreId: Number(document.getElementById('select0').value),
        title: document.getElementById('input0').value,
        source: document.getElementById('textarea0').value
      })
    }).catch(err => {});

    if (_res.status !== 200) {
      alert('不正な操作をされました。');
      return;
    }

    const _ret = await _res.json();
    location.href = `/code.html?q=${_ret['q']}`;
  });
};

main();
