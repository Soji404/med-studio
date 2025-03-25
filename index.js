document.addEventListener("DOMContentLoaded", () => {

    // header
    const burgerBtn = document.getElementById("burger-btn");
    const closeBtn = document.getElementById("close-btn");
    const navMenu = document.getElementById("nav-menu");
    const dropdowns = document.querySelectorAll(".dropdown");

    if (burgerBtn && closeBtn && navMenu) {
        burgerBtn.addEventListener("click", () => {
            navMenu.classList.add("open");
        });

        closeBtn.addEventListener("click", () => {
            navMenu.classList.remove("open");
        });
    }

    if (dropdowns.length > 0) {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector("a");
            const submenu = dropdown.querySelector(".submenu");

            if (link && submenu) {
                link.addEventListener("click", (e) => {
                    if (window.innerWidth <= 1024) {
                        e.preventDefault();

                        dropdowns.forEach(d => {
                            if (d !== dropdown) {
                                d.classList.remove("open");
                            }
                        });

                        dropdown.classList.toggle("open");
                    }
                });
            }
        });

        document.addEventListener("click", (e) => {
            if (window.innerWidth <= 1024 && !e.target.closest(".dropdown")) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove("open");
                });
            }
        });
    }


    // education-info
    const educationInfo = document.querySelector('.education-info');
    const bg = document.querySelector('.education-info-bg');

    educationInfo.addEventListener('mousemove', function (e) {
        const rect = educationInfo.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = x / educationInfo.offsetWidth;
        const yPercent = y / educationInfo.offsetHeight;

        const maxOffset = 20;
        const xOffset = (xPercent - 0.5) * maxOffset * 2;
        const yOffset = (yPercent - 0.5) * maxOffset * 2;

        bg.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });

    educationInfo.addEventListener('mouseleave', function () {
        bg.style.transform = 'translate(0, 0)';
    });


    // course-payment
    const programSection = document.querySelector('.program');
    const paymentBlock = document.querySelector('.course-payment');
    const initialOffset = paymentBlock.offsetTop;
    const initialPosition = paymentBlock.getBoundingClientRect().top;

    function updatePosition() {
        const programRect = programSection.getBoundingClientRect();
        const paymentRect = paymentBlock.getBoundingClientRect();
        const programTop = programRect.top;
        const programBottom = programRect.bottom;
        const paymentTop = paymentRect.top;
        const paymentHeight = paymentRect.height;

        if (programTop <= paymentTop && programBottom >= paymentTop + paymentHeight) {
            const offset = window.scrollY - programSection.offsetTop;
            const maxOffset = programSection.offsetHeight - paymentBlock.offsetHeight;
            const translateY = Math.min(Math.max(0, offset), maxOffset);

            paymentBlock.style.transform = `translateY(${translateY}px)`;
        }
    }

    window.addEventListener('scroll', function () {
        requestAnimationFrame(updatePosition);
    });

    window.addEventListener('resize', function () {
        requestAnimationFrame(updatePosition);
    });


    // course
    const sections = document.querySelectorAll(".course-item");

    sections.forEach((section) => {
        const header = section.querySelector(".course-item-header");

        header.addEventListener("click", function () {
            if (section.classList.contains("course-active")) {
                section.classList.remove("course-active");
            } else {
                sections.forEach((s) => s.classList.remove("course-active"));
                section.classList.add("course-active");
            }
        });
    });


    // partner
    const partnersSwiper = new Swiper('.partnersSwiper', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 40
            }
        }
    });


    // пузырьки с анимацией
    const bubblesContainer = document.createElement('div');
    bubblesContainer.className = 'bubbles-container';
    document.body.appendChild(bubblesContainer);

    const bubbles = [
        {left: '15%', top: '25%', size: '80px', duration: '7s'},
        {left: '70%', top: '60%', size: '60px', duration: '9s'},
        {left: '40%', top: '70%', size: '100px', duration: '8s'},
        {left: '80%', top: '20%', size: '70px', duration: '6s'}
    ];

    bubbles.forEach((bubble, index) => {
        const el = document.createElement('div');
        el.className = 'bubble';
        el.style.left = bubble.left;
        el.style.top = bubble.top;
        el.style.width = bubble.size;
        el.style.height = bubble.size;
        el.style.animationDuration = bubble.duration;
        el.style.animationDelay = `${index}s`;
        bubblesContainer.appendChild(el);
    });

    window.addEventListener('scroll', function () {
        bubblesContainer.style.transform = `translateY(${window.pageYOffset * 0.15}px)`;
    });
});