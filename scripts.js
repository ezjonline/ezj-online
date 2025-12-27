// Dynamic typing/erasing text effect
const dynamicTextElement = document.getElementById('dynamic-text');
if (dynamicTextElement) {
  const words = [
    'Online',
    'Automatically',
    'Effortlessly',
    'Intelligently',
    'Globally',
    'Strategically',
    'Systematically',
    'Intentionally',
    'Profitably',
    'Sustainably'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeText() {
    const currentWord = words[wordIndex];
    let speed = 100;

    if (isDeleting) {
      dynamicTextElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      // Deletion speed: ~0.8s total for average word (800ms / ~10 chars = 80ms per char)
      speed = 80;
    } else {
      const currentChar = currentWord[charIndex];
      dynamicTextElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      // Typing speed: ~1.2s total for average word (1200ms / ~10 chars = 120ms per char)
      speed = 120;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 2000; // Pause to read the word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 500; // Brief pause before typing next word
    }

    setTimeout(typeText, speed);
  }

  // Start the typing effect
  typeText();
}

// Smooth scroll for in-page anchors
document.addEventListener('click', (e) => {
  const target = e.target.closest('a[href^="#"]');
  if (!target) return;
  const hash = target.getAttribute('href');
  if (hash.length > 1) {
    const el = document.querySelector(hash);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

// Header scroll effect with debouncing
const header = document.querySelector('.site-header');
const heroSection = document.querySelector('.section-hero');
if (header && heroSection) {
  let ticking = false;
  const handleScroll = () => {
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    if (window.scrollY > heroBottom - 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });
  handleScroll(); // Check initial state
}


