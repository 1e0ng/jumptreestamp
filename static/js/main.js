window.onload = function() {
    var canvas = document.getElementById('my_canvas');
    canvas.width = 960;
    canvas.height = 600;

    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.onload = function() {
    };
    img.src = 'static/img/treestump.png';

    for (var j = 0; j < 3; ++j) {
        for (var i = 0; i < 6; ++i) {
            ctx.drawImage(img, 50 + 150*i, 100 + 150*j + 17*(2.5-i)*(j%2?1:-1));
        }
    }
}
