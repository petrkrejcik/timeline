<script context="module">
  import { gql, GraphQLClient } from 'graphql-request';
  export const prerender = true;

  export async function load() {
    const graphcms = new GraphQLClient(import.meta.env.VITE_GRAPHCMS_URL, {
      headers: {}
    });

    const query = gql`
      query PostsIndex {
        posts(orderBy: date_DESC) {
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
  import { formatDate } from '$lib/date';

  export let posts;
</script>

<div class="w-full flex justify-center items-center mb-4">
  <img
    src="/static/profile-foto.jpg"
    class="mask mask-squircle"
    alt=""
    height="200"
    width="200"
  />
  <div class="">
    <h1 class="text-4xl">Hi, I'm <span class="text-yellow-300">Petr</span>.</h1>
    <p>I'm a developer and this is what I've done.</p>
    <a
      href="https://www.linkedin.com/in/petrkrejcik"
      style="block"
      target="_blank"
    >
      <div class="w-4 h-4 mt-2">
        <svg
          class=" text-gray-400 hover:text-blue-500 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
          />
        </svg>
      </div>
    </a>
  </div>
</div>
<div class="container mx-auto flex justify-center">
  <div class="ml-0 lg:w-2/3 sticky">
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
                <p class="mb-3 text-base text-yellow-300">
                  {formatDate(new Date(post.date), [
                    { month: 'short' },
                    { year: 'numeric' }
                  ])}
                </p>
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
      <!-- <img
        class="mx-auto -mt-36 md:-mt-36"
        src="https://user-images.githubusercontent.com/54521023/116968861-ef21a000-acd2-11eb-95ac-a34b5b490265.png"
      /> -->
    </div>
  </div>
</div>
