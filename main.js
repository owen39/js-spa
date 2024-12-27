var rootDom = document.querySelector('#root');
var routes = [
    { path: '/dashboard', file: '/pages/dashboard.html' },
    { path: '/profile', file: '/pages/profile.html' },
];
function fetchContent() {
    var targetRoute = routes.find(function (r) { return r.path === globalThis.location.pathname; });
    if (targetRoute) {
        fetch(targetRoute.file)
            .then(function (res) { return res.text(); })
            .then(function (content) {
            if (rootDom) {
                rootDom.innerHTML = content;
            }
        });
    }
}
globalThis.addEventListener('popstate', function () {
    fetchContent();
});
function navigateTo(event, page) {
    event.preventDefault();
    globalThis.history.pushState({}, '', event.target.href);
    fetchContent();
}
fetchContent();
