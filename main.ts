import { component as dashboardComponent } from "./pages/dashboard.js"
import { component as profileComponent } from "./pages/profile.js"

const rootDom = document.querySelector<HTMLElement>('#root')

const routes = [
    { path: '/' },
    { path: '/dashboard', component: dashboardComponent },
    { path: '/profile', component: profileComponent },
]

function fetchContent() {
    const targetRoute = routes.find(
        (r) => r.path === globalThis.location.pathname
    )
    if (targetRoute && rootDom) {
        if (targetRoute.path === '/') {
            rootDom.innerHTML = ''
            return
        }

        if (targetRoute.component) {
            rootDom.innerHTML = targetRoute.component.template
            targetRoute.component.onMounted()
        }
    }
}

globalThis.addEventListener('popstate', () => {
    fetchContent()
})

// TODO: unbound from globalThis
globalThis.navigateTo = (event) => {
    event.preventDefault()
    globalThis.history.pushState({}, '', event.target.href)
    fetchContent()
}

fetchContent()
