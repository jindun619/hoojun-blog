import * as React from "react"
import { useEffect } from "react"
import { graphql, Link } from "gatsby"

import { Navbar } from "../../components/Navbar";
import { TagBtn } from "../../components/TagBtn"
import { Bio } from "../../components/Bio"
import { Footer } from "../../components/Footer"
import { Comment } from "../../components/Comment"

export default function BlogPostTemplate({data}) {
  useEffect(() => {
    // FADE IN TRANSITION
    const fadeInTransition = document.querySelector(".fadeInTransition")
    fadeInTransition.classList.remove("opacity-0")
  })

  // SETTING THEME
  const systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'winter'
  const curTheme = window.localStorage.getItem('theme') || systemTheme
  document.querySelector("html").setAttribute('data-theme', curTheme)
  window.localStorage.setItem('theme', curTheme)
  
  const postData = data.post
  const navbarData = data.navbar

  
  const { frontmatter } = postData
  const { html } = postData
  
  const tags = frontmatter.tags.map((node) => (
    <Link key={node} to={`/tag=${node}`} style={{textDecoration: 'none'}}>
      <TagBtn name={node}/>
    </Link>
  ))

  const references = frontmatter.references.map((node) => (
    <div key={node}><a className="link">{node}</a></div>
  ))
  
  return (
    <div className="whole_container h-full">
      <Navbar data={navbarData} />
      <div className="max-w-2xl pt-16 mx-auto px-4 md:px-0 opacity-0 fadeInTransition">
        <article className="prose">
          <header>
            <h1>{frontmatter.title}</h1>
            <p>{frontmatter.date}</p>
            <div>{tags}</div>
          </header>
          <div
            dangerouslySetInnerHTML={{ __html: html }}
            className="mdSyntax pb-8 border-b-2"
          />
          <div className={frontmatter.references.length !== 0 ? "border-b-2 pb-8" : ""}>
            <h2>{frontmatter.references.length !== 0 ? "참고" : ""}</h2>
            {references}
          </div>
        </article>
        <div className="pt-8 pb-16">
          <Bio />
        </div>
        <Comment repo="jindun619/blog-comments" title={frontmatter.title} />
        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
query MyQuery($id: String!) {
  post: markdownRemark(id: { eq: $id }) {
    frontmatter {
      date
      tags
      title
      references
      slug
    }
    html
  }
  navbar: allMarkdownRemark {
    distinct(field: {frontmatter: {category: SELECT}})
  }
}
`