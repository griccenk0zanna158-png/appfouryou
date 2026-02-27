document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('requestModal');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.querySelector('.close-btn');
    const form = document.getElementById('requestForm');

    openBtn.addEventListener('click', () => {
        modal.classList.add('show');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.reset();
        modal.classList.remove('show');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            const counters = entry.target.querySelectorAll('.counter-number');
            counters.forEach(counter => {
                if (!counter.dataset.animated) {
                    animateValue(counter, 0, parseInt(counter.dataset.target), 2000);
                    counter.dataset.animated = 'true';
                }
            });
            
            if (entry.target.classList.contains('counter-number') && !entry.target.dataset.animated) {
                animateValue(entry.target, 0, parseInt(entry.target.dataset.target), 2000);
                entry.target.dataset.animated = 'true';
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const suffix = obj.dataset.suffix || "";
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start) + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

if (totalSlides > 0) {
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }, 5000);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
}

const ctaBtn = document.getElementById('ctaOpenModal');
if (ctaBtn) {
    const modal = document.getElementById('requestModal');
    ctaBtn.addEventListener('click', () => {
        modal.classList.add('show');
    });
}

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(faq => faq.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    }
});

const bindModalToBtn = (btnId) => {
    const btn = document.getElementById(btnId);
    const modal = document.getElementById('requestModal');
    if (btn && modal) {
        btn.addEventListener('click', () => {
            modal.classList.add('show');
        });
    }
};

bindModalToBtn('iosHeroModalBtn');
bindModalToBtn('iosCtaModalBtn');

const pricingBtns = document.querySelectorAll('.pricing-btn');
pricingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = document.getElementById('requestModal');
        if (modal) {
            modal.classList.add('show');
        }
    });
});

bindModalToBtn('androidHeroModalBtn');
bindModalToBtn('androidCtaModalBtn');

bindModalToBtn('aboutHeroModalBtn');
bindModalToBtn('aboutCtaModalBtn');

bindModalToBtn('uxHeroModalBtn');
bindModalToBtn('uxCtaModalBtn');

bindModalToBtn('teamCtaModalBtn');

const contactForm = document.getElementById('mainContactForm');
if (contactForm) {
    const privacyConsent = document.getElementById('privacyConsent');
    const submitBtn = document.getElementById('submitContactBtn');
    const successMsg = document.getElementById('formSuccessMessage');
    
    privacyConsent.addEventListener('change', (e) => {
        submitBtn.disabled = !e.target.checked;
    });

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const clearErrors = () => {
        const invalidGroups = contactForm.querySelectorAll('.form-group.invalid');
        invalidGroups.forEach(group => group.classList.remove('invalid'));
    };

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        const honeypot = document.getElementById('website').value;
        if (honeypot) return;

        let isValid = true;

        const fullName = document.getElementById('fullName');
        if (!fullName.value.trim()) {
            fullName.closest('.form-group').classList.add('invalid');
            isValid = false;
        }

        const email = document.getElementById('email');
        if (!email.value.trim() || !validateEmail(email.value)) {
            email.closest('.form-group').classList.add('invalid');
            isValid = false;
        }

        const subject = document.getElementById('subject');
        if (!subject.value) {
            subject.closest('.form-group').classList.add('invalid');
            isValid = false;
        }

        const message = document.getElementById('message');
        if (!message.value.trim()) {
            message.closest('.form-group').classList.add('invalid');
            isValid = false;
        }

        if (isValid) {
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = 'Send message';
                privacyConsent.checked = false;
                successMsg.classList.add('show');
                
                setTimeout(() => {
                    successMsg.classList.remove('show');
                }, 5000);
            }, 1500);
        }
    });

    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.closest('.form-group').classList.contains('invalid')) {
                input.closest('.form-group').classList.remove('invalid');
            }
        });
    });
}

const scrollToFormBtn = document.getElementById('scrollToFormBtn');
if (scrollToFormBtn) {
    scrollToFormBtn.addEventListener('click', () => {
        const formElement = document.querySelector('.contact-form-wrapper');
        if (formElement) {
            const yOffset = -100;
            const y = formElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }
    });
}

const cookieBanner = document.getElementById('cookieBanner');
const acceptCookiesBtn = document.getElementById('acceptCookies');
const rejectCookiesBtn = document.getElementById('rejectCookies');

if (cookieBanner && acceptCookiesBtn && rejectCookiesBtn) {
    const cookieConsent = localStorage.getItem('cookieConsent');

    if (!cookieConsent) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    const closeBanner = (status) => {
        localStorage.setItem('cookieConsent', status);
        cookieBanner.classList.remove('show');
    };

    acceptCookiesBtn.addEventListener('click', () => closeBanner('accepted'));
    rejectCookiesBtn.addEventListener('click', () => closeBanner('rejected'));
}
