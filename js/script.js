  // Mobile menu toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.mobile-menu a').forEach(a=>{
    a.addEventListener('click', ()=> mobileMenu.classList.remove('open'));
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  revealEls.forEach(el=>io.observe(el));

  // Gallery filter
  const tabs = document.querySelectorAll('.tab-btn');
  const items = document.querySelectorAll('.masonry-item');
  tabs.forEach(tab=>{
    tab.addEventListener('click', ()=>{
      tabs.forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      items.forEach(item=>{
        if(filter === 'all' || item.dataset.cat === filter){
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  let currentIndex = 0;

  function getVisibleItems(){
    return Array.from(items).filter(i=>!i.classList.contains('hidden'));
  }
  function openLightbox(index){
    const visible = getVisibleItems();
    currentIndex = index;
    const img = visible[currentIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
  }
  items.forEach((item)=>{
    item.addEventListener('click', ()=>{
      const visible = getVisibleItems();
      const idx = visible.indexOf(item);
      openLightbox(idx);
    });
  });
  lightboxClose.addEventListener('click', ()=> lightbox.classList.remove('open'));
  lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) lightbox.classList.remove('open'); });
  lightboxPrev.addEventListener('click', ()=>{
    const visible = getVisibleItems();
    currentIndex = (currentIndex - 1 + visible.length) % visible.length;
    openLightbox(currentIndex);
  });
  lightboxNext.addEventListener('click', ()=>{
    const visible = getVisibleItems();
    currentIndex = (currentIndex + 1) % visible.length;
    openLightbox(currentIndex);
  });
  document.addEventListener('keydown', (e)=>{
    if(!lightbox.classList.contains('open')) return;
    if(e.key === 'Escape') lightbox.classList.remove('open');
    if(e.key === 'ArrowLeft') lightboxPrev.click();
    if(e.key === 'ArrowRight') lightboxNext.click();
  });

  // Header background on scroll (subtle)
  const header = document.querySelector('header');
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 40){
      header.style.boxShadow = '0 8px 24px -16px rgba(51,63,39,.4)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
