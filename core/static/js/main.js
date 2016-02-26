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
//# sourceMappingURL=data:application/json;base64,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Qzs7QUFVeEMsTUFBRSxJQUFGLEVBQ0csSUFESCxDQUNRLFVBRFIsRUFFRyxXQUZILEdBR0csSUFISCxDQUdRLE1BSFIsRUFJRyxJQUpILENBSVEsR0FKUixFQVZ3QztHQUFaLENBQTlCLENBRGlCO0NBQU47O0FBbUJiLEVBQUUsUUFBRixFQUFZLEtBQVosQ0FBa0IsWUFBTTs7QUFFdEIsTUFBSSxTQUFTLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBSixFQUF3QztBQUFFLE9BQUcsSUFBSCxHQUFGO0dBQXhDO0FBQ0EsTUFBSSxTQUFTLGNBQVQsQ0FBd0IsZUFBeEIsQ0FBSixFQUE4QztBQUFFLE9BQUcsT0FBSCxHQUFGO0dBQTlDO0FBQ0EsTUFBSSxTQUFTLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBSixFQUEyQztBQUFFLE9BQUcsT0FBSCxHQUFGO0dBQTNDO0FBQ0EsS0FBRyxJQUFILEdBTHNCO0NBQU4sQ0FBbEIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc29sZS5sb2coJ0RKQU5HTyBTdHJ1Y3R1cmUnKTtcbnZhciBKQiA9IHt9O1xuXG5cbi8qXG5qYi5iYWNrZ3JvdW5kID0gICgpID0+IHtcbiAgdmFyIENhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbiAgdmFyIGN0eCA9IENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gIHZhciByZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgICBDYW52YXMud2lkdGggPSBDYW52YXMuY2xpZW50V2lkdGg7XG4gICAgQ2FudmFzLmhlaWdodCA9IENhbnZhcy5jbGllbnRIZWlnaHQ7XG4gIH07XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemUpO1xuICByZXNpemUoKTtcblxuICB2YXIgZWxlbWVudHMgPSBbXTtcbiAgdmFyIHByZXNldHMgPSB7fTtcblxuICBwcmVzZXRzLm8gPSBmdW5jdGlvbiAoeCwgeSwgcywgZHgsIGR5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHgsXG4gICAgICB5OiB5LFxuICAgICAgcjogMTIgKiBzLFxuICAgICAgdzogNSAqIHMsXG4gICAgICBkeDogZHgsXG4gICAgICBkeTogZHksXG4gICAgICBkcmF3OiBmdW5jdGlvbihjdHgsIHQpIHtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMuZHg7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLmR5O1xuXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyh0aGlzLnggKyArIE1hdGguc2luKCg1MCArIHggKyAodCAvIDEwKSkgLyAxMDApICogMywgdGhpcy55ICsgKyBNYXRoLnNpbigoNDUgKyB4ICsgKHQgLyAxMCkpIC8gMTAwKSAqIDQsIHRoaXMuciwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHRoaXMudztcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJyM1MjM2NEInO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHByZXNldHMueCA9IGZ1bmN0aW9uICh4LCB5LCBzLCBkeCwgZHksIGRyLCByKSB7XG4gICAgciA9IHIgfHwgMDtcbiAgICByZXR1cm4ge1xuICAgICAgeDogeCxcbiAgICAgIHk6IHksXG4gICAgICBzOiAyMCAqIHMsXG4gICAgICB3OiA1ICogcyxcbiAgICAgIHI6IHIsXG4gICAgICBkeDogZHgsXG4gICAgICBkeTogZHksXG4gICAgICBkcjogZHIsXG4gICAgICBkcmF3OiBmdW5jdGlvbihjdHgsIHQpIHtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMuZHg7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLmR5O1xuICAgICAgICB0aGlzLnIgKz0gdGhpcy5kcjtcblxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbGluZSA9IGZ1bmN0aW9uKHgsIHksIHR4LCB0eSwgYywgbykge1xuICAgICAgICAgIG8gPSBvIHx8IDA7XG4gICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgIGN0eC5tb3ZlVG8oLW8gKyAoKF90aGlzLnMgLyAyKSAqIHgpLCBvICsgKChfdGhpcy5zIC8gMikgKiB5KSk7XG4gICAgICAgICAgY3R4LmxpbmVUbygtbyArICgoX3RoaXMucyAvIDIpICogdHgpLCBvICsgKChfdGhpcy5zIC8gMikgKiB0eSkpO1xuICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBfdGhpcy53O1xuICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGM7XG4gICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGN0eC5zYXZlKCk7XG5cbiAgICAgICAgY3R4LnRyYW5zbGF0ZSh0aGlzLnggKyBNYXRoLnNpbigoeCArICh0IC8gMTApKSAvIDEwMCkgKiA1LCB0aGlzLnkgKyBNYXRoLnNpbigoMTAgKyB4ICsgKHQgLyAxMCkpIC8gMTAwKSAqIDIpO1xuICAgICAgICBjdHgucm90YXRlKHRoaXMuciAqIE1hdGguUEkgLyAxODApO1xuXG4gICAgICAgIGxpbmUoLTEsIC0xLCAxLCAxLCAnIzUyMzY0QicpO1xuICAgICAgICBsaW5lKDEsIC0xLCAtMSwgMSwgJyM1MjM2NEInKTtcblxuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBmb3IodmFyIHggPSAwOyB4IDwgQ2FudmFzLndpZHRoOyB4KyspIHtcbiAgICBmb3IodmFyIHkgPSAwOyB5IDwgQ2FudmFzLmhlaWdodDsgeSsrKSB7XG4gICAgICBpZihNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA4MDAwKSA9PSAxKSB7XG4gICAgICAgIHZhciBzID0gKChNYXRoLnJhbmRvbSgpICogNSkgKyAxKSAvIDEwO1xuICAgICAgICBpZihNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpID09IDEpXG4gICAgICAgICAgZWxlbWVudHMucHVzaChwcmVzZXRzLm8oeCwgeSwgcywgMCwgMCkpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgZWxlbWVudHMucHVzaChwcmVzZXRzLngoeCwgeSwgcywgMCwgMCwgKChNYXRoLnJhbmRvbSgpICogMykgLSAxKSAvIDEwLCAoTWF0aC5yYW5kb20oKSAqIDM2MCkpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBDYW52YXMud2lkdGgsIENhbnZhcy5oZWlnaHQpO1xuXG4gICAgdmFyIHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBmb3IgKHZhciBlIGluIGVsZW1lbnRzKVxuICAgICAgZWxlbWVudHNbZV0uZHJhdyhjdHgsIHRpbWUpO1xuICB9LCAxMCk7XG5cbn07XG4qL1xuXG4vLyBGdW5jdGlvbnNcbmpRdWVyeS5mbi5leHRlbmQoe1xuICBnZXRQcm9ncmVzcygpIHtcbiAgICBsZXQgcG9yY2VudGFnZSA9ICQodGhpcykuYXR0cignZGF0YS1wcm9ncmVzcycpO1xuXG4gICAgJCh0aGlzKVxuICAgICAgLmZpbmQoJ3NwYW4nKVxuICAgICAgLmNzcyh7d2lkdGg6IGAke3BvcmNlbnRhZ2V9JWB9KTtcblxuICAgIHJldHVybiAkKHRoaXMpO1xuICB9LFxuICByYW5kb21Db2xvcigpIHtcblxuICAgICQodGhpcylcbiAgICAgIC5jc3Moe1xuICAgICAgYmFja2dyb3VuZDogcmFuZG9tQ29sb3IoeyBsdW1pbm9zaXR5OiAnYnJpZ2h0JywgaHVlOiAnYmx1ZSd9KVxuICAgIH0pO1xuXG4gICAgcmV0dXJuICQodGhpcyk7XG4gIH1cbn0pO1xuXG5KQi5qb2JIb3ZlciA9ICgpID0+IHtcbiAgJCgnI2pzLWpvYmxpc3QgPiBsaScpLmhvdmVyKGZ1bmN0aW9uKCl7XG4gICAgbGV0IGh1ZSA9ICQodGhpcykuY2xvc2VzdCgnLmpzLXJhbmQnKS5jc3MoJ2JhY2tncm91bmQtY29sb3InKTtcbiAgICAkKHRoaXMpLnNpYmxpbmdzKCkuZmFkZVRvKDIsMC41KTtcbiAgfSxmdW5jdGlvbigpIHtcbiAgICAkKHRoaXMpLnNpYmxpbmdzKCkuZmFkZVRvKDIsMSk7XG4gIH0pO1xufTtcblxuSkIudXNlciA9ICgpID0+IHtcbiAgJCgnLmpzLXVzZXInKS5vbignY2xpY2snLGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAkKCdodG1sIGJvZHknKS5hZGRDbGFzcygnaGlkZGVuJyk7XG5cbiAgICAkKCcuanMtbW9kYWx1c2VyJylcbiAgICAgIC5hZGRDbGFzcygnbG9hZCcpXG4gICAgICAuZmluZCgnbGknKVxuICAgICAgLmRlbGF5KDE1MClcbiAgICAgIC5lYWNoKGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICQodGhpcykuZGVsYXkoaW5kZXggKiAyMDApLnF1ZXVlKCgpPT4gJCh0aGlzKS5hZGRDbGFzcygnbG9hZCcpLmRlcXVldWUoKSApO1xuICAgICAgfSlcbiAgfSk7XG5cbiAgJCgnLmpzLWNhbmNlbG1vZGFsJykuY2xpY2soZnVuY3Rpb24oZSl7XG4gICAgJCgnLmpzLW1vZGFsdXNlcicpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ2xvYWQnKVxuICAgICAgLmZpbmQoJ2xpJylcbiAgICAgIC5lYWNoKGZ1bmN0aW9uKCkgeyAkKHRoaXMpLnJlbW92ZUNsYXNzKCdsb2FkJykgfSk7XG5cbiAgICAkKCdodG1sIGJvZHknKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gIH0pO1xufTtcblxuLy8gUGFnZXNcbkpCLmpvYnMgPSAoKSA9PiB7XG5cbiAgSkIuam9iSG92ZXIoKTtcbiAgJCgnI2pzLWpvYmxpc3QgbGkgYScpLmVhY2goZnVuY3Rpb24gKCkge1xuXG4gICAgJCh0aGlzKVxuICAgICAgLmZpbmQoJy5qcy1wcm9ncmVzcycpXG4gICAgICAuZ2V0UHJvZ3Jlc3MoKTtcblxuICAgIHZhciBzdHIgPSAkKHRoaXMpXG4gICAgICAuZmluZCgnaDQnKVxuICAgICAgLmh0bWwoKVxuICAgICAgLm1hdGNoKC9cXGIoXFx3KS9nKTtcblxuICAgICQodGhpcylcbiAgICAgIC5maW5kKCcuanMtcmFuZCcpXG4gICAgICAucmFuZG9tQ29sb3IoKVxuICAgICAgLmZpbmQoJ3NwYW4nKVxuICAgICAgLmh0bWwoc3RyKTtcblxuXG4gIH0pO1xufTtcblxuSkIuZGV0YWlscyA9ICgpID0+IHtcbiAgJCgnLmpzLXJhbmQnKS5yYW5kb21Db2xvcigpO1xuICAkKCcuanMtcHJvZ3Jlc3MnKS5nZXRQcm9ncmVzcygpO1xuXG4gIGxldCAkZWRpdFRhc2sgPSAkKCcjanMtZWRpdC10YXNrJyk7XG5cbiAgbGV0IGNsb3NlRWRpdFRhc2sgPSAoZWwpID0+IHtcbiAgICAkKGVsKVxuICAgICAgLnBhcmVudCgpXG4gICAgICAucGFyZW50KClcbiAgICAgIC5mYWRlT3V0KClcbiAgICAgIC5yZW1vdmVDbGFzcygnb3BlbicpO1xuICB9O1xuXG4gICQoJy50YXNrcy10YWJsZSB0cicpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblxuICAgIGxldCBvZmZzZXRXaWR0aCA9IHRoaXMub2Zmc2V0V2lkdGg7XG4gICAgbGV0IGNoZWNrUmFuZ2UgPSB4ID0+ICh4ID4gb2Zmc2V0V2lkdGggKyAzMCkgJiYgZS5wYWdlWCA8IG9mZnNldFdpZHRoICsgNjA7XG5cbiAgICBpZiAoIGNoZWNrUmFuZ2UoZS5wYWdlWCkgKSB7XG4gICAgICAkZWRpdFRhc2tcbiAgICAgICAgLmFkZENsYXNzKCdvcGVuJylcbiAgICAgICAgLmZhZGVJbihbMzAwMCwnc3dpbmcnXSlcbiAgICAgICAgLmNzcyh7bGVmdDogZS5wYWdlWCAtIDEyMCwgdG9wOiBlLnBhZ2VZIC0gMTUwfSlcbiAgICB9XG4gIH0pO1xuXG4gICRlZGl0VGFza1xuICAgIC5maW5kKCdhW25hbWU9Y2FuY2VsXScpXG4gICAgLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY2xvc2VFZGl0VGFzayh0aGlzKTtcbiAgfSk7XG5cbiAgJGVkaXRUYXNrXG4gICAgLmZpbmQoJ2FbbmFtZT1lZGl0XScpXG4gICAgLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAkKCdodG1sIGJvZHknKS5hZGRDbGFzcygnaGlkZGVuJyk7XG5cbiAgICAgIGNsb3NlRWRpdFRhc2sodGhpcyk7XG4gICAgICAgJCgnLmpzLWVkaXQtam9iJylcbiAgICAgICAgLmNzcyh7aGVpZ2h0OiAkKGRvY3VtZW50KS5oZWlnaHQoKX0pXG4gICAgICAgIC5hZGRDbGFzcygnbG9hZCcpXG4gICAgICAgIC5maW5kKCcuanMtbW9kYWwtY29udGFpbmVyJylcbiAgICAgICAgLmRlbGF5KDE1MClcbiAgICAgICAgLnF1ZXVlKGZ1bmN0aW9uKCl7ICQodGhpcykuYWRkQ2xhc3MoJ2xvYWQnKS5kZXF1ZXVlKCk7IH0pO1xuICAgIH0pO1xuXG4gICQoJy5qcy1jbG9zZS1tb2RhbCcpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAkKCcuanMtbW9kYWwtY29udGFpbmVyJylcbiAgICAgIC5hZGRDbGFzcygnb3V0JylcbiAgICAgIC5kZWxheSg3MDApXG4gICAgICAucXVldWUoZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAgIC5yZW1vdmVDbGFzcygnb3V0IGxvYWQnKVxuICAgICAgICAgIC5kZXF1ZXVlKClcbiAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2xvYWQnKVxuICAgICAgICAgIC5kZXF1ZXVlKCk7XG4gICAgICB9KTtcblxuICAgICQoJ2h0bWwgYm9keScpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgfSk7XG59XG5cbkpCLmNsaWVudHMgPSAoKSA9PiB7XG4gICQoJyNqcy1jbGllbnRsaXN0IGxpIGEnKS5lYWNoKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgc3RyID0gJCh0aGlzKVxuICAgIC5maW5kKCdoNCcpXG4gICAgLmh0bWwoKVxuICAgIC5tYXRjaCgvXFxiKFxcdykvZylcbiAgICAuam9pbignJyk7XG5cbiAgICBjb25zb2xlLmxvZyhzdHIpO1xuXG4gICAgJCh0aGlzKVxuICAgICAgLmZpbmQoJy5qcy1yYW5kJylcbiAgICAgIC5yYW5kb21Db2xvcigpXG4gICAgICAuZmluZCgnc3BhbicpXG4gICAgICAuaHRtbChzdHIpO1xuICB9KTtcbn1cblxuJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuXG4gIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzLWpvYnNcIikpIHsgSkIuam9icygpOyB9XG4gIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzLWpvYmRldGFpbHNcIikpIHsgSkIuZGV0YWlscygpOyB9XG4gIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzLWNsaWVudHNcIikpIHsgSkIuY2xpZW50cygpOyB9XG4gIEpCLnVzZXIoKTtcbn0pO1xuXG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
