'use client'

import { useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'

const vertexShader = `
  attribute float size;
  attribute vec3 customColor;
  attribute float twinkleOffset;
  
  varying vec3 vColor;
  varying float vTwinkle;
  
  uniform float time;
  
  void main() {
    vColor = customColor;
    vTwinkle = twinkleOffset + time * 0.3;
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (200.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  varying vec3 vColor;
  varying float vTwinkle;
  
  void main() {
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.5) discard;
    
    float twinkle = sin(vTwinkle * 2.0) * 0.15 + 0.85;
    float alpha = (1.0 - smoothstep(0.0, 0.5, r)) * twinkle * 0.6;
    
    vec3 glow = vColor * (1.0 - r * 1.2);
    gl_FragColor = vec4(glow, alpha);
  }
`

const nebulaVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const nebulaFragmentShader = `
  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  void main() {
    vec3 pos = vPosition * 0.003 + vec3(time * 0.01, time * 0.008, time * 0.005);
    
    float noise1 = snoise(pos) * 0.5 + 0.5;
    float noise2 = snoise(pos * 2.0 + vec3(10.0)) * 0.5 + 0.5;
    
    float combined = (noise1 * 0.7 + noise2 * 0.3);
    
    float dist = length(vUv - 0.5);
    float falloff = smoothstep(0.75, 0.2, dist);
    
    vec3 color = mix(color1, color2, combined * 0.5);
    color = mix(color, color3, noise2 * 0.3);
    
    float alpha = combined * falloff * 0.12;
    
    gl_FragColor = vec4(color, alpha);
  }
`

export default function WebGLStarryBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  const starColors = useMemo(() => [
    new THREE.Color(0xeeeeee),
    new THREE.Color(0xe8e0d8),
    new THREE.Color(0xd8e0e8),
    new THREE.Color(0xe0d8c8),
    new THREE.Color(0xc8c0d0),
  ], [])

  const nebulaColors = useMemo(() => [
    [new THREE.Color(0x0a0515), new THREE.Color(0x150a25), new THREE.Color(0x1a0f30)],
    [new THREE.Color(0x050a15), new THREE.Color(0x0a1525), new THREE.Color(0x0f1a30)],
    [new THREE.Color(0x150510), new THREE.Color(0x200a18), new THREE.Color(0x2a0f20)],
  ], [])

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x050508, 1)
    containerRef.current.appendChild(renderer.domElement)

    camera.position.z = 400

    const starGeometry = new THREE.BufferGeometry()
    const starCount = 1200
    const positions = new Float32Array(starCount * 3)
    const sizes = new Float32Array(starCount)
    const colors = new Float32Array(starCount * 3)
    const twinkleOffsets = new Float32Array(starCount)

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3
      const radius = 80 + Math.random() * 220
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi) - 80

      sizes[i] = Math.random() * 1.5 + 0.4

      const colorIndex = Math.floor(Math.random() * starColors.length)
      colors[i3] = starColors[colorIndex].r * 0.7
      colors[i3 + 1] = starColors[colorIndex].g * 0.7
      colors[i3 + 2] = starColors[colorIndex].b * 0.7

      twinkleOffsets[i] = Math.random() * Math.PI * 2
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    starGeometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3))
    starGeometry.setAttribute('twinkleOffset', new THREE.BufferAttribute(twinkleOffsets, 1))

    const starMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    const nebulaGeometries: THREE.PlaneGeometry[] = []
    const nebulaMeshes: THREE.Mesh[] = []

    for (let i = 0; i < 2; i++) {
      const geometry = new THREE.PlaneGeometry(350, 350, 64, 64)
      const material = new THREE.ShaderMaterial({
        vertexShader: nebulaVertexShader,
        fragmentShader: nebulaFragmentShader,
        uniforms: {
          time: { value: 0 },
          color1: { value: nebulaColors[i][0] },
          color2: { value: nebulaColors[i][1] },
          color3: { value: nebulaColors[i][2] },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 80,
        -120 - i * 60
      )
      mesh.rotation.set(
        Math.random() * 0.3,
        Math.random() * Math.PI,
        (i / 2) * Math.PI * 2
      )
      mesh.scale.setScalar(0.7 + Math.random() * 0.4)
      
      scene.add(mesh)
      nebulaGeometries.push(geometry)
      nebulaMeshes.push(mesh)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 1.2
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 1.2
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    let time = 0
    const animate = () => {
      time += 0.016

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.03
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.03

      camera.position.x = mouseRef.current.x * 10
      camera.position.y = -mouseRef.current.y * 10
      camera.lookAt(scene.position)

      starMaterial.uniforms.time.value = time

      nebulaMeshes.forEach((mesh, i) => {
        mesh.rotation.z += 0.00015 * (i % 2 === 0 ? 1 : -1)
        ;(mesh.material as THREE.ShaderMaterial).uniforms.time.value = time + i * 15
      })

      stars.rotation.y += 0.00008
      stars.rotation.x += 0.00004

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    const container = containerRef.current

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      container?.removeChild(renderer.domElement)
      renderer.dispose()
      starGeometry.dispose()
      starMaterial.dispose()
      nebulaGeometries.forEach(g => g.dispose())
      nebulaMeshes.forEach(m => (m.material as THREE.ShaderMaterial).dispose())
    }
  }, [starColors, nebulaColors])

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  )
}
