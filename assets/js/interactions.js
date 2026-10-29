/**
 * Clean vanilla JS interactions replacing proprietary Framer hydration runtime
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFAQAccordions();
  initSmoothScroll();
  initForms();
});

// 1. Mobile & Tablet Navigation Menu
function initMobileNav() {
  const menuButtons = document.querySelectorAll('[data-framer-name="Menu Button"]');
  
  menuButtons.forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const navContainer = btn.closest('nav') || document.querySelector('nav[data-framer-name="Phone"]') || document.querySelector('nav[data-framer-name="Tablet"]');
      if (navContainer) {
        navContainer.classList.toggle('nav-drawer-open');
      }
    });
  });

  // Close when clicking nav links
  const drawerLinks = document.querySelectorAll('[data-framer-name="Drawer Links"] a, [data-framer-name="Drawer"] a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('nav').forEach(nav => {
        nav.classList.remove('nav-drawer-open');
      });
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
      document.querySelectorAll('nav').forEach(nav => {
        nav.classList.remove('nav-drawer-open');
      });
    }
  });
}

// 2. FAQ Accordions
function initFAQAccordions() {
  const faqSections = document.querySelectorAll('[data-framer-name="FAQ"]');
  
  faqSections.forEach(section => {
    const rows = section.querySelectorAll('[data-framer-name="Row"]');
    
    rows.forEach((row, index) => {
      row.style.cursor = 'pointer';
      const container = row.parentElement;
      const answer = container ? container.querySelector('[data-framer-name="Answer"]') : null;
      const toggle = row.querySelector('[data-framer-name="Toggle"]');

      if (answer && toggle) {
        // Keep first open or all closed? Solvora defaults to first open
        if (index === 0) {
          container.classList.add('faq-expanded');
          answer.style.display = 'block';
          toggle.style.transform = 'rotate(0deg)';
        } else {
          container.classList.add('faq-collapsed');
          answer.style.display = 'none';
          toggle.style.transform = 'rotate(45deg)';
        }

        row.addEventListener('click', () => {
          const isExpanded = container.classList.contains('faq-expanded');
          
          if (isExpanded) {
            container.classList.remove('faq-expanded');
            container.classList.add('faq-collapsed');
            answer.style.display = 'none';
            toggle.style.transform = 'rotate(45deg)';
          } else {
            // Optional: close other items in the same section
            rows.forEach(otherRow => {
              const otherContainer = otherRow.parentElement;
              const otherAnswer = otherContainer ? otherContainer.querySelector('[data-framer-name="Answer"]') : null;
              const otherToggle = otherRow.querySelector('[data-framer-name="Toggle"]');
              if (otherContainer && otherAnswer && otherToggle && otherContainer !== container) {
                otherContainer.classList.remove('faq-expanded');
                otherContainer.classList.add('faq-collapsed');
                otherAnswer.style.display = 'none';
                otherToggle.style.transform = 'rotate(45deg)';
              }
            });

            container.classList.remove('faq-collapsed');
            container.classList.add('faq-expanded');
            answer.style.display = 'block';
            toggle.style.transform = 'rotate(0deg)';
          }
        });
      }
    });
  });
}

// 3. Smooth Anchor Scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      if (!targetId) return;
      const targetEl = document.getElementById(targetId) || document.querySelector(`[data-framer-name="${targetId}"]`);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// 4. Form Submissions
function initForms() {
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]') || form.querySelector('button');
      const originalText = submitBtn ? submitBtn.innerText : '';
      if (submitBtn) {
        submitBtn.innerText = 'Enviado com sucesso!';
        submitBtn.style.opacity = '0.85';
      }
      setTimeout(() => {
        alert('Obrigado pelo contato! Retornaremos em breve.');
        if (submitBtn) {
          submitBtn.innerText = originalText;
          submitBtn.style.opacity = '1';
        }
        form.reset();
      }, 500);
    });
  });
}
