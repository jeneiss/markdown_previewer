import React, { useState, useEffect } from 'react'
import marked from 'marked'
import DOMPurify from 'dompurify'

import './App.css'

function App() {
  const initialText = 'intial text'
  const [editorContent, setEditorContent] = useState(initialText)
  const [previewContent, setPreviewContent] = useState('')

  const handleChange = (e) => {
    setEditorContent(e.target.value)
  }

  useEffect(() => {
    setPreviewContent(marked(editorContent))
  }, [editorContent])

  const sanitize = () => {
    const sanitized = DOMPurify.sanitize(previewContent)
    return {__html: sanitized}
  }

  return (
    <div className="App">

      <div className='editor__container'>
        <form>
          <textarea
            value={editorContent}
            onChange={handleChange}
            id='editor'
          />
        </form>
      </div>

      <div
        id='preview'
        dangerouslySetInnerHTML={sanitize()}
      />
    </div>
  );
}

export default App
