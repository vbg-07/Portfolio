"use client"

import type React from "react"
import { useEffect, useRef } from "react"

// Vertex shader
const vertexShaderSource = `#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

void main() {
  gl_Position = a_position;
}
`

// Fragment shader - smooth flowing gradient
const fragmentShaderSource = `#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_colorPrimary;
uniform vec3 u_colorSecondary;
uniform vec3 u_colorBackground;
uniform float u_speed;
uniform float u_intensity;

out vec4 fragColor;

// Simplex noise function
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Fractal Brownian Motion for smoother noise
float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 3; i++) {
    value += amplitude * snoise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float t = u_time * u_speed;
  
  // Create smooth flowing noise layers
  float noise1 = fbm(uv * 2.0 + vec2(t * 0.1, t * 0.05));
  float noise2 = fbm(uv * 1.5 + vec2(-t * 0.08, t * 0.12));
  float noise3 = fbm(uv * 3.0 + vec2(t * 0.05, -t * 0.03));
  
  // Combine noise layers with smooth blending
  float combinedNoise = (noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2);
  combinedNoise = smoothstep(-0.5, 0.8, combinedNoise);
  
  // Create subtle glow spots
  vec2 center1 = vec2(0.3 + sin(t * 0.2) * 0.1, 0.4 + cos(t * 0.15) * 0.1);
  vec2 center2 = vec2(0.7 + cos(t * 0.18) * 0.1, 0.6 + sin(t * 0.22) * 0.1);
  
  float glow1 = 1.0 - smoothstep(0.0, 0.5, length(uv - center1));
  float glow2 = 1.0 - smoothstep(0.0, 0.4, length(uv - center2));
  
  // Mix colors based on noise and position
  vec3 color = u_colorBackground;
  
  // Add primary color glow (increased for visibility)
  color = mix(color, u_colorPrimary, glow1 * 0.25 * u_intensity);
  
  // Add secondary color glow (increased for visibility)
  color = mix(color, u_colorSecondary, glow2 * 0.18 * u_intensity);
  
  // Add subtle noise-based color variation (increased for visibility)
  color = mix(color, u_colorPrimary, combinedNoise * 0.12 * u_intensity);
  
  // Add very subtle vignette
  float vignette = 1.0 - smoothstep(0.5, 1.5, length(uv - 0.5) * 1.2);
  color *= 0.95 + vignette * 0.05;
  
  fragColor = vec4(color, 1.0);
}
`

interface AuroraShaderProps {
    colorPrimary?: string
    colorSecondary?: string
    colorBackground?: string
    speed?: number
    intensity?: number
    className?: string
    style?: React.CSSProperties
}

function hexToRgb(hex: string): [number, number, number] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return [0, 0, 0]
    return [
        Number.parseInt(result[1], 16) / 255,
        Number.parseInt(result[2], 16) / 255,
        Number.parseInt(result[3], 16) / 255,
    ]
}

function createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
    const shader = gl.createShader(type)
    if (!shader) return null

    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error: " + gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
    }

    return shader
}

function createProgram(
    gl: WebGL2RenderingContext,
    vertexSource: string,
    fragmentSource: string,
): WebGLProgram | null {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)

    if (!vertexShader || !fragmentShader) return null

    const program = gl.createProgram()
    if (!program) return null

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program link error: " + gl.getProgramInfoLog(program))
        gl.deleteProgram(program)
        return null
    }

    return program
}

export function AuroraShader({
    colorPrimary = "#00d4ff",
    colorSecondary = "#8b5cf6",
    colorBackground = "#0c1218",
    speed = 0.3,
    intensity = 1.0,
    className = "",
    style = {},
}: AuroraShaderProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>(undefined)
    const programRef = useRef<WebGLProgram | null>(null)
    const glRef = useRef<WebGL2RenderingContext | null>(null)
    const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({})
    const startTimeRef = useRef<number>(Date.now())

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        // Set canvas to full viewport size with reduced resolution for performance
        const resize = () => {
            const scale = Math.min(window.devicePixelRatio, 1) * 0.5 // Reduce resolution by half for performance
            canvas.width = window.innerWidth * scale
            canvas.height = window.innerHeight * scale
            if (glRef.current) {
                glRef.current.viewport(0, 0, canvas.width, canvas.height)
            }
        }

        const gl = canvas.getContext("webgl2")
        if (!gl) {
            console.error("WebGL2 not supported")
            return
        }

        glRef.current = gl

        const program = createProgram(gl, vertexShaderSource, fragmentShaderSource)
        if (!program) return

        programRef.current = program

        uniformsRef.current = {
            u_time: gl.getUniformLocation(program, "u_time"),
            u_resolution: gl.getUniformLocation(program, "u_resolution"),
            u_colorPrimary: gl.getUniformLocation(program, "u_colorPrimary"),
            u_colorSecondary: gl.getUniformLocation(program, "u_colorSecondary"),
            u_colorBackground: gl.getUniformLocation(program, "u_colorBackground"),
            u_speed: gl.getUniformLocation(program, "u_speed"),
            u_intensity: gl.getUniformLocation(program, "u_intensity"),
        }

        // Set up position buffer
        const positionBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)

        const positionLocation = gl.getAttribLocation(program, "a_position")
        gl.enableVertexAttribArray(positionLocation)
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

        resize()
        window.addEventListener("resize", resize)

        const render = () => {
            const currentTime = (Date.now() - startTimeRef.current) * 0.001

            const ctx = glRef.current
            const prog = programRef.current
            const locs = uniformsRef.current

            if (!ctx || !prog || !canvas) return

            ctx.useProgram(prog)

            if (locs.u_time) ctx.uniform1f(locs.u_time, currentTime)
            if (locs.u_resolution) ctx.uniform2f(locs.u_resolution, canvas.width, canvas.height)
            if (locs.u_colorPrimary) ctx.uniform3fv(locs.u_colorPrimary, hexToRgb(colorPrimary))
            if (locs.u_colorSecondary) ctx.uniform3fv(locs.u_colorSecondary, hexToRgb(colorSecondary))
            if (locs.u_colorBackground) ctx.uniform3fv(locs.u_colorBackground, hexToRgb(colorBackground))
            if (locs.u_speed) ctx.uniform1f(locs.u_speed, speed)
            if (locs.u_intensity) ctx.uniform1f(locs.u_intensity, intensity)

            ctx.drawArrays(ctx.TRIANGLES, 0, 6)

            animationRef.current = requestAnimationFrame(render)
        }

        render()

        return () => {
            window.removeEventListener("resize", resize)
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
            if (glRef.current && programRef.current) glRef.current.deleteProgram(programRef.current)
        }
    }, [colorPrimary, colorSecondary, colorBackground, speed, intensity])

    return (
        <div className={className} style={{ position: "absolute", inset: 0, ...style }}>
            <canvas
                ref={canvasRef}
                style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                }}
            />
        </div>
    )
}
