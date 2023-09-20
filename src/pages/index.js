import * as React from "react";
import { useEffect } from "react"
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";

import { Navbar } from "../components/Navbar";
import { Bio } from "../components/Bio"
import { CardsArea } from "../components/CardsArea";

function IndexPage( {data} ) {

  useEffect(() => {
    const curTheme = window.localStorage.getItem('theme') || 'light'
    window.localStorage.setItem('theme', curTheme)

    const whole_container = document.querySelector("html")
    const newTheme = curTheme==='light' ? 'winter' : 'night'
    whole_container.setAttribute('data-theme', newTheme)
  })

  const postsData = data.posts
  const navbarData = data.navbar

  return (
    <Helmet>
      <meta name="google-site-verification" content="_ugXUv4-9ZFkQIhcRLxyyHKcnw1eQKy6qIrko9xhsak" />
      <div className="whole_container h-full">
        <Navbar data={navbarData} />
        <div className="max-w-2xl mx-auto">
          {/* BIO */}
          <Bio />
          <article className="prose">
            <figcaption className="pl-8 mt-4">{`총 ${postsData.edges.length}개의 포스트`}</figcaption>
          </article>
          <CardsArea data={postsData.edges} />
        </div>
      </div>
    </Helmet>
  );
}

export default IndexPage;

export const pageQuery = graphql`
  query MyQuery {
    posts: allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
      edges {
        node {
          frontmatter {
            date
            title
            slug
            tags
          }
          excerpt
        }
      }
    }
    navbar: allMarkdownRemark {
      distinct(field: {frontmatter: {category: SELECT}})
    }
  }
`
