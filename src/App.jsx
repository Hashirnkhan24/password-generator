import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [btnColor, setBtnColor] = useState(false);

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";

    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$%^&*()_+[]{}|;:,.<>?";

    for(let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select(password)
    window.navigator.clipboard.writeText(password)
    setBtnColor(!btnColor)
  }, [password, btnColor])

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <div className="w-96 p-8 bg-gray-700 shadow-md rounded-md">
          <h1 className="text-3xl font-bold text-white mb-4">Random Password Generator</h1>

          <div className="mb-4">
            <input
              type="text"
              value={password}
              placeholder="Password"
              readOnly
              ref={passwordRef}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={copyToClipboard}
              className={`mt-2 px-4 py-2 rounded-md text-white ${btnColor
                ? 'bg-blue-600'
                : 'bg-blue-500'
              } hover:bg-blue-700 focus:outline-none focus:shadow-outline`}
            >
              Copy
            </button>
          </div>

          <div className="mb-4 text-white">
            <div className="flex items-center">
              <label className="mr-2">Length:</label>
              <input
                type="range"
                min={6}
                max={50}
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full"
              />
              <span className="ml-2">{length}</span>
            </div>
          </div>

          <div className="mb-4 text-white">
            <input
              type="checkbox"
              id="numberInput"
              value={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              className="mr-2"
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="mb-4 text-white">
            <input
              type="checkbox"
              id="charInput"
              value={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              className="mr-2"
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
