export const component = {
    onMounted() {
        console.log('mounted!')
        const profile = document.querySelector('.profile')
        if (profile) {
            profile.innerHTML = 'loading...'
            setTimeout(() => {
                profile.innerHTML = "<div>Name: David</div><div>Email: David@gmail.com</div>"
            }, 2000)
        }
    },
}