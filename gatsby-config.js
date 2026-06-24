/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Daily Hop-On Hop-Off Shuttle Across New Zealand's North Island`,
    description: `Travel between Auckland, Hamilton, Hobbiton, Tauranga and Rotorua with flexible daily departures, comfortable transport and the freedom to explore at your own pace.`,
    author: `@gatsbyjs`,
    siteUrl: `https://nextbus.co.nz/`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
