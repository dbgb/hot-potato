import React from "react";
import { Link } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/Seo";

const IndexPage = () => (
  <Layout>
    <SEO title="Hot Potato!" />
    <h1>Hot Potato!</h1>
    <p>A cookbook app for working with Markdown formatted recipes.</p>
    <p>
      Aperiam quisquam sed quia molestias nisi sint est quidem corporis.
      Consectetur non consectetur maiores. Qui fugiat voluptatem voluptate
      perferendis eaque. Accusamus sit et consequuntur ad. Qui alias itaque
      libero similique numquam.
    </p>
    <p>
      Eum repellendus distinctio itaque quas. Voluptatibus delectus numquam est
      repudiandae mollitia id aut ut aut. Eos laborum consectetur iure cum
      corporis. Qui et qui ut doloremque cupiditate autem sint eligendi.
      Consectetur velit eos non ratione aut. Sunt alias in accusantium sed et
      eos est. Qui nam esse cumque sed aut quia accusantium. Sint quisquam ea ea
      temporibus sapiente voluptates voluptatem itaque.
    </p>
    <Link to="/using-typescript/">"Using TypeScript in Gatsby"</Link>
  </Layout>
);

export default IndexPage;
