import React from 'react';

import './style';

export default class Animate extends React.Component {

  state = {
    speed: .7,
    counts: 150,
    mouse: { x: 0, y: 0 },
    colors: [ "#f56a00","#3dbd7d","#f46e65","#108ee9" ],
    particles: [],
    timer: () => {}
  }

  componentWillMount() {
    let { speed, colors, counts, particles } = this.state;
    for(let i = 0; i < counts; i ++) {
      let item = {
                  x: Math.random()*window.innerWidth,
                  y: Math.random()*window.innerHeight,
                  vx: ((Math.random()*(speed*2))-speed),
                  vy: ((Math.random()*(speed*2))-speed),
                  size: 1+Math.random()*3,
                  color: colors[ Math.floor( Math.random() * colors.length ) ]
                }
      particles = [ ...particles, item ]
      this.setState({
        particles: particles
      });
    }

  }
  componentDidMount() {
    let canvas = this.canvas;

    window.addEventListener('resize', ResizeCanvas, false);

    this.state.timer = setInterval(this.TimeUpdate, 40);

    const ResizeCanvas = (e) => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    ResizeCanvas();

  }

  DistanceBetween = (p1,p2) => {
		let dx = p2.x-p1.x;
		let dy = p2.y-p1.y;
		return Math.sqrt(dx*dx + dy*dy);
	}

  TimeUpdate = () => {
    let { mouse, particles, speed } = this.state;
    let context = this.canvas.getContext('2d');
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    let particle = null;
    for( var i = 0; i < particles.length; i++ ) {
      particle = particles[i];
      if (!particle.frozen) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x > window.innerWidth) {
          particle.vx = -speed - Math.random();
        }
        else if (particle.x < 0) {
          particle.vx = speed + Math.random();
        }
        else {
          particle.vx *= 1 + (Math.random() * 0.005);
        }

        if (particle.y > window.innerHeight) {
          particle.vy = -speed - Math.random();
        }
        else if (particle.y < 0) {
          particle.vy = speed + Math.random();
        }
        else {
          particle.vy *= 1 + (Math.random() * 0.005);
        }

        let distanceFactor = this.DistanceBetween( mouse, particle );
        distanceFactor = Math.max( Math.min( 15 - ( distanceFactor / 10 ), 10 ), 1 );
        particle.currentSize = particle.size * distanceFactor;

      }

      context.fillStyle = particle.color;
      context.beginPath();
      context.arc(particle.x,particle.y,particle.currentSize,0,Math.PI*2,true);
      context.closePath();
      context.fill();

    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  render() {
    return (
      <canvas className="FDAnimate" ref={(element) => {this.canvas = element}}></canvas>
    )
  }

}
