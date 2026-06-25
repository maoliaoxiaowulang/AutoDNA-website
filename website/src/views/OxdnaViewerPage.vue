<template>
  <div
    class="viewer-wrap"
    ref="wrapRef"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
  >
    <canvas ref="canvasRef"></canvas>

    <!-- Loading overlay -->
    <div id="vw-loading" ref="loadingRef">
      <div class="spin"></div>
      <div class="load-txt" ref="loadTxtRef">加载中…</div>
      <div id="vw-progTrack" ref="progTrackRef"><div id="vw-progBar" ref="progBarRef"></div></div>
    </div>

    <!-- Drop Zone -->
    <div id="vw-dropzone" ref="dropzoneRef">
      <div class="dz-logo">⬡</div>
      <div class="dz-title">oxDNA 3D Viewer</div>
      <p class="dz-sub">实时交互式分子结构查看器</p>
      <div class="dz-area" ref="dzAreaRef" :class="{ over: dragOver }" @click="triggerFileInput">
        <div class="dz-icon">⊕</div>
        <div class="dz-hint">将 <em>.top</em> 和 <em>.dat</em> 文件拖到此处</div>
        <div class="dz-hint2">或点击选择文件（可同时选两个）</div>
      </div>
      <input type="file" ref="fileInputRef" multiple style="display: none" @change="onFileChange" />
      <div class="dz-badges">
        <div class="badge" ref="badgeTopRef">topology 未加载</div>
        <div class="badge" ref="badgeDatRef">trajectory 未加载</div>
      </div>
    </div>

    <!-- CDN error -->
    <div id="vw-cdnError" ref="cdnErrorRef">
      ⚠ Three.js 加载失败（网络不通）。请确保能访问 cdn.jsdelivr.net，或联系管理员在本地部署依赖。
    </div>

    <!-- HUD -->
    <div id="vw-hud" ref="hudRef" class="hidden">
      <div class="hud-bar">
        <div class="hud-stat">粒子 <b ref="sNRef">—</b></div>
        <div class="sep"></div>
        <div class="hud-stat">链 <b ref="sSRef">—</b></div>
        <div class="sep"></div>
        <div class="hud-stat">帧 <b ref="sFRef">—</b></div>
        <div class="sep"></div>
        <div class="hud-stat">t = <b ref="sTRef">—</b></div>
        <div class="sep"></div>
        <button class="tog on" ref="togNucRef" @click="toggleLayer('nuc')">核苷酸</button>
        <button class="tog on" ref="togBaseRef" @click="toggleLayer('base')">碱基</button>
        <button class="tog on" ref="togBBRef" @click="toggleLayer('bb')">骨架</button>
      </div>
      <div id="vw-strandBar" ref="strandBarRef"></div>
      <div class="hud-bottom">
        <div id="vw-playControls" ref="playControlsRef">
          <button id="vw-playBtn" ref="playBtnRef" @click="togglePlay">▶</button>
          <input
            type="range"
            ref="frameSliderRef"
            min="0"
            max="0"
            value="0"
            @input="gotoFrameInput"
          />
          <div class="frame-lbl"><b ref="fNumRef">1</b> / <b ref="fTotRef">1</b></div>
          <div class="sep"></div>
        </div>
        <div class="jump-mode-group">
          <button class="jump-mode on" ref="jmFrameRef" @click="setJumpMode('frame')">帧</button>
          <button class="jump-mode" ref="jmTimeRef" @click="setJumpMode('time')">时间</button>
        </div>
        <input
          type="text"
          ref="jumpInputRef"
          class="jump-input"
          placeholder="第几帧"
          @keydown.enter="doJump"
        />
        <button class="tog" @click="doJump">跳转</button>
      </div>
      <div class="hud-corner">
        <button class="corner-btn" ref="trackBtnRef" @click="toggleTracking">追踪</button>
        <button class="corner-btn" @click="resetCam">重置视角</button>
        <button class="corner-btn" @click="reloadViewer">重新加载</button>
      </div>
    </div>

    <div id="vw-axisBox" ref="axisBoxRef">
      <canvas ref="axisCanvasRef"></canvas>
    </div>
    <div id="vw-selInfo" ref="selInfoRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ── DOM refs ──────────────────────────────────────────────────────────────────
const wrapRef = ref(null)
const canvasRef = ref(null)
const axisCanvasRef = ref(null)
const fileInputRef = ref(null)
const loadingRef = ref(null)
const progTrackRef = ref(null)
const progBarRef = ref(null)
const loadTxtRef = ref(null)
const dropzoneRef = ref(null)
const dzAreaRef = ref(null)
const badgeTopRef = ref(null)
const badgeDatRef = ref(null)
const cdnErrorRef = ref(null)
const hudRef = ref(null)
const strandBarRef = ref(null)
const playControlsRef = ref(null)
const playBtnRef = ref(null)
const frameSliderRef = ref(null)
const fNumRef = ref(null)
const fTotRef = ref(null)
const sNRef = ref(null)
const sSRef = ref(null)
const sFRef = ref(null)
const sTRef = ref(null)
const togNucRef = ref(null)
const togBaseRef = ref(null)
const togBBRef = ref(null)
const jmFrameRef = ref(null)
const jmTimeRef = ref(null)
const jumpInputRef = ref(null)
const trackBtnRef = ref(null)
const axisBoxRef = ref(null)
const selInfoRef = ref(null)
const dragOver = ref(false)

// ── Palette ───────────────────────────────────────────────────────────────────
const PAL = [
  0x1565c0, 0x2e7d32, 0xc77800, 0x6a1b9a, 0xb71c1c, 0x006064, 0xe65100, 0x1a237e, 0x33691e,
  0x880e4f, 0x004d40, 0x4a148c, 0x827717, 0x3e2723, 0x01579b, 0x37474f,
]

// ── State ─────────────────────────────────────────────────────────────────────
let pendTop = null,
  pendDat = null,
  pendDatFile = null
const LARGE_FILE = 30 * 1024 * 1024
let particles = null,
  frames = null,
  frameIdx = 0
let playing = false,
  playTimer = null
let trajId = null,
  totalFrames = 0,
  frameCache = {},
  loadedChunks = new Set()
const CHUNK_SIZE = 300
let layers = { bb: true, nuc: true, base: true }
let strandVisible = {}
let objs = {}
let threeReady = false
let scene, camera, renderer, controls
let selectedNuc = null
let tracking = false
let nucWorldPos = [],
  nucWorldA1 = []
let allBBMeshes = []
let _axisCvs = null
let _animId = null
let _resizeHandler = null
let jumpMode = 'frame'

// geometry cache
let SPHERE_BB = null,
  SPHERE_BASE = null,
  CYL = null
const YAXIS_G = { x: 0, y: 1, z: 0 }

// ── Helpers ───────────────────────────────────────────────────────────────────
function getW() {
  return wrapRef.value?.clientWidth ?? window.innerWidth
}
function getH() {
  return wrapRef.value?.clientHeight ?? window.innerHeight
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve()
      return
    }
    const s = document.createElement('script')
    s.src = src
    s.onload = resolve
    s.onerror = reject
    document.head.appendChild(s)
  })
}

// ── File input bridge ─────────────────────────────────────────────────────────
function triggerFileInput() {
  fileInputRef.value?.click()
}
function onFileChange(e) {
  handleFiles(e.target.files)
  e.target.value = ''
}

// ── Drag events ───────────────────────────────────────────────────────────────
function onDragOver() {
  dragOver.value = true
}
function onDragLeave(e) {
  if (!wrapRef.value?.contains(e.relatedTarget)) dragOver.value = false
}
function onDrop(e) {
  dragOver.value = false
  handleFiles(e.dataTransfer.files)
}

// ── File reading ──────────────────────────────────────────────────────────────
function readText(file) {
  return new Promise((resolve) => {
    const r = new FileReader()
    r.onload = (e) => resolve(e.target.result)
    r.readAsText(file)
  })
}

async function handleFiles(files) {
  for (let i = 0; i < files.length; i++) {
    const f = files[i],
      n = f.name.toLowerCase()
    if (n.endsWith('.top')) {
      pendTop = await readText(f)
      const b = badgeTopRef.value
      b.textContent = '✓  ' + f.name
      b.classList.add('ok')
    } else if (n.endsWith('.dat') || n.endsWith('.conf')) {
      pendDatFile = f
      const mb = Math.round(f.size / 1024 / 1024)
      const b = badgeDatRef.value
      b.textContent = '✓  ' + f.name + (f.size > LARGE_FILE ? ' (' + mb + ' MB)' : '')
      b.classList.add('ok')
    }
  }
  if (pendTop && pendDatFile) startLoad()
}

async function startLoad() {
  if (pendDatFile.size < LARGE_FILE) {
    pendDat = await readText(pendDatFile)
    initViewer()
  } else {
    await uploadAndInit(pendDatFile, pendTop)
  }
}

async function uploadAndInit(datFile, topText) {
  const ld = loadingRef.value
  const prog = progBarRef.value
  const txt = loadTxtRef.value
  function setProg(t, pct) {
    txt.textContent = t
    if (pct != null) {
      prog.style.width = pct + '%'
      progTrackRef.value.style.display = 'block'
    } else {
      progTrackRef.value.style.display = 'none'
    }
  }
  ld.classList.add('show')
  setProg('准备上传…', 0)

  let _animTimer = null
  const data = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const fd = new FormData()
    fd.append('dat', datFile, datFile.name)
    fd.append('top', new Blob([topText], { type: 'text/plain' }), 'topology.top')
    xhr.upload.onprogress = (e) => {
      if (!e.lengthComputable) return
      setProg('上传中… ' + Math.round((e.loaded / e.total) * 50) + '%', (e.loaded / e.total) * 50)
    }
    xhr.upload.onload = () => {
      let pct = 52
      setProg('建立帧索引…', pct)
      _animTimer = setInterval(() => {
        pct = Math.min(pct + 0.25, 88)
        prog.style.width = pct + '%'
      }, 300)
    }
    xhr.onload = () => {
      clearInterval(_animTimer)
      xhr.status === 200
        ? resolve(JSON.parse(xhr.responseText))
        : reject(new Error('HTTP ' + xhr.status))
    }
    xhr.onerror = () => {
      clearInterval(_animTimer)
      reject(new Error('网络错误'))
    }
    xhr.open('POST', '/api/traj/upload')
    xhr.send(fd)
  })

  if (data.error) {
    ld.classList.remove('show')
    progTrackRef.value.style.display = 'none'
    alert('错误：' + data.error)
    return
  }

  setProg('加载首批帧…', 92)
  trajId = data.id
  totalFrames = data.n_frames
  particles = data.particles
  frameCache = {}
  loadedChunks = new Set()
  frames = null
  await fetchChunk(0)

  setProg('初始化渲染…', 97)
  initThree()
  sNRef.value.textContent = particles.length
  sSRef.value.textContent = new Set(particles.map((p) => p.strand)).size
  fTotRef.value.textContent = totalFrames
  frameSliderRef.value.max = totalFrames - 1
  playControlsRef.value.style.display = totalFrames > 1 ? 'flex' : 'none'
  buildScene(particles, frameCache[0])
  buildStrandToggles(particles)
  resetCam()
  gotoFrame(0)
  dropzoneRef.value.classList.add('hidden')
  hudRef.value.classList.remove('hidden')
  axisBoxRef.value.style.display = 'block'
  ld.classList.remove('show')
  progTrackRef.value.style.display = 'none'
}

// ── Backend large-file mode ───────────────────────────────────────────────────
function frameFromBackend(raw, N) {
  const pos = [],
    a1 = [],
    a3 = []
  for (let i = 0; i < N; i++) {
    pos.push(new THREE.Vector3(raw.pos[i * 3], raw.pos[i * 3 + 1], raw.pos[i * 3 + 2]))
    a1.push(new THREE.Vector3(raw.a1[i * 3], raw.a1[i * 3 + 1], raw.a1[i * 3 + 2]))
    a3.push(new THREE.Vector3(raw.a3[i * 3], raw.a3[i * 3 + 1], raw.a3[i * 3 + 2]))
  }
  const b = raw.box || [1e9, 1e9, 1e9]
  return { t: raw.t, box: { x: b[0], y: b[1], z: b[2] }, pos, a1, a3 }
}

async function fetchChunk(chunkIdx) {
  if (loadedChunks.has(chunkIdx) || !trajId) return
  loadedChunks.add(chunkIdx)
  const start = chunkIdx * CHUNK_SIZE
  const count = Math.min(CHUNK_SIZE, totalFrames - start)
  try {
    const resp = await fetch('/api/traj/frames/' + trajId + '?start=' + start + '&count=' + count)
    const data = await resp.json()
    if (data.error) {
      console.error(data.error)
      loadedChunks.delete(chunkIdx)
      return
    }
    const N = particles.length
    data.frames.forEach((raw, i) => {
      frameCache[start + i] = frameFromBackend(raw, N)
    })
    loadedChunks.forEach((c) => {
      if (Math.abs(c - chunkIdx) > 10) {
        const s = c * CHUNK_SIZE
        for (let k = s; k < s + CHUNK_SIZE; k++) delete frameCache[k]
        loadedChunks.delete(c)
      }
    })
  } catch (e) {
    console.error(e)
    loadedChunks.delete(chunkIdx)
  }
}

// ── Parser ────────────────────────────────────────────────────────────────────
function parseTop(text) {
  const lines = text.trim().split('\n')
  const N = parseInt(lines[0].trim().split(/\s+/)[0])
  const parts = []
  for (let i = 1; i < lines.length && parts.length < N; i++) {
    const v = lines[i].trim().split(/\s+/)
    if (v.length < 4) continue
    parts.push({
      id: parts.length,
      strand: parseInt(v[0]) - 1,
      base: v[1],
      n3: parseInt(v[2]),
      n5: parseInt(v[3]),
    })
  }
  return parts
}

function parseConf(text) {
  const lines = text.split('\n'),
    frs = []
  let i = 0
  while (i < lines.length) {
    const l = lines[i].trim()
    if (!l.startsWith('t')) {
      i++
      continue
    }
    const t = parseFloat(l.split('=')[1])
    const bv = (lines[i + 1] || '').trim().split(/\s+/)
    const box = {
      x: parseFloat(bv[2]) || 1e9,
      y: parseFloat(bv[3]) || 1e9,
      z: parseFloat(bv[4]) || 1e9,
    }
    i += 3
    const pos = [],
      a1 = [],
      a3 = []
    while (i < lines.length) {
      const row = lines[i].trim()
      if (!row || row.startsWith('t')) break
      const v = row.split(/\s+/).map(Number)
      if (v.length >= 9) {
        pos.push(new THREE.Vector3(v[0], v[1], v[2]))
        a1.push(new THREE.Vector3(v[3], v[4], v[5]))
        a3.push(new THREE.Vector3(v[6], v[7], v[8]))
      }
      i++
    }
    if (pos.length > 0) frs.push({ t, box, pos, a1, a3 })
  }
  return frs
}

// ── Three.js init ─────────────────────────────────────────────────────────────
function initThree() {
  if (threeReady || typeof THREE === 'undefined') return false
  const cvs = canvasRef.value
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf1f5f9)
  scene.fog = new THREE.FogExp2(0xf1f5f9, 0.005)

  camera = new THREE.PerspectiveCamera(55, getW() / getH(), 0.01, 2000)
  camera.position.set(0, 0, 45)

  renderer = new THREE.WebGLRenderer({ canvas: cvs, antialias: true })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.setSize(getW(), getH())

  controls = new THREE.TrackballControls(camera, renderer.domElement)
  controls.rotateSpeed = 3.0
  controls.zoomSpeed = 1.2
  controls.panSpeed = 0.8
  controls.dynamicDampingFactor = 0.18
  controls.minDistance = 0.5
  controls.maxDistance = 800

  scene.add(new THREE.AmbientLight(0xffffff, 0.7))
  const kl = new THREE.DirectionalLight(0xffffff, 1.2)
  kl.position.set(10, 20, 15)
  scene.add(kl)
  const fl = new THREE.DirectionalLight(0xffffff, 0.3)
  fl.position.set(-10, -8, -12)
  scene.add(fl)

  _axisCvs = axisCanvasRef.value
  _axisCvs.width = 140
  _axisCvs.height = 140

  let _mouseDownPos = { x: 0, y: 0 }
  renderer.domElement.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      _mouseDownPos.x = e.clientX
      _mouseDownPos.y = e.clientY
    }
  })
  renderer.domElement.addEventListener('mouseup', (e) => {
    if (e.button !== 0) return
    const dx = e.clientX - _mouseDownPos.x,
      dy = e.clientY - _mouseDownPos.y
    const wasDrag = dx * dx + dy * dy > 16
    if (tracking && wasDrag) setTracking(false)
    else if (!wasDrag) handleCanvasClick(e)
  })

  _resizeHandler = () => {
    camera.aspect = getW() / getH()
    camera.updateProjectionMatrix()
    renderer.setSize(getW(), getH())
  }
  window.addEventListener('resize', _resizeHandler)

  function animate() {
    _animId = requestAnimationFrame(animate)
    controls.update()
    if (tracking && selectedNuc !== null) {
      const curPos = nucWorldPos[selectedNuc.globalIdx]
      const a1v = nucWorldA1[selectedNuc.globalIdx]
      if (curPos && a1v) {
        const right = a1v.clone().normalize()
        let tempUp = new THREE.Vector3(0, 1, 0)
        if (Math.abs(right.dot(tempUp)) > 0.9) tempUp.set(1, 0, 0)
        const fwd = new THREE.Vector3().crossVectors(right, tempUp).normalize()
        const up = new THREE.Vector3().crossVectors(fwd, right).normalize()
        let dist = camera.position.distanceTo(controls.target)
        if (dist < 0.5) dist = 0.5
        controls.target.copy(curPos)
        camera.position.copy(curPos).addScaledVector(fwd, -dist)
        camera.up.copy(up)
        camera.lookAt(curPos)
      }
    }
    renderer.render(scene, camera)
    renderAxisOverlay()
  }
  animate()

  threeReady = true
  return true
}

// ── Axis overlay ──────────────────────────────────────────────────────────────
function renderAxisOverlay() {
  if (!_axisCvs || !camera) return
  const ctx = _axisCvs.getContext('2d')
  const W = 140,
    H = 140,
    cx = W / 2,
    cy = H / 2,
    arm = 38
  ctx.clearRect(0, 0, W, H)
  camera.updateMatrixWorld()
  const camRight = new THREE.Vector3(),
    camUp = new THREE.Vector3(),
    camFwd = new THREE.Vector3()
  camRight.setFromMatrixColumn(camera.matrixWorld, 0)
  camUp.setFromMatrixColumn(camera.matrixWorld, 1)
  camera.getWorldDirection(camFwd)
  const AXES = [
    { d: new THREE.Vector3(1, 0, 0), col: '#e05555', label: 'X' },
    { d: new THREE.Vector3(0, 1, 0), col: '#3caa55', label: 'Y' },
    { d: new THREE.Vector3(0, 0, 1), col: '#4488dd', label: 'Z' },
  ]
  const proj = AXES.map((ax) => ({
    col: ax.col,
    label: ax.label,
    ex: cx + ax.d.dot(camRight) * arm,
    ey: cy - ax.d.dot(camUp) * arm,
    depth: ax.d.dot(camFwd),
  }))
  proj.sort((a, b) => a.depth - b.depth)
  proj.forEach((ax) => {
    const dx = ax.ex - cx,
      dy = ax.ey - cy
    const segLen = Math.sqrt(dx * dx + dy * dy)
    if (segLen < 1e-4) return
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.lineTo(ax.ex, ax.ey)
    ctx.strokeStyle = ax.col
    ctx.lineWidth = 1.6
    ctx.stroke()
    const nx = dx / segLen,
      ny = dy / segLen,
      hlen = 9,
      hwidth = 3.5
    const px = -ny * hwidth,
      py = nx * hwidth
    ctx.beginPath()
    ctx.moveTo(ax.ex, ax.ey)
    ctx.lineTo(ax.ex - nx * hlen + px, ax.ey - ny * hlen + py)
    ctx.lineTo(ax.ex - nx * hlen - px, ax.ey - ny * hlen - py)
    ctx.closePath()
    ctx.fillStyle = ax.col
    ctx.fill()
    const lx = cx + dx * 1.38,
      ly = cy + dy * 1.38
    ctx.fillStyle = ax.col
    ctx.font = '600 10px "Segoe UI",system-ui,sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(ax.label, lx, ly)
  })
  ctx.beginPath()
  ctx.arc(cx, cy, 2.5, 0, Math.PI * 2)
  ctx.fillStyle = '#64748b'
  ctx.fill()
}

// ── Selection ─────────────────────────────────────────────────────────────────
let _selColor = null
function getSelColor() {
  if (!_selColor && typeof THREE !== 'undefined') _selColor = new THREE.Color(0xffd600)
  return _selColor
}

function handleCanvasClick(e) {
  if (!threeReady || !allBBMeshes.length) return
  const rect = renderer.domElement.getBoundingClientRect()
  const ndc = new THREE.Vector2(
    ((e.clientX - rect.left) / rect.width) * 2 - 1,
    -((e.clientY - rect.top) / rect.height) * 2 + 1
  )
  const ray = new THREE.Raycaster()
  ray.setFromCamera(ndc, camera)
  ray.params.Points = { threshold: 0.1 }
  let best = null,
    bestDist = Infinity
  for (let mi = 0; mi < allBBMeshes.length; mi++) {
    const entry = allBBMeshes[mi]
    let ok = true,
      _o = entry.mesh
    while (_o) {
      if (_o.visible === false) {
        ok = false
        break
      }
      _o = _o.parent
    }
    if (!ok) continue
    const hits = ray.intersectObject(entry.mesh, false)
    if (hits.length > 0 && hits[0].distance < bestDist) {
      bestDist = hits[0].distance
      best = { entry, instanceId: hits[0].instanceId }
    }
  }
  if (!best) return
  const gIdx = best.entry.nucs[best.instanceId]
  if (selectedNuc && selectedNuc.globalIdx === gIdx) {
    applyNucColor(best.entry, best.instanceId, null)
    selectedNuc = null
    setTracking(false)
    selInfoRef.value.style.display = 'none'
  } else {
    if (selectedNuc) restoreNucColor(selectedNuc)
    selectedNuc = {
      strandIdx: best.entry.strand,
      localIdx: best.instanceId,
      globalIdx: gIdx,
      entry: best.entry,
    }
    applyNucColor(best.entry, best.instanceId, getSelColor())
    const base = particles ? particles[gIdx].base : '?'
    selInfoRef.value.textContent =
      '选中：核苷酸 ' + (gIdx + 1) + ' (' + base + ')  链 ' + (best.entry.strand + 1)
    selInfoRef.value.style.display = 'block'
  }
}

function applyNucColor(entry, localIdx, col) {
  const sphere = col || new THREE.Color(PAL[entry.strand % PAL.length])
  entry.mesh.setColorAt(localIdx, sphere)
  entry.mesh.instanceColor.needsUpdate = true
  if (entry.stickMesh && entry.stickMesh.instanceColor) {
    const stick = col ? col : new THREE.Color(PAL[entry.strand % PAL.length]).multiplyScalar(0.8)
    entry.stickMesh.setColorAt(localIdx, stick)
    entry.stickMesh.instanceColor.needsUpdate = true
  }
}
function restoreNucColor(prev) {
  if (!prev?.entry?.mesh) return
  applyNucColor(prev.entry, prev.localIdx, null)
}

// ── Tracking ──────────────────────────────────────────────────────────────────
function setTracking(on) {
  tracking = on
  trackBtnRef.value?.classList.toggle('active', on)
  if (!on) return
  if (selectedNuc === null) {
    tracking = false
    trackBtnRef.value?.classList.remove('active')
    return
  }
  const gIdx = selectedNuc.globalIdx
  const nucPos = nucWorldPos[gIdx],
    a1v = nucWorldA1[gIdx]
  if (!nucPos || !a1v) {
    tracking = false
    return
  }
  const right = a1v.clone().normalize()
  let tempUp = new THREE.Vector3(0, 1, 0)
  if (Math.abs(right.dot(tempUp)) > 0.9) tempUp.set(1, 0, 0)
  const fwd = new THREE.Vector3().crossVectors(right, tempUp).normalize()
  const up = new THREE.Vector3().crossVectors(fwd, right).normalize()
  let dist = camera.position.distanceTo(controls.target)
  if (dist < 1) dist = 10
  controls.target.copy(nucPos)
  camera.position.copy(nucPos).addScaledVector(fwd, -dist)
  camera.up.copy(up)
  controls.update()
}

function toggleTracking() {
  if (!selectedNuc) {
    alert('请先点击选择一个核苷酸')
    return
  }
  setTracking(!tracking)
}

// ── Per-instance alpha ────────────────────────────────────────────────────────
function patchPerInstanceAlpha(mat, n) {
  const alphaData = new Uint8Array(n * 4)
  for (let i = 0; i < n; i++) {
    alphaData[i * 4] = 255
    alphaData[i * 4 + 3] = 255
  }
  const alphaTex = new THREE.DataTexture(alphaData, n, 1, THREE.RGBAFormat, THREE.UnsignedByteType)
  alphaTex.needsUpdate = true
  mat.transparent = true
  mat.depthWrite = true
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.instAlphaTex = { value: alphaTex }
    shader.uniforms.instCount = { value: n }
    shader.vertexShader =
      'uniform sampler2D instAlphaTex;\nuniform int instCount;\nvarying float vInstA;\n' +
      shader.vertexShader.replace(
        '#include <begin_vertex>',
        '#include <begin_vertex>\nvInstA=texture2D(instAlphaTex,vec2((float(gl_InstanceID)+0.5)/float(instCount),0.5)).r;'
      )
    shader.fragmentShader =
      'varying float vInstA;\n' +
      shader.fragmentShader.replace(
        '#include <premultiplied_alpha_fragment>',
        'gl_FragColor.a*=vInstA;\n#include <premultiplied_alpha_fragment>'
      )
  }
  return { alphaData, alphaTex, n }
}

// ── Geometry helpers ──────────────────────────────────────────────────────────
const BASE_COL = { A: 0x4caf50, T: 0xf44336, C: 0x42a5f5, G: 0xffc107, U: 0xff7043 }
function getBaseColor(b) {
  return BASE_COL[b.toUpperCase()] || 0x78909c
}

function getSphereBB() {
  if (!SPHERE_BB) SPHERE_BB = new THREE.SphereGeometry(0.2, 12, 8)
  return SPHERE_BB
}
function getSphereBase() {
  if (!SPHERE_BASE) SPHERE_BASE = new THREE.SphereGeometry(0.1, 10, 7)
  return SPHERE_BASE
}
function getCyl() {
  if (!CYL) CYL = new THREE.CylinderGeometry(1, 1, 1, 8, 1)
  return CYL
}

let YAXIS3 = null
function setCylPose(dummy, pA, pB, radius) {
  if (!YAXIS3) YAXIS3 = new THREE.Vector3(0, 1, 0)
  const dir = new THREE.Vector3().subVectors(pB, pA)
  const len = dir.length()
  if (len < 1e-6) return false
  dummy.position.copy(pA).addScaledVector(dir.normalize(), len * 0.5)
  dummy.scale.set(radius, len, radius)
  dummy.quaternion.setFromUnitVectors(YAXIS3, dir)
  dummy.updateMatrix()
  return true
}

function buildCylMesh(segs, radius, color, withAlpha) {
  const n = segs.length / 6
  if (n === 0) return null
  const mat = new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.5,
    metalness: 0.0,
    clearcoat: 0.35,
    clearcoatRoughness: 0.18,
  })
  let alphaInfo = null
  if (withAlpha) alphaInfo = patchPerInstanceAlpha(mat, n)
  const mesh = new THREE.InstancedMesh(getCyl(), mat, n)
  const dummy = new THREE.Object3D()
  const pA = new THREE.Vector3(),
    pB = new THREE.Vector3()
  for (let i = 0; i < n; i++) {
    const o = i * 6
    pA.set(segs[o], segs[o + 1], segs[o + 2])
    pB.set(segs[o + 3], segs[o + 4], segs[o + 5])
    setCylPose(dummy, pA, pB, radius)
    mesh.setMatrixAt(i, dummy.matrix)
  }
  mesh.instanceMatrix.needsUpdate = true
  if (alphaInfo) mesh._alphaInfo = alphaInfo
  return mesh
}

function clearObjs() {
  if (objs.main) {
    scene.remove(objs.main)
    objs.main.traverse((child) => {
      if (child.material) child.material.dispose()
      if (
        child.geometry &&
        child.geometry !== SPHERE_BB &&
        child.geometry !== SPHERE_BASE &&
        child.geometry !== CYL
      )
        child.geometry.dispose()
    })
  }
  objs = {}
}

// ── PBC unwrap ────────────────────────────────────────────────────────────────
function unwrapPositions(pos, parts, box) {
  const N = pos.length
  const uw = pos.map((p) => p.clone())
  const bx = box.x,
    by = box.y,
    bz = box.z
  for (let i = 0; i < N; i++) {
    if (parts[i].n5 !== -1) continue
    let cur = i
    while (true) {
      const nxt = parts[cur].n3
      if (nxt < 0 || nxt >= N) break
      let dx = uw[nxt].x - uw[cur].x
      let dy = uw[nxt].y - uw[cur].y
      let dz = uw[nxt].z - uw[cur].z
      dx -= bx * Math.round(dx / bx)
      dy -= by * Math.round(dy / by)
      dz -= bz * Math.round(dz / bz)
      uw[nxt].set(uw[cur].x + dx, uw[cur].y + dy, uw[cur].z + dz)
      cur = nxt
    }
  }
  return uw
}

// ── Build scene ───────────────────────────────────────────────────────────────
function buildScene(parts, frame) {
  if (!threeReady) return
  clearObjs()
  allBBMeshes = []
  const N = parts.length
  const box = frame.box || { x: 1e9, y: 1e9, z: 1e9 }
  const pos = unwrapPositions(frame.pos, parts, box)
  const a1 = frame.a1
  const dummy = new THREE.Object3D(),
    col = new THREE.Color()
  const BS_LEN = 0.48
  const bs = []
  for (let i = 0; i < N; i++)
    bs.push(new THREE.Vector3().copy(pos[i]).addScaledVector(a1[i], BS_LEN))

  nucWorldPos = []
  nucWorldA1 = []
  for (let i = 0; i < N; i++) {
    nucWorldPos[i] = pos[i].clone()
    nucWorldA1[i] = a1[i].clone()
  }

  const strandNucs = {}
  for (let i = 0; i < N; i++) {
    const s = parts[i].strand
    if (!strandNucs[s]) strandNucs[s] = []
    strandNucs[s].push(i)
  }

  const mainGroup = new THREE.Group(),
    strandGroups = {}

  Object.keys(strandNucs).forEach((sKey) => {
    const s = parseInt(sKey),
      nucs = strandNucs[s]
    const sc = new THREE.Color(PAL[s % PAL.length])
    const sGroup = new THREE.Group()

    const bbMat = new THREE.MeshPhysicalMaterial({
      roughness: 0.55,
      metalness: 0.0,
      clearcoat: 0.45,
      clearcoatRoughness: 0.12,
    })
    const bbAlpha = patchPerInstanceAlpha(bbMat, nucs.length)
    const bbSph = new THREE.InstancedMesh(getSphereBB(), bbMat, nucs.length)
    bbSph._alphaInfo = bbAlpha
    for (let k = 0; k < nucs.length; k++) {
      const idx = nucs[k]
      dummy.position.copy(pos[idx])
      dummy.scale.setScalar(1)
      dummy.updateMatrix()
      bbSph.setMatrixAt(k, dummy.matrix)
      bbSph.setColorAt(k, selectedNuc && selectedNuc.globalIdx === idx ? getSelColor() : sc)
    }
    bbSph.instanceMatrix.needsUpdate = true
    bbSph.instanceColor.needsUpdate = true
    const nucSub = new THREE.Group()
    nucSub._isNuc = true
    nucSub.add(bbSph)
    nucSub.visible = layers.nuc
    sGroup.add(nucSub)

    const baseMat = new THREE.MeshPhysicalMaterial({
      roughness: 0.45,
      metalness: 0.0,
      clearcoat: 0.35,
      clearcoatRoughness: 0.15,
    })
    const baseAlpha = patchPerInstanceAlpha(baseMat, nucs.length)
    const baseSph = new THREE.InstancedMesh(getSphereBase(), baseMat, nucs.length)
    baseSph._alphaInfo = baseAlpha
    for (let k = 0; k < nucs.length; k++) {
      const idx = nucs[k]
      dummy.position.copy(bs[idx])
      dummy.scale.setScalar(1)
      dummy.updateMatrix()
      baseSph.setMatrixAt(k, dummy.matrix)
      col.setHex(getBaseColor(parts[idx].base))
      baseSph.setColorAt(k, col)
    }
    baseSph.instanceMatrix.needsUpdate = true
    baseSph.instanceColor.needsUpdate = true
    const baseSub = new THREE.Group()
    baseSub._isBase = true
    baseSub.add(baseSph)
    baseSub.visible = layers.base
    sGroup.add(baseSub)

    const bbSegs = [],
      stSegs = []
    for (let k = 0; k < nucs.length; k++) {
      const idx = nucs[k],
        p = parts[idx]
      stSegs.push(pos[idx].x, pos[idx].y, pos[idx].z, bs[idx].x, bs[idx].y, bs[idx].z)
      if (p.n3 >= 0 && p.n3 < N)
        bbSegs.push(pos[idx].x, pos[idx].y, pos[idx].z, pos[p.n3].x, pos[p.n3].y, pos[p.n3].z)
    }
    const c = new THREE.Color(PAL[s % PAL.length]).multiplyScalar(0.8)
    const bbSub = new THREE.Group()
    bbSub._isBB = true
    const m1 = buildCylMesh(bbSegs, 0.1, c, false)
    const m2 = buildCylMesh(stSegs, 0.09, c, true)
    if (m1) bbSub.add(m1)
    if (m2) {
      m2.material.color.set(0xffffff)
      for (let k = 0; k < nucs.length; k++) {
        const selStick = selectedNuc && selectedNuc.globalIdx === nucs[k]
        m2.setColorAt(k, selStick ? getSelColor() : c)
      }
      m2.instanceColor.needsUpdate = true
      bbSub.add(m2)
    }
    bbSub.visible = layers.bb
    sGroup.add(bbSub)

    const entry = { mesh: bbSph, baseMesh: baseSph, stickMesh: m2 || null, nucs, strand: s }
    allBBMeshes.push(entry)
    if (selectedNuc) {
      for (let k = 0; k < nucs.length; k++) {
        if (nucs[k] === selectedNuc.globalIdx) {
          selectedNuc.entry = entry
          selectedNuc.localIdx = k
          break
        }
      }
    }
    sGroup.visible = strandVisible[s] !== false
    strandGroups[s] = sGroup
    mainGroup.add(sGroup)
  })

  scene.add(mainGroup)
  objs.main = mainGroup
  objs.strands = strandGroups
}

// ── Camera ────────────────────────────────────────────────────────────────────
function resetCam() {
  const frame = trajId ? frameCache[frameIdx] : frames && frames[frameIdx]
  if (!frame) return
  const box = new THREE.Box3()
  frame.pos.forEach((p) => box.expandByPoint(p))
  const c = new THREE.Vector3(),
    sz = new THREE.Vector3()
  box.getCenter(c)
  box.getSize(sz)
  controls.target.copy(c)
  camera.position.copy(c).add(new THREE.Vector3(0, 0, sz.length() * 0.85))
  controls.update()
}

// ── Frame navigation ──────────────────────────────────────────────────────────
function gotoFrame(idx) {
  if (!frames && !trajId) return
  const N = trajId ? totalFrames : frames.length
  frameIdx = Math.max(0, Math.min(idx, N - 1))
  frameSliderRef.value.value = frameIdx
  fNumRef.value.textContent = frameIdx + 1
  sFRef.value.textContent = frameIdx + 1 + '/' + N
  const frame = trajId ? frameCache[frameIdx] : frames[frameIdx]
  if (frame) {
    sTRef.value.textContent = frame.t.toLocaleString()
    buildScene(particles, frame)
    if (trajId) fetchChunk(Math.floor(frameIdx / CHUNK_SIZE) + 1)
  } else if (trajId) {
    fetchChunk(Math.floor(frameIdx / CHUNK_SIZE)).then(() => {
      if (frameCache[frameIdx]) {
        sTRef.value.textContent = frameCache[frameIdx].t.toLocaleString()
        buildScene(particles, frameCache[frameIdx])
      }
    })
  }
}

function gotoFrameInput(e) {
  gotoFrame(+e.target.value)
}

function setJumpMode(m) {
  jumpMode = m
  jmFrameRef.value.classList.toggle('on', m === 'frame')
  jmTimeRef.value.classList.toggle('on', m === 'time')
  jumpInputRef.value.placeholder = m === 'frame' ? '第几帧' : '模拟时间 t'
}

function doJump() {
  if (!frames && !trajId) return
  const n = parseFloat(jumpInputRef.value.value.trim())
  if (isNaN(n)) return
  const N = trajId ? totalFrames : frames.length
  if (jumpMode === 'frame') {
    gotoFrame(Math.round(Math.max(1, Math.min(n, N))) - 1)
  } else {
    let best = 0,
      bd = Infinity
    const src = trajId ? Object.values(frameCache) : frames
    const keys = trajId ? Object.keys(frameCache).map(Number) : null
    src.forEach((f, i) => {
      const d = Math.abs(f.t - n)
      if (d < bd) {
        bd = d
        best = trajId ? keys[i] : i
      }
    })
    gotoFrame(best)
  }
}

function togglePlay() {
  playing = !playing
  playBtnRef.value.textContent = playing ? '⏸' : '▶'
  if (playing) {
    const N = trajId ? totalFrames : frames.length
    playTimer = setInterval(() => {
      gotoFrame((frameIdx + 1) % N)
    }, 80)
  } else {
    clearInterval(playTimer)
  }
}

// ── Layer toggle ──────────────────────────────────────────────────────────────
function toggleLayer(name) {
  layers[name] = !layers[name]
  if (objs.main) {
    if (name === 'bb')
      objs.main.traverse((o) => {
        if (o._isBB) o.visible = layers.bb
      })
    if (name === 'nuc')
      objs.main.traverse((o) => {
        if (o._isNuc) o.visible = layers.nuc
      })
    if (name === 'base')
      objs.main.traverse((o) => {
        if (o._isBase) o.visible = layers.base
      })
  }
  const refs = { bb: togBBRef, nuc: togNucRef, base: togBaseRef }
  refs[name].value?.classList.toggle('on', layers[name])
}

// ── Strand toggles ────────────────────────────────────────────────────────────
function buildStrandToggles(parts) {
  const bar = strandBarRef.value
  bar.innerHTML = ''
  const seen = {},
    strands = []
  parts.forEach((p) => {
    if (!seen[p.strand]) {
      seen[p.strand] = true
      strands.push(p.strand)
    }
  })
  strands.sort((a, b) => a - b)
  strands.forEach((s) => {
    const hex = '#' + PAL[s % PAL.length].toString(16).padStart(6, '0')
    const btn = document.createElement('button')
    btn.className = 'tog on'
    btn.innerHTML =
      '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:' +
      hex +
      ';margin-right:5px;vertical-align:middle;flex-shrink:0"></span>链 ' +
      (s + 1)
    btn.style.cssText = 'border-color:' + hex + ';display:inline-flex;align-items:center;'
    btn.onclick = () => {
      if (!objs.strands || objs.strands[s] === undefined) return
      const grp = objs.strands[s]
      grp.visible = !grp.visible
      strandVisible[s] = grp.visible
      btn.classList.toggle('on', grp.visible)
    }
    bar.appendChild(btn)
  })
}

// ── Init viewer ───────────────────────────────────────────────────────────────
function initViewer() {
  const ld = loadingRef.value
  ld.classList.add('show')
  loadTxtRef.value.textContent = '解析文件…'
  setTimeout(() => {
    if (typeof THREE === 'undefined') {
      ld.classList.remove('show')
      cdnErrorRef.value.style.display = 'block'
      return
    }
    try {
      particles = parseTop(pendTop)
      frames = parseConf(pendDat)
      if (!particles.length || !frames.length) throw new Error('解析结果为空')
      loadTxtRef.value.textContent = '初始化渲染器…'
      initThree()
      sNRef.value.textContent = particles.length
      sSRef.value.textContent = new Set(particles.map((p) => p.strand)).size
      totalFrames = frames.length
      fTotRef.value.textContent = totalFrames
      frameSliderRef.value.max = totalFrames - 1
      playControlsRef.value.style.display = totalFrames > 1 ? 'flex' : 'none'
      buildScene(particles, frames[0])
      buildStrandToggles(particles)
      resetCam()
      gotoFrame(0)
      dropzoneRef.value.classList.add('hidden')
      hudRef.value.classList.remove('hidden')
      axisBoxRef.value.style.display = 'block'
    } catch (e) {
      alert('解析失败：' + e.message)
    }
    ld.classList.remove('show')
  }, 50)
}

// ── Reload viewer ─────────────────────────────────────────────────────────────
function reloadViewer() {
  pendTop = pendDat = pendDatFile = null
  particles = frames = null
  trajId = null
  totalFrames = 0
  frameCache = {}
  loadedChunks = new Set()
  strandVisible = {}
  selectedNuc = null
  allBBMeshes = []
  nucWorldPos = []
  setTracking(false)
  strandBarRef.value.innerHTML = ''
  selInfoRef.value.style.display = 'none'
  if (threeReady) clearObjs()
  if (playing) {
    clearInterval(playTimer)
    playing = false
  }
  badgeTopRef.value.textContent = 'topology 未加载'
  badgeTopRef.value.classList.remove('ok')
  badgeDatRef.value.textContent = 'trajectory 未加载'
  badgeDatRef.value.classList.remove('ok')
  hudRef.value.classList.add('hidden')
  axisBoxRef.value.style.display = 'none'
  dropzoneRef.value.classList.remove('hidden')
  frameIdx = 0
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────
onMounted(async () => {
  try {
    await loadScript('https://cdn.jsdelivr.net/npm/three@0.134.0/build/three.min.js')
    await loadScript(
      'https://cdn.jsdelivr.net/npm/three@0.134.0/examples/js/controls/TrackballControls.js'
    )
  } catch {
    cdnErrorRef.value.style.display = 'block'
  }
})

onUnmounted(() => {
  if (_animId) cancelAnimationFrame(_animId)
  if (_resizeHandler) window.removeEventListener('resize', _resizeHandler)
  if (playing) clearInterval(playTimer)
  if (renderer) {
    renderer.dispose()
    renderer = null
  }
  threeReady = false
  _animId = null
  _resizeHandler = null
  SPHERE_BB = null
  SPHERE_BASE = null
  CYL = null
})
</script>

<style>
.viewer-wrap {
  position: relative;
  width: 100%;
  margin-top: var(--nav-height);
  height: calc(100vh - var(--nav-height));
  overflow: hidden;
  background: #f1f5f9;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif;
  color: #1e293b;
}
.viewer-wrap > canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

/* ── Drop Zone ──────────────────────────────────────────────────────────────── */
#vw-dropzone {
  position: absolute;
  inset: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(ellipse 60% 50% at 25% 40%, rgba(99, 102, 241, 0.08), transparent),
    radial-gradient(ellipse 50% 60% at 75% 60%, rgba(6, 182, 212, 0.06), transparent), #f1f5f9;
  transition: opacity 0.5s;
}
#vw-dropzone.hidden {
  opacity: 0;
  pointer-events: none;
}

.dz-logo {
  font-size: 38px;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #6366f1, #a855f7, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.5));
  animation: vw-float 4s ease-in-out infinite;
}
@keyframes vw-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-7px);
  }
}

.dz-title {
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.6px;
  margin-bottom: 8px;
  background: linear-gradient(110deg, #3730a3 0%, #4338ca 40%, #0f766e 70%, #1d4ed8 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: vw-shimmer 4s linear infinite;
}
.dz-sub {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 36px;
}
@keyframes vw-shimmer {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}

.dz-area {
  position: relative;
  width: 400px;
  height: 190px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.6);
  border: 1.5px solid rgba(99, 102, 241, 0.25);
  transition:
    border-color 0.25s,
    transform 0.25s,
    background 0.25s;
}
.dz-area:hover,
.dz-area.over {
  border-color: rgba(67, 56, 202, 0.7);
  background: rgba(255, 255, 255, 0.85);
  transform: scale(1.02);
}
.dz-icon {
  font-size: 30px;
  opacity: 0.5;
}
.dz-hint {
  font-size: 14px;
  color: #475569;
}
.dz-hint em {
  color: #4338ca;
  font-style: normal;
  font-weight: 600;
}
.dz-hint2 {
  font-size: 12px;
  color: #94a3b8;
}

.dz-badges {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}
.badge {
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid rgba(99, 102, 241, 0.2);
  color: #64748b;
  background: rgba(255, 255, 255, 0.7);
}
.badge.ok {
  border-color: #15803d;
  color: #15803d;
  background: rgba(21, 128, 61, 0.08);
}

/* ── CDN error ──────────────────────────────────────────────────────────────── */
#vw-cdnError {
  display: none;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 13px;
  color: #b91c1c;
  z-index: 200;
  text-align: center;
  max-width: 500px;
}

/* ── HUD ────────────────────────────────────────────────────────────────────── */
#vw-hud {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 50;
}
#vw-hud.hidden {
  display: none;
}

.hud-bar {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.15);
  border-radius: 30px;
  padding: 6px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  pointer-events: auto;
  white-space: nowrap;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
.hud-stat {
  font-size: 12px;
  color: #64748b;
}
.hud-stat b {
  color: #4338ca;
  font-weight: 600;
}
.sep {
  width: 1px;
  height: 14px;
  background: rgba(99, 102, 241, 0.15);
  flex-shrink: 0;
}
.tog {
  padding: 3px 10px;
  border-radius: 6px;
  border: 1px solid rgba(99, 102, 241, 0.22);
  background: transparent;
  color: #64748b;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
}
.tog.on {
  background: rgba(67, 56, 202, 0.1);
  border-color: #4338ca;
  color: #3730a3;
}
.tog:hover {
  border-color: #4338ca;
  color: #3730a3;
}

.hud-bottom {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.15);
  border-radius: 20px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  pointer-events: auto;
  min-width: 300px;
  max-width: 640px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
#vw-playControls {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}
.jump-input {
  width: 88px;
  border: 1px solid rgba(99, 102, 241, 0.22);
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 11px;
  font-family: inherit;
  color: #475569;
  background: rgba(255, 255, 255, 0.8);
  outline: none;
  transition: border-color 0.15s;
}
.jump-input:focus {
  border-color: #4338ca;
}
.jump-input::placeholder {
  color: #94a3b8;
}
.jump-mode-group {
  display: flex;
  border: 1px solid rgba(99, 102, 241, 0.22);
  border-radius: 6px;
  overflow: hidden;
}
.jump-mode {
  padding: 3px 8px;
  font-size: 11px;
  font-weight: 600;
  font-family: inherit;
  border: none;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.15s;
}
.jump-mode.on {
  background: rgba(67, 56, 202, 0.1);
  color: #3730a3;
}
.jump-mode:hover:not(.on) {
  color: #475569;
}
#vw-playBtn {
  background: none;
  border: none;
  cursor: pointer;
  color: #4338ca;
  font-size: 17px;
  padding: 0 4px;
  transition: color 0.15s;
  flex-shrink: 0;
}
#vw-playBtn:hover {
  color: #3730a3;
}
#vw-hud input[type='range'] {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 3px;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.1);
}
#vw-hud input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #4338ca;
  box-shadow: 0 0 8px rgba(67, 56, 202, 0.35);
  cursor: pointer;
}
.frame-lbl {
  font-size: 11px;
  color: #64748b;
  white-space: nowrap;
}
.frame-lbl b {
  color: #4338ca;
}

.hud-corner {
  position: absolute;
  top: 16px;
  right: 16px;
  pointer-events: auto;
  display: flex;
  gap: 8px;
}
.corner-btn {
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.15);
  border-radius: 10px;
  color: #64748b;
  font-size: 12px;
  font-family: inherit;
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.15s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
.corner-btn:hover {
  color: #3730a3;
  border-color: #4338ca;
}
.corner-btn.active {
  background: rgba(67, 56, 202, 0.15);
  border-color: #4338ca;
  color: #3730a3;
}

#vw-strandBar {
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
  pointer-events: auto;
  max-width: 640px;
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(99, 102, 241, 0.12);
  border-radius: 20px;
  padding: 5px 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
}

/* ── Axis box ───────────────────────────────────────────────────────────────── */
#vw-axisBox {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 140px;
  height: 140px;
  pointer-events: none;
  z-index: 50;
  overflow: visible;
  display: none;
}
#vw-axisBox canvas {
  width: 100%;
  height: 100%;
  display: block;
}

/* ── Selection info ─────────────────────────────────────────────────────────── */
#vw-selInfo {
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 14px;
  padding: 6px 18px;
  font-size: 12px;
  color: #4338ca;
  font-weight: 600;
  pointer-events: auto;
  z-index: 50;
  display: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  white-space: nowrap;
}

/* ── Loading ────────────────────────────────────────────────────────────────── */
#vw-loading {
  display: none;
  position: absolute;
  inset: 0;
  z-index: 200;
  background: rgba(241, 245, 249, 0.85);
  backdrop-filter: blur(6px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
#vw-loading.show {
  display: flex;
}
.spin {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 3px solid rgba(67, 56, 202, 0.15);
  border-top-color: #4338ca;
  animation: vw-spin 0.8s linear infinite;
}
@keyframes vw-spin {
  to {
    transform: rotate(360deg);
  }
}
.load-txt {
  font-size: 13px;
  color: #64748b;
}
#vw-progTrack {
  width: 240px;
  height: 4px;
  background: rgba(99, 102, 241, 0.12);
  border-radius: 2px;
  overflow: hidden;
  display: none;
}
#vw-progBar {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #6366f1, #a855f7);
  border-radius: 2px;
  transition: width 0.35s ease;
}
</style>
