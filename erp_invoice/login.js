import {supabase} from './supabase.js'
document.getElementById('loginForm').addEventListener('submit', async(e)=>{
    e.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const errorDiv = document.getElementById('errorMessage')

    try{
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if (error) throw error

        sessionStorage.setItem('userEmail', email)
        window.location.href = 'dashboard.html'
    } catch (error) {
        errorDiv.textContent = error.message
        errorDiv.style.display = 'block'
    }
})