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

<!-- <div class="w-full flex justify-center">
  <h1>Hi, I'm Petr</h1>
  <p>I'm a developer and this is what I've done.</p>
</div> -->
<div class="container mx-auto flex flex-col items-start md:flex-row">
  <div class="ml-0 md:ml-12 lg:w-2/3 sticky">
    <div class="container mx-auto w-full h-full">
      <div class="relative wrap overflow-hidden h-full">
        <div
          class="border-2-2 border-yellow-555 absolute h-full border"
          style="right: 50%; border: 2px solid #FFC100; border-radius: 1%;"
        />
        <div
          class="border-2-2 border-yellow-555 absolute h-full border"
          style="left: 50%; border: 2px solid #FFC100; border-radius: 1%;"
        />

        {#each posts as post, i}
          <a href="/post/{post.slug}" style="block">
            <div
              class="mb-8 flex justify-between w-full items-center {i % 2 === 0
                ? 'flex-row-reverse left-timeline'
                : 'right-timeline'} "
            >
              <div class="order-1 w-5/12" />
              <div
                class="order-1 w-5/12 px-1 py-4 {i % 2 === 0
                  ? 'text-right'
                  : 'text-left'}"
              >
                <p class="mb-3 text-base text-yellow-300">1-6 May, 2021</p>
                <h4 class="mb-3 font-bold text-lg md:text-2xl">
                  {post.title}
                </h4>
                <p
                  class="text-sm md:text-base leading-snug text-gray-50 text-opacity-100"
                >
                  {post.excerpt}
                </p>
              </div>
            </div>
          </a>
        {/each}
      </div>
      <img
        class="mx-auto -mt-36 md:-mt-36"
        src="https://user-images.githubusercontent.com/54521023/116968861-ef21a000-acd2-11eb-95ac-a34b5b490265.png"
      />
    </div>
  </div>
</div>
