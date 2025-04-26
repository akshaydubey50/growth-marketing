import React from 'react'
import ResourceList from './ResourceList'

export default function Resource() {
  const itemsPerPageCount = 12;
  return (
    <>
    <section className='max-w-screen-2xl px-4 mx-auto'>
      <ResourceList itemsCount={itemsPerPageCount} />
    </section>
    </>
  )
}
