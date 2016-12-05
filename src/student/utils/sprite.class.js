export default fabric.Sprite = fabric.util.createClass(fabric.Image, {

    type: 'sprite',

    spriteWidth:150,
    spriteHeight: 150,
    spriteIndex: 0,

    initialize: function(element, options) {
        options || (options = { });

        options.width = this.spriteWidth;
        options.height = this.spriteHeight;

        this.callSuper('initialize', element, options);

        this.createTmpCanvas();
        this.createSpriteImages();
    },

    createTmpCanvas: function() {
        this.tmpCanvasEl = fabric.util.createCanvasElement();
        this.tmpCanvasEl.width = this.spriteWidth || this.width;
        this.tmpCanvasEl.height = this.spriteHeight || this.height;
    },

    createSpriteImages: function() {
        this.spriteImages = [ ];

        var steps = this._element.width / this.spriteWidth;
        for (var i = 0; i < steps; i++) {
            this.createSpriteImage(i);
        }
    },

    createSpriteImage: function(i) {
        var tmpCtx = this.tmpCanvasEl.getContext('2d');
        tmpCtx.clearRect(0, 0, this.tmpCanvasEl.width, this.tmpCanvasEl.height);
        tmpCtx.drawImage(this._element, -i * this.spriteWidth, 0);

        var dataURL = this.tmpCanvasEl.toDataURL('image/png');
        var tmpImg = fabric.util.createImage();

        tmpImg.src = dataURL;

        this.spriteImages.push(tmpImg);
    },

    _render: function(ctx) {
        ctx.drawImage(
            this.spriteImages[this.spriteIndex],
            -this.width / 2,
            -this.height / 2
        );
    },

    play: function() {
        var _this = this;
        this.animInterval = setInterval(function() {

            _this.onPlay && _this.onPlay();

            _this.spriteIndex++;
            if (_this.spriteIndex === _this.spriteImages.length) {
                _this.spriteIndex = 0;
            }
        }, 1000/25);
    },
    tick: function(frameIndex){
       // if (_this.spriteIndex === _this.spriteImages.length) {
            _this.spriteIndex = frameIndex;
      //  }
    },
    stop: function() {
        var _this = this;
        clearInterval(this.animInterval);
       _this.spriteIndex = 0;
    }
});

fabric.Sprite.fromURL = function(url, callback, imgOptions) {
    fabric.util.loadImage(url, function(img) {
        callback(new fabric.Sprite(img, imgOptions));
    });
};

fabric.Sprite.async = true;
// export default fabric.Sprite = fabric.util.createClass(fabric.Image, {
//
//     type: 'sprite',
//
//     spriteWidth: 50,
//     spriteHeight: 72,
//     spriteIndex: 0,
//     frames: 10,
//     fps:50,
//     initialize: function (element, options) {
//         options || (options = {});
//
//
//         this.spriteWidth = element.width / this.frames;
//         this.spriteHeight = element.height;
//         this.frames = options.frames || this.frames;
//         this.fps = options.fps || this.fps;
//
//         options.width = this.spriteWidth / this.frames;
//         options.height = this.spriteHeight;
//         this.callSuper('initialize', element, options);
//
//         this.createTmpCanvas();
//         this.createSpriteImages();
//     },
//
//     createTmpCanvas: function () {
//         this.tmpCanvasEl = fabric.util.createCanvasElement();
//         this.tmpCanvasEl.width = this.spriteWidth ;
//         this.tmpCanvasEl.height = this.spriteHeight ;
//     },
//
//     createSpriteImages: function () {
//         this.spriteImages = [];
//
//         var steps = this._element.width / this.spriteWidth;
//         for (var i = 0; i < steps; i++) {
//             this.createSpriteImage(i);
//         }
//     },
//
//     createSpriteImage: function (i) {
//         var tmpCtx = this.tmpCanvasEl.getContext('2d');
//         tmpCtx.clearRect(0, 0, this.tmpCanvasEl.width, this.tmpCanvasEl.height);
//         tmpCtx.drawImage(this._element, -i * this.spriteWidth, 0);
//
//         var dataURL = this.tmpCanvasEl.toDataURL('image/png');
//         var tmpImg = fabric.util.createImage();
//
//         tmpImg.src = dataURL;
//
//         this.spriteImages.push(tmpImg);
//     },
//
//     _render: function (ctx) {
//         ctx.drawImage(
//             this.spriteImages[this.spriteIndex],
//             -this.width / 2,
//             -this.height / 2
//         );
//     },
//
//     play: function () {
//         var _this = this;
//         var fps = _this.fps;
//         this.animInterval = setInterval(function () {
//
//             _this.onPlay && _this.onPlay();
//
//             _this.spriteIndex++;
//             if (_this.spriteIndex === _this.spriteImages.length) {
//                 _this.spriteIndex = 0;
//             }
//         }, fps);
//     },
//
//     stop: function () {
//         clearInterval(this.animInterval);
//     }
// });
//
// fabric.Sprite.fromURL = function (url, callback, imgOptions) {
//     fabric.util.loadImage(url, function (img) {
//         callback(new fabric.Sprite(img, imgOptions));
//     });
// };
//
// fabric.Sprite.async = true;
