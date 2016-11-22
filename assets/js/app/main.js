

//$(document).ready(function () {


//    $('.do-show-auth').click(function (ev) {
//        ev.preventDefault();
//        var href = $(this).attr('href');
//        checkAuth(function () {
//            location = href;
//        });
//    });
//});


//function checkAuth(fnc) {
//    if (bsAuth.user.isAuth) {
//        fnc();
//    } else {
//        //show logon
//        //$('#authPopup').addClass('show');
//        bsAuth.customOnAuthAction = fnc;
//        App.showAuth();
//    }
//};

/* NOTIFICATIONS */

//$(function () {
//    if (window['NOTIFICATIONS_COUNT'] !== undefined) {
//        setNotiCount();
//    }

//    $('body').on('click', '.do-remove-noti', function (ev) {
//        ev.preventDefault();

//        var id = $(this).attr('data-noti-id');
//        var forRemove = $(this).parent('.account-notification');

//        apiClient.removeNoti(id, function () {
//            forRemove.remove();
//        });
//    });

//    $('body').on('mouseover touchstart', '.do-read-noti', function (ev) {
//        ev.preventDefault();

//        $(this).removeClass('do-read-noti');
//        var id = $(this).attr('data-noti-id');
//        var forRead = $(this);

//        apiClient.readNoti(id, function (res) {
//            forRead.removeClass('new');
//            NOTIFICATIONS_COUNT = res.count;
//            setNotiCount();
//        });
//    });
//})

//function setNotiCount() {
//    $('.data-noti-count').html(NOTIFICATIONS_COUNT);
//    if (NOTIFICATIONS_COUNT > 0) {
//        $('.show-if-has-noti').show();
//    } else {
//        $('.show-if-has-noti').hide();
//    }
//}