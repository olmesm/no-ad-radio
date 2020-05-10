# No Ad Radio

181fm is awesome but the ads can be quite aggressive. This still plays the audio ads, but frees up the browser to display a much simpler UI.

## Local Development

```sh
nvm use

npm install

npm start
```

## Deployment

`git push` and the [github deploy actions](.github/workflows/gh-pages.yml) should handle the rest.

## Deploy Setup

We're using [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages#%EF%B8%8F-create-ssh-deploy-key) to deploy. Read the docs for setup instructions
