import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import "./layout.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <main style={{ margin: 0, padding: 0 }}>{children}</main>
    </>
  )
}

export default Layout
