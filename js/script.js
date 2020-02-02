
// $(function(){
//     // #にダブルクォーテーションが必要
//     // スムーズスクロール
//    $('a[href^="#"]').click(function() {
//     var speed = 400;
//     var href= $(this).attr("href");
//     var target = $(href == "#" || href == "" ? 'html' : href);
//     var position = target.offset().top;
//     $('body,html').animate({scrollTop:position}, speed, 'swing');
//     return false;
//     });
//  });
$(function(){
    
        $('a[href^=#]').click(function(){
            var adjust = 0;
            var speed = 400;
            var href= $(this).attr("href");
            var target = $(href == "#" || href == "" ? 'html' : href);
            var position = target.offset().top + adjust;
            $('body,html').animate({scrollTop:position}, speed, 'swing');
            return false;
        });
    
  });

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
 