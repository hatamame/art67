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

const CommonHeader = document.createElement("header");
CommonHeader.className = "header";
// ハンバーガーメニューの画像をdivに変更
CommonHeader.innerHTML =
  '<div class="container"><a href="https://gamboo.jp/"><img src="/images/tohyama/tohyama_index_2024/gamboo_logo.png" class="gamboo_logo"></a><div class="hamburger" id="ignite"><span class="hamburger-bar"></span><span class="hamburger-bar"></span><span class="hamburger-bar"></span></div></div>';

document.body.appendChild(CommonHeader);

const menu_list = document.createElement("section");
menu_list.className = "menu_off";

const mylink = create_mynum();

menu_list.innerHTML = `<div><p><a href = "https://gamboo.jp/" style = "color:white;">Gambooトップ</a></p><p><a href = "https://gamboo.jp/pages/?tid=tohyama_index_2024" style = "color:white;">研究所トップ</a></p><p><a href = "https://gamboo.jp/keirin/topics/?tid=tohyama-pc" style = "color:white;">競輪分析記事</a></p><p><a href = "https://gamboo.jp/column/view/list?mid=196801" style = "color:white;">Gambooブログ</a></p><p><a href = "https://gamboo.jp/pages/?tid=tohyama_bank_LP" style = "color:white;">競輪場データ集</a></p><p><a href = "https://gamboo.jp/web-yoso/keirin/profile/?mid=${mylink}" style = "color:white;">有料予想情報</a></p></div>`;

document.body.appendChild(menu_list);

const ignite = document.getElementById("ignite");
const menu = document.querySelectorAll(".menu_off, .menu_on")[0];

ignite.addEventListener(
  "click",
  () => {
    ignite.classList.toggle("active"); // ハンバーガーアイコンのアニメーション用クラス
    if (menu.classList.contains("menu_off")) {
      menu.classList.toggle("menu_on");
      menu.classList.remove("menu_off");
    } else if (menu.classList.contains("menu_on")) {
      menu.classList.toggle("menu_off");
      menu.classList.remove("menu_on");
    }
  },
  false
);

document.addEventListener("DOMContentLoaded", function () {
  // スクロール連動アニメーション
  const sections = document.querySelectorAll(".main_section");
  sections.forEach((section) => {
    section.classList.add("slide-in");
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

  // タブ切り替え機能
  if (typeof mytrans !== "function") {
    window.mytrans = function () {
      for (let mynum = 1; mynum < 10; mynum++) {
        let mysection = document.querySelectorAll(
          `[name^='section_` + mynum + `']`
        );
        if (mysection.length < 2) continue;

        const buttons = Array.from(mysection[0].children);
        const contents = Array.from(mysection[1].children);
        const texts =
          mysection.length > 2 ? Array.from(mysection[2].children) : [];

        // 初期状態でコンテンツにfade-inクラスを付与
        contents.forEach((c) => c.classList.add("fade-in"));

        buttons.forEach((button, i) => {
          button.addEventListener(
            "click",
            () => {
              buttons.forEach((btn) => (btn.style.background = "gray"));
              contents.forEach((content) => {
                content.style.display = "none";
                content.classList.remove("visible");
              });
              if (texts.length > 0)
                texts.forEach((text) => (text.style.display = "none"));

              button.style.background = "black";
              contents[i].style.display = "";
              // フェードイン効果をトリガー
              setTimeout(() => {
                contents[i].classList.add("visible");
              }, 10);

              if (texts.length > 0 && texts[i]) texts[i].style.display = "";
            },
            false
          );
        });

        // 初期表示で最初のタブをアクティブにする
        if (buttons.length > 0) {
          contents.forEach((c, index) => {
            if (index !== 0) c.style.display = "none";
          });
          setTimeout(() => {
            contents[0].classList.add("visible");
          }, 10);
        }
      }
    };
    mytrans();
  }
});
