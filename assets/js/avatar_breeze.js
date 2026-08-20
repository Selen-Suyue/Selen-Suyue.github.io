(function () {
  "use strict";

  var homepagePaths = ["/", "/index.html"];
  if (homepagePaths.indexOf(window.location.pathname) === -1) return;

  var motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (motionPreference.matches) return;

  var image = document.querySelector(".author__avatar > img.author__avatar, .author__avatar > img");
  if (!image || image.dataset.avatarBreeze === "ready") return;

  function startWhenReady() {
    if (!image.naturalWidth || !image.naturalHeight) return;

    var wrapper = image.parentElement;
    var canvas = document.createElement("canvas");
    var renderSize = 384;
    canvas.width = renderSize;
    canvas.height = renderSize;
    canvas.className = "author__avatar-breeze-canvas";
    canvas.setAttribute("aria-hidden", "true");

    var gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
      premultipliedAlpha: true
    });
    if (!gl) return;

    var vertexSource = [
      "attribute vec2 a_position;",
      "varying vec2 v_uv;",
      "void main() {",
      "  v_uv = a_position * 0.5 + 0.5;",
      "  gl_Position = vec4(a_position, 0.0, 1.0);",
      "}"
    ].join("\n");

    var fragmentSource = [
      "precision mediump float;",
      "uniform sampler2D u_portrait;",
      "uniform float u_time;",
      "varying vec2 v_uv;",
      "float softBox(vec2 p, vec2 lo, vec2 hi, float edge) {",
      "  float left = smoothstep(lo.x - edge, lo.x + edge, p.x);",
      "  float right = 1.0 - smoothstep(hi.x - edge, hi.x + edge, p.x);",
      "  float top = smoothstep(lo.y - edge, lo.y + edge, p.y);",
      "  float bottom = 1.0 - smoothstep(hi.y - edge, hi.y + edge, p.y);",
      "  return left * right * top * bottom;",
      "}",
      "void main() {",
      "  vec2 p = vec2(v_uv.x, 1.0 - v_uv.y);",
      "  vec4 original = texture2D(u_portrait, v_uv);",
      "  float luminance = dot(original.rgb, vec3(0.299, 0.587, 0.114));",
      "  float darkness = 1.0 - smoothstep(0.28, 0.72, luminance);",
      "  float redness = smoothstep(0.10, 0.34, original.r - max(original.g, original.b));",

      // Keep the face completely still: the masks cover only the outer hair,
      // flyaway strands, ponytail and red ribbon on the white background.
      "  float topHair = softBox(p, vec2(0.28, 0.025), vec2(0.72, 0.205), 0.055);",
      "  float leftHair = softBox(p, vec2(0.105, 0.105), vec2(0.335, 0.655), 0.045);",
      "  float rightHair = softBox(p, vec2(0.655, 0.145), vec2(0.885, 0.655), 0.045);",
      "  float lowerLeftHair = softBox(p, vec2(0.165, 0.465), vec2(0.325, 0.675), 0.04);",
      "  float hairRegion = max(max(topHair, leftHair), max(rightHair, lowerLeftHair));",
      "  float hairMask = hairRegion * (0.16 + 0.84 * darkness);",

      "  float ribbonRegion = softBox(p, vec2(0.69, 0.305), vec2(0.985, 0.735), 0.055);",
      "  float ribbonTail = smoothstep(0.68, 0.94, p.x);",
      "  float ribbonMask = ribbonRegion * ribbonTail * (0.20 + 0.80 * redness);",

      // Two slow, slightly out-of-phase waves feel more like a breeze than a
      // mechanical pendulum. Maximum displacement is about 1-2 CSS pixels.
      "  float hairWave = sin(u_time * 1.42 + p.x * 7.0 + p.y * 4.5);",
      "  float hairLift = cos(u_time * 1.07 + p.y * 8.5);",
      "  vec2 hairOffset = vec2(0.0030 * hairWave, 0.00155 * hairLift) * hairMask;",

      "  float ribbonWave = sin(u_time * 1.68 + p.y * 9.0);",
      "  float ribbonLift = cos(u_time * 1.31 + p.x * 7.5);",
      "  vec2 ribbonOffset = vec2(0.0062 * ribbonWave, 0.0033 * ribbonLift) * ribbonMask;",

      "  vec2 offset = hairOffset + ribbonOffset;",
      "  vec2 samplePoint = clamp(p - offset, vec2(0.001), vec2(0.999));",
      "  vec2 sampleUv = vec2(samplePoint.x, 1.0 - samplePoint.y);",
      "  vec4 moved = texture2D(u_portrait, sampleUv);",
      "  float blend = clamp(max(hairMask, ribbonMask), 0.0, 1.0);",
      "  gl_FragColor = mix(original, moved, blend);",
      "}"
    ].join("\n");

    function compileShader(type, source) {
      var shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    var vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
    var fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertexShader || !fragmentShader) return;

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    var positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    var timeLocation = gl.getUniformLocation(program, "u_time");
    var portraitLocation = gl.getUniformLocation(program, "u_portrait");
    gl.uniform1i(portraitLocation, 0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    function numberValue(value) {
      return parseFloat(value) || 0;
    }

    function syncCanvasToImage() {
      var imageRect = image.getBoundingClientRect();
      var wrapperRect = wrapper.getBoundingClientRect();
      var style = window.getComputedStyle(image);
      var leftInset = numberValue(style.borderLeftWidth) + numberValue(style.paddingLeft);
      var rightInset = numberValue(style.borderRightWidth) + numberValue(style.paddingRight);
      var topInset = numberValue(style.borderTopWidth) + numberValue(style.paddingTop);
      var bottomInset = numberValue(style.borderBottomWidth) + numberValue(style.paddingBottom);

      canvas.style.left = imageRect.left - wrapperRect.left + leftInset + "px";
      canvas.style.top = imageRect.top - wrapperRect.top + topInset + "px";
      canvas.style.width = Math.max(0, imageRect.width - leftInset - rightInset) + "px";
      canvas.style.height = Math.max(0, imageRect.height - topInset - bottomInset) + "px";
    }

    wrapper.classList.add("author__avatar--breeze");
    wrapper.appendChild(canvas);
    image.dataset.avatarBreeze = "ready";
    syncCanvasToImage();

    var frameRequest = 0;
    var visible = true;
    var pageVisible = !document.hidden;
    var lastFrame = 0;
    var frameCount = 0;

    function render(timestamp) {
      frameRequest = 0;
      if (!visible || !pageVisible || motionPreference.matches) return;

      if (timestamp - lastFrame >= 1000 / 24) {
        lastFrame = timestamp;
        gl.uniform1f(timeLocation, timestamp * 0.001);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        frameCount += 1;
        canvas.dataset.avatarBreezeFrame = String(frameCount);
      }
      frameRequest = window.requestAnimationFrame(render);
    }

    function resume() {
      canvas.hidden = motionPreference.matches;
      if (!frameRequest && visible && pageVisible && !motionPreference.matches) {
        frameRequest = window.requestAnimationFrame(render);
      }
    }

    function pause() {
      if (frameRequest) window.cancelAnimationFrame(frameRequest);
      frameRequest = 0;
    }

    var observer = new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) resume();
      else pause();
    }, { threshold: 0.05 });
    observer.observe(wrapper);

    document.addEventListener("visibilitychange", function () {
      pageVisible = !document.hidden;
      if (pageVisible) resume();
      else pause();
    });

    if (motionPreference.addEventListener) {
      motionPreference.addEventListener("change", function () {
        if (motionPreference.matches) pause();
        else resume();
      });
    }

    if (window.ResizeObserver) {
      new ResizeObserver(syncCanvasToImage).observe(image);
    } else {
      window.addEventListener("resize", syncCanvasToImage);
    }

    canvas.addEventListener("webglcontextlost", function () {
      pause();
      canvas.hidden = true;
    });

    resume();
  }

  if (image.complete) startWhenReady();
  else image.addEventListener("load", startWhenReady, { once: true });
}());
