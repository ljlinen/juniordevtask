import { useState } from 'react'

export default function Home() {

  const [response, setRespose] = useState()
  const [isLoading, setIsLoading] = useState()

  const [formData, setFormData] = useState({
    url: undefined,
    email: undefined
  });

  const onChange = (value, key) => {
    if(value && value !== '') {
      setFormData((prev) => ({...prev, [key]: value}))
    } else {
      setFormData((prev) => ({...prev, [key]: undefined}))
    }
  }

  const handleClick = async() => {

    if(!formData.email || !formData.url) {
      setRespose({success: false, message: 'please fill in all required inputs'});
      return
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/junior-dev' + '?url=' + formData.url + '&email=' + formData.email)
      
      if(response.ok) {
        const responseObjStr = await response.json();
        const responseObj = JSON.parse(responseObjStr);
        setRespose({success: true, data: responseObj})
      } else {
        setRespose({success: false, message: "status code: " + response.status})
      }
    } catch (error) {
      console.log(error)
      setRespose({success: false, message: error.message})
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <header>
      <div className="preview">
          <h3>Test Api Endpoint</h3>
          <p>{isLoading && 'Loading...'}{response?.success ? 'Response: ' + response?.data?.message : response ? 'Request Failed. Reaon: ' + response?.message : 'Provide Required Details to Test Your Endpoint'}</p>
          {
            response?.data ? 
            <>
            <p>Raw Json Response</p>
            <code>
              {response.data}
            </code>
            </> : null
          }
      </div>
      <form method="post">
        <div className="inputs">
          <div className={`input ${formData.url ? 'filled' : ''}`}>
            <label htmlFor="">url to test</label>
              <input type="url" name='url' onChange={(e) => onChange(e.target.value, 'url')} />
          </div>
          <div className={`input ${formData.email ? 'filled' : ''}`}>
            <label htmlFor="email">email</label>
            <div className="input-wrap">
              <input type="email" name="email" onChange={(e) => onChange(e.target.value, 'email')} />
            </div>
          </div>
        </div>
        <input type="button" value={isLoading ? 'Loading...' : "Test Endpoint"} onClick={handleClick} />
      </form>
    </header>
  )
}
