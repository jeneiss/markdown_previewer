import React, { useState, useEffect } from 'react'
import marked from 'marked'
import DOMPurify from 'dompurify'

import './App.css'

function App() {
  const initialText = `
# Welcome to Let There be Markdown
## The Markdown previewer touched by the hand of God
In the words of MichelAngelo:
>I did it for the money

If you need in-depth help, you can find Github's Markdown guide [here](https://guides.github.com/features/mastering-markdown/)

Here's a crash course for the basics:

**Inline code**: \`<div>Hello, world</div>\`

**And this is a code block**:
\`\`\`
<div>Hey</div>
<p>If I point my finger at you, you will become divine</p>
<p>Hey, come back</div>
\`\`\`
**A list of things you can do with this previewer**:
* Preview Markdown
* Markdown preview
* *Achieve divine inspiration through React* ![React logo](./logo192.png)
`

  const [editorContent, setEditorContent] = useState(initialText)
  const [previewContent, setPreviewContent] = useState('')

  const handleChange = (e) => {
    setEditorContent(e.target.value)
  }

  useEffect(() => {
    setPreviewContent(marked(editorContent, {breaks: true}))
  }, [editorContent])

  const sanitize = () => {
    const sanitized = DOMPurify.sanitize(previewContent)
    return {__html: sanitized}
  }

  return (
    <div className="app">

      <div className='content__container'>
        <div className='title'>
          <h1>Let there be Markdown</h1>
        </div>

        <div className='editor'>
          <form>
            <textarea
              value={editorContent}
              onChange={handleChange}
              id='editor'
              className='editor__text-area'
            />
          </form>
        </div>

        <div className='previewer'>
          <div
            id='preview'
            dangerouslySetInnerHTML={sanitize()}
            className='previewer__text-area'
          />
        </div>
      </div>

    </div>
  )
}

export default App
