const rootDom = document.querySelector<HTMLElement>('#root')

const routes = [
    { path: '/', file: '' },
    { path: '/dashboard', file: '/pages/dashboard.html' },
    { path: '/profile', file: '/pages/profile.html', script: '/scripts/profile.js' },
]

function fetchContent() {
    const targetRoute = routes.find(
        (r) => r.path === globalThis.location.pathname
    )
    if (targetRoute) {
        if (targetRoute.path === '/' && rootDom) {
            rootDom.innerHTML = ''
            return
        }

        fetch(targetRoute.file)
            .then((res) => res.text())
            .then((content) => {
                if (rootDom) {
                    rootDom.innerHTML = content
                }
            })
            .then(async () => {
                if (targetRoute.script) {
                    const { component } = await import(targetRoute.script)
                    component.onMounted()
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
