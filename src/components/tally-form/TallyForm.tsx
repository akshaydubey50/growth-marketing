"use client"
import React from 'react'

export default function TallyForm() {
    const iframeStyle = {
        width: '100%',
        height: '1500px', 
        border: 'none', 
        overflow: 'hidden', 
        frameBorder: '0', 
        marginHeight: '0', 
        marginWidth: '0', 
      };
      
  return (
    <div>
    <iframe
      src="https://airtable.com/appDlJsNfch4PdzhN/shrelxTmWBjfBe2WO"
      style={iframeStyle}
      scrolling="no"
      title="Content Tools"
    ></iframe>
  </div>
    )
}
