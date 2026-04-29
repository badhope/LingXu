// ============================================
// DOM 工具函数
// ============================================

export function $(selector: string): HTMLElement | null {
  return document.querySelector(selector)
}

export function $$(selector: string): HTMLElement[] {
  return Array.from(document.querySelectorAll(selector))
}

export function createElement(tag: string, props?: Record<string, any>, children?: Node[]): HTMLElement {
  const el = document.createElement(tag)
  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key === 'className') el.className = value
      else if (key === 'style') Object.assign(el.style, value)
      else if (key.startsWith('on')) el.addEventListener(key.slice(2).toLowerCase(), value)
      else el.setAttribute(key, value)
    })
  }
  children?.forEach(child => el.appendChild(child))
  return el
}

export function removeElement(el: HTMLElement): void {
  el.parentNode?.removeChild(el)
}

export function insertAfter(newEl: HTMLElement, targetEl: HTMLElement): void {
  targetEl.parentNode?.insertBefore(newEl, targetEl.nextSibling)
}

export function insertBefore(newEl: HTMLElement, targetEl: HTMLElement): void {
  targetEl.parentNode?.insertBefore(newEl, targetEl)
}

export function hasClass(el: HTMLElement, className: string): boolean {
  return el.classList.contains(className)
}

export function addClass(el: HTMLElement, className: string): void {
  el.classList.add(className)
}

export function removeClass(el: HTMLElement, className: string): void {
  el.classList.remove(className)
}

export function toggleClass(el: HTMLElement, className: string): void {
  el.classList.toggle(className)
}

export function setStyle(el: HTMLElement, styles: Record<string, string | number>): void {
  Object.assign(el.style, styles)
}

export function getStyle(el: HTMLElement, property: string): string {
  return getComputedStyle(el).getPropertyValue(property)
}

export function getData(el: HTMLElement, key: string): string | null {
  return el.dataset[key] ?? null
}

export function setData(el: HTMLElement, key: string, value: string): void {
  el.dataset[key] = value
}

export function getOffset(el: HTMLElement): { top: number; left: number } {
  const rect = el.getBoundingClientRect()
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset,
  }
}

export function getScrollTop(): number {
  return window.pageYOffset || document.documentElement.scrollTop
}

export function setScrollTop(value: number): void {
  window.scrollTo({ top: value, behavior: 'smooth' })
}

export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function scrollToElement(el: HTMLElement, offset = 0): void {
  const top = getOffset(el).top + offset
  window.scrollTo({ top, behavior: 'smooth' })
}
