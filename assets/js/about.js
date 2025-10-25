// About Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all about page features
  initProfileCard();
  initFloatingOrbs();
  initInterestCards();
  initSkillBars();
  initStatsCounter();
});

// ===============================
// 1️⃣ Profile Card Flip
// ===============================
function initProfileCard() {
  const profileCard = document.getElementById('profileCard');
  const flipBackButton = document.querySelector('.flip-back');
  const skillBars = document.querySelectorAll('.skill-progress');

  if (!profileCard) return;

  // Flip card when clicked
  profileCard.addEventListener('click', () => {
    profileCard.classList.toggle('flipped');

    // Animate skill bars when showing the back
    if (profileCard.classList.contains('flipped')) {
      skillBars.forEach(bar => {
        bar.style.width = bar.getAttribute('data-width');
      });
    }
  });

  // Flip back when back button clicked
  if (flipBackButton) {
    flipBackButton.addEventListener('click', (e) => {
      e.stopPropagation();
      profileCard.classList.remove('flipped');
      skillBars.forEach(bar => bar.style.width = '0');
    });
  }
}

// ===============================
// 2️⃣ Floating Orbs Interaction
// ===============================
function initFloatingOrbs() {
  const orbs = document.querySelectorAll('.contact-orb');
  if (!orbs.length) return;

  orbs.forEach(orb => {
    orb.addEventListener('mouseenter', function() {
      this.style.opacity = '0.8';
      this.style.transform = 'scale(1.3)';
    });

    orb.addEventListener('mouseleave', function() {
      this.style.opacity = '1';
      this.style.transform = 'scale(1)';
    });

    // Click to change color
    orb.addEventListener('click', function() {
      const colors = [
        'linear-gradient(45deg, #667eea, #764ba2)',
        'linear-gradient(45deg, #f093fb, #f5576c)',
        'linear-gradient(45deg, #4facfe, #00f2fe)',
        'linear-gradient(45deg, #43e97b, #38f9d7)',
        'linear-gradient(45deg, #ff9a9e, #fecfef)'
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      this.style.background = randomColor;
    });
  });
}

// ===============================
// 3️⃣ Interest Cards Animation
// ===============================
function initInterestCards() {
  const interestCards = document.querySelectorAll('.interest-card');
  if (!interestCards.length) return;

  interestCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.interest-icon');
      icon.style.transform = 'scale(1.1) rotate(5deg)';
    });

    card.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.interest-icon');
      icon.style.transform = 'scale(1) rotate(0deg)';
    });
  });
}

// ===============================
// 4️⃣ Animate Skill Bars
// ===============================
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  if (!skillBars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => observer.observe(bar));
}

// ===============================
// 5️⃣ Smooth Stats Counter Animation
// ===============================
function initStatsCounter() {
  const counters = document.querySelectorAll(".stat-number");
  const statsSection = document.querySelector(".stats-section");
  if (!counters.length || !statsSection) return;

  const duration = 2000; // total animation time in ms (2 seconds)
  const stepTime = 10;   // update every 10ms

  const startCounting = (counter) => {
    const target = +counter.getAttribute("data-count");
    let start = 0;
    const increment = target / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        counter.innerText = target;
        clearInterval(timer);
      } else {
        counter.innerText = Math.floor(start);
      }
    }, stepTime);
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counters.forEach((counter) => startCounting(counter));
          observer.unobserve(statsSection); // run only once
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(statsSection);
}
