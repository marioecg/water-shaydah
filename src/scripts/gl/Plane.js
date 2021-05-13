import { Plane, Mesh, Program, Transform, Texture } from 'ogl';

import vertex from './shaders/water.vert';
import fragment from './shaders/water.frag';

import imgPath from '../../assets/normal-map-01.png';

export default class extends Transform {
  constructor(gl, args = {}) {
    super();

    this.geom = new Plane(gl, {
      width: args.width || 1,
      height: args.height || 1
    });

    this.texture = new Texture(gl, {
      generateMipmaps: false,
      minFilter: gl.LINEAR,
      wrapS: gl.REPEAT,
      wrapT: gl.REPEAT,      
    });

    const img = new Image();
    img.src = imgPath;
    img.decode().then(() => this.texture.image = img);

    this.program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        tNormal: { value: this.texture },
      },
    });

    this.mesh = new Mesh(gl, {
      geometry: this.geom,
      program: this.program
    });

    this.addChild(this.mesh);
  }
}