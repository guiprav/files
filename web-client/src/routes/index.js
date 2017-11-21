let routes = [
  { route: '', redirect: 'home' },
  { route: 'auth', moduleId: 'auth', title: 'Auth' },
  { route: 'home', moduleId: 'home', title: 'Home' },
];

routes.forEach(x => {
  if (!x.moduleId) {
    return;
  }

  x.moduleId = `routes/${x.moduleId}`;
});

export default routes;
