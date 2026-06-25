import { ref, onMounted, onUnmounted, watch } from 'vue'

/**
 * v-observe directive: triggers 'visible' class when element enters viewport
 * Usage: <div v-observe>...</div>
 * CSS: .observe { opacity: 0; transform: translateY(24px); } .observe--visible { opacity: 1; transform: translateY(0); }
 */
export const vObserve = {
  mounted(el) {
    el.classList.add('observe')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('observe--visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    el._observe = observer
  },
  unmounted(el) {
    if (el._observe) el._observe.disconnect()
  },
}

/**
 * Composable: animated counter from 0 to target
 * Usage: const { display } = useCountUp(25, '+', 0, 2000)
 */
export function useCountUp(target, suffix = '', decimals = 0, duration = 2000) {
  const display = ref(decimals ? '0.' + '0'.repeat(decimals) + suffix : '0' + suffix)
  const started = ref(false)

  function start() {
    if (started.value) return
    started.value = true
    const startTime = performance.now()

    function update(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      const current = target * eased
      display.value = current.toFixed(decimals) + suffix
      if (progress < 1) requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
  }

  return { display, start }
}

/**
 * Composable: animated chart bar height
 * Usage: const { height, start } = useChartBar(targetHeight_px, 0, 800)
 */
export function useChartBar(target, initial = 10, duration = 800) {
  const height = ref(initial)
  const started = ref(false)

  function start() {
    if (started.value) return
    started.value = true
    const startTime = performance.now()

    function update(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      height.value = initial + (target - initial) * eased
      if (progress < 1) requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
  }

  return { height, start }
}

/**
 * Directive wrapper: starts count animation when element enters viewport
 */
export const vCountUp = {
  mounted(el, binding) {
    const {
      target = 0,
      suffix = '',
      prefix = '',
      decimals = 0,
      comma = false,
      duration = 800,
    } = binding.value || {}
    let started = false

    function fmt(n) {
      let s = n.toFixed(decimals)
      if (comma) {
        const parts = s.split('.')
        parts[0] = parseInt(parts[0]).toLocaleString('en-US')
        s = parts.join('.')
      }
      return prefix + s + suffix
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          const startTime = performance.now()

          function update(now) {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = target * eased
            el.textContent = fmt(current)
            if (progress < 1) requestAnimationFrame(update)
          }
          requestAnimationFrame(update)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    el._countObserver = observer
  },
  unmounted(el) {
    if (el._countObserver) el._countObserver.disconnect()
  },
}

/**
 * Directive: animate chart bar height on scroll
 */
export const vChartBar = {
  mounted(el, binding) {
    const targetHeight = binding.value || 150
    el.style.height = '10px'
    el.style.transition = 'none'

    let started = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          setTimeout(() => {
            el.style.transition = 'height 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            el.style.height = targetHeight + 'px'
          }, 100)
          observer.unobserve(el)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    el._chartObserver = observer
  },
  unmounted(el) {
    if (el._chartObserver) el._chartObserver.disconnect()
  },
}

/**
 * Directive: staggered entrance + looping flow for service pipeline
 */
export const vPipelineAnimate = {
  mounted(el) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('service-pipeline--animate')
          observer.unobserve(el)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    el._pipelineObserver = observer
  },
  unmounted(el) {
    if (el._pipelineObserver) el._pipelineObserver.disconnect()
  },
}

/**
 * Directive: stagger children entrance when container enters viewport
 */
export const vStagger = {
  mounted(el) {
    el.classList.add('stagger-group')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('stagger-group--visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    el._staggerObserver = observer
  },
  unmounted(el) {
    if (el._staggerObserver) el._staggerObserver.disconnect()
  },
}

export default vObserve
