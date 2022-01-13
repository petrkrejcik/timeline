<script context="module">
  import { gql, GraphQLClient } from 'graphql-request';

  export async function load(context) {
    const graphcms = new GraphQLClient(import.meta.env.VITE_GRAPHCMS_URL, {
      headers: {}
    });

    const query = gql`
      query PostPageQuery($slug: String!) {
        post(where: { slug: $slug }) {
          title
          date
          excerpt
          content {
            html
          }
          tags
          author {
            id
            name
          }
        }
      }
    `;

    const variables = {
      slug: context.params.slug
    };

    const { post } = await graphcms.request(query, variables);

    return {
      props: {
        post
      }
    };
  }
</script>

<script>
  import { formatDate } from '$lib/date';
  import './[slug].css';

  export let post;
</script>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<div class="container mx-auto px-4">
  <article class="flex flex-col justify-center prose">
    <h1>{post.title}</h1>
    <p class="text-yellow-300 mt-0 mb-4">
      {formatDate(new Date(post.date), [
        { month: 'short' },
        { year: 'numeric' }
      ])}
    </p>
    <p class="text-slate-400 italic my-0">{post.excerpt}</p>
    {@html post.content.html}
  </article>
</div>
