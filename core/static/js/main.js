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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUEsUUFBUSxHQUFSLENBQVksa0JBQVo7QUFDQSxJQUFJLEtBQUssRUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzR0osT0FBTyxFQUFQLENBQVUsTUFBVixDQUFpQjtBQUNmLHNDQUFjO0FBQ1osUUFBSSxhQUFhLEVBQUUsSUFBRixFQUFRLElBQVIsQ0FBYSxlQUFiLENBQWIsQ0FEUTs7QUFHWixNQUFFLElBQUYsRUFDRyxJQURILENBQ1EsTUFEUixFQUVHLEdBRkgsQ0FFTyxFQUFDLE9BQVUsZ0JBQVYsRUFGUixFQUhZOztBQU9aLFdBQU8sRUFBRSxJQUFGLENBQVAsQ0FQWTtHQURDO0FBVWY7Ozs7Ozs7Ozs7Z0JBQWM7O0FBRVosTUFBRSxJQUFGLEVBQ0csR0FESCxDQUNPO0FBQ0wsa0JBQVksWUFBWSxFQUFFLFlBQVksUUFBWixFQUFzQixLQUFLLGVBQUwsRUFBcEMsQ0FBWjtLQUZGLEVBRlk7O0FBT1osV0FBTyxFQUFFLElBQUYsQ0FBUCxDQVBZO0lBVkM7Q0FBakI7O0FBcUJBLEdBQUcsUUFBSCxHQUFjLFlBQU07QUFDbEIsSUFBRSxrQkFBRixFQUFzQixLQUF0QixDQUE0QixZQUFVO0FBQ3BDLFFBQUksTUFBTSxFQUFFLElBQUYsRUFBUSxPQUFSLENBQWdCLFVBQWhCLEVBQTRCLEdBQTVCLENBQWdDLGtCQUFoQyxDQUFOLENBRGdDO0FBRXBDLE1BQUUsSUFBRixFQUFRLFFBQVIsR0FBbUIsTUFBbkIsQ0FBMEIsQ0FBMUIsRUFBNEIsR0FBNUIsRUFGb0M7R0FBVixFQUcxQixZQUFXO0FBQ1gsTUFBRSxJQUFGLEVBQVEsUUFBUixHQUFtQixNQUFuQixDQUEwQixDQUExQixFQUE0QixDQUE1QixFQURXO0dBQVgsQ0FIRixDQURrQjtDQUFOOzs7QUFVZCxHQUFHLElBQUgsR0FBVSxZQUFNOztBQUVkLEtBQUcsUUFBSCxHQUZjO0FBR2QsSUFBRSxrQkFBRixFQUFzQixJQUF0QixDQUEyQixZQUFZO0FBQ3JDLE1BQUUsSUFBRixFQUNHLElBREgsQ0FDUSxjQURSLEVBRUcsV0FGSCxHQURxQzs7QUFLckMsTUFBRSxJQUFGLEVBQ0csSUFESCxDQUNRLFVBRFIsRUFFRyxXQUZILEdBTHFDO0dBQVosQ0FBM0IsQ0FIYztDQUFOOztBQWNWLEdBQUcsT0FBSCxHQUFhLFlBQU07QUFDakIsSUFBRSxVQUFGLEVBQWMsV0FBZCxHQURpQjtBQUVqQixJQUFFLGNBQUYsRUFBa0IsV0FBbEIsR0FGaUI7O0FBSWpCLElBQUUsaUJBQUYsRUFBcUIsS0FBckIsQ0FBMkIsVUFBUyxDQUFULEVBQVk7O0FBRXJDLFFBQUksY0FBYyxLQUFLLFdBQUwsQ0FGbUI7QUFHckMsUUFBSSxhQUFhLFNBQWIsVUFBYTthQUFLLENBQUMsR0FBSSxjQUFjLEVBQWQsSUFBcUIsRUFBRSxLQUFGLEdBQVUsY0FBYyxFQUFkO0tBQXpDLENBSG9COztBQUtyQyxRQUFLLFdBQVcsRUFBRSxLQUFGLENBQWhCLEVBQTJCO0FBQ3pCLFFBQUUsZUFBRixFQUNHLE1BREgsR0FFRyxHQUZILENBRU8sRUFBQyxNQUFNLEVBQUUsS0FBRixHQUFVLEVBQVYsRUFBYyxLQUFLLEVBQUUsS0FBRixHQUFVLEVBQVYsRUFGakMsRUFEeUI7S0FBM0I7R0FMeUIsQ0FBM0IsQ0FKaUI7Q0FBTjs7QUFpQmIsRUFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUFNO0FBQ3RCLE1BQUksU0FBUyxjQUFULENBQXdCLFNBQXhCLENBQUosRUFBd0M7QUFBRSxPQUFHLElBQUgsR0FBRjtHQUF4QztBQUNBLE1BQUksU0FBUyxjQUFULENBQXdCLFlBQXhCLENBQUosRUFBMkM7QUFBRSxPQUFHLE9BQUgsR0FBRjtHQUEzQztDQUZnQixDQUFsQiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zb2xlLmxvZygnREpBTkdPIFN0cnVjdHVyZScpO1xudmFyIEpCID0ge307XG5cblxuLypcbmpiLmJhY2tncm91bmQgPSAgKCkgPT4ge1xuICB2YXIgQ2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xuICB2YXIgY3R4ID0gQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgdmFyIHJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIENhbnZhcy53aWR0aCA9IENhbnZhcy5jbGllbnRXaWR0aDtcbiAgICBDYW52YXMuaGVpZ2h0ID0gQ2FudmFzLmNsaWVudEhlaWdodDtcbiAgfTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZSk7XG4gIHJlc2l6ZSgpO1xuXG4gIHZhciBlbGVtZW50cyA9IFtdO1xuICB2YXIgcHJlc2V0cyA9IHt9O1xuXG4gIHByZXNldHMubyA9IGZ1bmN0aW9uICh4LCB5LCBzLCBkeCwgZHkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogeCxcbiAgICAgIHk6IHksXG4gICAgICByOiAxMiAqIHMsXG4gICAgICB3OiA1ICogcyxcbiAgICAgIGR4OiBkeCxcbiAgICAgIGR5OiBkeSxcbiAgICAgIGRyYXc6IGZ1bmN0aW9uKGN0eCwgdCkge1xuICAgICAgICB0aGlzLnggKz0gdGhpcy5keDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMuZHk7XG5cbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHRoaXMueCArICsgTWF0aC5zaW4oKDUwICsgeCArICh0IC8gMTApKSAvIDEwMCkgKiAzLCB0aGlzLnkgKyArIE1hdGguc2luKCg0NSArIHggKyAodCAvIDEwKSkgLyAxMDApICogNCwgdGhpcy5yLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gdGhpcy53O1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSAnIzUyMzY0Qic7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcHJlc2V0cy54ID0gZnVuY3Rpb24gKHgsIHksIHMsIGR4LCBkeSwgZHIsIHIpIHtcbiAgICByID0gciB8fCAwO1xuICAgIHJldHVybiB7XG4gICAgICB4OiB4LFxuICAgICAgeTogeSxcbiAgICAgIHM6IDIwICogcyxcbiAgICAgIHc6IDUgKiBzLFxuICAgICAgcjogcixcbiAgICAgIGR4OiBkeCxcbiAgICAgIGR5OiBkeSxcbiAgICAgIGRyOiBkcixcbiAgICAgIGRyYXc6IGZ1bmN0aW9uKGN0eCwgdCkge1xuICAgICAgICB0aGlzLnggKz0gdGhpcy5keDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMuZHk7XG4gICAgICAgIHRoaXMuciArPSB0aGlzLmRyO1xuXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBsaW5lID0gZnVuY3Rpb24oeCwgeSwgdHgsIHR5LCBjLCBvKSB7XG4gICAgICAgICAgbyA9IG8gfHwgMDtcbiAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgY3R4Lm1vdmVUbygtbyArICgoX3RoaXMucyAvIDIpICogeCksIG8gKyAoKF90aGlzLnMgLyAyKSAqIHkpKTtcbiAgICAgICAgICBjdHgubGluZVRvKC1vICsgKChfdGhpcy5zIC8gMikgKiB0eCksIG8gKyAoKF90aGlzLnMgLyAyKSAqIHR5KSk7XG4gICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IF90aGlzLnc7XG4gICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gYztcbiAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY3R4LnNhdmUoKTtcblxuICAgICAgICBjdHgudHJhbnNsYXRlKHRoaXMueCArIE1hdGguc2luKCh4ICsgKHQgLyAxMCkpIC8gMTAwKSAqIDUsIHRoaXMueSArIE1hdGguc2luKCgxMCArIHggKyAodCAvIDEwKSkgLyAxMDApICogMik7XG4gICAgICAgIGN0eC5yb3RhdGUodGhpcy5yICogTWF0aC5QSSAvIDE4MCk7XG5cbiAgICAgICAgbGluZSgtMSwgLTEsIDEsIDEsICcjNTIzNjRCJyk7XG4gICAgICAgIGxpbmUoMSwgLTEsIC0xLCAxLCAnIzUyMzY0QicpO1xuXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGZvcih2YXIgeCA9IDA7IHggPCBDYW52YXMud2lkdGg7IHgrKykge1xuICAgIGZvcih2YXIgeSA9IDA7IHkgPCBDYW52YXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgIGlmKE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDgwMDApID09IDEpIHtcbiAgICAgICAgdmFyIHMgPSAoKE1hdGgucmFuZG9tKCkgKiA1KSArIDEpIC8gMTA7XG4gICAgICAgIGlmKE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSkgPT0gMSlcbiAgICAgICAgICBlbGVtZW50cy5wdXNoKHByZXNldHMubyh4LCB5LCBzLCAwLCAwKSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBlbGVtZW50cy5wdXNoKHByZXNldHMueCh4LCB5LCBzLCAwLCAwLCAoKE1hdGgucmFuZG9tKCkgKiAzKSAtIDEpIC8gMTAsIChNYXRoLnJhbmRvbSgpICogMzYwKSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIENhbnZhcy53aWR0aCwgQ2FudmFzLmhlaWdodCk7XG5cbiAgICB2YXIgdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGZvciAodmFyIGUgaW4gZWxlbWVudHMpXG4gICAgICBlbGVtZW50c1tlXS5kcmF3KGN0eCwgdGltZSk7XG4gIH0sIDEwKTtcblxufTtcbiovXG5cbi8vIEZ1bmN0aW9uc1xualF1ZXJ5LmZuLmV4dGVuZCh7XG4gIGdldFByb2dyZXNzKCkge1xuICAgIGxldCBwb3JjZW50YWdlID0gJCh0aGlzKS5hdHRyKCdkYXRhLXByb2dyZXNzJyk7XG5cbiAgICAkKHRoaXMpXG4gICAgICAuZmluZCgnc3BhbicpXG4gICAgICAuY3NzKHt3aWR0aDogYCR7cG9yY2VudGFnZX0lYH0pO1xuXG4gICAgcmV0dXJuICQodGhpcyk7XG4gIH0sXG4gIHJhbmRvbUNvbG9yKCkge1xuXG4gICAgJCh0aGlzKVxuICAgICAgLmNzcyh7XG4gICAgICBiYWNrZ3JvdW5kOiByYW5kb21Db2xvcih7IGx1bWlub3NpdHk6ICdicmlnaHQnLCBodWU6ICdtb25vY2hyb21hdGljJ30pXG4gICAgfSk7XG5cbiAgICByZXR1cm4gJCh0aGlzKTtcbiAgfVxufSk7XG5cbkpCLmpvYkhvdmVyID0gKCkgPT4ge1xuICAkKCcjanMtam9ibGlzdCA+IGxpJykuaG92ZXIoZnVuY3Rpb24oKXtcbiAgICBsZXQgaHVlID0gJCh0aGlzKS5jbG9zZXN0KCcuanMtcmFuZCcpLmNzcygnYmFja2dyb3VuZC1jb2xvcicpO1xuICAgICQodGhpcykuc2libGluZ3MoKS5mYWRlVG8oMiwwLjUpO1xuICB9LGZ1bmN0aW9uKCkge1xuICAgICQodGhpcykuc2libGluZ3MoKS5mYWRlVG8oMiwxKTtcbiAgfSk7XG59O1xuXG4vLyBQYWdlc1xuSkIuam9icyA9ICgpID0+IHtcblxuICBKQi5qb2JIb3ZlcigpO1xuICAkKCcjanMtam9ibGlzdCBsaSBhJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKVxuICAgICAgLmZpbmQoJy5qcy1wcm9ncmVzcycpXG4gICAgICAuZ2V0UHJvZ3Jlc3MoKTtcblxuICAgICQodGhpcylcbiAgICAgIC5maW5kKCcuanMtcmFuZCcpXG4gICAgICAucmFuZG9tQ29sb3IoKTtcbiAgfSk7XG59O1xuXG5KQi5kZXRhaWxzID0gKCkgPT4ge1xuICAkKCcuanMtcmFuZCcpLnJhbmRvbUNvbG9yKCk7XG4gICQoJy5qcy1wcm9ncmVzcycpLmdldFByb2dyZXNzKCk7XG5cbiAgJCgnLnRhc2tzLXRhYmxlIHRyJykuY2xpY2soZnVuY3Rpb24oZSkge1xuXG4gICAgbGV0IG9mZnNldFdpZHRoID0gdGhpcy5vZmZzZXRXaWR0aDtcbiAgICBsZXQgY2hlY2tSYW5nZSA9IHggPT4gKHggPiBvZmZzZXRXaWR0aCArIDMwKSAmJiBlLnBhZ2VYIDwgb2Zmc2V0V2lkdGggKyA2MDtcblxuICAgIGlmICggY2hlY2tSYW5nZShlLnBhZ2VYKSApIHtcbiAgICAgICQoJyNqcy1lZGl0LXRhc2snKVxuICAgICAgICAuZmFkZUluKClcbiAgICAgICAgLmNzcyh7bGVmdDogZS5wYWdlWCAtIDgwLCB0b3A6IGUucGFnZVkgLSA1MH0pXG4gICAgfVxuICB9KTtcbn1cblxuJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqcy1qb2JzXCIpKSB7IEpCLmpvYnMoKTsgfVxuICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqcy1kZXRhaWxzXCIpKSB7IEpCLmRldGFpbHMoKTsgfVxufSk7XG5cblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
