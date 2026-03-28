const menuButton = document.querySelector('.menu-button');
const sideMenu = document.getElementById('sideMenu');

menuButton.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
});

const container = document.querySelector('.sections');
const allSections = document.querySelectorAll('.sections section');

const menuLinks = document.querySelectorAll('.side-menu a');

menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (window.innerWidth <= 768) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        } else {
            container.scrollTo({
                left: targetSection.offsetLeft,
                behavior: 'smooth'
            });
        }

        sideMenu.classList.remove('active');
    });
});

allSections.forEach((section, index) => {
    const nextArrow = section.querySelector('.next-arrow');
    const prevArrow = section.querySelector('.prev-arrow');

    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            const nextSection = allSections[index + 1];
            if (!nextSection) return;

            if (window.innerWidth <= 768) {
                window.scrollTo({
                    top: nextSection.offsetTop,
                    behavior: 'smooth'
                });
            } else {
                container.scrollTo({
                    left: nextSection.offsetLeft,
                    behavior: 'smooth'
                });
            }
        });
    }

    if (prevArrow) {
        prevArrow.addEventListener('click', () => {
            const prevSection = allSections[index - 1];
            if (!prevSection) return;

            if (window.innerWidth <= 768) {
                window.scrollTo({
                    top: prevSection.offsetTop,
                    behavior: 'smooth'
                });
            } else {
                container.scrollTo({
                    left: prevSection.offsetLeft,
                    behavior: 'smooth'
                });
            }
        });
    }
});

document.addEventListener('keydown', (e) => {
    const currentScroll = container.scrollLeft;
    const sectionWidth = window.innerWidth;

    if (e.key === 'ArrowRight') {
        container.scrollBy({
            left: sectionWidth,
            behavior: 'smooth'
        });
    }

    if (e.key === 'ArrowLeft') {
        container.scrollBy({
            left: -sectionWidth,
            behavior: 'smooth'
        });
    }
});

const headerTitle = document.getElementById('headerTitle');
const sectionsList = document.querySelectorAll('.sections section');

const sectionTitles = [
    "about",
    "background",
    "works",
    "expertise",
    "contact"
];


function updateHeaderTitle() {
    let index = 0;

    if (window.innerWidth <= 768) {
        const scrollPosition = window.scrollY;

        allSections.forEach((section, i) => {
            if (scrollPosition >= section.offsetTop - 100) {
                index = i;
            }
        });
    } else {
        const scrollPosition = container.scrollLeft;
        const sectionWidth = window.innerWidth;
        index = Math.round(scrollPosition / sectionWidth);
    }

    headerTitle.textContent = sectionTitles[index];
}

window.addEventListener('scroll', updateHeaderTitle);
container.addEventListener('scroll', updateHeaderTitle);
updateHeaderTitle();