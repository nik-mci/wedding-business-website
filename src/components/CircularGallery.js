"use client";

import { useEffect, useRef } from 'react';
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach(key => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance);
    }
  });
}

class Title {
  constructor({ gl, plane, text, textColor = '#C9A234', font = 'bold 24px sans-serif' }) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }

  createMesh() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = this.font;
    const metrics = context.measureText(this.text);
    const textWidth = Math.ceil(metrics.width);
    const fontSize = 24;
    canvas.width = textWidth + 20;
    canvas.height = fontSize + 20;
    context.font = this.font;
    context.fillStyle = this.textColor;
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillText(this.text, canvas.width / 2, canvas.height / 2);

    const texture = new Texture(this.gl, { generateMipmaps: false });
    texture.image = canvas;

    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = canvas.width / canvas.height;
    const textHeightScaled = this.plane.scale.y * 0.15;
    this.mesh.scale.set(textHeightScaled * aspect, textHeightScaled, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeightScaled * 0.5 - 0.05;
    this.mesh.setParent(this.plane);
  }
}

class Media {
  constructor({ geometry, gl, image, index, length, scene, screen, text, viewport, bend, textColor, borderRadius }) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.extra = 0;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true });
    this.program = new Program(this.gl, {
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(vUv.x * ratio.x + (1.0 - ratio.x) * 0.5, vUv.y * ratio.y + (1.0 - ratio.y) * 0.5);
          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float alpha = 1.0 - smoothstep(-0.002, 0.002, d);
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    });
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    this.title = new Title({ gl: this.gl, plane: this.plane, text: this.text, textColor: this.textColor });
  }

  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const H = this.viewport.width / 2;
    const B_abs = Math.abs(this.bend);
    const R = (H * H + B_abs * B_abs) / (2 * B_abs);
    const effectiveX = Math.min(Math.abs(x), H);
    const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
    this.plane.position.y = this.bend > 0 ? -arc : arc;
    this.plane.rotation.z = (this.bend > 0 ? -1 : 1) * Math.sign(x) * Math.asin(effectiveX / R);
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = scroll.current - scroll.last;
    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    if (direction === 'right' && this.plane.position.x + planeOffset < -viewportOffset) this.extra -= this.widthTotal;
    if (direction === 'left' && this.plane.position.x - planeOffset > viewportOffset) this.extra += this.widthTotal;
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;
    const scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (900 * scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (700 * scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.widthTotal = (this.plane.scale.x + 2) * this.length;
    this.x = (this.plane.scale.x + 2) * this.index;
  }
}

const CircularGallery = ({ items }) => {
  const containerRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;
    const camera = new Camera(gl);
    camera.fov = 45;
    camera.position.z = 20;
    const scene = new Transform();
    const planeGeometry = new Plane(gl, { heightSegments: 50, widthSegments: 100 });
    
    let screen = { width: container.clientWidth, height: container.clientHeight };
    renderer.setSize(screen.width, screen.height);
    camera.perspective({ aspect: screen.width / screen.height });
    const fov = (camera.fov * Math.PI) / 180;
    const viewportHeight = 2 * Math.tan(fov / 2) * camera.position.z;
    let viewport = { width: viewportHeight * camera.aspect, height: viewportHeight };

    if (!items || !items.length) return;
    const galleryItems = items.concat(items);
    const medias = galleryItems.map((data, index) => new Media({
      geometry: planeGeometry, gl, image: data.image, index, length: galleryItems.length,
      scene, screen, text: data.text, viewport, bend: 3.5, textColor: '#C9A234', borderRadius: 0.08
    }));

    let scroll = { ease: 0.03, current: 0, target: 0, last: 0 };
    let isDown = false;
    let startX = 0;

    const onTouchDown = (e) => { isDown = true; scroll.pos = scroll.current; startX = e.touches ? e.touches[0].clientX : e.clientX; };
    const onTouchMove = (e) => { if (!isDown) return; const x = e.touches ? e.touches[0].clientX : e.clientX; scroll.target = scroll.pos + (startX - x) * 0.05; };
    const onTouchUp = () => { isDown = false; };
    const onWheel = (e) => { scroll.target += e.deltaY * 0.2; };

    container.addEventListener('touchstart', onTouchDown);
    container.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchUp);
    container.addEventListener('mousedown', onTouchDown);
    container.addEventListener('mousemove', onTouchMove);
    window.addEventListener('mouseup', onTouchUp);
    container.addEventListener('wheel', onWheel);
    container.appendChild(gl.canvas);

    let raf;
    const update = () => {
      scroll.current = lerp(scroll.current, scroll.target, scroll.ease);
      const dir = scroll.current > scroll.last ? 'right' : 'left';
      medias.forEach(m => m.update(scroll, dir));
      renderer.render({ scene, camera });
      scroll.last = scroll.current;
      raf = requestAnimationFrame(update);
    };
    update();

    return () => {
      cancelAnimationFrame(raf);
      container.removeChild(gl.canvas);
      window.removeEventListener('touchend', onTouchUp);
      window.removeEventListener('mouseup', onTouchUp);
    };
  }, [items]);

  return <div ref={containerRef} className="w-full h-[600px] cursor-grab active:cursor-grabbing overflow-hidden" />;
};

export default CircularGallery;
