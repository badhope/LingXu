'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const transitionVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const transitionFragmentShader = `
  uniform float progress;
  uniform float time;
  uniform vec2 resolution;
  uniform int transitionType;
  
  varying vec2 vUv;
  
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  
  void main() {
    vec2 uv = vUv;
    
    float dissolve = 0.0;
    
    if (transitionType == 0) {
      float n = noise(uv * 10.0 + time * 0.5);
      dissolve = smoothstep(progress - 0.2, progress + 0.2, n);
    } else if (transitionType == 1) {
      float centerDist = length(uv - 0.5);
      float maxRadius = length(vec2(0.5));
      dissolve = smoothstep(progress - 0.1, progress, centerDist / maxRadius);
    } else if (transitionType == 2) {
      vec2 direction = normalize(uv - 0.5);
      float angle = atan(direction.y, direction.x);
      float spiral = angle + length(uv - 0.5) * 10.0 - time * 2.0;
      float spiralProgress = mod(spiral / 6.28318 + 0.5, 1.0);
      dissolve = step(progress, spiralProgress);
    } else if (transitionType == 3) {
      float gridX = floor(uv.x * 16.0);
      float gridY = floor(uv.y * 9.0);
      float gridNoise = random(vec2(gridX, gridY));
      dissolve = smoothstep(progress - 0.3, progress, gridNoise);
    }
    
    float lineGlow = 0.0;
    if (dissolve > 0.0 && dissolve < 1.0) {
      float edgeDist = abs(dissolve - 0.5) * 2.0;
      lineGlow = pow(1.0 - edgeDist, 8.0);
    }
    
    vec3 color = vec3(0.02);
    vec3 goldColor = vec3(0.85, 0.7, 0.2);
    
    color = mix(color, goldColor, lineGlow * (0.5 + 0.5 * sin(time * 5.0)));
    
    float alpha = dissolve;
    
    gl_FragColor = vec4(color, alpha * 0.95);
  }
`

export default function PageTransitionShader({ 
  active = false, 
  type = 0 
}: { 
  active?: boolean
  type?: number 
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader: transitionVertexShader,
      fragmentShader: transitionFragmentShader,
      uniforms: {
        progress: { value: 0 },
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        transitionType: { value: type },
      },
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    let animationId: number
    let startTime = 0
    const duration = 1500

    const animate = () => {
      const elapsed = Date.now() - startTime
      const t = Math.min(elapsed / duration, 1)
      const eased = t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2

      material.uniforms.progress.value = active ? eased : 1 - eased
      material.uniforms.time.value = elapsed * 0.001

      renderer.render(scene, camera)

      if (t < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    if (active) {
      startTime = Date.now()
      animate()
    }

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      material.uniforms.resolution.value.set(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    const container = containerRef.current

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      container?.removeChild(renderer.domElement)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [active, type])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9998,
      }}
    />
  )
}
