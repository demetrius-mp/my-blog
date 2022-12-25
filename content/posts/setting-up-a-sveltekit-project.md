+++
title = "Setting up a SvelteKit project"
description = "Showing how to setup a new SvelteKit project using my favorite libraries for authentication, data validation, and more."
date = 2022-12-24
updated = 2022-12-24
slug = "setting-up-a-sveltekit-project"

[taxonomies]
tags = ["svelte", "sveltekit"]
+++

In this post, I'm going to show you how I setup all of my SvelteKit projects. You will learn about the packages I use, and why I use them.

## Initializing the project

To initialize the project, we are going to follow the [SvelteKit tutorial](https://kit.svelte.dev/docs/creating-a-project). So, first, we run the following command:

```bash
npm init svelte@next
```

Then, choose the following option:

- Skeleton project
- TypeScript
- ESLint
- Prettier

At least for now, I don't feel confident writing tests using `playwright` or `vitest`, so I just skip these options.

## Additional packages

The packages I'll show here are used for one or more of the following purposes:

- Database access
- Authentication
- Data validation (for forms or external API's)
- Styling
- Icons

### Database access

For the database access I use [`prisma`](https://github.com/prisma/prisma). I consider this library to be state of the art in terms of database related functionality in JavaScript/TypeScript.

**Prisma** handles migrations, provides a type-safe database client and an intuitive schema definition syntax.

Also, I like to use [`prisma-exclude`](https://github.com/ajmnz/prisma-exclude) for excluding fields from `prisma` queries.

### Authentication

In SvelteKit I like to use JWT based authentication. For signing and verifying the tokens, I use [`jsonwebtoken`](https://github.com/auth0/node-jsonwebtoken).

For password hashing, I use [`bcryptjs`](https://github.com/dcodeIO/bcrypt.js). I know that [`bcrypt`](https://github.com/kelektiv/node.bcrypt.js) is faster, but I had troubles using this library in the Vercel environment, so I sticked with `bcryptjs`.

### Data validation

Since we're using TypeScript, how about a type-safe data validation library? [`zod`](https://github.com/colinhacks/zod) has been my favorite library (in general) for a while. It offers type-safe validation schemas, which comes in very handy along with SvelteKit type safety for forms.

### Styling

For internal apps I usually choose [`bootstrap`](https://github.com/twbs/bootstrap), which already implements *a11y* for interactive components such as dropdowns, collapsible sections, etc.

However, for public users, [`tailwindcss`](https://github.com/tailwindlabs/tailwindcss) is definetly a better choice, due to it's ease of defining a design system. A big issue I had when using `tailwindcss` was that I couldn't find a library that implemented *a11y* for interactive components.

But, thank God (and [CaptainCodeman](https://github.com/CaptainCodeman)), this is no longer true. He developed [`svelte-headlessui`](https://github.com/CaptainCodeman/svelte-headlessui), which is a "svelte-first" (as he calls, and I agree) to the Headless UI paradigm.

### Icons

After I found about about [`unplugin-icons`](https://github.com/antfu/unplugin-icons) I see no reason for using anything else for icon sets. This package allows you to use any icon set from [`Iconify`](https://iconify.design/). I prefer using the [`Material Design Icons`](https://materialdesignicons.com/)(**WARNING**: this page loads every SVG from their library, so it might be a little slow and cause a little freezing when you open it)

## Installing everything

To install everything, we will need to run the following commands (in this example I'll use `bootstrap` as the styling system)

```sh
npm i bcryptjs bootstrap jsonwebtoken prisma-exclude zod
```

```sh
npm i -D @iconify-json/mdi prisma unplugin-icons @types/bcryptjs @types/bootstrap @types/jsonwebtoken
```

Notice that I also installed the typings for the packages that provide them (`@types/*`).

## Finally, some code

The following code will only do the final touches so that every package is integrated with SvelteKit.

### Including `bootstrap`

{% codeblock(filename="./src/routes/+layout.svelte") %}

```html,linenos,hl_lines=2 7
<script lang="ts">
  import 'bootstrap/dist/css/bootstrap.min.css';

  onMount(async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await import('bootstrap/dist/js/bootstrap.bundle');
  });
</script>

<slot></slot>
```

{% end %}

On line 1, we're importing the `CSS` stylesheet, and on line 7, we're importing the `bootstrap` js bundle, which will enable interactive components.

You may ask why I used [dynamic import](https://v8.dev/features/dynamic-import#dynamic) for the js bundle... Well, [this](https://kit.svelte.dev/faq#how-do-i-use-a-client-side-only-library-that-depends-on-document-or-window) is why.

In short, SvelteKit first renders the page on the server, but the bootstrap js bundle depends on `window`, which is only available on the browser. So, in order to only import the bundle on the browser, we use the [onMount](https://svelte.dev/docs#run-time-svelte-onmount) lifecycle function, which executes the given function when the component is mounted on the browser.

### Activating type hints for icons

{% codeblock(filename="./src/app.d.ts") %}

```ts,linenos,hl_lines=1
/// <reference types="unplugin-icons/types/svelte" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
 // interface Error {}
 // interface Locals {}
 // interface PageData {}
 // interface Platform {}
}
```

{% end %}

On line 1, we're adding a [type reference](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-reference-types-) to the `unplugin-icons` package, in order to get attribute hints.

## Next steps

I plan on doing a series on creating a complete SvelteKit app, and this is the first "episode" of the series.

On the next post, which once it is ready, will be linked here, we are going to:

- Create a prisma schema for a User model
- Create a database connection for the app
- Handle password hashing and JWT
- Use zod to create a validation schema

We will do all of this to create a Sign Up page.

If you have any suggestions or comments, please, open an issue on [this](https://github.com/demetrius-mp/my-blog) repository.
