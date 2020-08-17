import React from "react";
import { Link } from "gatsby";

import Layout from "../components/Layout";
import Image from "../components/Image";
import SEO from "../components/Seo";

const IndexPage = () => (
  <Layout>
    <SEO title="Hot Potato!" />
    <h1>Hot Potato!</h1>
    <p>A cookbook app for working with Markdown formatted recipes.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
);

export default IndexPage;
