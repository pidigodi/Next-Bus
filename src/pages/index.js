import * as React from "react"
//import { Link } from "gatsby"
// import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"
//import { Button } from 'react-bootstrap';



const IndexPage = () => (
  <Layout>
    <div className={styles.textCenter}>
      <h1>
      Your trip, <b>Your way!</b>
      </h1>
      <p>
      Whether you need group transport for a corporate event, school excursion, day tour, wedding, or major sporting event, our easy-to-use booking platform connects you with trusted bus and coach operators nationwide. Simply post your trip details, and operators will send you their best offers - no need to chase quotes.
      </p>
    </div>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Charter Bus Hire New Zealand" />

export default IndexPage
