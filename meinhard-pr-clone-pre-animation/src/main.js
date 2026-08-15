import './style.css'

const imageSources = [
  '/image4.png', '/image2.png', '/image3.png',
  '/image1.png', '/image5.png', '/image6.png',
  '/image7.png', '/image8.png', '/image9.png',
  '/image10.png', '/image11.png', '/image1.png',
  '/image3.png', '/image4.png', '/image5.png',
  '/image2.png', '/image7.png', '/image9.png'
]

const COLUMN_BASES = [7, 44, 74]
const CLUSTER_GAP = 720
const COL_STAGGER = [20, 160, 80]

const imageData = imageSources.map((src, i) => {
  const colIndex = i % 3
  const clusterIndex = Math.floor(i / 3)

  const jitterX = ((i * 17) % 12) - 6
  const jitterY = (i * 37) % 90
  const sizeVariation = (i * 53) % 110
  const speedVariation = ((i * 13) % 21) / 100

  return {
    src,
    leftPct: COLUMN_BASES[colIndex] + jitterX,
    relativeTop: 60 + clusterIndex * CLUSTER_GAP + COL_STAGGER[colIndex] + jitterY,
    width: 180 + sizeVariation,
    speed: 0.90 + speedVariation
  }
})

const gallery = document.getElementById('gallery')
const imageElements = []

if (gallery) {
  imageData.forEach((data, i) => {
    const img = document.createElement('img')
    img.src = data.src
    img.alt = `Meinhard Taxer Work ${i + 1}`
    img.className = 'gallery-item'
    img.style.width = `${data.width}px`
    gallery.appendChild(img)

    imageElements.push({
      element: img,
      leftPct: data.leftPct,
      relativeTop: data.relativeTop,
      speed: data.speed
    })
  })
}

const scrollSpacer = document.getElementById('scrollSpacer')
if (scrollSpacer && imageData.length > 0) {
  const maxRelativeTop = Math.max(...imageData.map(d => d.relativeTop))
  scrollSpacer.style.height = `${maxRelativeTop + window.innerHeight + 800}px`
}

let targetScroll = window.scrollY
let currentScroll = window.scrollY
const ease = 0.085

window.addEventListener('scroll', () => {
  targetScroll = window.scrollY
}, { passive: true })

function animate() {
  currentScroll += (targetScroll - currentScroll) * ease

  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight

  imageElements.forEach((item) => {
    const leftPx = (item.leftPct / 100) * screenWidth
    const yPos = screenHeight + item.relativeTop - currentScroll * item.speed
    item.element.style.transform = `translate3d(${leftPx}px, ${yPos}px, 0)`
  })

  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)

const pupil = document.getElementById('pupil')
const eyeContainer = document.getElementById('eye')

if (pupil && eyeContainer) {
  window.addEventListener('mousemove', (e) => {
    const rect = eyeContainer.getBoundingClientRect()
    const eyeCenterX = rect.left + rect.width / 2
    const eyeCenterY = rect.top + rect.height / 2

    const deltaX = e.clientX - eyeCenterX
    const deltaY = e.clientY - eyeCenterY
    const dist = Math.hypot(deltaX, deltaY)

    const maxMove = 4
    const moveX = dist > 0 ? (deltaX / dist) * Math.min(dist * 0.05, maxMove) : 0
    const moveY = dist > 0 ? (deltaY / dist) * Math.min(dist * 0.05, maxMove) : 0

    pupil.style.transform = `translate(${moveX}px, ${moveY}px)`
  })
}