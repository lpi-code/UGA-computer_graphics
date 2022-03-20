MorphSVGPlugin.convertToPath('polygon, rect');

var xmlns = "http://www.w3.org/2000/svg",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
  container = select('.container'),
  missileGroup = select('#missileGroup'),
  barrelGroupLines = selectAll('#barrelGroup path'),
  speedLines = selectAll('#speedLineGroup line'),
  speedLineColours = ['#4A1F20', '#4875A0', '#3d3d3d', '#8A5300', '#131E2D']

var isDevice = (/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent.toLowerCase()));

//center the container cos it's pretty an' that
TweenMax.set(container, {
  position: 'absolute',
  top: '50%',
  left: '50%',
  xPercent: -50,
  yPercent: -50
})

TweenMax.set('svg', {
  visibility: 'visible'
})

TweenMax.set(missileGroup, {
  transformOrigin: '50% 50%',
  rotation: 90,
  scaleX: 0.6
})

TweenMax.staggerTo(speedLines, 0, {
  drawSVG: '100% 100%',

  cycle: {
    strokeWidth: [1, 2, 1, 1, 2],
    stroke: speedLineColours,
    alpha: function(i) {
      return 1 - Math.random();
      //return 1;
    }
  }
}, 0)
var reverseTl = new TimelineMax({
  paused: true
});
var tl = new TimelineMax({
  repeat: -1,
  onReverseComplete: function() {
    tl.time(tl.duration());
    tl.reverse();
  }
});
tl.to('#finL', 1, {
    morphSVG: {
      shape: '#finMid'
    },
    ease: Linear.easeNone
  })
  .to('#finMid', 1, {
    morphSVG: {
      shape: '#finR'
    },
    ease: Linear.easeNone
  }, '-=1')
  .to('#finR', 1, {
    //transformOrigin:'0%'
    scaleX: 0,
    fill: '#646464',
    ease: Linear.easeNone
  }, '-=1')
  .from('#finLBehind', 1, {
    transformOrigin: '100% 50%',
    scaleX: 0,
    fill: '#646464',
    ease: Linear.easeNone
  }, '-=1')
  .to(barrelGroupLines, 1, {
    x: 18,
    ease: Linear.easeNone
  }, '-=1')

/*tl.time(tl.duration());
tl.reverse();*/
reverseTl.add(tl, 0);
reverseTl.time(1000);
TweenMax.to(reverseTl, 20, {
  time: reverseTl.time() - 4,
  ease: Back.easeInOut.config(4),
  repeat: -1,
  yoyo: true
})

//tl.timeScale(7)
//console.log(reverseTl.duration())
var upDownTl = new TimelineMax({
  repeat: -1,
  yoyo: true
});
upDownTl.to(missileGroup, 3, {
    y: -100,
    delay: randomBetween(0, 3),
    ease: Anticipate.easeInOut
  })
  .to(missileGroup, 3, {
    y: -60,
    delay: randomBetween(0, 3),
    ease: Anticipate.easeInOut
  })
  .to(missileGroup, 4, {
    y: 23,
    delay: randomBetween(0, 3),
    ease: Anticipate.easeInOut
  })
  .to(missileGroup, 3, {
    y: 2,
    delay: randomBetween(0, 3),
    ease: Anticipate.easeInOut
  })
  .to(missileGroup, 3, {
    y: -43,
    delay: randomBetween(0, 3),
    ease: Anticipate.easeInOut
  })
  .to(missileGroup, 3, {
    y: 0,
    delay: randomBetween(0, 3),
    ease: Anticipate.easeInOut
  })
  .to(missileGroup, 5, {
    y: -220,
    delay: randomBetween(0, 3),
    ease: Anticipate.easeInOut
  })

upDownTl.timeScale(1);

var leftRightTl = new TimelineMax({
  repeat: -1,
  yoyo: true
});
leftRightTl.to(missileGroup, 3, {
    x: -30,
    delay: randomBetween(0, 3),
    ease: Anticipate.easeInOut
  })
  .to(missileGroup, 3, {
    x: -60,
    delay: randomBetween(0, 3),
    ease: Anticipate.easeInOut
  })

.to(missileGroup, 3, {
    x: 0,
    delay: randomBetween(0, 3),
    ease: Anticipate.easeInOut
  })
  .to(missileGroup, 5, {
    x: -120,
    delay: randomBetween(0, 3),
    ease: Anticipate.easeInOut
  })

leftRightTl.timeScale(1);

var allSpeedTl = new TimelineMax();

for (var i = 0; i < speedLines.length; i++) {
  var repeatDelay = randomBetween(10, 30);
  console.log(repeatDelay)
  var speedTl = new TimelineMax({
    repeat: -1,
    repeatDelay: repeatDelay
  });
  var dur = 5; //randomBetween(1, 3);
  var startLen = randomBetween(70, 90);
  var endLen = 100 - startLen;
  speedTl.to(speedLines[i], dur / 4, {
      drawSVG: '100% ' + startLen + '%',
      ease: Linear.easeNone
    })
    .to(speedLines[i], dur, {
      drawSVG: endLen + '% 0%',
      ease: Linear.easeNone
    })
    .to(speedLines[i], dur / 4, {
      drawSVG: '0% 0%',
      ease: Linear.easeNone
    })

  allSpeedTl.add(speedTl, (i + 1) / 6)
}

allSpeedTl.timeScale(26)

TweenMax.to('#turbulence', 4, {
    attr: {
      seed: 1000
    },
    repeat: -1,
    yoyo: true,
    ease: Linear.easeNone
  })
  /*

  */
function shakeMissile() {

  TweenMax.to('#missileShake', 0.024, {
    y: -2,
    repeat: -1,
    //repeatDelay:0.005,
    yoyo: true,
    ease: Linear.easeNone

  })

  TweenMax.to('#missileShake', 0.016, {
    x: 3,
    repeat: -1,
    yoyo: true,
    ease: Linear.easeNone

  })
  //change the flame hue
  TweenMax.to('#flameHue', 16, {
    attr:{
      values:360
    },
    repeat:-1,
    ease:Linear.easeNone
    
  })
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  //ScrubGSAPTimeline(tl)

if (!isDevice) {
  shakeMissile();
}