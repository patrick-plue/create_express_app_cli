## GENRERATE EXPRESS APP FROM THE COMMAND LINE

at least Node v.18.11.0

clone repo, cd to directory and run npm link to make it globally available

---

run npx create_express_app [directory-name] to create a directory with boilerplate code

---

It will install following dependencies

- express
- nodemon
- dotenv

It will generate a package.json with the default values

It will initalize a git directory

add this to the package json as script
"dev": "node --require dotenv/config --watch index.js",
"start": "node index.js"
