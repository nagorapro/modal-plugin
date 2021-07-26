/*
  ---------------------------
  title: string           +
  closeble: boolean       +
  content: string         +
  width: string ('60%')   +
  destroy(): void         +
  ---------------------------
  setContent(html: string): void | PUBLIC +
  insertBefore()          +
  onClose(): void         +
  --------------------------
*/

/*
  <div class="modal-footer">
    <button type="button" class="btn btn-primary">Ok</button>
    <button type="button" class="btn btn-secondary">Cancel</button>
  </div>
*/

// Add a new appendAfter method to the global Element class
Element.prototype.appendAfter = function(element) {
  element.parentNode.insertBefore(this, this.nextSibling)
}

// This is a fake function that does nothing.
function noop() {}

function _createModalFooter(buttons = []) {
  if (buttons.length === 0) { return }

  const wrap = document.createElement('div')
  wrap.classList.add('modal-footer')

  buttons.forEach(btn => {
    const $btn = document.createElement('button')
    $btn.textContent = btn.text
    $btn.classList.add('btn', `btn-${btn.type || 'primary'}`)
    $btn.onclick = btn.handler || noop
    wrap.appendChild($btn)
  })

  return wrap
}

function _createModal(options) {
  const WIDTH = '70vw'
  const modal = document.createElement('div')
  modal.classList.add('vmodal')
  modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close="true">
      <div class="modal-window" style="width: ${options.width || WIDTH}">
        <div class="modal-header">
          <h2 class="modal-title">${options.title || ''}</h2>
          ${options.closeble ? `
          <button class="btn-close" data-close="true"></button>` : ''}
        </div>
        <div class="modal-body" data-content>
          ${options.content || ''}
        </div>
      </div>
    </div>
  `)
  const footer = _createModalFooter(options.buttons)
  footer.appendAfter(modal.querySelector('[data-content]'))
  document.body.appendChild(modal)
  return modal
}

$.modal = function(options) {
  const ANIM_SPEED = 500
  const $modal = _createModal(options)
  let closing = false
  let destroyed = false

  const modal = {
    open() {
      if (destroyed) return console.log('Modal is destroyed')
      //* !closing && $modal.classList.add('open')
      if (!closing) {
        $modal.classList.add('open')
        document.body.style.overflow = 'hidden'
      }
    },
    close() {
      $modal.classList.remove('open')
      $modal.classList.add('hidden')
      document.body.style.overflow = ''
      setTimeout(() => {
        $modal.classList.remove('hidden')
        closing = false
        if (typeof options.onClose === 'function') {
          options.onClose()
        }
      }, ANIM_SPEED)
    }
  }

  const listener = event => {
    event.target.dataset.close && modal.close()
  }

  $modal.addEventListener('click', listener)

  return Object.assign(modal, {
    destroy() {
      $modal.removeEventListener('click', listener)
      $modal.parentNode.removeChild($modal)
      destroyed = true
    },
    setContent(html) {
      $modal.querySelector('[data-content]').innerHTML = html
    }
  })
}