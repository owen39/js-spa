const rootDom = document.querySelector('#root');
const routes = [
    { path: '/', file: '' },
    { path: '/dashboard', file: '/pages/dashboard.js' },
    { path: '/profile', file: '/pages/profile.js' },
];
function fetchContent() {
    const targetRoute = routes.find((r) => r.path === globalThis.location.pathname);
    if (targetRoute) {
        if (targetRoute.path === '/' && rootDom) {
            rootDom.innerHTML = '';
            return;
        }
        import(targetRoute.file).then(({ component }) => {
            if (rootDom) {
                rootDom.innerHTML = component.template;
                component.onMounted();
            }
        });
    }
}
globalThis.addEventListener('popstate', () => {
    fetchContent();
});
// TODO: unbound from globalThis
globalThis.navigateTo = (event) => {
    event.preventDefault();
    globalThis.history.pushState({}, '', event.target.href);
    fetchContent();
};
fetchContent();
