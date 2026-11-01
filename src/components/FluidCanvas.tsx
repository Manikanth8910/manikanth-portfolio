// @ts-nocheck
import React, { useRef, useEffect } from 'react';

export interface FluidCanvasProps {
  SIM_RESOLUTION?: number;
  DYE_RESOLUTION?: number;
  CAPTURE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  PRESSURE_ITERATIONS?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  SHADING?: boolean;
  COLOR_UPDATE_SPEED?: number;
  BACK_COLOR?: { r: number; g: number; b: number };
  TRANSPARENT?: boolean;
}

export const FluidCanvas: React.FC<FluidCanvasProps> = ({
  SIM_RESOLUTION: e = 128,
  DYE_RESOLUTION: r = 1024,
  CAPTURE_RESOLUTION: n = 512,
  DENSITY_DISSIPATION: s = 3.5,
  VELOCITY_DISSIPATION: a = 2,
  PRESSURE: o = 0.1,
  PRESSURE_ITERATIONS: l = 12,
  CURL: c = 3,
  SPLAT_RADIUS: d = 0.2,
  SPLAT_FORCE: h = 6000,
  SHADING: u = true,
  COLOR_UPDATE_SPEED: p = 10,
  BACK_COLOR: f = { r: 0.5, g: 0, b: 0 },
  TRANSPARENT: m = true,
}: FluidCanvasProps) => {
  const g = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let t;
    let i, n, f, m, v, y, b, x, w, _, k, T, S, E, z;
    const C = g.current;
    if (!C) return;

    let animId: number | null = null;
    let isRunning = true;

    // Mobile / small screen detection for lightweight fluid parameters
    const isMobile = window.innerWidth < 768;
    const effectiveDyeRes = isMobile ? 512 : r;
    const effectiveSimRes = isMobile ? 96 : e;
    const effectivePressureIters = isMobile ? 8 : l;

    const M = {
      SIM_RESOLUTION: effectiveSimRes,
      DYE_RESOLUTION: effectiveDyeRes,
      DENSITY_DISSIPATION: s,
      VELOCITY_DISSIPATION: a,
      PRESSURE: o,
      PRESSURE_ITERATIONS: effectivePressureIters,
      CURL: c,
      SPLAT_RADIUS: d,
      SPLAT_FORCE: h,
      SHADING: u,
      COLOR_UPDATE_SPEED: p,
    };

    const R = [
      new (function () {
        this.id = -1;
        this.texcoordX = 0;
        this.texcoordY = 0;
        this.prevTexcoordX = 0;
        this.prevTexcoordY = 0;
        this.deltaX = 0;
        this.deltaY = 0;
        this.down = !1;
        this.moved = !1;
        this.color = [0, 0, 0];
      })(),
    ];

    y = {
      alpha: !0,
      depth: !1,
      stencil: !1,
      antialias: !1,
      preserveDrawingBuffer: !1,
      powerPreference: 'high-performance',
    };

    b = (t = C).getContext('webgl2', y);
    x = !!b;
    if (!x) {
      b = t.getContext('webgl', y) || t.getContext('experimental-webgl', y);
    }
    if (!b) return;

    const O = b;
    let P;

    if (x) {
      b.getExtension('EXT_color_buffer_float');
      n = b.getExtension('OES_texture_float_linear');
    } else {
      i = b.getExtension('OES_texture_half_float');
      n = b.getExtension('OES_texture_half_float_linear');
    }

    b.clearColor(0, 0, 0, 1);
    w = x ? b.HALF_FLOAT : i && i.HALF_FLOAT_OES;

    function j(e, t, i, r) {
      let l, c;
      l = e.createTexture();
      e.bindTexture(e.TEXTURE_2D, l);
      e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST);
      e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST);
      e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE);
      e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
      e.texImage2D(e.TEXTURE_2D, 0, t, 4, 4, 0, i, r, null);
      c = e.createFramebuffer();
      e.bindFramebuffer(e.FRAMEBUFFER, c);
      e.framebufferTexture2D(
        e.FRAMEBUFFER,
        e.COLOR_ATTACHMENT0,
        e.TEXTURE_2D,
        l,
        0
      );
      if (e.checkFramebufferStatus(e.FRAMEBUFFER) !== e.FRAMEBUFFER_COMPLETE) {
        switch (t) {
          case e.R16F:
            return j(e, e.RG16F, e.RG, r);
          case e.RG16F:
            return j(e, e.RGBA16F, e.RGBA, r);
          default:
            return null;
        }
      }
      return { internalFormat: t, format: i };
    }

    if (x) {
      f = j(b, b.RGBA16F, b.RGBA, w);
      m = j(b, b.RG16F, b.RG, w);
      v = j(b, b.R16F, b.RED, w);
    } else {
      f = j(b, b.RGBA, b.RGBA, w);
      m = j(b, b.RGBA, b.RGBA, w);
      v = j(b, b.RGBA, b.RGBA, w);
    }

    P = {
      formatRGBA: f,
      formatRG: m,
      formatR: v,
      halfFloatTexType: w,
      supportLinearFiltering: n,
    };

    if (!P.supportLinearFiltering) {
      M.DYE_RESOLUTION = 256;
      M.SHADING = !1;
    }

    class D {
      constructor(e, t) {
        this.uniforms = {};
        this.program = A(e, t);
        this.uniforms = N(this.program);
      }
      bind() {
        O.useProgram(this.program);
      }
    }

    function A(e, t) {
      let i = O.createProgram();
      O.attachShader(i, e);
      O.attachShader(i, t);
      O.linkProgram(i);
      if (!O.getProgramParameter(i, O.LINK_STATUS)) {
        console.warn(O.getProgramInfoLog(i));
      }
      return i;
    }

    function N(e) {
      let t = [],
        i = O.getProgramParameter(e, O.ACTIVE_UNIFORMS);
      for (let r = 0; r < i; r++) {
        let n = O.getActiveUniform(e, r).name;
        t[n] = O.getUniformLocation(e, n);
      }
      return t;
    }

    function L(e, t, i) {
      t = (function (e, t) {
        if (!t) return e;
        let i = '';
        t.forEach((e) => {
          i += '#define ' + e + '\n';
        });
        return i + e;
      })(t, i);
      let r = O.createShader(e);
      O.shaderSource(r, t);
      O.compileShader(r);
      if (!O.getShaderParameter(r, O.COMPILE_STATUS)) {
        console.warn(O.getShaderInfoLog(r));
      }
      return r;
    }

    let I = L(
      O.VERTEX_SHADER,
      `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;

      void main () {
          vUv = aPosition * 0.5 + 0.5;
          vL = vUv - vec2(texelSize.x, 0.0);
          vR = vUv + vec2(texelSize.x, 0.0);
          vT = vUv + vec2(0.0, texelSize.y);
          vB = vUv - vec2(0.0, texelSize.y);
          gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `
    );

    let F = L(
      O.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;

      void main () {
          gl_FragColor = texture2D(uTexture, vUv);
      }
    `
    );

    let B = L(
      O.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;
      uniform float value;

      void main () {
          gl_FragColor = value * texture2D(uTexture, vUv);
      }
   `
    );

    let U = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform sampler2D uDithering;
      uniform vec2 ditherScale;
      uniform vec2 texelSize;

      vec3 linearToGamma (vec3 color) {
          color = max(color, vec3(0));
          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
      }

      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          #ifdef SHADING
              vec3 lc = texture2D(uTexture, vL).rgb;
              vec3 rc = texture2D(uTexture, vR).rgb;
              vec3 tc = texture2D(uTexture, vT).rgb;
              vec3 bc = texture2D(uTexture, vB).rgb;

              float dx = length(rc) - length(lc);
              float dy = length(tc) - length(bc);

              vec3 n = normalize(vec3(dx, dy, length(texelSize)));
              vec3 l = vec3(0.0, 0.0, 1.0);

              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
              c *= diffuse;
          #endif

          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
      }
    `;

    let V = L(
      O.FRAGMENT_SHADER,
      `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;

      void main () {
          vec2 p = vUv - point.xy;
          p.x *= aspectRatio;
          vec3 splat = exp(-dot(p, p) / radius) * color;
          vec3 base = texture2D(uTarget, vUv).xyz;
          gl_FragColor = vec4(base + splat, 1.0);
      }
    `
    );

    let H = L(
      O.FRAGMENT_SHADER,
      `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform vec2 dyeTexelSize;
      uniform float dt;
      uniform float dissipation;

      vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
          vec2 st = uv / tsize - 0.5;
          vec2 iuv = floor(st);
          vec2 fuv = fract(st);

          vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
          vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
          vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
          vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

          return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
      }

      void main () {
          #ifdef MANUAL_FILTERING
              vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
              vec4 result = bilerp(uSource, coord, dyeTexelSize);
          #else
              vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
              vec4 result = texture2D(uSource, coord);
          #endif
          float decay = 1.0 + dissipation * dt;
          gl_FragColor = result / decay;
      }
    `,
      P.supportLinearFiltering ? null : ['MANUAL_FILTERING']
    );

    let W = L(
      O.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;

      void main () {
          float L = texture2D(uVelocity, vL).x;
          float R = texture2D(uVelocity, vR).x;
          float T = texture2D(uVelocity, vT).y;
          float B = texture2D(uVelocity, vB).y;

          vec2 C = texture2D(uVelocity, vUv).xy;
          if (vL.x < 0.0) { L = -C.x; }
          if (vR.x > 1.0) { R = -C.x; }
          if (vT.y > 1.0) { T = -C.y; }
          if (vB.y < 0.0) { B = -C.y; }

          float div = 0.5 * (R - L + T - B);
          gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `
    );

    let q = L(
      O.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;

      void main () {
          float L = texture2D(uVelocity, vL).y;
          float R = texture2D(uVelocity, vR).y;
          float T = texture2D(uVelocity, vT).x;
          float B = texture2D(uVelocity, vB).x;
          float vorticity = R - L - T + B;
          gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
      }
    `
    );

    let G = L(
      O.FRAGMENT_SHADER,
      `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float curl;
      uniform float dt;

      void main () {
          float L = texture2D(uCurl, vL).x;
          float R = texture2D(uCurl, vR).x;
          float T = texture2D(uCurl, vT).x;
          float B = texture2D(uCurl, vB).x;
          float C = texture2D(uCurl, vUv).x;

          vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
          force /= length(force) + 0.0001;
          force *= curl * C;
          force.y *= -1.0;

          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity += force * dt;
          velocity = min(max(velocity, -1000.0), 1000.0);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `
    );

    let X = L(
      O.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;

      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          float C = texture2D(uPressure, vUv).x;
          float divergence = texture2D(uDivergence, vUv).x;
          float pressure = (L + R + B + T - divergence) * 0.25;
          gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `
    );

    let $ = L(
      O.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;

      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity.xy -= vec2(R - L, T - B);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `
    );

    O.bindBuffer(O.ARRAY_BUFFER, O.createBuffer());
    O.bufferData(
      O.ARRAY_BUFFER,
      new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
      O.STATIC_DRAW
    );
    O.bindBuffer(O.ELEMENT_ARRAY_BUFFER, O.createBuffer());
    O.bufferData(
      O.ELEMENT_ARRAY_BUFFER,
      new Uint16Array([0, 1, 2, 0, 2, 3]),
      O.STATIC_DRAW
    );
    O.vertexAttribPointer(0, 2, O.FLOAT, !1, 0, 0);
    O.enableVertexAttribArray(0);

    const Y = (e, t = !1) => {
      if (null == e) {
        O.viewport(0, 0, O.drawingBufferWidth, O.drawingBufferHeight);
        O.bindFramebuffer(O.FRAMEBUFFER, null);
      } else {
        O.viewport(0, 0, e.width, e.height);
        O.bindFramebuffer(O.FRAMEBUFFER, e.fbo);
      }
      if (t) {
        O.clearColor(0, 0, 0, 1);
        O.clear(O.COLOR_BUFFER_BIT);
      }
      O.drawElements(O.TRIANGLES, 6, O.UNSIGNED_SHORT, 0);
    };

    let Q = new D(I, F),
      Z = new D(I, B),
      J = new D(I, V),
      K = new D(I, H),
      ee = new D(I, W),
      et = new D(I, q),
      ei = new D(I, G),
      er = new D(I, X),
      en = new D(I, $);

    let es = new (class {
      constructor(e, t) {
        this.vertexShader = e;
        this.fragmentShaderSource = t;
        this.programs = [];
        this.activeProgram = null;
        this.uniforms = [];
      }
      setKeywords(e) {
        let t = 0;
        for (let i = 0; i < e.length; i++) {
          t += (function (e) {
            if (0 === e.length) return 0;
            let t = 0;
            for (let i = 0; i < e.length; i++)
              t = ((t << 5) - t + e.charCodeAt(i)) | 0;
            return t;
          })(e[i]);
        }
        let i = this.programs[t];
        if (null == i) {
          let r = L(O.FRAGMENT_SHADER, this.fragmentShaderSource, e);
          i = A(this.vertexShader, r);
          this.programs[t] = i;
        }
        if (i !== this.activeProgram) {
          this.uniforms = N(i);
          this.activeProgram = i;
        }
      }
      bind() {
        O.useProgram(this.activeProgram);
      }
    })(I, U);

    function ea() {
      let e = ev(M.SIM_RESOLUTION),
        t = ev(M.DYE_RESOLUTION),
        i = P.halfFloatTexType,
        r = P.formatRGBA,
        n = P.formatRG,
        s = P.formatR,
        a = P.supportLinearFiltering ? O.LINEAR : O.NEAREST;
      O.disable(O.BLEND);
      _ = _
        ? ec(_, t.width, t.height, r.internalFormat, r.format, i, a)
        : el(t.width, t.height, r.internalFormat, r.format, i, a);
      k = k
        ? ec(k, e.width, e.height, n.internalFormat, n.format, i, a)
        : el(e.width, e.height, n.internalFormat, n.format, i, a);
      T = eo(e.width, e.height, s.internalFormat, s.format, i, O.NEAREST);
      S = eo(e.width, e.height, s.internalFormat, s.format, i, O.NEAREST);
      E = el(e.width, e.height, s.internalFormat, s.format, i, O.NEAREST);
    }

    function eo(e, t, i, r, n, s) {
      O.activeTexture(O.TEXTURE0);
      let a = O.createTexture();
      O.bindTexture(O.TEXTURE_2D, a);
      O.texParameteri(O.TEXTURE_2D, O.TEXTURE_MIN_FILTER, s);
      O.texParameteri(O.TEXTURE_2D, O.TEXTURE_MAG_FILTER, s);
      O.texParameteri(O.TEXTURE_2D, O.TEXTURE_WRAP_S, O.CLAMP_TO_EDGE);
      O.texParameteri(O.TEXTURE_2D, O.TEXTURE_WRAP_T, O.CLAMP_TO_EDGE);
      O.texImage2D(O.TEXTURE_2D, 0, i, e, t, 0, r, n, null);
      let o = O.createFramebuffer();
      O.bindFramebuffer(O.FRAMEBUFFER, o);
      O.framebufferTexture2D(
        O.FRAMEBUFFER,
        O.COLOR_ATTACHMENT0,
        O.TEXTURE_2D,
        a,
        0
      );
      O.viewport(0, 0, e, t);
      O.clear(O.COLOR_BUFFER_BIT);
      let l = 1 / e,
        c = 1 / t;
      return {
        texture: a,
        fbo: o,
        width: e,
        height: t,
        texelSizeX: l,
        texelSizeY: c,
        attach: (e) => (
          O.activeTexture(O.TEXTURE0 + e), O.bindTexture(O.TEXTURE_2D, a), e
        ),
      };
    }

    function el(e, t, i, r, n, s) {
      let a = eo(e, t, i, r, n, s),
        o = eo(e, t, i, r, n, s);
      return {
        width: e,
        height: t,
        texelSizeX: a.texelSizeX,
        texelSizeY: a.texelSizeY,
        get read() {
          return a;
        },
        set read(value) {
          a = value;
        },
        get write() {
          return o;
        },
        set write(value) {
          o = value;
        },
        swap() {
          let e = a;
          a = o;
          o = e;
        },
      };
    }

    function ec(e, t, i, r, n, s, a) {
      if (e.width === t && e.height === i) return e;
      let o = e.read;
      let l = eo(t, i, r, n, s, a);
      Q.bind();
      O.uniform1i(Q.uniforms.uTexture, o.attach(0));
      Y(l);
      e.read = l;
      e.write = eo(t, i, r, n, s, a);
      e.width = t;
      e.height = i;
      e.texelSizeX = 1 / t;
      e.texelSizeY = 1 / i;
      return e;
    }

    z = [];
    if (M.SHADING) z.push('SHADING');
    es.setKeywords(z);
    ea();

    let ed = Date.now(),
      eh = 0;

    function eu() {
      if (!isRunning) return;

      let i, r, n, s, a, o, l;
      let c =
        ((r = Math.min((r = ((i = Date.now()) - ed) / 1000), 0.016666)),
        (ed = i),
        r);
      n = ey(C.clientWidth);
      s = ey(C.clientHeight);

      if (C.width !== n || C.height !== s) {
        C.width = n;
        C.height = s;
        ea();
      }

      if ((eh += c * M.COLOR_UPDATE_SPEED) >= 1) {
        eh = eh % 1;
        R.forEach((e) => {
          e.color = eg();
        });
      }

      R.forEach((e) => {
        if (e.moved) {
          e.moved = !1;
          let i = e.deltaX * M.SPLAT_FORCE;
          let r = e.deltaY * M.SPLAT_FORCE;
          ep(e.texcoordX, e.texcoordY, i, r, e.color);
        }
      });

      (function (e) {
        O.disable(O.BLEND);
        et.bind();
        O.uniform2f(et.uniforms.texelSize, k.texelSizeX, k.texelSizeY);
        O.uniform1i(et.uniforms.uVelocity, k.read.attach(0));
        Y(S);
        ei.bind();
        O.uniform2f(ei.uniforms.texelSize, k.texelSizeX, k.texelSizeY);
        O.uniform1i(ei.uniforms.uVelocity, k.read.attach(0));
        O.uniform1i(ei.uniforms.uCurl, S.attach(1));
        O.uniform1f(ei.uniforms.curl, M.CURL);
        O.uniform1f(ei.uniforms.dt, e);
        Y(k.write);
        k.swap();
        ee.bind();
        O.uniform2f(ee.uniforms.texelSize, k.texelSizeX, k.texelSizeY);
        O.uniform1i(ee.uniforms.uVelocity, k.read.attach(0));
        Y(T);
        Z.bind();
        O.uniform1i(Z.uniforms.uTexture, E.read.attach(0));
        O.uniform1f(Z.uniforms.value, M.PRESSURE);
        Y(E.write);
        E.swap();
        er.bind();
        O.uniform2f(er.uniforms.texelSize, k.texelSizeX, k.texelSizeY);
        O.uniform1i(er.uniforms.uDivergence, T.attach(0));
        for (let e = 0; e < M.PRESSURE_ITERATIONS; e++) {
          O.uniform1i(er.uniforms.uPressure, E.read.attach(1));
          Y(E.write);
          E.swap();
        }
        en.bind();
        O.uniform2f(en.uniforms.texelSize, k.texelSizeX, k.texelSizeY);
        O.uniform1i(en.uniforms.uPressure, E.read.attach(0));
        O.uniform1i(en.uniforms.uVelocity, k.read.attach(1));
        Y(k.write);
        k.swap();
        K.bind();
        O.uniform2f(K.uniforms.texelSize, k.texelSizeX, k.texelSizeY);
        if (!P.supportLinearFiltering) {
          O.uniform2f(K.uniforms.dyeTexelSize, k.texelSizeX, k.texelSizeY);
        }
        let t = k.read.attach(0);
        O.uniform1i(K.uniforms.uVelocity, t);
        O.uniform1i(K.uniforms.uSource, t);
        O.uniform1f(K.uniforms.dt, e);
        O.uniform1f(K.uniforms.dissipation, M.VELOCITY_DISSIPATION);
        Y(k.write);
        k.swap();
        if (!P.supportLinearFiltering) {
          O.uniform2f(K.uniforms.dyeTexelSize, _.texelSizeX, _.texelSizeY);
        }
        O.uniform1i(K.uniforms.uVelocity, k.read.attach(0));
        O.uniform1i(K.uniforms.uSource, _.read.attach(1));
        O.uniform1f(K.uniforms.dissipation, M.DENSITY_DISSIPATION);
        Y(_.write);
        _.swap();
      })(c);

      O.blendFunc(O.ONE, O.ONE_MINUS_SRC_ALPHA);
      O.enable(O.BLEND);
      o = O.drawingBufferWidth;
      l = O.drawingBufferHeight;
      es.bind();
      if (M.SHADING) {
        O.uniform2f(es.uniforms.texelSize, 1 / o, 1 / l);
      }
      O.uniform1i(es.uniforms.uTexture, _.read.attach(0));
      Y(null);

      animId = requestAnimationFrame(eu);
    }

    function ep(e, t, i, r, n) {
      let s, a;
      J.bind();
      O.uniform1i(J.uniforms.uTarget, k.read.attach(0));
      O.uniform1f(J.uniforms.aspectRatio, C.width / C.height);
      O.uniform2f(J.uniforms.point, e, t);
      O.uniform3f(J.uniforms.color, i, r, 0);
      s = M.SPLAT_RADIUS / 100;
      if ((a = C.width / C.height) > 1) s *= a;
      O.uniform1f(J.uniforms.radius, s);
      Y(k.write);
      k.swap();
      O.uniform1i(J.uniforms.uTarget, _.read.attach(0));
      O.uniform3f(J.uniforms.color, n.r, n.g, n.b);
      Y(_.write);
      _.swap();
    }

    function ef(e, t, i, r) {
      e.id = t;
      e.down = !0;
      e.moved = !1;
      e.texcoordX = i / C.width;
      e.texcoordY = 1 - r / C.height;
      e.prevTexcoordX = e.texcoordX;
      e.prevTexcoordY = e.texcoordY;
      e.deltaX = 0;
      e.deltaY = 0;
      e.color = eg();
    }

    function em(e, t, i, r) {
      let n, s, a, o;
      e.prevTexcoordX = e.texcoordX;
      e.prevTexcoordY = e.texcoordY;
      e.texcoordX = t / C.width;
      e.texcoordY = 1 - i / C.height;
      n = e.texcoordX - e.prevTexcoordX;
      if ((a = C.width / C.height) < 1) n *= a;
      e.deltaX = n;
      s = e.texcoordY - e.prevTexcoordY;
      if ((o = C.width / C.height) > 1) s /= o;
      e.deltaY = s;
      e.moved = Math.abs(e.deltaX) > 0 || Math.abs(e.deltaY) > 0;
      e.color = r;
    }

    function eg() {
      let e = (function (e, t, i) {
        let r, n, s, a, o, l, c, d;
        switch (
          ((a = Math.floor(6 * e)),
          (o = 6 * e - a),
          (l = 0),
          (c = +(1 - o)),
          (d = +(1 - (1 - o) * 1)),
          a % 6)
        ) {
          case 0:
            r = 1;
            n = d;
            s = l;
            break;
          case 1:
            r = c;
            n = 1;
            s = l;
            break;
          case 2:
            r = l;
            n = 1;
            s = d;
            break;
          case 3:
            r = l;
            n = c;
            s = 1;
            break;
          case 4:
            r = d;
            n = l;
            s = 1;
            break;
          case 5:
            r = 1;
            n = l;
            s = c;
        }
        return { r, g: n, b: s };
      })(Math.random(), 1, 1);
      e.r *= 0.15;
      e.g *= 0.15;
      e.b *= 0.15;
      return e;
    }

    function ev(e) {
      let t = O.drawingBufferWidth / O.drawingBufferHeight;
      if (t < 1) t = 1 / t;
      let i = Math.round(e);
      let r = Math.round(e * t);
      return O.drawingBufferWidth > O.drawingBufferHeight
        ? { width: r, height: i }
        : { width: i, height: r };
    }

    // Performance optimization: Cap devicePixelRatio to 1.25 to prevent 4K/Retina GPU overload
    function ey(e) {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      return Math.floor(e * dpr);
    }

    const onMouseDown = (e: MouseEvent) => {
      let t, i, r;
      let n = R[0];
      ef(n, -1, ey(e.clientX), ey(e.clientY));
      t = eg();
      t.r *= 10;
      t.g *= 10;
      t.b *= 10;
      i = 10 * (Math.random() - 0.5);
      r = 30 * (Math.random() - 0.5);
      ep(n.texcoordX, n.texcoordY, i, r, t);
    };

    const onMouseMove = (e: MouseEvent) => {
      let t = R[0];
      let i = ey(e.clientX);
      let r = ey(e.clientY);
      let n = t.color;
      em(t, i, r, n);
    };

    const onTouchStart = (e: TouchEvent) => {
      let t = e.targetTouches;
      let i = R[0];
      for (let e = 0; e < t.length; e++) {
        let r = ey(t[e].clientX);
        let n = ey(t[e].clientY);
        ef(i, t[e].identifier, r, n);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      let t = e.targetTouches;
      let i = R[0];
      for (let e = 0; e < t.length; e++) {
        em(i, ey(t[e].clientX), ey(t[e].clientY), i.color);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      let t = e.changedTouches;
      let i = R[0];
      for (let e = 0; e < t.length; e++) {
        i.down = !1;
      }
    };

    // Pause when tab is hidden to save 100% CPU/GPU
    const onVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        if (animId) cancelAnimationFrame(animId);
      } else {
        if (!isRunning) {
          isRunning = true;
          ed = Date.now();
          animId = requestAnimationFrame(eu);
        }
      }
    };

    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    animId = requestAnimationFrame(eu);

    return () => {
      isRunning = false;
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [e, r, n, s, a, o, l, c, d, h, u, p, f, m]);

  return (
    <div className="fixed top-0 left-0 z-50 pointer-events-none w-full h-full">
      <canvas ref={g} id="fluid" className="w-screen h-screen block" />
    </div>
  );
};

export default FluidCanvas;
