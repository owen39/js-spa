(() => {
  // pages/dashboard.ts
  var component = {
    template: `<div class="page-dashboard">
        Hello Dashboard
    </div>`,
    onMounted() {
      console.log("dashboard mounted!");
    }
  };

  // pages/profile.ts
  var component2 = {
    template: `<div class="page-profile">
        Hello Profile
        <div class="profile"></div>
    </div>`,
    onMounted() {
      console.log("profile mounted!");
      const profile = document.querySelector(".profile");
      if (profile) {
        profile.innerHTML = "loading...";
        setTimeout(() => {
          profile.innerHTML = "<div>Name: David</div><div>Email: David@gmail.com</div>";
        }, 1e3);
      }
    }
  };

  // main.ts
  var rootDom = document.querySelector("#root");
  var routes = [
    { path: "/" },
    { path: "/dashboard", component },
    { path: "/profile", component: component2 }
  ];
  function fetchContent() {
    const targetRoute = routes.find(
      (r) => r.path === globalThis.location.pathname
    );
    if (!targetRoute || !rootDom) {
      return;
    }
    const { path, component: component3 } = targetRoute;
    if (path === "/") {
      rootDom.innerHTML = "";
      return;
    }
    if (component3) {
      rootDom.innerHTML = component3.template;
      if (component3.onMounted) component3.onMounted();
    }
  }
  globalThis.addEventListener("popstate", () => {
    fetchContent();
  });
  document.addEventListener("click", (event) => {
    if (event.target && event.target instanceof HTMLAnchorElement && event.target.getAttribute("js-link") === "true") {
      event.preventDefault();
      globalThis.history.pushState({}, "", event.target.href);
      fetchContent();
    }
  });
  fetchContent();
})();
