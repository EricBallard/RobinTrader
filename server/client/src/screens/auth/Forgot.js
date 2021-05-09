import { useState } from 'react'
import axios from 'axios'

/* Styles */
import '../../styles/auth.css'

import CachedImage from '../../components/CachedImage'

/* Component */
const Forgot = ({ history }) => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const forgotHandler = async (e) => {
        e.preventDefault()
        const config = { header: { 'Content-Type': 'application/json', }, }

        try {
            const { data } = await axios.post('/api/auth/forgot', { email }, config)
            setSuccess(data.data)
        } catch (error) {
            setEmail('')

            setError(error.response.data.error)
            setTimeout(() => setError(''), 5000)
        }
    }

    return (
        <div className='auth-screen'>

            <div className='header'>

                {/* Name */}
                <h1 className='brand-name'>DogeTrader</h1>
            </div>

            <form className='auth-form' onSubmit={forgotHandler} >

                <h3 className='form-title'>Forgot Password</h3>

                {error && <span className='error-message'>{error}</span>}
                {success && <span className='success-message'>{success}</span>}


                <div className='form-group'>
                    <p className='forgot-info'>
                        Please enter the email address you register your account with.
                        We will send you reset password confirmation to this email
                    </p>

                    {/* Email */}
                    <label htmlFor='email'>Email:</label>

                    <input required={true} type='email' id='email' placeholder='Email address'
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                {/* Submit */}
                <button type='submit' className='form-btn btn btn-primary'>
                    Request Password Reset
                </button>

                {/* Back */}
                <CachedImage name='form-back' event={() => history.push('/login')}
                url={process.env.REACT_APP_CLOUDFRONT_URL + 'undo.png'} />

            </form>
        </div>
    )
}

export default Forgot