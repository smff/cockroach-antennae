var windowWidth = document.documentElement.clientWidth;
var windowHeight = document.documentElement.clientHeight;
var isChrome = !!window.chrome && !!window.chrome.webstore;

window.onload = function() {
    const socket = io();
    const some = document.getElementById('some');

    if (isChrome) {
        some.classList.remove('hidden');
    }

    document.onmousedown = function(e) {
        if (e.target && e.target.id === 'some') {
            var coords = getCoords(some);
            var shiftX = e.pageX - coords.left;

            document.onmousemove = function(e) {
                some.style.left = e.pageX - shiftX + 'px';

                if (some.getBoundingClientRect().left <= 0) {
                    socket.emit('wentOverTheEdge', { type: 'left', c: some.getBoundingClientRect().left });
                }

                document.body.onmouseleave = function(event) {
                    console.log('mouseleave');
                    document.onmousemove = null;
                };
            };

            document.onmouseup = function() {
                document.onmousemove = null;
                console.log('move stop');
            };
        }
    };

    socket.on('show', function(msg) {
        some2.classList.remove('hidden');
        some2.style[msg.type] = 0 - some2.getBoundingClientRect().width - msg.c + 'px';
    });

    // let windowWidth = window.innerWidth;
    //
    // some.onclick = function(e) {
    //     const dimensions = some.getBoundingClientRect();
    //     console.log(dimensions);
    //     console.log(windowWidth, dimensions.right, windowWidth - dimensions.right);
    //
    //     if (windowWidth - dimensions) {
    //
    //     }
    //
    //     socket.emit('click');
    // };
    //
    // some.classList.remove('hidden');
    // some.classList.remove('hide');
    //
    // socket.on('show', function(msg) {
    //     some.classList.remove('hidden');
    //     some.classList.remove('hide');
    //     console.log(some.getBoundingClientRect());
    // });
    //
    // socket.on('hide', function(msg) {
    //     some.classList.add('hide');
    // });
    //
    // socket.on('count', function(msg) {
    // });
    //
    // // setInterval(move, 1000);
    //
    // function move() {
    //     some.style.left = some.style.left ? parseInt(some.style.left, 10) + 1 + 'px' : '1px';
    // }

};

function getCoords(elem) {   // кроме IE8-
    var box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}
