document.addEventListener('DOMContentLoaded', () => {

    /* ==== 1. Floating CTA Visibility Logic ==== */
    const fvSection = document.querySelector('.fv');
    const floatingCTA = document.getElementById('floatingCTA');

    if (fvSection && floatingCTA) {
        // Show floating CTA only after scrolling past the First View
        window.addEventListener('scroll', () => {
            const fvBottom = fvSection.getBoundingClientRect().bottom;
            if (fvBottom < 0) {
                floatingCTA.classList.add('show');
            } else {
                floatingCTA.classList.remove('show');
            }
        });
    }

    /* ==== 2. Requirements Tab Switching ==== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    /* ==== 3. FAQ Accordion Logic ==== */
    const accHeads = document.querySelectorAll('.acc-head');

    accHeads.forEach(head => {
        head.addEventListener('click', function () {
            this.classList.toggle('active');
            const body = this.nextElementSibling;

            if (body.style.maxHeight) {
                body.style.maxHeight = null;
            } else {
                body.style.maxHeight = body.scrollHeight + "px";
            }

            // Optional: Close other accordions
            accHeads.forEach(otherHead => {
                if (otherHead !== this && otherHead.classList.contains('active')) {
                    otherHead.classList.remove('active');
                    otherHead.nextElementSibling.style.maxHeight = null;
                }
            });
        });
    });

    /* ==== 4. Smooth Scroll for Anchor Links ==== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Offset for fixed header
                const headerOffset = document.querySelector('.header').offsetHeight || 60;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});
