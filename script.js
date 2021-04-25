const siteRoot = document.querySelector('site-root')

const routes = [
  {
    slug: '/',
    file: '/main.html',
    title: 'Konstantin Konovalov',
    afterLoad () {
      siteRoot
        .querySelector('#go-links')
        .addEventListener('click', () => route('#links'))

      siteRoot
        .querySelector('#go-about')
        .addEventListener('click', () => route('#about'))
    }
  },
  {
    slug: '#links',
    file: '/links.html',
    title: 'Konstantin Konovalov - social links'
  },
  {
    slug: '#about',
    file: '/about.html',
    title: 'Konstantin Konovalov - about'
  }
]

function route (slug) {
  return new Promise((resolve, _) => {
    const route = routes.find(x => x.slug.toLowerCase() === slug.toLowerCase())

    if (!slug) return

    history.pushState({}, route.title, route.slug)

    fetch(route.file)
      .then(res => res.text())
      .then(res => {
        siteRoot.innerHTML = res

        if (route.afterLoad) {
          route.afterLoad()
        }

        resolve()
      })
  })
}

route('/')
