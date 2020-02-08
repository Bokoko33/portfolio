$(document).on('click', 'a[href*="#"]', function(event) {
    // if(location.origin.indexOf('work_')){
    //     location.href = 'index.html' + document.getElementsByTagName('a')[0].getAttribute('href');
    //     return true;
    // }
    // else{
    //     var adjust = 0;
    //     var speed = 400;
    //     var position = $(anchor.hash).offset().top + adjust;
    //     $('body,html').animate({ scrollTop: position }, speed, 'swing');
    //     event.preventDefault();
    //     // location.href = anchor.href;
    //     return false;
    // }

    var anchor = event.currentTarget;

    if (anchor.target !== '' && anchor.target !== window.name) {
        return true;
    }

    var documentUrl = location.origin + location.pathname + location.search;
    var anchorUrl = anchor.protocol + '//' + anchor.host + anchor.pathname + anchor.search;
    if (documentUrl !== anchorUrl) {
        return true;
    }

    if (anchor.hash !== '') {
        var adjust = 0;
        var speed = 400;
        var position = $(anchor.hash).offset().top + adjust;
        $('body,html').animate({ scrollTop: position }, speed, 'swing');
        event.preventDefault();
        location.hash = anchor.hash;
        return false;
    }
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
 