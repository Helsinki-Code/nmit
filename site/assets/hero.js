(() => {
  const model = document.querySelector('[data-hero-model]');
  if (!model) return;
  const viewport = model.querySelector('.assembly-viewport');
  const scene = model.querySelector('.assembly-scene');
  const lines = [...document.querySelectorAll('.headline-line')];
  const motion = model.querySelector('.motion-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const messages = [
    ['Build a more', 'connected', 'business.'],
    ['Bring your', 'systems', 'together.'],
    ['Connect the', 'people', 'behind it.']
  ];
  let tilt = 0, yaw = 0, scale = 1, dragging = null, opener = null;
  let paused = reduced.matches, visible = true, frame = 0, lastTime = 0;
  let wordTime = 0, wordIndex = 0, transitioning = false, generation = 0;
  let elapsed = 0, manualView = false, hovered = false;
  const ambient = { yaw: 0, tilt: 0 };
  const pointerTarget = { yaw: 0, tilt: 0 };
  const pointerOffset = { yaw: 0, tilt: 0 };
  const activeAnimations = new Set();
  function animate(element, keyframes, options, retain = false) {
    const animation = element.animate(keyframes, options);
    activeAnimations.add(animation);
    return animation.finished.finally(() => {
      if (!retain) { activeAnimations.delete(animation); animation.cancel(); }
    });
  }
  const render = () => {
    // Screen-space Y rotation lets the raised blocks follow a horizontal drag.
    scene.style.transform = `scale(${scale}) rotateY(${yaw + ambient.yaw + pointerOffset.yaw}deg) rotateX(${tilt + ambient.tilt + pointerOffset.tilt}deg)`;
  };
  const resize = () => { scale = Math.min(1, (viewport.clientWidth - 40) / 450, (viewport.clientHeight - 30) / 410); render(); };
  new ResizeObserver(resize).observe(viewport);
  function choose(key, trigger) {
    opener = trigger;
    model.classList.toggle('has-explainer', Boolean(key));
    viewport.inert = Boolean(key);
    viewport.setAttribute('aria-hidden', String(Boolean(key)));
    model.querySelectorAll('[data-system], [data-open-system]').forEach(button => {
      const selected = (button.dataset.system || button.dataset.openSystem) === key;
      button.setAttribute('aria-expanded', String(selected));
      if (button.hasAttribute('data-system')) button.setAttribute('aria-pressed', String(selected));
    });
    model.querySelectorAll('[data-module]').forEach(block => block.classList.toggle('is-selected', block.dataset.module === key));
    model.querySelectorAll('.assembly-route').forEach(route => route.classList.toggle('is-selected', route.classList.contains(`route-${key}`)));
    model.querySelectorAll('[data-explainer]').forEach(board => {
      board.hidden = board.dataset.explainer !== key;
      if (!board.hidden && trigger?.hasAttribute('data-open-system')) board.focus({ preventScroll: true });
    });
    model.querySelector('.assembly-hint').hidden = Boolean(key);
    render();
  }
  model.querySelectorAll('[data-system]').forEach(button => button.addEventListener('click', () => choose(button.dataset.system, button)));
  model.querySelectorAll('[data-open-system]').forEach(button => button.addEventListener('click', event => {
    // Pointer activation is handled on release because the viewport captures drags.
    if (event.detail === 0) choose(button.dataset.openSystem, button);
  }));
  function closeBoard() {
    const previous = opener;
    choose(null, null);
    previous?.focus({ preventScroll: true });
  }
  model.querySelectorAll('.explainer-close').forEach(button => button.addEventListener('click', closeBoard));
  model.addEventListener('keydown', event => { if (event.key === 'Escape') closeBoard(); });
  async function changeHeadline() {
    const current = generation;
    transitioning = true;
    try {
      await Promise.all(lines.map((line, i) => animate(line,
        [{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(-105%)', opacity: 0 }],
        { duration: 240, delay: i * 55, easing: 'cubic-bezier(.4,0,1,1)', fill: 'forwards' }, true
      )));
      if (generation !== current) return;
      lines.forEach(line => line.getAnimations().forEach(animation => { animation.cancel(); activeAnimations.delete(animation); }));
      wordIndex = (wordIndex + 1) % messages.length;
      lines.forEach((line, i) => { line.textContent = messages[wordIndex][i]; });
      await Promise.all(lines.map((line, i) => animate(line,
        [{ transform: 'translateY(105%)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }],
        { duration: 460, delay: i * 70, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' }
      )));
    } catch { /* Pausing leaves a complete, readable headline. */ }
    finally {
      if (current === generation) transitioning = false;
    }
  }
  function tick(time) {
    const delta = lastTime ? Math.min(time - lastTime, 60) : 0;
    lastTime = time;
    if (!dragging && !model.classList.contains('has-explainer') && !manualView) {
      // A 15-second sway, kept nearly front-facing. Hover holds the idle phase.
      if (!hovered) {
        elapsed += delta;
        ambient.yaw = Math.sin(elapsed / 2400) * 4;
        ambient.tilt = Math.sin(elapsed / 3100) * 2;
      }
      const ease = 1 - Math.exp(-delta / 240);
      pointerOffset.yaw += (pointerTarget.yaw - pointerOffset.yaw) * ease;
      pointerOffset.tilt += (pointerTarget.tilt - pointerOffset.tilt) * ease;
      render();
    }
    wordTime += delta;
    if (wordTime > 6200 && !transitioning) { wordTime = 0; changeHeadline(); }
    frame = requestAnimationFrame(tick);
  }
  function updateMotion() {
    cancelAnimationFrame(frame);
    generation++;
    activeAnimations.forEach(animation => animation.cancel());
    activeAnimations.clear();
    transitioning = false;
    lastTime = 0;
    motion.textContent = paused ? 'Play motion' : 'Pause motion';
    motion.setAttribute('aria-pressed', String(paused));
    motion.disabled = reduced.matches;
    if (reduced.matches) motion.textContent = 'Motion reduced';
    if (!paused && !reduced.matches && visible && !document.hidden) frame = requestAnimationFrame(tick);
    render();
  }
  motion.addEventListener('click', () => { paused = !paused; updateMotion(); });
  reduced.addEventListener('change', () => {
    paused = reduced.matches;
    if (reduced.matches) clearOffsets();
    updateMotion();
  });
  document.addEventListener('visibilitychange', updateMotion);
  new IntersectionObserver(entries => {
    const next = entries[0].isIntersecting;
    if (visible !== next) { visible = next; updateMotion(); }
  }, { threshold: .05 }).observe(document.querySelector('.hero'));
  viewport.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') hovered = true;
  });
  viewport.addEventListener('pointerleave', () => {
    hovered = false;
    pointerTarget.yaw = 0;
    pointerTarget.tilt = 0;
  });
  viewport.addEventListener('pointerdown', event => {
    if (event.button !== 0 || !event.isPrimary) return;
    const trigger = event.target.closest('[data-open-system]');
    dragging = {
      id: event.pointerId, x: event.clientX, y: event.clientY,
      tilt: tilt + ambient.tilt + pointerOffset.tilt,
      yaw: yaw + ambient.yaw + pointerOffset.yaw, moved: false, trigger
    };
    viewport.setPointerCapture(event.pointerId);
  });
  viewport.addEventListener('pointermove', event => {
    if (!dragging) {
      if (event.pointerType !== 'mouse' || paused || reduced.matches || manualView) return;
      // Keep the actual service buttons still and easy to select.
      if (event.target.closest('[data-open-system]')) {
        pointerTarget.yaw = pointerOffset.yaw;
        pointerTarget.tilt = pointerOffset.tilt;
        return;
      }
      const bounds = viewport.getBoundingClientRect();
      pointerTarget.yaw = ((event.clientX - bounds.left) / bounds.width - .5) * 4;
      pointerTarget.tilt = -((event.clientY - bounds.top) / bounds.height - .5) * 3;
      return;
    }
    if (event.pointerId !== dragging.id) return;
    const dx = event.clientX - dragging.x, dy = event.clientY - dragging.y;
    if (!dragging.moved && Math.hypot(dx, dy) < 5) return;
    dragging.moved = true;
    manualView = true;
    clearOffsets();
    viewport.classList.add('is-dragging');
    yaw = Math.max(-22, Math.min(22, dragging.yaw + dx * .16));
    tilt = Math.max(-18, Math.min(18, dragging.tilt - dy * .12));
    render();
  });
  const release = () => { dragging = null; viewport.classList.remove('is-dragging'); };
  viewport.addEventListener('pointerup', event => {
    if (!dragging || event.pointerId !== dragging.id) return;
    const { moved, trigger } = dragging;
    release();
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    if (!moved && trigger) choose(trigger.dataset.openSystem, trigger);
  });
  viewport.addEventListener('pointercancel', release);
  viewport.addEventListener('lostpointercapture', release);
  viewport.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home'].includes(event.key)) return;
    event.preventDefault();
    yaw += ambient.yaw + pointerOffset.yaw;
    tilt += ambient.tilt + pointerOffset.tilt;
    manualView = true;
    clearOffsets();
    if (event.key === 'ArrowLeft') yaw = Math.max(-22, yaw - 4);
    if (event.key === 'ArrowRight') yaw = Math.min(22, yaw + 4);
    if (event.key === 'ArrowUp') tilt = Math.min(18, tilt + 3);
    if (event.key === 'ArrowDown') tilt = Math.max(-18, tilt - 3);
    if (event.key === 'Home') reset();
    render();
  });
  function clearOffsets() {
    ambient.yaw = ambient.tilt = pointerOffset.yaw = pointerOffset.tilt = pointerTarget.yaw = pointerTarget.tilt = 0;
  }
  function reset() {
    if (model.classList.contains('has-explainer')) closeBoard();
    tilt = 0; yaw = 0; elapsed = 0; manualView = false;
    clearOffsets();
    render();
  }
  model.querySelector('.model-reset').addEventListener('click', reset);
  resize();
  updateMotion();
  if (!reduced.matches && !paused) {
    Promise.all(lines.map((line, i) => animate(line,
      [{ transform: 'translateY(105%)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }],
      { duration: 650, delay: 100 + i * 110, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' }
    ))).catch(() => {});
    document.querySelectorAll('.hero-context,.hero-description,.hero-actions,.hero-footnote').forEach((element, i) => {
      animate(element, [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 420, delay: 240 + i * 100, easing: 'ease-out', fill: 'both' }).catch(() => {});
    });
  }
})();
