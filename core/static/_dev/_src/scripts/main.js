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
  getProgress() {
    let porcentage = $(this).attr('data-progress');

    $(this)
      .find('span')
      .css({width: `${porcentage}%`});

    return $(this);
  },
  randomColor() {

    $(this)
      .css({
      background: randomColor({ luminosity: 'bright', hue: 'blue'})
    });

    return $(this);
  }
});

JB.jobHover = () => {
  $('#js-joblist > li').hover(function(){
    let hue = $(this).closest('.js-rand').css('background-color');
    $(this).siblings().fadeTo(2,0.5);
  },function() {
    $(this).siblings().fadeTo(2,1);
  });
};

JB.user = () => {
  $('.js-user').on('click',function(e){
    e.preventDefault();
    $('.js-overlay')
      .addClass('load')
      .find('li')
      .delay(150)
      .each(function(index){
      $(this).delay(index * 200).queue(()=> $(this).addClass('load').dequeue() );
      })
  });

  $('.js-cancelmodal').click(function(e){
    $('.js-overlay')
      .removeClass('load')
      .find('li')
      .each(function() { $(this).removeClass('load') });
  });
};

// Pages
JB.jobs = () => {

  JB.jobHover();
  $('#js-joblist li a').each(function () {

    $(this)
      .find('.js-progress')
      .getProgress();

    var str = $(this)
      .find('h4')
      .html()
      .match(/\b(\w)/g);

    $(this)
      .find('.js-rand')
      .randomColor()
      .find('span')
      .html(str);


  });
};

JB.details = () => {
  $('.js-rand').randomColor();
  $('.js-progress').getProgress();

  $('.tasks-table tr').click(function(e) {

    let offsetWidth = this.offsetWidth;
    let checkRange = x => (x > offsetWidth + 30) && e.pageX < offsetWidth + 60;

    if ( checkRange(e.pageX) ) {
      $('#js-edit-task')
        .fadeIn()
        .css({left: e.pageX - 80, top: e.pageY - 50})
    }
  });
}

JB.clients = () => {
  $('#js-clientlist li a').each(function () {

  var str = $(this)
    .find('h4')
    .html()
    .match(/\b(\w)/g)
    .join('');

    console.log(str);

    $(this)
      .find('.js-rand')
      .randomColor()
      .find('span')
      .html(str);
  });
}

$(document).ready(() => {

  if (document.getElementById("js-jobs")) { JB.jobs(); }
  if (document.getElementById("js-jobdetails")) { JB.details(); }
  if (document.getElementById("js-clients")) { JB.clients(); }
  JB.user();
});


