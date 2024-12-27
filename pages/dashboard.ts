import { Component } from '../types.ts'

export const component: Component = {
    template: `<div class="page-dashboard">
        Hello Dashboard
    </div>`,
    onMounted() {
        console.log('dashboard mounted!')
    },
}
