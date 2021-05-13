import { Renderer, Camera, Transform, Orbit } from 'ogl';

import { Events } from '../events';
import store from '../store';

import Plane from './Plane';

export default new class {
  constructor() {
    this.renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
    });

    this.gl = this.renderer.gl;
    this.gl.clearColor(1, 1, 1, 1);
    document.body.appendChild(this.gl.canvas);

    this.camera = new Camera(this.gl, { fov: 35 });
    this.camera.position.set(0, 0, 5);
    this.camera.lookAt([0, 0, 0]);

    this.scene = new Transform();

    this.time = 0;
    this.controls = new Orbit(this.camera);

    this.resize = this.resize.bind(this);
    this.render = this.render.bind(this);

    this.init();
  }

  init() {
    this.resize();
    this.addElements();
    this.addEvents();
  }

  resize() {
    this.renderer.setSize(store.bounds.ww, store.bounds.wh);
    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height,
    });
  }

  addElements() {
    const p = new Plane(this.gl);

    this.scene.addChild(p)
  }

  addEvents() {
    Events.on('resize', this.resize);
    Events.on('tick', this.render);
  }

  render() {
    this.controls.update();

    this.time += 1 / 60;

    this.renderer.render({
      scene: this.scene,
      camera: this.camera,
    });
  }
}
