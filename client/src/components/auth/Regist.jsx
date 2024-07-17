import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import loadingSvg from '../../assets/loading.svg'
import { useEffect, useRef, useState } from 'react'
import Redirect from 'react-router-dom'

const EMAIL_REGEX = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/

export default function Registr() {
  const focus_email = useRef()
  const focus_pwd = useRef()
  const focus_confirm = useRef()

  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')
  const [mountEmail, setMountEmail] = useState(true)
  const [mountPwd, setMountPwd] = useState(true)
  const [mountSubmit, setMountSubmit] = useState(true)
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [focusEmail, setFocusEmail] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [focusPwd, setFocusPwd] = useState(false)

  const [submit, setSubmit] = useState('')
  const [validSubmit, setValidSubmit] = useState(false)
  const [focusSubmit, setFocusSubmit] = useState(false)

  console.log(err)

  useEffect(() => {
    focus_email.current.focus()
  }, [])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email)
    setValidEmail(result)
  }, [email])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd)
    setValidPwd(result)
  }, [pwd])

  useEffect(() => {
    if (pwd.length < 1) {
      return setValidSubmit(false)
    }
    const result = pwd === submit
    setValidSubmit(result)
  }, [submit])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const v1 = EMAIL_REGEX.test(email)
    const v2 = PWD_REGEX.test(pwd)
    const v3 = pwd === submit

    if (!v1) {
      setErr('Invalid email recieved.')
      setLoading(false)
      focus_email.current.focus()
      return
    }
    if (!v2) {
      setErr('Invalid pwd recieved.')
      setLoading(false)
      focus_pwd.current.focus()
      return
    }
    if (!v3) {
      setErr('Invalid password submition.')
      setLoading(false)
      focus_confirm.current.focus()
      return
    }

    try {
      const response = await fetch(
        'http://localhost:3000/api/v1/auth/sign-up',
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

      if (response?.status !== 200) {
        setErr(result.message)
      } else if (response?.status === 200) {
        setErr('')
        setSuccess('User created')
        focus_email.current.value = ''
        focus_pwd.current.value = ''
        focus_confirm.current.value = ''
        setMountEmail(true)
        setMountPwd(true)
        setMountSubmit(true)
      }
    } catch (err) {
      setErr(`${err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen max-h-max w-full bg-slate-100 flex justify-center items-start pt-20">
      <section className="border rounded shadow-md pt-8 p-12 pr-4 font-mono w-2/4">
        <div className="">
          <h1 className="font-bold text-3xl">Sign-up</h1>
          {err ? (
            <h1 className="text-red-600 mt-2 font-bold underline animate-pulse">
              {err}
            </h1>
          ) : null}
          {success ? (
            <h1 className="text-green-600 mt-2 font-bold underline animate-pulse">
              {success}
            </h1>
          ) : null}
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
                ref={focus_email}
                aria-describedby="email-d"
                required
                type="email"
                autoComplete="true"
                id="email"
                style={{ width: '90%' }}
                className="rounded-sm shadow-sm outline-none py-1 px-4 text-lg"
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
                ref={focus_pwd}
                aria-describedby="pwd-d"
                minLength={8}
                required
                type="password"
                id="pwd"
                style={{ width: '90%' }}
                className="rounded-sm shadow-sm outline-none py-1 px-4 text-lg"
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
          <div className="grid grid-rows-1 mb-4">
            <label htmlFor="confirm" className="text-lg font-bold mb-1">
              Confirm password:
            </label>
            <div className="flex items-center justify-between">
              <input
                onChange={(e) => {
                  setSubmit(e.target.value)
                  mountSubmit ? setMountSubmit(false) : null
                }}
                ref={focus_confirm}
                aria-describedby="pwd-d"
                minLength={8}
                required
                type="password"
                id="confirm"
                style={{ width: '90%' }}
                className="rounded-sm shadow-sm outline-none py-1 px-4 text-lg"
              />
              {mountSubmit ? null : (
                <div
                  style={{ width: '6%' }}
                  className="flex items-center justify-center"
                >
                  {validSubmit == true ? (
                    <CheckIcon sx={{ color: 'rgb(0, 200, 0)' }} />
                  ) : (
                    <CloseIcon sx={{ color: 'rgb(200, 0, 0)' }} />
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center w-11/12">
            <button
              disabled={loading ? true : false}
              className="border rounded py-2 px-20 mt-4 shadow-md text-lg font-bold hover:shadow-xl transition-shadow active:shadow-none flex items-center gap-4 relative cursor-pointer"
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
          </div>
        </form>
      </section>
    </main>
  )
}
