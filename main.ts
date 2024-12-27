import { component as dashboardComponent } from './pages/dashboard.ts'
import { component as profileComponent } from './pages/profile.ts'
import { Component } from './types.ts'

const rootDom = document.querySelector('#root')

type Route = {
    path: string
    component?: Component
}

const routes: Route[] = [
    { path: '/' },
    { path: '/dashboard', component: dashboardComponent },
    { path: '/profile', component: profileComponent },
]

function fetchContent() {
    const targetRoute = routes.find(
        (r) => r.path === globalThis.location.pathname
    )

    if (!targetRoute || !rootDom) {
        return
    }

    const { path, component } = targetRoute

    if (path === '/') {
        rootDom.innerHTML = ''
        return
    }

    if (component) {
        rootDom.innerHTML = component.template
        if (component.onMounted) component.onMounted()
    }
}

globalThis.addEventListener('popstate', () => {
    fetchContent()
})

document.addEventListener('click', (event) => {
    if (
        event.target &&
        event.target instanceof HTMLAnchorElement &&
        event.target.getAttribute('js-link') === 'true'
    ) {
        event.preventDefault()
        globalThis.history.pushState({}, '', event.target.href)
        fetchContent()
    }
})

fetchContent()
