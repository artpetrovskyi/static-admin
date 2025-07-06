# Static Site with PagesCMS

This is a simple static website hosted on **GitHub Pages**, where content is editable via [PagesCMS](https://pagescms.org/).  
The site uses `JSON` files for dynamic content and supports media like images.

---

## ✍️ Editable Content with PagesCMS

PagesCMS allows editing `JSON` files directly from the browser.  
Content is loaded at runtime from `content/*.json` files using `fetch()`.

### Example CMS Configuration (`config.yml`)
```yaml
media_folder: images

content:
  - name: hero
    label: Hero Section
    path: content/hero.json
    type: file
    fields:
      - name: title
        label: Title
        type: string
      - name: description
        label: Description
        type: rich-text
```

---

## 🚀 Deployment with GitHub Pages

This project uses the `gh-pages` npm package to deploy the site.

**Important:** `gh-pages` completely overwrites the `gh-pages` branch — so before deployment, you must fetch the existing `content/` and `images/` folders and include them in the `dist/` folder.

### Fetch Content and Images Before Deploy

Add this to your `package.json` scripts:

```json
"fetch-content": "rm -rf tmp_gh_pages && git clone --depth 1 --filter=blob:none --sparse --branch gh-pages https://github.com/underwhot/fontan.git tmp_gh_pages && cd tmp_gh_pages && git sparse-checkout set content images && cp -r content ../dist/content && cp -r images ../dist/images && cd .. && rm -rf tmp_gh_pages"
```

### Full Deployment Flow
```bash
npm run build && npm run fetch-content && gh-pages -d dist
```

---

## 📦 Loading Content via JSON

Use `fetch()` to load and replace DOM content:

```js
fetch("content/hero.json")
  .then(res => res.json())
  .then(data => {
    const title = document.getElementById("title");
    const desc = document.getElementById("description");

    title.textContent = data.title;
    desc.textContent = data.description;

    title.classList.remove("invisible");
    desc.classList.remove("invisible");
  });
```

To avoid layout shift, use utility classes like `invisible` until content is loaded.

> ⚠️ Note: This method isn't SEO-friendly because content is loaded on the client after initial page render.

---

## 🔗 Handling Relative Links on GitHub Pages

GitHub Pages hosts your site under a subdirectory, not at the domain root.  
To generate correct URLs, use:

```js
const baseUrl = import.meta.env.BASE_URL;

document.querySelector("#home-link").href = baseUrl;
document.querySelector("#contacts-link").href = baseUrl + "contacts";
```

Alternatively, hardcode full relative paths like `/fontan/contacts`.

---

## ✅ Features

- Static site with editable JSON content
- Media support (images folder)
- PagesCMS integration
- Hosted via GitHub Pages
- JSON fetch-based rendering
- Lightweight and framework-free

---

## 🛠 Requirements

- Node.js
- Git
- `gh-pages` npm package

---
