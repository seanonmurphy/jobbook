'use strict';

var JB = {};

/*
jb.background =  () => {
  var Canvas = document.getElementById('canvas');
  var ctx = Canvas.getContext('2d');

  var resize = function() {
    Canvas.width = Canvas.clientWidth;
    Canvas.height = Canvas.clientHeight;
  };
  window.addEventListener('resize', resize);
  resize();

  var elements = [];
  var presets = {};

  presets.o = function (x, y, s, dx, dy) {
    return {
      x: x,
      y: y,
      r: 12 * s,
      w: 5 * s,
      dx: dx,
      dy: dy,
      draw: function(ctx, t) {
        this.x += this.dx;
        this.y += this.dy;

        ctx.beginPath();
        ctx.arc(this.x + + Math.sin((50 + x + (t / 10)) / 100) * 3, this.y + + Math.sin((45 + x + (t / 10)) / 100) * 4, this.r, 0, 2 * Math.PI, false);
        ctx.lineWidth = this.w;
        ctx.strokeStyle = '#52364B';
        ctx.stroke();
      }
    }
  };

  presets.x = function (x, y, s, dx, dy, dr, r) {
    r = r || 0;
    return {
      x: x,
      y: y,
      s: 20 * s,
      w: 5 * s,
      r: r,
      dx: dx,
      dy: dy,
      dr: dr,
      draw: function(ctx, t) {
        this.x += this.dx;
        this.y += this.dy;
        this.r += this.dr;

        var _this = this;
        var line = function(x, y, tx, ty, c, o) {
          o = o || 0;
          ctx.beginPath();
          ctx.moveTo(-o + ((_this.s / 2) * x), o + ((_this.s / 2) * y));
          ctx.lineTo(-o + ((_this.s / 2) * tx), o + ((_this.s / 2) * ty));
          ctx.lineWidth = _this.w;
          ctx.strokeStyle = c;
          ctx.stroke();
        };

        ctx.save();

        ctx.translate(this.x + Math.sin((x + (t / 10)) / 100) * 5, this.y + Math.sin((10 + x + (t / 10)) / 100) * 2);
        ctx.rotate(this.r * Math.PI / 180);

        line(-1, -1, 1, 1, '#52364B');
        line(1, -1, -1, 1, '#52364B');

        ctx.restore();
      }
    }
  };

  for(var x = 0; x < Canvas.width; x++) {
    for(var y = 0; y < Canvas.height; y++) {
      if(Math.round(Math.random() * 8000) == 1) {
        var s = ((Math.random() * 5) + 1) / 10;
        if(Math.round(Math.random()) == 1)
          elements.push(presets.o(x, y, s, 0, 0));
        else
          elements.push(presets.x(x, y, s, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
      }
    }
  }
  setInterval(function() {
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);

    var time = new Date().getTime();
    for (var e in elements)
      elements[e].draw(ctx, time);
  }, 10);

};
*/

// Functions
jQuery.fn.extend({
  getProgress: function getProgress() {
    var porcentage = $(this).attr('data-progress');

    $(this).find('span').css({ width: porcentage + '%' });

    return $(this);
  },
  randomColor: function (_randomColor) {
    function randomColor() {
      return _randomColor.apply(this, arguments);
    }

    randomColor.toString = function () {
      return _randomColor.toString();
    };

    return randomColor;
  }(function () {

    $(this).css({
      background: randomColor({ luminosity: 'bright', hue: 'monochromatic' })
    });

    return $(this);
  })
});

JB.jobHover = function () {
  $('#js-joblist > li').hover(function () {
    var hue = $(this).closest('.js-rand').css('background-color');
    $(this).siblings().fadeTo(2, 0.5);
  }, function () {
    $(this).siblings().fadeTo(2, 1);
  });
};

// Pages
JB.jobs = function () {

  JB.jobHover();
  $('#js-joblist li a').each(function () {
    $(this).find('.js-progress').getProgress();

    $(this).find('.js-rand').randomColor();
  });
};

JB.details = function () {
  $('.js-rand').randomColor();
  $('.js-progress').getProgress();

  $('.tasks-table tr').click(function (e) {

    var offsetWidth = this.offsetWidth;
    var checkRange = function checkRange(x) {
      return x > offsetWidth + 30 && e.pageX < offsetWidth + 60;
    };

    if (checkRange(e.pageX)) {
      $('#js-edit-task').fadeIn().css({ left: e.pageX - 80, top: e.pageY - 50 });
    }
  });
};

$(document).ready(function () {
  if (document.getElementById("js-jobs")) {
    JB.jobs();
  }
  if (document.getElementById("js-details")) {
    JB.details();
  }
});
//# sourceMappingURL=data:application/json;base64,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Q0FBQyxFQUFDLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUMsQ0FBQyxDQUFBO0tBQ2hEO0dBQ0YsQ0FBQyxDQUFDO0NBQ0osQ0FBQTs7QUFFRCxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQU07QUFDdEIsTUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFO0FBQUUsTUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0dBQUU7QUFDdEQsTUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUFFO0FBQUUsTUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0dBQUU7Q0FDN0QsQ0FBQyxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBKQiA9IHt9O1xuXG4vKlxuamIuYmFja2dyb3VuZCA9ICAoKSA9PiB7XG4gIHZhciBDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG4gIHZhciBjdHggPSBDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICB2YXIgcmVzaXplID0gZnVuY3Rpb24oKSB7XG4gICAgQ2FudmFzLndpZHRoID0gQ2FudmFzLmNsaWVudFdpZHRoO1xuICAgIENhbnZhcy5oZWlnaHQgPSBDYW52YXMuY2xpZW50SGVpZ2h0O1xuICB9O1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplKTtcbiAgcmVzaXplKCk7XG5cbiAgdmFyIGVsZW1lbnRzID0gW107XG4gIHZhciBwcmVzZXRzID0ge307XG5cbiAgcHJlc2V0cy5vID0gZnVuY3Rpb24gKHgsIHksIHMsIGR4LCBkeSkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiB4LFxuICAgICAgeTogeSxcbiAgICAgIHI6IDEyICogcyxcbiAgICAgIHc6IDUgKiBzLFxuICAgICAgZHg6IGR4LFxuICAgICAgZHk6IGR5LFxuICAgICAgZHJhdzogZnVuY3Rpb24oY3R4LCB0KSB7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLmR4O1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy5keTtcblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmModGhpcy54ICsgKyBNYXRoLnNpbigoNTAgKyB4ICsgKHQgLyAxMCkpIC8gMTAwKSAqIDMsIHRoaXMueSArICsgTWF0aC5zaW4oKDQ1ICsgeCArICh0IC8gMTApKSAvIDEwMCkgKiA0LCB0aGlzLnIsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSB0aGlzLnc7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjNTIzNjRCJztcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBwcmVzZXRzLnggPSBmdW5jdGlvbiAoeCwgeSwgcywgZHgsIGR5LCBkciwgcikge1xuICAgIHIgPSByIHx8IDA7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHgsXG4gICAgICB5OiB5LFxuICAgICAgczogMjAgKiBzLFxuICAgICAgdzogNSAqIHMsXG4gICAgICByOiByLFxuICAgICAgZHg6IGR4LFxuICAgICAgZHk6IGR5LFxuICAgICAgZHI6IGRyLFxuICAgICAgZHJhdzogZnVuY3Rpb24oY3R4LCB0KSB7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLmR4O1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy5keTtcbiAgICAgICAgdGhpcy5yICs9IHRoaXMuZHI7XG5cbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGxpbmUgPSBmdW5jdGlvbih4LCB5LCB0eCwgdHksIGMsIG8pIHtcbiAgICAgICAgICBvID0gbyB8fCAwO1xuICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICBjdHgubW92ZVRvKC1vICsgKChfdGhpcy5zIC8gMikgKiB4KSwgbyArICgoX3RoaXMucyAvIDIpICogeSkpO1xuICAgICAgICAgIGN0eC5saW5lVG8oLW8gKyAoKF90aGlzLnMgLyAyKSAqIHR4KSwgbyArICgoX3RoaXMucyAvIDIpICogdHkpKTtcbiAgICAgICAgICBjdHgubGluZVdpZHRoID0gX3RoaXMudztcbiAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBjO1xuICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjdHguc2F2ZSgpO1xuXG4gICAgICAgIGN0eC50cmFuc2xhdGUodGhpcy54ICsgTWF0aC5zaW4oKHggKyAodCAvIDEwKSkgLyAxMDApICogNSwgdGhpcy55ICsgTWF0aC5zaW4oKDEwICsgeCArICh0IC8gMTApKSAvIDEwMCkgKiAyKTtcbiAgICAgICAgY3R4LnJvdGF0ZSh0aGlzLnIgKiBNYXRoLlBJIC8gMTgwKTtcblxuICAgICAgICBsaW5lKC0xLCAtMSwgMSwgMSwgJyM1MjM2NEInKTtcbiAgICAgICAgbGluZSgxLCAtMSwgLTEsIDEsICcjNTIzNjRCJyk7XG5cbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZm9yKHZhciB4ID0gMDsgeCA8IENhbnZhcy53aWR0aDsgeCsrKSB7XG4gICAgZm9yKHZhciB5ID0gMDsgeSA8IENhbnZhcy5oZWlnaHQ7IHkrKykge1xuICAgICAgaWYoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogODAwMCkgPT0gMSkge1xuICAgICAgICB2YXIgcyA9ICgoTWF0aC5yYW5kb20oKSAqIDUpICsgMSkgLyAxMDtcbiAgICAgICAgaWYoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKSA9PSAxKVxuICAgICAgICAgIGVsZW1lbnRzLnB1c2gocHJlc2V0cy5vKHgsIHksIHMsIDAsIDApKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGVsZW1lbnRzLnB1c2gocHJlc2V0cy54KHgsIHksIHMsIDAsIDAsICgoTWF0aC5yYW5kb20oKSAqIDMpIC0gMSkgLyAxMCwgKE1hdGgucmFuZG9tKCkgKiAzNjApKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgQ2FudmFzLndpZHRoLCBDYW52YXMuaGVpZ2h0KTtcblxuICAgIHZhciB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgZm9yICh2YXIgZSBpbiBlbGVtZW50cylcbiAgICAgIGVsZW1lbnRzW2VdLmRyYXcoY3R4LCB0aW1lKTtcbiAgfSwgMTApO1xuXG59O1xuKi9cblxuLy8gRnVuY3Rpb25zXG5qUXVlcnkuZm4uZXh0ZW5kKHtcbiAgZ2V0UHJvZ3Jlc3MoKSB7XG4gICAgbGV0IHBvcmNlbnRhZ2UgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtcHJvZ3Jlc3MnKTtcblxuICAgICQodGhpcylcbiAgICAgIC5maW5kKCdzcGFuJylcbiAgICAgIC5jc3Moe3dpZHRoOiBgJHtwb3JjZW50YWdlfSVgfSk7XG5cbiAgICByZXR1cm4gJCh0aGlzKTtcbiAgfSxcbiAgcmFuZG9tQ29sb3IoKSB7XG5cbiAgICAkKHRoaXMpXG4gICAgICAuY3NzKHtcbiAgICAgIGJhY2tncm91bmQ6IHJhbmRvbUNvbG9yKHsgbHVtaW5vc2l0eTogJ2JyaWdodCcsIGh1ZTogJ21vbm9jaHJvbWF0aWMnfSlcbiAgICB9KTtcblxuICAgIHJldHVybiAkKHRoaXMpO1xuICB9XG59KTtcblxuSkIuam9iSG92ZXIgPSAoKSA9PiB7XG4gICQoJyNqcy1qb2JsaXN0ID4gbGknKS5ob3ZlcihmdW5jdGlvbigpe1xuICAgIGxldCBodWUgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1yYW5kJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJyk7XG4gICAgJCh0aGlzKS5zaWJsaW5ncygpLmZhZGVUbygyLDAuNSk7XG4gIH0sZnVuY3Rpb24oKSB7XG4gICAgJCh0aGlzKS5zaWJsaW5ncygpLmZhZGVUbygyLDEpO1xuICB9KTtcbn07XG5cbi8vIFBhZ2VzXG5KQi5qb2JzID0gKCkgPT4ge1xuXG4gIEpCLmpvYkhvdmVyKCk7XG4gICQoJyNqcy1qb2JsaXN0IGxpIGEnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAkKHRoaXMpXG4gICAgICAuZmluZCgnLmpzLXByb2dyZXNzJylcbiAgICAgIC5nZXRQcm9ncmVzcygpO1xuXG4gICAgJCh0aGlzKVxuICAgICAgLmZpbmQoJy5qcy1yYW5kJylcbiAgICAgIC5yYW5kb21Db2xvcigpO1xuICB9KTtcbn07XG5cbkpCLmRldGFpbHMgPSAoKSA9PiB7XG4gICQoJy5qcy1yYW5kJykucmFuZG9tQ29sb3IoKTtcbiAgJCgnLmpzLXByb2dyZXNzJykuZ2V0UHJvZ3Jlc3MoKTtcblxuICAkKCcudGFza3MtdGFibGUgdHInKS5jbGljayhmdW5jdGlvbihlKSB7XG5cbiAgICBsZXQgb2Zmc2V0V2lkdGggPSB0aGlzLm9mZnNldFdpZHRoO1xuICAgIGxldCBjaGVja1JhbmdlID0geCA9PiAoeCA+IG9mZnNldFdpZHRoICsgMzApICYmIGUucGFnZVggPCBvZmZzZXRXaWR0aCArIDYwO1xuXG4gICAgaWYgKCBjaGVja1JhbmdlKGUucGFnZVgpICkge1xuICAgICAgJCgnI2pzLWVkaXQtdGFzaycpXG4gICAgICAgIC5mYWRlSW4oKVxuICAgICAgICAuY3NzKHtsZWZ0OiBlLnBhZ2VYIC0gODAsIHRvcDogZS5wYWdlWSAtIDUwfSlcbiAgICB9XG4gIH0pO1xufVxuXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG4gIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzLWpvYnNcIikpIHsgSkIuam9icygpOyB9XG4gIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzLWRldGFpbHNcIikpIHsgSkIuZGV0YWlscygpOyB9XG59KTtcblxuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
