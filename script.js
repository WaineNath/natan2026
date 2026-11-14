const root = document.documentElement;
const themeToggle = document.querySelector('#theme-toggle');
const savedTheme = localStorage.getItem('natan-theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
    }
}), { threshold: 0.1 });

function observeReveals() {
    document.querySelectorAll('.menu-page.active .reveal, body[data-page="home"] .home-content .reveal').forEach(item => {
        item.classList.add('visible');
        revealObserver.unobserve(item);
    });
    document.querySelectorAll('.reveal:not(.visible)').forEach(item => revealObserver.observe(item));
}

function refreshIcons() {
    lucide.createIcons();
    observeReveals();
}

function setTheme(theme) {
    const resolvedTheme = theme === 'system' ? (systemDark.matches ? 'dark' : 'light') : theme;
    root.dataset.theme = resolvedTheme;
    if (theme === 'system') localStorage.removeItem('natan-theme');
    else localStorage.setItem('natan-theme', theme);
    themeToggle?.setAttribute('aria-label', `Tema ${theme}`);
    themeToggle?.setAttribute('title', `Tema: ${theme}`);
}
setTheme(savedTheme || 'system');
themeToggle?.addEventListener('click', () => {
    const currentMode = localStorage.getItem('natan-theme') || 'system';
    const nextMode = currentMode === 'system' ? 'light' : currentMode === 'light' ? 'dark' : 'system';
    setTheme(nextMode);
});
systemDark.addEventListener('change', event => { if (!localStorage.getItem('natan-theme')) setTheme('system'); });

const workGrid = document.querySelector('#work-grid');
function renderProjects(filter = 'all') {
    workGrid.innerHTML = portfolioData.projects.filter(project => filter === 'all' || project.category === filter).map(project => `
    <a class="work-card reveal" href="${project.url}" target="_blank" rel="noreferrer">
      <div class="work-image"><img src="${project.image}" alt="${project.title}" loading="lazy"><span class="work-arrow"><i data-lucide="arrow-up-right"></i></span></div>
      <div class="work-info"><div><span class="work-label">${project.label}</span><h3>${project.title}</h3></div><span class="work-year">${project.year}</span></div>
    </a>`).join('');
    refreshIcons();
}
renderProjects();
document.querySelectorAll('[data-count]').forEach(counter => {
    const category = counter.dataset.count;
    counter.textContent = category === 'all'
        ? portfolioData.projects.length
        : portfolioData.projects.filter(project => project.category === category).length.toString().padStart(2, '0');
});
document.querySelector('[data-stat="projects"]').textContent = `${portfolioData.projects.length}+`;
document.querySelector('[data-stat="certificates"]').textContent = portfolioData.certificates.length;
document.querySelectorAll('.filter-button').forEach(button => button.addEventListener('click', () => {
    document.querySelector('.filter-button.active')?.classList.remove('active'); button.classList.add('active'); renderProjects(button.dataset.filter);
}));

document.querySelector('#article-grid').innerHTML = portfolioData.articles.map(article => `<article class="article-card reveal"><div class="article-image"><img src="${article.image}" alt="${article.title}" loading="lazy"><span class="article-tag">FIELD NOTE</span></div><div class="article-meta"><span>${article.date}</span><span>${article.read}</span></div><h3>${article.title}</h3><a class="text-link" href="#kontak">Baca catatan <i data-lucide="arrow-up-right"></i></a></article>`).join('');

const certificateList = document.querySelector('#certificate-list');
certificateList.innerHTML = portfolioData.certificates.length
    ? portfolioData.certificates.map((certificate, index) => `<article class="certificate-row reveal"><a class="certificate-preview" href="${certificate.image}" target="_blank" rel="noreferrer" aria-label="Lihat sertifikat ${certificate.title}"><img class="certificate-image" src="${certificate.image}" alt="" loading="lazy"></a><span class="certificate-index">${String(index + 1).padStart(2, '0')}</span><div class="certificate-details"><h3>${certificate.title}</h3><p>${certificate.issuer}</p><p class="certificate-description">${certificate.detail}</p></div><span class="certificate-year">${certificate.year}</span></article>`).join('')
    : '<p class="empty-state">Dokumentasi sertifikat belum tersedia.</p>';
const gallery = portfolioData.projects.slice(0, 5);
document.querySelector('#contact-gallery').innerHTML = gallery.map(project => `<a href="${project.url}" target="_blank" rel="noreferrer"><img src="${project.image}" alt="${project.title}" loading="lazy"></a>`).join('');
refreshIcons();

const navLinks = [...document.querySelectorAll('.nav-link, .mobile-nav-link')];
const menuPages = [...document.querySelectorAll('.menu-page')];

function activatePage(pageId, updateHash = true) {
    const validPage = menuPages.some(page => page.id === pageId) ? pageId : 'home';
    menuPages.forEach(page => page.classList.toggle('active', page.id === validPage));
    document.body.dataset.page = validPage;
    navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${validPage}`;
        link.classList.toggle('active', isActive);
        if (isActive) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
    });
    if (updateHash && window.location.hash !== `#${validPage}`) history.pushState(null, '', `#${validPage}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    observeReveals();
}

document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
    const pageId = link.getAttribute('href').slice(1);
    if (menuPages.some(page => page.id === pageId)) {
        event.preventDefault();
        activatePage(pageId);
    }
}));
const syncPageFromHash = () => activatePage(window.location.hash.slice(1) || 'home', false);
window.addEventListener('popstate', syncPageFromHash);
window.addEventListener('hashchange', syncPageFromHash);
activatePage(window.location.hash.slice(1) || 'home', false);
observeReveals();