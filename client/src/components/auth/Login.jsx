import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import loadingSvg from '../../assets/loading.svg'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const EMAIL_REGEX = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/

export default function Login() {
  const focus_email = useRef()
  const focus_pwd = useRef()

  const [err, setErr] = useState(null)
  const [success, setSuccess] = useState('')
  const [mountEmail, setMountEmail] = useState(true)
  const [mountPwd, setMountPwd] = useState(true)
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)

  useEffect(() => {
    !success ? focus_email.current.focus() : null
  }, [])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email)
    setValidEmail(result)
  }, [email])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd)
    setValidPwd(result)
  }, [pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const v1 = EMAIL_REGEX.test(email)
    const v2 = PWD_REGEX.test(pwd)

    if (!v1) {
      setErr('Invalid email recieved.')
      setLoading(false)
      focus_email.current.focus()
      focus_email.current.style.ouline = '2px solid red'
      return
    }
    if (!v2) {
      setErr('Invalid pwd recieved.')
      setLoading(false)
      focus_pwd.current.focus()
      focus_pwd.current.style.outline = '2px solid red'
      return
    }

    try {
      const response = await fetch(
        'http://localhost:3000/api/v1/auth/sign-in',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password: pwd,
          }),
        }
      )

      if (!response.ok) {
        setErr(`There an error ${response.status}.`)
      }
      const result = await response.json()
      console.log(result)
      console.log()

      if (result?.err_code === 'email') {
        focus_email.current.focus()
        focus_email.current.style.outline = '2px solid red'
        setValidEmail(false)
      }

      if (result?.err_code === 'password') {
        focus_pwd.current.focus()
        focus_pwd.current.style.outline = '2px solid red'
        setValidPwd(false)
      }

      if (response?.status === 400) {
        setErr(result.message)
      } else if (response?.status === 200) {
        const token = result?.token
        console.log(token)
        setSuccess('User created')
      }
    } catch (err) {
      setErr(`${err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      style={{ height: '2000px' }}
      className="min-h-screen max-h-max w-full bg-slate-100 flex justify-center items-start pt-14"
    >
      {err ? (
        <div className="absolute w-max h-max py-2 px-4 text-center border rounded right-4 top-4 bg-white text-2xl font-bold">
          <div className="text-red-600 font-bold text-center animate-pulse cursor-default">
            {err}
          </div>
        </div>
      ) : null}
      <section className="border rounded shadow-md pt-8 p-12 pb-6 pr-4 font-mono w-2/4">
        {!success ? (
          <>
            <div>
              <h1 className="font-bold text-3xl text-center mr-8">Sign-in</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-rows-1 mb-4 mt-6">
                <label htmlFor="email" className="text-lg font-bold mb-1">
                  Email:
                </label>
                <div className="flex items-center justify-between">
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value)
                      mountEmail ? setMountEmail(false) : null
                    }}
                    onFocus={(e) => {
                      e.target.style.outline = '2px solid blue'
                    }}
                    onBlur={(e) => {
                      e.target.style.outline = ''
                    }}
                    ref={focus_email}
                    aria-describedby="email-d"
                    required
                    type="email"
                    autoComplete="false"
                    id="email"
                    style={{
                      width: '90%',
                    }}
                    className="rounded-sm shadow-md outline-none py-1 px-4 text-lg"
                  />
                  {mountEmail ? null : (
                    <div
                      style={{ width: '6%' }}
                      className="flex items-center justify-center"
                    >
                      {validEmail == true ? (
                        <CheckIcon sx={{ color: 'rgb(0, 200, 0)' }} />
                      ) : (
                        <CloseIcon sx={{ color: 'rgb(200, 0, 0)' }} />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-rows-1 mb-4">
                <label htmlFor="pwd" className="text-lg font-bold mb-1">
                  Password:
                </label>
                <div className="flex items-center justify-between">
                  <input
                    onChange={(e) => {
                      setPwd(e.target.value)
                      mountPwd ? setMountPwd(false) : null
                    }}
                    onBlur={(e) => {
                      e.target.style.outline = ''
                    }}
                    onFocus={(e) => {
                      e.target.style.outline = '2px solid blue'
                    }}
                    ref={focus_pwd}
                    aria-describedby="pwd-d"
                    minLength={8}
                    required
                    type="password"
                    id="pwd"
                    style={{ width: '90%' }}
                    className="rounded-sm shadow-md outline-none py-1 px-4 text-lg"
                  />
                  {mountPwd ? null : (
                    <div
                      style={{ width: '6%' }}
                      className="flex items-center justify-center"
                    >
                      {validPwd == true ? (
                        <CheckIcon sx={{ color: 'rgb(0, 200, 0)' }} />
                      ) : (
                        <CloseIcon sx={{ color: 'rgb(200, 0, 0)' }} />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid items-center justify-center w-11/12">
                <button
                  disabled={loading ? true : false}
                  className="border rounded py-2 px-20 mt-4 shadow-md text-lg font-bold hover:shadow-xl transition-shadow active:shadow-none flex items-center gap-4 relative cursor-pointer outline-blue-700"
                >
                  Submit
                  <div className="absolute right-8">
                    {loading ? (
                      <img
                        src={loadingSvg}
                        alt="loading"
                        style={{ width: '20px', height: '20px' }}
                      />
                    ) : null}
                  </div>
                </button>
                <Link to="/sign-up">
                  <h2 className="mt-6 hover:text-blue-600">
                    Don't have an account?
                  </h2>
                </Link>
              </div>
            </form>
          </>
        ) : (
          <div className="grid gap-8 pr-8">
            <h1 className="text-center text-3xl font-bold">
              Login successfull!
            </h1>
            <div className="w-full ">
              <Link to="/home">
                <button className="w-full border rounded py-2 px-20 shadow-md text-lg font-bold hover:shadow-xl transition-shadow active:shadow-none cursor-pointer text-center bg-green-100">
                  Home
                </button>
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
