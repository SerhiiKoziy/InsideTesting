var apiClient = {


    // --- PARICIPATE

    AUTH_EMAIL: '/webapi/auth/registerEmail',
    ADD_POINT: '/webapi/participate/addPoint',
    //SAVE_SHARE: '/webapi/participate/saveShared',
    GET_USER_INFO: '/webapi/participate/getUserInfo',
    LOGOUT: '/webapi/auth/logout',

    data: {},

    authSn: function(sn, onComplete, onCancel) {
        bsAuth.showAuthDialog(sn.toLowerCase(), null, function () {
            console.log('Auth', 'success');
            onComplete();
        }.bind(self), function () {
            console.log('Auth', 'fail');
            onCancel();
        });
    },
    authEmail: function (name, email, onComplete, onFail) {
        // after email sent we should show user appropriate message 
        // in email will be a link like this /#start (according to react route implementation)
        var self = this;

        $.post(self.AUTH_EMAIL, { name: name, email: email }, function (resp) {
            onComplete(resp);
        }).fail(function (err) {
            console.log(err);
            if (onFail)
                onFail();
        });
    },

    addPoint:function(num, lat, lon, onComplete, onFail) {
        // num is location number, from 1 to 5
        var self = this;

        $.post(self.ADD_POINT, { num: num, lat: lat, lon: lon }, function (resp) {
            onComplete(resp);
        }).fail(function (err) {
            console.log(err);
            if (onFail)
                onFail();
        });
    },

    getUserInfo: function (onComplete, onFail) {
        // num is location number, from 1 to 5
        var self = this;

        $.get(self.GET_USER_INFO, { }, function (resp) {
            onComplete(resp);
        }).fail(function (err) {
            console.log(err);
            if (onFail)
                onFail();
        });
    },

    //saveShare: function (sessionId, onComplete) {

    //    var self = this;

    //    //bsAuth.showAuthDialog(sn.toLowerCase(), null, function () {
    //    //    console.log('Auth', 'success');

    //        $.post(self.SAVE_SHARE, { SessionId: sessionId}, function (resp) {
    //            onComplete(resp.sessionId);
    //        }).fail(function (err) {
    //            console.log(err);
    //        });

    //    //}.bind(self), function () {
    //    //    console.log('Auth', 'fail');
    //    //});
    //},
    //doShare:function(sessionId, onComplete) {
    //    bsShare.showShareDialog('/share/card/' + sessionId, onComplete);
    //},

    //getGalleryData:function(onComplete) {

    //    $.get(this.GET_GALLERY, { }, function (resp) {
    //        onComplete(resp);
    //    }).fail(function (err) {
    //        console.log(err)
    //    });
    //},

    logout: function (callback) {
        var self = this;
        $.post(this.LOGOUT, {}, function (resp) {
            if (callback)
                callback(resp);
        });
    }//,
    //doLoad: function (base64Image)
    //{
    //    var form = document.createElement("form");
    //    form.action = "api/download";
    //    form.setAttribute('method', "post");
    //    var image = document.createElement("input");
    //    image.setAttribute('type', "text");
    //    image.setAttribute('name', "base64Image");
    //    image.setAttribute('value', base64Image);

    //    //image.Name = "base64Image";
    //    //image.value = base64Image;
    //    form.appendChild(image);
    //    $("body").append(form);
    //    $(form).submit();
    //}
}