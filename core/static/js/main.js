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
    $('.js-overlay').addClass('load').find('li').delay(150).each(function (index) {
      var _this = this;

      $(this).delay(index * 200).queue(function () {
        return $(_this).addClass('load').dequeue();
      });
    });
  });

  $('.js-cancelmodal').click(function (e) {
    $('.js-overlay').removeClass('load').find('li').each(function () {
      $(this).removeClass('load');
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUEsUUFBUSxHQUFSLENBQVksa0JBQVo7QUFDQSxJQUFJLEtBQUssRUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzR0osT0FBTyxFQUFQLENBQVUsTUFBVixDQUFpQjtBQUNmLHNDQUFjO0FBQ1osUUFBSSxhQUFhLEVBQUUsSUFBRixFQUFRLElBQVIsQ0FBYSxlQUFiLENBQWIsQ0FEUTs7QUFHWixNQUFFLElBQUYsRUFDRyxJQURILENBQ1EsTUFEUixFQUVHLEdBRkgsQ0FFTyxFQUFDLE9BQVUsZ0JBQVYsRUFGUixFQUhZOztBQU9aLFdBQU8sRUFBRSxJQUFGLENBQVAsQ0FQWTtHQURDO0FBVWY7Ozs7Ozs7Ozs7Z0JBQWM7O0FBRVosTUFBRSxJQUFGLEVBQ0csR0FESCxDQUNPO0FBQ0wsa0JBQVksWUFBWSxFQUFFLFlBQVksUUFBWixFQUFzQixLQUFLLE1BQUwsRUFBcEMsQ0FBWjtLQUZGLEVBRlk7O0FBT1osV0FBTyxFQUFFLElBQUYsQ0FBUCxDQVBZO0lBVkM7Q0FBakI7O0FBcUJBLEdBQUcsUUFBSCxHQUFjLFlBQU07QUFDbEIsSUFBRSxrQkFBRixFQUFzQixLQUF0QixDQUE0QixZQUFVO0FBQ3BDLFFBQUksTUFBTSxFQUFFLElBQUYsRUFBUSxPQUFSLENBQWdCLFVBQWhCLEVBQTRCLEdBQTVCLENBQWdDLGtCQUFoQyxDQUFOLENBRGdDO0FBRXBDLE1BQUUsSUFBRixFQUFRLFFBQVIsR0FBbUIsTUFBbkIsQ0FBMEIsQ0FBMUIsRUFBNEIsR0FBNUIsRUFGb0M7R0FBVixFQUcxQixZQUFXO0FBQ1gsTUFBRSxJQUFGLEVBQVEsUUFBUixHQUFtQixNQUFuQixDQUEwQixDQUExQixFQUE0QixDQUE1QixFQURXO0dBQVgsQ0FIRixDQURrQjtDQUFOOztBQVNkLEdBQUcsSUFBSCxHQUFVLFlBQU07QUFDZCxJQUFFLFVBQUYsRUFBYyxFQUFkLENBQWlCLE9BQWpCLEVBQXlCLFVBQVMsQ0FBVCxFQUFXO0FBQ2xDLE1BQUUsY0FBRixHQURrQztBQUVsQyxNQUFFLGFBQUYsRUFDRyxRQURILENBQ1ksTUFEWixFQUVHLElBRkgsQ0FFUSxJQUZSLEVBR0csS0FISCxDQUdTLEdBSFQsRUFJRyxJQUpILENBSVEsVUFBUyxLQUFULEVBQWU7OztBQUNyQixRQUFFLElBQUYsRUFBUSxLQUFSLENBQWMsUUFBUSxHQUFSLENBQWQsQ0FBMkIsS0FBM0IsQ0FBaUM7ZUFBSyxTQUFRLFFBQVIsQ0FBaUIsTUFBakIsRUFBeUIsT0FBekI7T0FBTCxDQUFqQyxDQURxQjtLQUFmLENBSlIsQ0FGa0M7R0FBWCxDQUF6QixDQURjOztBQVlkLElBQUUsaUJBQUYsRUFBcUIsS0FBckIsQ0FBMkIsVUFBUyxDQUFULEVBQVc7QUFDcEMsTUFBRSxhQUFGLEVBQ0csV0FESCxDQUNlLE1BRGYsRUFFRyxJQUZILENBRVEsSUFGUixFQUdHLElBSEgsQ0FHUSxZQUFXO0FBQUUsUUFBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixNQUFwQixFQUFGO0tBQVgsQ0FIUixDQURvQztHQUFYLENBQTNCLENBWmM7Q0FBTjs7O0FBcUJWLEdBQUcsSUFBSCxHQUFVLFlBQU07O0FBRWQsS0FBRyxRQUFILEdBRmM7QUFHZCxJQUFFLGtCQUFGLEVBQXNCLElBQXRCLENBQTJCLFlBQVk7O0FBRXJDLE1BQUUsSUFBRixFQUNHLElBREgsQ0FDUSxjQURSLEVBRUcsV0FGSCxHQUZxQzs7QUFNckMsUUFBSSxNQUFNLEVBQUUsSUFBRixFQUNQLElBRE8sQ0FDRixJQURFLEVBRVAsSUFGTyxHQUdQLEtBSE8sQ0FHRCxTQUhDLENBQU4sQ0FOaUM7O0FBV3JDLE1BQUUsSUFBRixFQUNHLElBREgsQ0FDUSxVQURSLEVBRUcsV0FGSCxHQUdHLElBSEgsQ0FHUSxNQUhSLEVBSUcsSUFKSCxDQUlRLEdBSlIsRUFYcUM7R0FBWixDQUEzQixDQUhjO0NBQU47O0FBd0JWLEdBQUcsT0FBSCxHQUFhLFlBQU07QUFDakIsSUFBRSxVQUFGLEVBQWMsV0FBZCxHQURpQjtBQUVqQixJQUFFLGNBQUYsRUFBa0IsV0FBbEIsR0FGaUI7O0FBSWpCLElBQUUsaUJBQUYsRUFBcUIsS0FBckIsQ0FBMkIsVUFBUyxDQUFULEVBQVk7O0FBRXJDLFFBQUksY0FBYyxLQUFLLFdBQUwsQ0FGbUI7QUFHckMsUUFBSSxhQUFhLFNBQWIsVUFBYTthQUFLLENBQUMsR0FBSSxjQUFjLEVBQWQsSUFBcUIsRUFBRSxLQUFGLEdBQVUsY0FBYyxFQUFkO0tBQXpDLENBSG9COztBQUtyQyxRQUFLLFdBQVcsRUFBRSxLQUFGLENBQWhCLEVBQTJCO0FBQ3pCLFFBQUUsZUFBRixFQUNHLE1BREgsR0FFRyxHQUZILENBRU8sRUFBQyxNQUFNLEVBQUUsS0FBRixHQUFVLEVBQVYsRUFBYyxLQUFLLEVBQUUsS0FBRixHQUFVLEVBQVYsRUFGakMsRUFEeUI7S0FBM0I7R0FMeUIsQ0FBM0IsQ0FKaUI7Q0FBTjs7QUFpQmIsR0FBRyxPQUFILEdBQWEsWUFBTTtBQUNqQixJQUFFLHFCQUFGLEVBQXlCLElBQXpCLENBQThCLFlBQVk7O0FBRTFDLFFBQUksTUFBTSxFQUFFLElBQUYsRUFDUCxJQURPLENBQ0YsSUFERSxFQUVQLElBRk8sR0FHUCxLQUhPLENBR0QsU0FIQyxFQUlQLElBSk8sQ0FJRixFQUpFLENBQU4sQ0FGc0M7O0FBUXhDLFlBQVEsR0FBUixDQUFZLEdBQVosRUFSd0M7O0FBVXhDLE1BQUUsSUFBRixFQUNHLElBREgsQ0FDUSxVQURSLEVBRUcsV0FGSCxHQUdHLElBSEgsQ0FHUSxNQUhSLEVBSUcsSUFKSCxDQUlRLEdBSlIsRUFWd0M7R0FBWixDQUE5QixDQURpQjtDQUFOOztBQW1CYixFQUFFLFFBQUYsRUFBWSxLQUFaLENBQWtCLFlBQU07O0FBRXRCLE1BQUksU0FBUyxjQUFULENBQXdCLFNBQXhCLENBQUosRUFBd0M7QUFBRSxPQUFHLElBQUgsR0FBRjtHQUF4QztBQUNBLE1BQUksU0FBUyxjQUFULENBQXdCLGVBQXhCLENBQUosRUFBOEM7QUFBRSxPQUFHLE9BQUgsR0FBRjtHQUE5QztBQUNBLE1BQUksU0FBUyxjQUFULENBQXdCLFlBQXhCLENBQUosRUFBMkM7QUFBRSxPQUFHLE9BQUgsR0FBRjtHQUEzQztBQUNBLEtBQUcsSUFBSCxHQUxzQjtDQUFOLENBQWxCIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnNvbGUubG9nKCdESkFOR08gU3RydWN0dXJlJyk7XG52YXIgSkIgPSB7fTtcblxuXG4vKlxuamIuYmFja2dyb3VuZCA9ICAoKSA9PiB7XG4gIHZhciBDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG4gIHZhciBjdHggPSBDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICB2YXIgcmVzaXplID0gZnVuY3Rpb24oKSB7XG4gICAgQ2FudmFzLndpZHRoID0gQ2FudmFzLmNsaWVudFdpZHRoO1xuICAgIENhbnZhcy5oZWlnaHQgPSBDYW52YXMuY2xpZW50SGVpZ2h0O1xuICB9O1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplKTtcbiAgcmVzaXplKCk7XG5cbiAgdmFyIGVsZW1lbnRzID0gW107XG4gIHZhciBwcmVzZXRzID0ge307XG5cbiAgcHJlc2V0cy5vID0gZnVuY3Rpb24gKHgsIHksIHMsIGR4LCBkeSkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiB4LFxuICAgICAgeTogeSxcbiAgICAgIHI6IDEyICogcyxcbiAgICAgIHc6IDUgKiBzLFxuICAgICAgZHg6IGR4LFxuICAgICAgZHk6IGR5LFxuICAgICAgZHJhdzogZnVuY3Rpb24oY3R4LCB0KSB7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLmR4O1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy5keTtcblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmModGhpcy54ICsgKyBNYXRoLnNpbigoNTAgKyB4ICsgKHQgLyAxMCkpIC8gMTAwKSAqIDMsIHRoaXMueSArICsgTWF0aC5zaW4oKDQ1ICsgeCArICh0IC8gMTApKSAvIDEwMCkgKiA0LCB0aGlzLnIsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSB0aGlzLnc7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjNTIzNjRCJztcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBwcmVzZXRzLnggPSBmdW5jdGlvbiAoeCwgeSwgcywgZHgsIGR5LCBkciwgcikge1xuICAgIHIgPSByIHx8IDA7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHgsXG4gICAgICB5OiB5LFxuICAgICAgczogMjAgKiBzLFxuICAgICAgdzogNSAqIHMsXG4gICAgICByOiByLFxuICAgICAgZHg6IGR4LFxuICAgICAgZHk6IGR5LFxuICAgICAgZHI6IGRyLFxuICAgICAgZHJhdzogZnVuY3Rpb24oY3R4LCB0KSB7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLmR4O1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy5keTtcbiAgICAgICAgdGhpcy5yICs9IHRoaXMuZHI7XG5cbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGxpbmUgPSBmdW5jdGlvbih4LCB5LCB0eCwgdHksIGMsIG8pIHtcbiAgICAgICAgICBvID0gbyB8fCAwO1xuICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICBjdHgubW92ZVRvKC1vICsgKChfdGhpcy5zIC8gMikgKiB4KSwgbyArICgoX3RoaXMucyAvIDIpICogeSkpO1xuICAgICAgICAgIGN0eC5saW5lVG8oLW8gKyAoKF90aGlzLnMgLyAyKSAqIHR4KSwgbyArICgoX3RoaXMucyAvIDIpICogdHkpKTtcbiAgICAgICAgICBjdHgubGluZVdpZHRoID0gX3RoaXMudztcbiAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBjO1xuICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjdHguc2F2ZSgpO1xuXG4gICAgICAgIGN0eC50cmFuc2xhdGUodGhpcy54ICsgTWF0aC5zaW4oKHggKyAodCAvIDEwKSkgLyAxMDApICogNSwgdGhpcy55ICsgTWF0aC5zaW4oKDEwICsgeCArICh0IC8gMTApKSAvIDEwMCkgKiAyKTtcbiAgICAgICAgY3R4LnJvdGF0ZSh0aGlzLnIgKiBNYXRoLlBJIC8gMTgwKTtcblxuICAgICAgICBsaW5lKC0xLCAtMSwgMSwgMSwgJyM1MjM2NEInKTtcbiAgICAgICAgbGluZSgxLCAtMSwgLTEsIDEsICcjNTIzNjRCJyk7XG5cbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZm9yKHZhciB4ID0gMDsgeCA8IENhbnZhcy53aWR0aDsgeCsrKSB7XG4gICAgZm9yKHZhciB5ID0gMDsgeSA8IENhbnZhcy5oZWlnaHQ7IHkrKykge1xuICAgICAgaWYoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogODAwMCkgPT0gMSkge1xuICAgICAgICB2YXIgcyA9ICgoTWF0aC5yYW5kb20oKSAqIDUpICsgMSkgLyAxMDtcbiAgICAgICAgaWYoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKSA9PSAxKVxuICAgICAgICAgIGVsZW1lbnRzLnB1c2gocHJlc2V0cy5vKHgsIHksIHMsIDAsIDApKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGVsZW1lbnRzLnB1c2gocHJlc2V0cy54KHgsIHksIHMsIDAsIDAsICgoTWF0aC5yYW5kb20oKSAqIDMpIC0gMSkgLyAxMCwgKE1hdGgucmFuZG9tKCkgKiAzNjApKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgQ2FudmFzLndpZHRoLCBDYW52YXMuaGVpZ2h0KTtcblxuICAgIHZhciB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgZm9yICh2YXIgZSBpbiBlbGVtZW50cylcbiAgICAgIGVsZW1lbnRzW2VdLmRyYXcoY3R4LCB0aW1lKTtcbiAgfSwgMTApO1xuXG59O1xuKi9cblxuLy8gRnVuY3Rpb25zXG5qUXVlcnkuZm4uZXh0ZW5kKHtcbiAgZ2V0UHJvZ3Jlc3MoKSB7XG4gICAgbGV0IHBvcmNlbnRhZ2UgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtcHJvZ3Jlc3MnKTtcblxuICAgICQodGhpcylcbiAgICAgIC5maW5kKCdzcGFuJylcbiAgICAgIC5jc3Moe3dpZHRoOiBgJHtwb3JjZW50YWdlfSVgfSk7XG5cbiAgICByZXR1cm4gJCh0aGlzKTtcbiAgfSxcbiAgcmFuZG9tQ29sb3IoKSB7XG5cbiAgICAkKHRoaXMpXG4gICAgICAuY3NzKHtcbiAgICAgIGJhY2tncm91bmQ6IHJhbmRvbUNvbG9yKHsgbHVtaW5vc2l0eTogJ2JyaWdodCcsIGh1ZTogJ2JsdWUnfSlcbiAgICB9KTtcblxuICAgIHJldHVybiAkKHRoaXMpO1xuICB9XG59KTtcblxuSkIuam9iSG92ZXIgPSAoKSA9PiB7XG4gICQoJyNqcy1qb2JsaXN0ID4gbGknKS5ob3ZlcihmdW5jdGlvbigpe1xuICAgIGxldCBodWUgPSAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1yYW5kJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJyk7XG4gICAgJCh0aGlzKS5zaWJsaW5ncygpLmZhZGVUbygyLDAuNSk7XG4gIH0sZnVuY3Rpb24oKSB7XG4gICAgJCh0aGlzKS5zaWJsaW5ncygpLmZhZGVUbygyLDEpO1xuICB9KTtcbn07XG5cbkpCLnVzZXIgPSAoKSA9PiB7XG4gICQoJy5qcy11c2VyJykub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgJCgnLmpzLW92ZXJsYXknKVxuICAgICAgLmFkZENsYXNzKCdsb2FkJylcbiAgICAgIC5maW5kKCdsaScpXG4gICAgICAuZGVsYXkoMTUwKVxuICAgICAgLmVhY2goZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgJCh0aGlzKS5kZWxheShpbmRleCAqIDIwMCkucXVldWUoKCk9PiAkKHRoaXMpLmFkZENsYXNzKCdsb2FkJykuZGVxdWV1ZSgpICk7XG4gICAgICB9KVxuICB9KTtcblxuICAkKCcuanMtY2FuY2VsbW9kYWwnKS5jbGljayhmdW5jdGlvbihlKXtcbiAgICAkKCcuanMtb3ZlcmxheScpXG4gICAgICAucmVtb3ZlQ2xhc3MoJ2xvYWQnKVxuICAgICAgLmZpbmQoJ2xpJylcbiAgICAgIC5lYWNoKGZ1bmN0aW9uKCkgeyAkKHRoaXMpLnJlbW92ZUNsYXNzKCdsb2FkJykgfSk7XG4gIH0pO1xufTtcblxuLy8gUGFnZXNcbkpCLmpvYnMgPSAoKSA9PiB7XG5cbiAgSkIuam9iSG92ZXIoKTtcbiAgJCgnI2pzLWpvYmxpc3QgbGkgYScpLmVhY2goZnVuY3Rpb24gKCkge1xuXG4gICAgJCh0aGlzKVxuICAgICAgLmZpbmQoJy5qcy1wcm9ncmVzcycpXG4gICAgICAuZ2V0UHJvZ3Jlc3MoKTtcblxuICAgIHZhciBzdHIgPSAkKHRoaXMpXG4gICAgICAuZmluZCgnaDQnKVxuICAgICAgLmh0bWwoKVxuICAgICAgLm1hdGNoKC9cXGIoXFx3KS9nKTtcblxuICAgICQodGhpcylcbiAgICAgIC5maW5kKCcuanMtcmFuZCcpXG4gICAgICAucmFuZG9tQ29sb3IoKVxuICAgICAgLmZpbmQoJ3NwYW4nKVxuICAgICAgLmh0bWwoc3RyKTtcblxuXG4gIH0pO1xufTtcblxuSkIuZGV0YWlscyA9ICgpID0+IHtcbiAgJCgnLmpzLXJhbmQnKS5yYW5kb21Db2xvcigpO1xuICAkKCcuanMtcHJvZ3Jlc3MnKS5nZXRQcm9ncmVzcygpO1xuXG4gICQoJy50YXNrcy10YWJsZSB0cicpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblxuICAgIGxldCBvZmZzZXRXaWR0aCA9IHRoaXMub2Zmc2V0V2lkdGg7XG4gICAgbGV0IGNoZWNrUmFuZ2UgPSB4ID0+ICh4ID4gb2Zmc2V0V2lkdGggKyAzMCkgJiYgZS5wYWdlWCA8IG9mZnNldFdpZHRoICsgNjA7XG5cbiAgICBpZiAoIGNoZWNrUmFuZ2UoZS5wYWdlWCkgKSB7XG4gICAgICAkKCcjanMtZWRpdC10YXNrJylcbiAgICAgICAgLmZhZGVJbigpXG4gICAgICAgIC5jc3Moe2xlZnQ6IGUucGFnZVggLSA4MCwgdG9wOiBlLnBhZ2VZIC0gNTB9KVxuICAgIH1cbiAgfSk7XG59XG5cbkpCLmNsaWVudHMgPSAoKSA9PiB7XG4gICQoJyNqcy1jbGllbnRsaXN0IGxpIGEnKS5lYWNoKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgc3RyID0gJCh0aGlzKVxuICAgIC5maW5kKCdoNCcpXG4gICAgLmh0bWwoKVxuICAgIC5tYXRjaCgvXFxiKFxcdykvZylcbiAgICAuam9pbignJyk7XG5cbiAgICBjb25zb2xlLmxvZyhzdHIpO1xuXG4gICAgJCh0aGlzKVxuICAgICAgLmZpbmQoJy5qcy1yYW5kJylcbiAgICAgIC5yYW5kb21Db2xvcigpXG4gICAgICAuZmluZCgnc3BhbicpXG4gICAgICAuaHRtbChzdHIpO1xuICB9KTtcbn1cblxuJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuXG4gIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzLWpvYnNcIikpIHsgSkIuam9icygpOyB9XG4gIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzLWpvYmRldGFpbHNcIikpIHsgSkIuZGV0YWlscygpOyB9XG4gIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzLWNsaWVudHNcIikpIHsgSkIuY2xpZW50cygpOyB9XG4gIEpCLnVzZXIoKTtcbn0pO1xuXG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
