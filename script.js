// -----------------------------------------------------------------
//  Dynamic Link Generation
// -----------------------------------------------------------------
const create_mynum = function () {
  const mynum = Math.floor(Math.random() * 10) + 1;
  let mylink = "";

  if (mynum % 2 === 1) {
    mylink = "250789";
  } else {
    mylink = "274169";
  }
  return mylink;
};

// -----------------------------------------------------------------
//  Header & Menu Generation
// -----------------------------------------------------------------
const CommonHeader = document.createElement("header");
CommonHeader.className = "header";

// Use a text logo as fallback, or the image if valid
// Modified to use a placeholder-safe structure
CommonHeader.innerHTML =
  '<div class="container">' +
  '<a href="https://gamboo.jp/" class="lab-logo-text">' +
  '<span class="lab-logo-icon">🚲</span> 遠山競輪研究所' +
  "</a>" +
  '<div class="hamburger" id="ignite">' +
  '<span class="hamburger-bar"></span>' +
  '<span class="hamburger-bar"></span>' +
  '<span class="hamburger-bar"></span>' +
  "</div>" +
  "</div>";

// Insert Header at the top of the body (Prepending)
document.body.insertBefore(CommonHeader, document.body.firstChild);

// Create Menu
const menu_list = document.createElement("section");
menu_list.className = "menu_off";

const mylink = create_mynum();

menu_list.innerHTML = `
  <div>
      <p><a href="https://gamboo.jp/">Gambooトップ</a></p>
      <p><a href="https://gamboo.jp/pages/?tid=tohyama_index_2024">研究所トップ</a></p>
      <p><a href="https://gamboo.jp/keirin/topics/?tid=tohyama-pc">競輪分析記事</a></p>
      <p><a href="https://gamboo.jp/column/view/list?mid=196801">Gambooブログ</a></p>
      <p><a href="https://gamboo.jp/pages/?tid=tohyama_bank_LP">競輪場データ集</a></p>
      <p><a href="https://gamboo.jp/web-yoso/keirin/profile/?mid=${mylink}">有料予想情報</a></p>
  </div>`;

document.body.appendChild(menu_list);

// -----------------------------------------------------------------
//  Event Listeners & Animation
// -----------------------------------------------------------------
const ignite = document.getElementById("ignite");
// Ensure we select the menu correctly regardless of initial state
const menu = menu_list;

ignite.addEventListener(
  "click",
  () => {
    ignite.classList.toggle("active");
    if (menu.classList.contains("menu_off")) {
      menu.classList.remove("menu_off");
      menu.classList.add("menu_on");
    } else {
      menu.classList.remove("menu_on");
      menu.classList.add("menu_off");
    }
  },
  false
);

document.addEventListener("DOMContentLoaded", function () {
  // Scroll Animation
  const sections = document.querySelectorAll(".main_section");
  sections.forEach((section) => {
    // Already added in HTML, but logic ensures it works
    // section.classList.add("main_section");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});
