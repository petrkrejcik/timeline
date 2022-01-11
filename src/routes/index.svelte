<script context="module">
  import { gql, GraphQLClient } from 'graphql-request';
  export const prerender = true;

  export async function load() {
    const graphcms = new GraphQLClient(import.meta.env.VITE_GRAPHCMS_URL, {
      headers: {}
    });

    const query = gql`
      query PostsIndex {
        posts {
          id
          title
          slug
          date
          excerpt
        }
      }
    `;

    const { posts } = await graphcms.request(query);

    return {
      props: {
        posts
      }
    };
  }
</script>

<script>
  export let posts;
</script>

<h1>Hi, I'm Petr</h1>
<p>I'm a developer and this is what I've done.</p>
<ul>
  <li>
    {#each posts as post}
      <li>
        <a href="/post/{post.slug}">{post.title}</a>
      </li>
    {/each}
  </li>
</ul>
