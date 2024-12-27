const rootDom = document.querySelector<HTMLElement>('#root')

const routes = [
    { path: '/dashboard', file: '/pages/dashboard.html' },
    { path: '/profile', file: '/pages/profile.html' },
]

function fetchContent() {
    const targetRoute = routes.find(
        (r) => r.path === globalThis.location.pathname
    )
    if (targetRoute) {
        fetch(targetRoute.file)
            .then((res) => res.text())
            .then((content) => {
                if (rootDom) {
                    rootDom.innerHTML = content
                }
            })
    }
}

globalThis.addEventListener('popstate', () => {
    fetchContent()
})

function navigateTo(event, page: string) {
    event.preventDefault()
    globalThis.history.pushState({}, '', event.target.href)
    fetchContent()
}

fetchContent()
