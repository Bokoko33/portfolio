
// 現在と同じページのリンクをクリックした場合、リロードをしない設定
// リロードしたい場合は削除
//つけてるとページ内リンクがうまくいかなくなる

// var links = document.querySelectorAll('a[href]');
// var cbk = function(e) {
//   if(e.currentTarget.href === window.location.href) {
//     e.preventDefault();
//     e.stopPropagation();
//   }
// };
// for(var i = 0; i < links.length; i++) {
//   links[i].addEventListener('click', cbk);
// }

// 新しいページが準備できたときにしたい処理
Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container, newPageRawHTML) {

  if ( Barba.HistoryManager.history.length === 1 ) {  // ファーストビュー
    return; // この時に更新は必要ないです
  }

  // メタデータをリフレッシュ
  var head = document.head;
  var newPageRawHead = newPageRawHTML.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0];
  var newPageHead = document.createElement('head');
  newPageHead.innerHTML = newPageRawHead;
  var removeHeadTags = [
    "meta[name='keywords']"
    ,"meta[name='description']"
    ,"meta[property^='fb']"
    ,"meta[property^='og']"
    ,"meta[name^='twitter']"
    ,"meta[itemprop]"
    ,"link[itemprop]"
    ,"link[rel='prev']"
    ,"link[rel='next']"
    ,"link[rel='canonical']"
  ].join(',');
  var headTags = head.querySelectorAll(removeHeadTags)
  for(var i = 0; i < headTags.length; i++ ){
      head.removeChild(headTags[i]);
  }
  var newHeadTags = newPageHead.querySelectorAll(removeHeadTags)
  for(var i = 0; i < newHeadTags.length; i++ ){
      head.appendChild(newHeadTags[i]);
  }

  // 外部jsファイル読み込み
  // var script = document.createElement('script');
  // script.src = '../js/script.js';
  // document.body.appendChild(script);
  //マウスカーソルと追従
var onLink = false;
const _cursor = document.getElementById('cursor');
const _follower = document.getElementById('follower');
const linkElem = document.querySelectorAll('a'); //aタグを取得

document.addEventListener('mousemove', function (e) {
    _cursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
    _follower.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
});

for(var i=0;i<linkElem.length;i++){
    linkElem[i].addEventListener('mouseenter',function(e){
        onLink = true;
        _follower.classList.add('hov_');
    });
    linkElem[i].addEventListener('mouseout', function (e) {
        onLink= false;
        _follower.classList.remove('hov_');
    });
  }
    

  // Google Analyticsにヒットを送信
//   ga('send', 'pageview', location.pathname);

//   // document.wiriteを含む外部スクリプトを動かす
//   var scripttag = document.querySelectorAll('script');
//   // scriptそれぞれに処理
//   scripttag.forEach(function(script, i) {
//     getWritten(script.src, function(html){
//       var div = document.createElement('div');
//       div.className = 'inrjs';
//       div.innerHTML = html;
//       script.after(div);
//     });
//   });

}); // End Dispatcher


// ページ遷移トランジション
var FadeTransition = Barba.BaseTransition.extend({
  start: function() {

    // ローディングが終わるとすぐ古いページをフェードアウトさせて、新しいページをフェードイン
    Promise
      .all([this.newContainerLoading, this.fadeOut(1000)])
      .then(this.fadeIn.bind(this));
  },

  fadeOut: function() {
    return $(this.oldContainer).animate({ opacity: 0 }, { duration: 150, easing: 'swing', }).promise();
  },

  fadeIn: function() {
    // ページトップに移動（これがないとスクロールしたところのまま画面遷移する）
    // jQueryで書く場合は $(document).scrollTop(0);
    // $(document).scrollTop(0);

    //------------遷移後のスクロール位置を補正する------------------
    // ヘッダー追従かどうか
    var headerFixed = false;
    // URLに「#」が存在するか
    if(location.hash){
        var anchor = document.querySelector( location.hash );
        if(anchor){
            var rect = anchor.getBoundingClientRect();
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if(headerFixed){
                var header = document.getElementById('header');
                if(header){
                    top = top - header.clientHeight;
                }
            }
            var top = rect.top + scrollTop;
            window.scrollTo(0,top);
        }else{
        // アンカー先が存在しなければページトップに
            window.scrollTo(0,0);
        }
    }else{
    // URLに「#」が存在しなければページトップに
        window.scrollTo(0,0);
    }
    //----------------------------------------------

    var _this = this;

    // newContainerはnewContainerLoadingを解決した後に利用できる
    var $el = $(this.newContainer);

    // 古いコンテナ
    $(this.oldContainer).hide();

    // 新たに読み込まれるbarba-containerの初期設定
    // visiblityはデフォルトhiddenなのでvisibleに変える
    $el.css({
      visibility : 'visible',
      opacity : 0
    });

    $el.animate({ opacity: 1 }, 200, function() {
      // 遷移が終了したら.done()
      // .done()は自動的にDOMから古いコンテナを削除する
      _this.done();
    });
  }
});

// Barbaに作成した遷移処理を指定
Barba.Pjax.getTransition = function() {
  return FadeTransition;
};

// barbajsをON にする
// PrefetchをON にする
$().ready(function(){
   Barba.Pjax.start();
   Barba.Prefetch.init();
});
Barba.Pjax.originalPreventCheck = Barba.Pjax.preventCheck;
Barba.Pjax.preventCheck = function(evt, element) {
    if(element){

        if (!element.getAttribute('href')) {
            return false;
        }
        // 外部リンクはtarget="_blank"に
        var site_url = location.protocol + '//' + location.host;
        if (!element.href.startsWith(site_url)) {
            element.setAttribute('target','_blank');
            return false;
        }
        // アンカーリンクであり同一ページでなければbarbaを有効に
        var url = location.protocol + '//' + location.host + location.pathname;
        var extract_hash = element.href.replace(/#.*$/,"");
        if (element.href.startsWith(location.protocol + '//' + location.host)) {
            if (element.href.indexOf('#') > -1 && extract_hash != url ){
                return true;
            }
        }
        // 拡張子が該当する場合はtarget="_blank"に
        if (/\.(xlsx?|docx?|pptx?|pdf|jpe?g|png|gif|svg)/.test(element.href.toLowerCase())) {
            element.setAttribute('target','_blank');
            return false;
        }
        // 該当クラスに属していればBarbaを無効に
        var ignoreClasses = ['ab-item','custom-no-barba'];
        for (var i = 0; i < ignoreClasses.length; i++) {
            if (element.classList.contains(ignoreClasses[i])) {
                return false;
            }
        }
        if (!Barba.Pjax.originalPreventCheck(evt, element)) {
            return false;
        }
        return true;
    }
};

// function scroll(){
//     // ヘッダー追従かどうか
//     var headerFixed = false;
//     // URLに「#」が存在するか
//     if(location.hash){
//         var anchor = document.querySelector( location.hash );
//         if(anchor){
//             var rect = anchor.getBoundingClientRect();
//             var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//             if(headerFixed){
//                 var header = document.getElementById('header');
//                 if(header){
//                     top = top - header.clientHeight;
//                 }
//             }
//             var top = rect.top + scrollTop;
//             window.scrollTo(0,top);
//         }else{
//         // アンカー先が存在しなければページトップに
//             window.scrollTo(0,0);
//         }
//     }else{
//     // URLに「#」が存在しなければページトップに
//         window.scrollTo(0,0);
//     }
// }
// Barba.Dispatcher.on('transitionCompleted',scroll);

// ページ読み込み時にdocument.writeが書かれている外部スクリプトは
// 読み込まれないので、iframe上に一時的にwriteしてコールバックを受け取る
// function getWritten(fileName, callback) {
//   var $iframe = $("<iframe hidden\/>");
//   // iframe が DOM 上に存在しないとうまくいかないので一時的に出力する
//   $iframe.appendTo("body");
//   var frameDocument = $iframe[0].contentWindow.document;
//   var scriptTag = "<script src=\"" + fileName + "\"><\/script>";
//   frameDocument.open();
//   // frame 内での window.setResult に結果受信用関数を作成する
//   $iframe[0].contentWindow.setResult = function(html) {
//     // 親フレーム上から用済みの iframe を除去する
//     $iframe.remove();
//     // 取得した文字列には scriptTag が含まれているので削除してコールバックに渡す
//     callback(html.replace(scriptTag, ""));
//   };
//   frameDocument.write(
//     "<div id=\"area-to-write\">" +
//     // div タグ内に scriptTag を貼る
//     scriptTag +
//     "<\/div>" +
//     "<script>" +
//     // div タグ内に出力された文字列を setResult() に渡す
//     "setResult(document.querySelector(\"#area-to-write\").innerHTML);" +
//     "<\/script>"
//   );
//   frameDocument.close();
// }
