import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/Seo";

export default function Recipes() {
  return (
    <Layout>
      <SEO title="Recipes" />
      <h1>Recipes</h1>
      <p>
        Omnis doloribus iusto occaecati laboriosam. Repellendus explicabo ut
        possimus accusantium velit labore provident voluptatibus distinctio.
        Earum modi qui quibusdam porro et. Laudantium et sit illo nulla alias
        qui voluptate. Non enim quo et molestias unde cupiditate possimus
        consequuntur.
      </p>
      <p>
        Ad consectetur et tempora ad at consequatur qui impedit animi.
        Aspernatur eum voluptas consequatur repellendus. Assumenda qui quae.
        Explicabo fugiat voluptatem. Esse ratione qui rerum ut. Ad quidem nemo.
        Excepturi ad quaerat.
      </p>
      <p>
        Eligendi assumenda placeat nihil necessitatibus. Omnis asperiores sint
        excepturi. Aut et omnis nesciunt et sed distinctio et sed. Eum magni
        dicta. Dolorem esse eaque quia porro magni minus ut aut. Molestiae
        accusantium quidem accusantium mollitia autem est vero enim.
      </p>
      <Link to="/">Home</Link>
    </Layout>
  );
}
