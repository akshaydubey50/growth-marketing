import { sanityFetch } from '@/sanity/lib/fetch'
import { postsQuery } from '@/sanity/lib/queries'
import { SanityDocument } from 'next-sanity'
import React from 'react'
import Posts from './Posts'
import Canonical from '@/components/seo/Canonical'



const Page = async () => {

  const posts = await sanityFetch<SanityDocument[]>({ query: postsQuery })
  console.log("all", { posts })

  return (
    <div className='my-5 container mx-auto flex flex-col items-center'>

      <Canonical/>    
      <Posts posts={posts}/>
    </div>
  )
}

export default Page