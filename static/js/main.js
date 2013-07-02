Carrot = Class.extend({
    init: function() {
        this.img = new Image();
        this.img.onload = this.load.bind(this);
        this.img.src = 'static/img/carrot.png';
    },

    load: function() {
        ctx.drawImage(this.img, 870, 470);
    }
});

Rabbit = Class.extend({
    pos: 0, 
    img: null,
    img_r: null,

    getX: function(p) {
        var j = Math.floor(p/treestump.numCol);
        var i = p%treestump.numCol;
        return 70 + 150*(j%2?treestump.numCol-1-i:i);
    },
    getY: function(p) {
        var j = Math.floor(p/treestump.numCol);
        var i = p%treestump.numCol;
        return 50 + 200*j + 16*(i-2.5);
    },

    init: function() {
        this.img = new Image();
        this.img.onload = this.load.bind(this);
        this.img.src = 'static/img/rabbit.png';

        this.img_r = new Image();
        this.img_r.src = 'static/img/rabbit_r.png';
    },

    load: function() {
        this.draw(0);
    },

    draw: function(p) {
        if (Math.floor(p/treestump.numCol)%2 === 0) {
            ctx.drawImage(this.img, this.getX(p), this.getY(p));
        }
        else {
            ctx.drawImage(this.img_r, this.getX(p), this.getY(p));
        }
    },

    clear: function(p) {
        ctx.clearRect(this.getX(p), this.getY(p), this.img.width, this.img.height);
        treestump.draw(p);
        if (p > 0) {
            treestump.draw(p-1);
        }
    },

    move: function() {
        this.clear(this.pos);

        this.pos++;

        this.draw(this.pos);
    }
});

TreeStump = Class.extend({
    numRow: 3,
    numCol: 6,
    img: null,
    chars: [],

    init: function() {
        var cs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = 0; i < this.numRow*this.numCol; ++i) {
            this.chars.push(cs[Math.floor(Math.random()*10000%26)]);
        }
        this.img = new Image();
        this.img.onload = this.load.bind(this);
        this.img.src = 'static/img/treestump.png';

    },

    load: function() {
        ctx.fillStyle='orange';
        ctx.lineWidth=2;
        ctx.font = '30px Arial';

        for (var i = 0; i < this.numRow*this.numCol; ++i) {
            this.draw(i);
        }
    },

    draw: function(p) {
        var j = Math.floor(p/this.numCol);
        var i = Math.floor(p%this.numCol);
        ctx.drawImage(this.img, 50 + 150*(j%2?this.numCol-1-i:i), 140 + 200*j + 16*(i-2.5));
        ctx.fillText(this.chars[p], 85 + 150*(j%2?this.numCol-1-i:i), 165 + 200*j + 16*(i-2.5));
    },

});

var rabbit = null;
var treestump = null;
var carrot = null;
var ctx = null;
var step = 0;

window.onload = function() {
    var canvas = document.getElementById('my_canvas');
    canvas.width = 1024;
    canvas.height = 660;

    ctx = canvas.getContext('2d');

    treestump = new TreeStump();
    rabbit = new Rabbit();
    carrot = new Carrot();
}

window.addEventListener('keydown', function(event) {
    console.log(event.keyCode);
    if (String.fromCharCode(event.keyCode).toUpperCase() == treestump.chars[rabbit.pos + 1]) {
        rabbit.move();
        if (rabbit.pos === treestump.numCol*treestump.numRow - 1) {
            alert('WIN!');
        }
    }
});
