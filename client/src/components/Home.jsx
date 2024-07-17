import { useEffect, useRef, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import Switch from '@mui/material/Switch'

function Home() {
  const [data, setData] = useState([])
  const [error, setError] = useState(true)
  const [loading, setLoading] = useState(true)

  const [input, setInput] = useState('')
  const input_ref = useRef()

  const get_data = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/tasks')
      if (!response.ok) {
        throw new Error(`HTTP error: Status${response.status}`)
      }
      let data = await response.json()
      setError(null)
      setData(data)
    } catch (err) {
      return console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const push_data = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: input }),
        })

        if (!response.ok) {
          throw new Error(`HTTP Error: Status ${response.status}`)
        }

        let result = await response.json()
        console.log(result)
      } catch (err) {
        return console.error(err)
      } finally {
        setInput('')
        get_data()
      }
    }
    push_data()
  }

  const handleDelete = (id) => {
    console.log(id)
    const delete_data = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/tasks', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _id: id }),
        })

        if (!response.ok) {
          throw new Error(`HTTP Error: Status ${response.status}`)
        }
        let result = await response.json()
        console.log(result)
      } catch (err) {
        return console.error(err)
      } finally {
        get_data()
      }
    }
    delete_data()
  }

  const handleEdit = (data) => {
    const edit_data = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/tasks', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name.trim(),
            _id: data._id,
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP Error: Status ${response.status}`)
        }
        let result = await response.json()
        console.log(result)
      } catch (err) {
        return console.error(err)
      } finally {
        data.e.target.contentEditable = 'false'
        get_data()
      }
    }
    edit_data()
  }

  const handleSwitch = async (data) => {
    const edit_data = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/tasks', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            completed: data.value,
            _id: data.item._id,
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP Error: Status ${response.status}`)
        }
        let result = await response.json()
        console.log(result)
      } catch (err) {
        return console.error(err)
      } finally {
        get_data()
      }
    }
    edit_data()
  }

  useEffect(() => {
    get_data()
  }, [])

  return (
    <main className="font-mono bg-slate-100 flex-col flex w-full p-20 items-center gap-12 min-h-screen max-h-max overflow-x-hidden">
      {!error ? (
        <>
          <section className="p-8 w-3/5 h-2/5 rounded border shadow-md bg-white">
            <h1 className="text-center text-2xl tracking-widest">
              Task Manager
            </h1>
            <form className="mt-6 flex" onSubmit={handleSubmit}>
              <input
                ref={input_ref}
                required
                minLength={3}
                maxLength={24}
                id="name"
                type="text"
                className="rounded-r-none rounded w-full py-1 px-3 bg-slate-200 placeholder:text-lg outline-blue-600 text-lg"
                placeholder="e.g. work"
                value={input}
                autoComplete="off"
                onChange={(e) => {
                  setInput(e.target.value)
                }}
              />
              <button
                type="submit"
                className="rounded-l-none rounded py-1 px-6 bg-blue-600 text-white tracking-wider"
              >
                Submit
              </button>
            </form>
          </section>
          <section className="w-3/5">
            {!loading ? (
              data.tasks?.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between rounded border shadow-md bg-white py-4 px-4 mb-6 hover:shadow-2xl hover:scale-100 cursor-pointer items-center transition-shadow"
                >
                  <div className="flex gap-4">
                    <Switch
                      onChange={(e) => {
                        handleSwitch({ item, value: e.target.checked })
                      }}
                      className="cursor-pointer"
                      checked={item.completed ? true : false}
                    />
                    <div
                      suppressContentEditableWarning={true}
                      className="max-w-60 grid items-center outline-none placeholder:text-black"
                      style={{
                        textDecoration: item.completed
                          ? 'line-through'
                          : 'none',
                      }}
                      onChange={(e) => {
                        item.name = e.target.value
                      }}
                      onBlur={(e) => {
                        e.target.contentEditable = 'false'
                        handleEdit({
                          name: e.target.textContent,
                          _id: item._id,
                          e,
                        })
                      }}
                      onKeyDown={(e) => {
                        e.key === 'Enter'
                          ? handleEdit({
                              name: item.name,
                              _id: item._id,
                              e,
                            })
                          : null
                      }}
                      onMouseOver={(e) => {
                        e.target.contentEditable = 'plaintext-only'
                      }}
                      // onMouseLeave={(e) => {
                      //   e.target.contentEditable = 'false'
                      // }}
                    >
                      {item.name}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div
                      className="w-8 h-8 cursor-pointer rounded-full hover:bg-slate-200 flex items-center justify-center"
                      onClick={() => {
                        handleDelete(item._id)
                      }}
                    >
                      <DeleteIcon />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1>No tasks yet.</h1>
            )}
          </section>
        </>
      ) : (
        <h1 className="text-center text-5xl">There is an error sorry.</h1>
      )}
    </main>
  )
}

export default Home
