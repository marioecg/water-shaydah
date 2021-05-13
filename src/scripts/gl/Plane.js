import { Plane, Mesh, Program, Transform } from 'ogl';

import vertex from './shaders/default.vert';
import fragment from './shaders/default.frag';

export default class extends Transform {
  constructor(gl, args = {}) {
    super();

    this.geom = new Plane(gl, {
      width: args.width || 1,
      height: args.height || 1
    });

    this.program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
      },
    });

    this.mesh = new Mesh(gl, {
      geometry: this.geom,
      program: this.program
    });

    this.addChild(this.mesh);
  }
}