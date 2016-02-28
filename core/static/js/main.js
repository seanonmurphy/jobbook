'use strict';

console.log('DJANGO Structure');
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
      background: randomColor({ luminosity: 'bright', hue: 'blue' })
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

JB.user = function () {
  $('.js-user').on('click', function (e) {
    e.preventDefault();
    $('html body').addClass('hidden');

    $('.js-modaluser').addClass('load').find('li').delay(150).each(function (index) {
      var _this = this;

      $(this).delay(index * 200).queue(function () {
        return $(_this).addClass('load').dequeue();
      });
    });
  });

  $('.js-cancelmodal').click(function (e) {
    $('.js-modaluser').removeClass('load').find('li').each(function () {
      $(this).removeClass('load');
    });

    $('html body').removeClass('hidden');
  });
};

// Pages
JB.jobs = function () {

  JB.jobHover();
  $('#js-joblist li a').each(function () {

    $(this).find('.js-progress').getProgress();

    var str = $(this).find('h4').html().match(/\b(\w)/g);

    $(this).find('.js-rand').randomColor().find('span').html(str);
  });
};

JB.details = function () {
  $('.js-rand').randomColor();
  $('.js-progress').getProgress();

  var $editTask = $('#js-edit-task');

  var closeEditTask = function closeEditTask(el) {
    $(el).parent().parent().fadeOut().removeClass('open');
  };

  $('.tasks-table tr').click(function (e) {

    var offsetWidth = this.offsetWidth;
    var checkRange = function checkRange(x) {
      return x > offsetWidth + 30 && e.pageX < offsetWidth + 60;
    };

    if (checkRange(e.pageX)) {
      $editTask.addClass('open').fadeIn([3000, 'swing']).css({ left: e.pageX - 120, top: e.pageY - 150 });
    }
  });

  $editTask.find('a[name=cancel]').click(function (e) {
    e.preventDefault();
    closeEditTask(this);
  });

  $editTask.find('a[name=edit]').click(function (e) {
    e.preventDefault();
    $('html body').addClass('hidden');

    closeEditTask(this);
    $('.js-edit-job').css({ height: $(document).height() }).addClass('load').find('.js-modal-container').delay(150).queue(function () {
      $(this).addClass('load').dequeue();
    });
  });

  $('.js-close-modal').click(function (e) {
    e.preventDefault();
    $('.js-modal-container').addClass('out').delay(700).queue(function () {
      $(this).removeClass('out load').dequeue().parent().removeClass('load').dequeue();
    });

    $('html body').removeClass('hidden');
  });
};

JB.clients = function () {
  $('#js-clientlist li a').each(function () {

    var str = $(this).find('h4').html().match(/\b(\w)/g).join('');

    console.log(str);

    $(this).find('.js-rand').randomColor().find('span').html(str);
  });
};

$(document).ready(function () {

  if (document.getElementById("js-jobs")) {
    JB.jobs();
  }
  if (document.getElementById("js-jobdetails")) {
    JB.details();
  }
  if (document.getElementById("js-clients")) {
    JB.clients();
  }
  JB.user();
});
//# sourceMappingURL=data:application/json;base64,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Qzs7QUFVeEMsTUFBRSxJQUFGLEVBQ0csSUFESCxDQUNRLFVBRFIsRUFFRyxXQUZILEdBR0csSUFISCxDQUdRLE1BSFIsRUFJRyxJQUpILENBSVEsR0FKUixFQVZ3QztHQUFaLENBQTlCLENBRGlCO0NBQU47O0FBbUJiLEVBQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsWUFBTTs7QUFFdEIsTUFBSSxTQUFTLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBSixFQUF3QztBQUFFLE9BQUcsSUFBSCxHQUFGO0dBQXhDO0FBQ0EsTUFBSSxTQUFTLGNBQVQsQ0FBd0IsZUFBeEIsQ0FBSixFQUE4QztBQUFFLE9BQUcsT0FBSCxHQUFGO0dBQTlDO0FBQ0EsTUFBSSxTQUFTLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBSixFQUEyQztBQUFFLE9BQUcsT0FBSCxHQUFGO0dBQTNDO0FBQ0EsS0FBRyxJQUFILEdBTHNCO0NBQU4sQ0FBbEIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnNvbGUubG9nKCdESkFOR08gU3RydWN0dXJlJyk7XHJcbnZhciBKQiA9IHt9O1xyXG5cclxuXHJcbi8qXHJcbmpiLmJhY2tncm91bmQgPSAgKCkgPT4ge1xyXG4gIHZhciBDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XHJcbiAgdmFyIGN0eCA9IENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuICB2YXIgcmVzaXplID0gZnVuY3Rpb24oKSB7XHJcbiAgICBDYW52YXMud2lkdGggPSBDYW52YXMuY2xpZW50V2lkdGg7XHJcbiAgICBDYW52YXMuaGVpZ2h0ID0gQ2FudmFzLmNsaWVudEhlaWdodDtcclxuICB9O1xyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemUpO1xyXG4gIHJlc2l6ZSgpO1xyXG5cclxuICB2YXIgZWxlbWVudHMgPSBbXTtcclxuICB2YXIgcHJlc2V0cyA9IHt9O1xyXG5cclxuICBwcmVzZXRzLm8gPSBmdW5jdGlvbiAoeCwgeSwgcywgZHgsIGR5KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiB4LFxyXG4gICAgICB5OiB5LFxyXG4gICAgICByOiAxMiAqIHMsXHJcbiAgICAgIHc6IDUgKiBzLFxyXG4gICAgICBkeDogZHgsXHJcbiAgICAgIGR5OiBkeSxcclxuICAgICAgZHJhdzogZnVuY3Rpb24oY3R4LCB0KSB7XHJcbiAgICAgICAgdGhpcy54ICs9IHRoaXMuZHg7XHJcbiAgICAgICAgdGhpcy55ICs9IHRoaXMuZHk7XHJcblxyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHguYXJjKHRoaXMueCArICsgTWF0aC5zaW4oKDUwICsgeCArICh0IC8gMTApKSAvIDEwMCkgKiAzLCB0aGlzLnkgKyArIE1hdGguc2luKCg0NSArIHggKyAodCAvIDEwKSkgLyAxMDApICogNCwgdGhpcy5yLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xyXG4gICAgICAgIGN0eC5saW5lV2lkdGggPSB0aGlzLnc7XHJcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJyM1MjM2NEInO1xyXG4gICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHByZXNldHMueCA9IGZ1bmN0aW9uICh4LCB5LCBzLCBkeCwgZHksIGRyLCByKSB7XHJcbiAgICByID0gciB8fCAwO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogeCxcclxuICAgICAgeTogeSxcclxuICAgICAgczogMjAgKiBzLFxyXG4gICAgICB3OiA1ICogcyxcclxuICAgICAgcjogcixcclxuICAgICAgZHg6IGR4LFxyXG4gICAgICBkeTogZHksXHJcbiAgICAgIGRyOiBkcixcclxuICAgICAgZHJhdzogZnVuY3Rpb24oY3R4LCB0KSB7XHJcbiAgICAgICAgdGhpcy54ICs9IHRoaXMuZHg7XHJcbiAgICAgICAgdGhpcy55ICs9IHRoaXMuZHk7XHJcbiAgICAgICAgdGhpcy5yICs9IHRoaXMuZHI7XHJcblxyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGxpbmUgPSBmdW5jdGlvbih4LCB5LCB0eCwgdHksIGMsIG8pIHtcclxuICAgICAgICAgIG8gPSBvIHx8IDA7XHJcbiAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICBjdHgubW92ZVRvKC1vICsgKChfdGhpcy5zIC8gMikgKiB4KSwgbyArICgoX3RoaXMucyAvIDIpICogeSkpO1xyXG4gICAgICAgICAgY3R4LmxpbmVUbygtbyArICgoX3RoaXMucyAvIDIpICogdHgpLCBvICsgKChfdGhpcy5zIC8gMikgKiB0eSkpO1xyXG4gICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IF90aGlzLnc7XHJcbiAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBjO1xyXG4gICAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGN0eC5zYXZlKCk7XHJcblxyXG4gICAgICAgIGN0eC50cmFuc2xhdGUodGhpcy54ICsgTWF0aC5zaW4oKHggKyAodCAvIDEwKSkgLyAxMDApICogNSwgdGhpcy55ICsgTWF0aC5zaW4oKDEwICsgeCArICh0IC8gMTApKSAvIDEwMCkgKiAyKTtcclxuICAgICAgICBjdHgucm90YXRlKHRoaXMuciAqIE1hdGguUEkgLyAxODApO1xyXG5cclxuICAgICAgICBsaW5lKC0xLCAtMSwgMSwgMSwgJyM1MjM2NEInKTtcclxuICAgICAgICBsaW5lKDEsIC0xLCAtMSwgMSwgJyM1MjM2NEInKTtcclxuXHJcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGZvcih2YXIgeCA9IDA7IHggPCBDYW52YXMud2lkdGg7IHgrKykge1xyXG4gICAgZm9yKHZhciB5ID0gMDsgeSA8IENhbnZhcy5oZWlnaHQ7IHkrKykge1xyXG4gICAgICBpZihNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA4MDAwKSA9PSAxKSB7XHJcbiAgICAgICAgdmFyIHMgPSAoKE1hdGgucmFuZG9tKCkgKiA1KSArIDEpIC8gMTA7XHJcbiAgICAgICAgaWYoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKSA9PSAxKVxyXG4gICAgICAgICAgZWxlbWVudHMucHVzaChwcmVzZXRzLm8oeCwgeSwgcywgMCwgMCkpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgIGVsZW1lbnRzLnB1c2gocHJlc2V0cy54KHgsIHksIHMsIDAsIDAsICgoTWF0aC5yYW5kb20oKSAqIDMpIC0gMSkgLyAxMCwgKE1hdGgucmFuZG9tKCkgKiAzNjApKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIENhbnZhcy53aWR0aCwgQ2FudmFzLmhlaWdodCk7XHJcblxyXG4gICAgdmFyIHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgIGZvciAodmFyIGUgaW4gZWxlbWVudHMpXHJcbiAgICAgIGVsZW1lbnRzW2VdLmRyYXcoY3R4LCB0aW1lKTtcclxuICB9LCAxMCk7XHJcblxyXG59O1xyXG4qL1xyXG5cclxuLy8gRnVuY3Rpb25zXHJcbmpRdWVyeS5mbi5leHRlbmQoe1xyXG4gIGdldFByb2dyZXNzKCkge1xyXG4gICAgbGV0IHBvcmNlbnRhZ2UgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtcHJvZ3Jlc3MnKTtcclxuXHJcbiAgICAkKHRoaXMpXHJcbiAgICAgIC5maW5kKCdzcGFuJylcclxuICAgICAgLmNzcyh7d2lkdGg6IGAke3BvcmNlbnRhZ2V9JWB9KTtcclxuXHJcbiAgICByZXR1cm4gJCh0aGlzKTtcclxuICB9LFxyXG4gIHJhbmRvbUNvbG9yKCkge1xyXG5cclxuICAgICQodGhpcylcclxuICAgICAgLmNzcyh7XHJcbiAgICAgIGJhY2tncm91bmQ6IHJhbmRvbUNvbG9yKHsgbHVtaW5vc2l0eTogJ2JyaWdodCcsIGh1ZTogJ2JsdWUnfSlcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiAkKHRoaXMpO1xyXG4gIH1cclxufSk7XHJcblxyXG5KQi5qb2JIb3ZlciA9ICgpID0+IHtcclxuICAkKCcjanMtam9ibGlzdCA+IGxpJykuaG92ZXIoZnVuY3Rpb24oKXtcclxuICAgIGxldCBodWUgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1yYW5kJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJyk7XHJcbiAgICAkKHRoaXMpLnNpYmxpbmdzKCkuZmFkZVRvKDIsMC41KTtcclxuICB9LGZ1bmN0aW9uKCkge1xyXG4gICAgJCh0aGlzKS5zaWJsaW5ncygpLmZhZGVUbygyLDEpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuSkIudXNlciA9ICgpID0+IHtcclxuICAkKCcuanMtdXNlcicpLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAkKCdodG1sIGJvZHknKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcblxyXG4gICAgJCgnLmpzLW1vZGFsdXNlcicpXHJcbiAgICAgIC5hZGRDbGFzcygnbG9hZCcpXHJcbiAgICAgIC5maW5kKCdsaScpXHJcbiAgICAgIC5kZWxheSgxNTApXHJcbiAgICAgIC5lYWNoKGZ1bmN0aW9uKGluZGV4KXtcclxuICAgICAgJCh0aGlzKS5kZWxheShpbmRleCAqIDIwMCkucXVldWUoKCk9PiAkKHRoaXMpLmFkZENsYXNzKCdsb2FkJykuZGVxdWV1ZSgpICk7XHJcbiAgICAgIH0pXHJcbiAgfSk7XHJcblxyXG4gICQoJy5qcy1jYW5jZWxtb2RhbCcpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgJCgnLmpzLW1vZGFsdXNlcicpXHJcbiAgICAgIC5yZW1vdmVDbGFzcygnbG9hZCcpXHJcbiAgICAgIC5maW5kKCdsaScpXHJcbiAgICAgIC5lYWNoKGZ1bmN0aW9uKCkgeyAkKHRoaXMpLnJlbW92ZUNsYXNzKCdsb2FkJykgfSk7XHJcblxyXG4gICAgJCgnaHRtbCBib2R5JykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gUGFnZXNcclxuSkIuam9icyA9ICgpID0+IHtcclxuXHJcbiAgSkIuam9iSG92ZXIoKTtcclxuICAkKCcjanMtam9ibGlzdCBsaSBhJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgJCh0aGlzKVxyXG4gICAgICAuZmluZCgnLmpzLXByb2dyZXNzJylcclxuICAgICAgLmdldFByb2dyZXNzKCk7XHJcblxyXG4gICAgdmFyIHN0ciA9ICQodGhpcylcclxuICAgICAgLmZpbmQoJ2g0JylcclxuICAgICAgLmh0bWwoKVxyXG4gICAgICAubWF0Y2goL1xcYihcXHcpL2cpO1xyXG5cclxuICAgICQodGhpcylcclxuICAgICAgLmZpbmQoJy5qcy1yYW5kJylcclxuICAgICAgLnJhbmRvbUNvbG9yKClcclxuICAgICAgLmZpbmQoJ3NwYW4nKVxyXG4gICAgICAuaHRtbChzdHIpO1xyXG5cclxuXHJcbiAgfSk7XHJcbn07XHJcblxyXG5KQi5kZXRhaWxzID0gKCkgPT4ge1xyXG4gICQoJy5qcy1yYW5kJykucmFuZG9tQ29sb3IoKTtcclxuICAkKCcuanMtcHJvZ3Jlc3MnKS5nZXRQcm9ncmVzcygpO1xyXG5cclxuICBsZXQgJGVkaXRUYXNrID0gJCgnI2pzLWVkaXQtdGFzaycpO1xyXG5cclxuICBsZXQgY2xvc2VFZGl0VGFzayA9IChlbCkgPT4ge1xyXG4gICAgJChlbClcclxuICAgICAgLnBhcmVudCgpXHJcbiAgICAgIC5wYXJlbnQoKVxyXG4gICAgICAuZmFkZU91dCgpXHJcbiAgICAgIC5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG4gIH07XHJcblxyXG4gICQoJy50YXNrcy10YWJsZSB0cicpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICBsZXQgb2Zmc2V0V2lkdGggPSB0aGlzLm9mZnNldFdpZHRoO1xyXG4gICAgbGV0IGNoZWNrUmFuZ2UgPSB4ID0+ICh4ID4gb2Zmc2V0V2lkdGggKyAzMCkgJiYgZS5wYWdlWCA8IG9mZnNldFdpZHRoICsgNjA7XHJcblxyXG4gICAgaWYgKCBjaGVja1JhbmdlKGUucGFnZVgpICkge1xyXG4gICAgICAkZWRpdFRhc2tcclxuICAgICAgICAuYWRkQ2xhc3MoJ29wZW4nKVxyXG4gICAgICAgIC5mYWRlSW4oWzMwMDAsJ3N3aW5nJ10pXHJcbiAgICAgICAgLmNzcyh7bGVmdDogZS5wYWdlWCAtIDEyMCwgdG9wOiBlLnBhZ2VZIC0gMTUwfSlcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgJGVkaXRUYXNrXHJcbiAgICAuZmluZCgnYVtuYW1lPWNhbmNlbF0nKVxyXG4gICAgLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNsb3NlRWRpdFRhc2sodGhpcyk7XHJcbiAgfSk7XHJcblxyXG4gICRlZGl0VGFza1xyXG4gICAgLmZpbmQoJ2FbbmFtZT1lZGl0XScpXHJcbiAgICAuY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAkKCdodG1sIGJvZHknKS5hZGRDbGFzcygnaGlkZGVuJyk7XHJcblxyXG4gICAgICBjbG9zZUVkaXRUYXNrKHRoaXMpO1xyXG4gICAgICAgJCgnLmpzLWVkaXQtam9iJylcclxuICAgICAgICAuY3NzKHtoZWlnaHQ6ICQoZG9jdW1lbnQpLmhlaWdodCgpfSlcclxuICAgICAgICAuYWRkQ2xhc3MoJ2xvYWQnKVxyXG4gICAgICAgIC5maW5kKCcuanMtbW9kYWwtY29udGFpbmVyJylcclxuICAgICAgICAuZGVsYXkoMTUwKVxyXG4gICAgICAgIC5xdWV1ZShmdW5jdGlvbigpeyAkKHRoaXMpLmFkZENsYXNzKCdsb2FkJykuZGVxdWV1ZSgpOyB9KTtcclxuICAgIH0pO1xyXG5cclxuICAkKCcuanMtY2xvc2UtbW9kYWwnKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICQoJy5qcy1tb2RhbC1jb250YWluZXInKVxyXG4gICAgICAuYWRkQ2xhc3MoJ291dCcpXHJcbiAgICAgIC5kZWxheSg3MDApXHJcbiAgICAgIC5xdWV1ZShmdW5jdGlvbigpe1xyXG4gICAgICAgICQodGhpcylcclxuICAgICAgICAgIC5yZW1vdmVDbGFzcygnb3V0IGxvYWQnKVxyXG4gICAgICAgICAgLmRlcXVldWUoKVxyXG4gICAgICAgICAgLnBhcmVudCgpXHJcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xvYWQnKVxyXG4gICAgICAgICAgLmRlcXVldWUoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgJCgnaHRtbCBib2R5JykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5KQi5jbGllbnRzID0gKCkgPT4ge1xyXG4gICQoJyNqcy1jbGllbnRsaXN0IGxpIGEnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgdmFyIHN0ciA9ICQodGhpcylcclxuICAgIC5maW5kKCdoNCcpXHJcbiAgICAuaHRtbCgpXHJcbiAgICAubWF0Y2goL1xcYihcXHcpL2cpXHJcbiAgICAuam9pbignJyk7XHJcblxyXG4gICAgY29uc29sZS5sb2coc3RyKTtcclxuXHJcbiAgICAkKHRoaXMpXHJcbiAgICAgIC5maW5kKCcuanMtcmFuZCcpXHJcbiAgICAgIC5yYW5kb21Db2xvcigpXHJcbiAgICAgIC5maW5kKCdzcGFuJylcclxuICAgICAgLmh0bWwoc3RyKTtcclxuICB9KTtcclxufVxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xyXG5cclxuICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqcy1qb2JzXCIpKSB7IEpCLmpvYnMoKTsgfVxyXG4gIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzLWpvYmRldGFpbHNcIikpIHsgSkIuZGV0YWlscygpOyB9XHJcbiAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianMtY2xpZW50c1wiKSkgeyBKQi5jbGllbnRzKCk7IH1cclxuICBKQi51c2VyKCk7XHJcbn0pO1xyXG5cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
