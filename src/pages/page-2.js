import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const SecondPage = () => (
  <Layout>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <p className="text-muted mb-4 fs-5 text-start">Just post your trip once, and your request is instantly shared with trusted bus and coach operators across New Zealand. They’ll respond with their best quotes directly on our platform, so you can compare offers side by side and choose the one that suits you best — no more chasing quotes or endless phone calls.</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const Head = () => <Seo title="Page two" />

export default SecondPage
