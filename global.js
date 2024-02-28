console.log("IT’S ALIVE!");

function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}

const navLinks = $$("nav a");
const currentLink = navLinks.find(a => a.host === location.host && a.pathname === location.pathname)
currentLink?.classList.add("current");

let pages = [
	{url: "index.html", title: "Home"},
	{url: "resume.html", title: "Resume"},
	{url: "projects/index.html", title: "Projects"},
	{url: "contact/index.html", title: "Contact"},
	{url: "https://github.com/maxtkc", title: "Github"},
	// add the rest of your pages here
];

let nav = document.createElement("nav");
document.body.prepend(nav);

for (let p of pages) {
	let url = p.url;
	let title = p.title;

  const ARE_WE_HOME = document.documentElement.classList.contains("home");

  url = !ARE_WE_HOME && !url.startsWith("http") ? "../" + url : url;

  // Create link and add it to nav
  let a = document.createElement("a");
  a.href = url;
  a.textContent = title;
  a.classList.toggle("current", a.host === location.host && a.pathname === location.pathname);
  a.target = a.host !== location.host ? "_blank" : "";
  nav.append(a);
}

document.body.insertAdjacentHTML("afterbegin", `
	<label class="color-scheme">
		Theme:
		<select>
      <option value="light dark">Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
		</select>
	</label>`
);

const select = document.querySelector(".color-scheme select");

select.value = "colorScheme" in localStorage ? localStorage.colorScheme : "light dark";
document.documentElement.style.setProperty("color-scheme", select.value);

select.addEventListener("input", function (event) {
	console.log("color scheme changed to", event.target.value);
  document.documentElement.style.setProperty("color-scheme", event.target.value);
  localStorage.colorScheme = event.target.value
});
