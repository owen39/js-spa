export const component = {
    template: `<div class="page-profile">
        Hello Profile
        <div class="profile"></div>
    </div>`,
    onMounted() {
        console.log('profile mounted!')
        const profile = document.querySelector('.profile')
        if (profile) {
            profile.innerHTML = 'loading...'
            setTimeout(() => {
                profile.innerHTML =
                    '<div>Name: David</div><div>Email: David@gmail.com</div>'
            }, 1000)
        }
    },
}
