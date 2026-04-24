// Список тегов для проектов
const WORK_TAGS = Object.freeze({
    web_technologies: "Web-technologies",
    backend: "Backend",
    frontend: "Frontend",
    cpp: "C++",
    python: "Python",
    js: "JavaScript",
    // kotlin: "Kotlin",
    SQLAlchemy: "SQLAlchemy",
    mirea: "МИРЭА",
    itmo: "ИТМО",
    learn: "Институт"
});

// Список проектов
//  + title: Название 
//  + work-link: Ссылка на проект
//  + desc: Описание проекта
//  + work_year: Дата создания проекта
//  + work_tags[]: Список тегов для проекта
const MY_WORKS = [{
        "title": "ДЗ по предмету \"Веб-технологи\"",
        "work_link": "https://github.com/Vedji/itmo-js-sem1",
        "desc": "Сборник домашних заданий по предмету \"Веб-технологии\" (1 и 2 семестр).",
        "work_year": "2026",
        "work_tags": [
            WORK_TAGS.itmo, WORK_TAGS.learn, WORK_TAGS.web_technologies, WORK_TAGS.js
        ],
    },
    {
        "title": "Мобильное приложение для чтения комиксов",
        "work_link": "https://github.com/Vedji/ComicsAppMobile",
        "desc": "Мобильное приложение, которое взаимодействует с сервером для чтения и администратирования каталога комиксов.",
        "work_year": "2025",
        "work_tags": [
            WORK_TAGS.mirea, WORK_TAGS.learn, WORK_TAGS.cpp
        ],
    },
    {
        "title": "Сайт для чтения комиксов",
        "work_link": "https://github.com/Vedji/comics_server",
        "desc": "Сайт с каталогом художественных произведений, таких как манга и комиксы. Так же на сайте есть возможность оставлять комментарии к произведениям, добавлять в избранное и реализована функциональность личного кабинета.",
        "work_year": "2024",
        "work_tags": [
            WORK_TAGS.mirea, WORK_TAGS.learn, WORK_TAGS.python, WORK_TAGS.SQLAlchemy, WORK_TAGS.backend, WORK_TAGS.frontend
        ],
    },
    {
        "title": "Procedural Programming HomeWork",
        "work_link": "https://github.com/Vedji/Procedural_Programming_HomeWork",
        "desc": "Домашние задание по процедурному программированию в МИРЭА 1 курс 1 семестр.",
        "work_year": "2021",
        "work_tags": [
            WORK_TAGS.mirea, WORK_TAGS.learn, WORK_TAGS.cpp
        ],
    }
];


function createProjectItem(_work) {
    let works_list = document.getElementById("works-list");
    // Main container for work
    let work_item = document.createElement("a");
    work_item.setAttribute("class", "works-item");
    work_item.setAttribute("href", _work.work_link);
    work_item.setAttribute("data-tags", _work.work_tags.join(","));
    // Append work year
    let work_year = document.createElement("span");
    work_year.setAttribute("class", "work-item-year")
    work_year.innerText = _work.work_year;
    work_item.appendChild(work_year);
    // Container for title, description and tags
    let item_body = document.createElement("div");
    item_body.setAttribute("class", "work-item-body");
    // Append work title to second container
    let work_title = document.createElement("h3");
    work_title.setAttribute("class", "work-item-body-title");
    work_title.innerText = _work.title;
    item_body.appendChild(work_title);
    // Append work description to second container
    let work_desc = document.createElement("p");
    work_desc.setAttribute("class", "work-item-body-desc");
    work_desc.innerText = _work.desc;
    item_body.appendChild(work_desc);
    // Appends tags to second container
    let tags = document.createElement("div");
    tags.setAttribute("class", "work-item-body-tags");
    for (let tag_info of _work.work_tags) {
        let tag = document.createElement("p");
        tag.setAttribute("class", "work-item-body-tag");
        tag.innerText = tag_info;
        tags.appendChild(tag);
    }
    item_body.appendChild(tags);
    work_item.appendChild(item_body);
    works_list.appendChild(work_item);
}

function setFilter(_tag, _btn){
    document.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.setAttribute("class", "filter-btn");
    });
    _btn.setAttribute("class", "filter-btn active");
    
    let works = document.querySelectorAll("#works-list > .works-item");
    works.forEach((item) => {
        if(_tag === null){
            item.style.display = "flex";
            return;
        }
        item.style.display = item.hasAttribute("data-tags") && item.getAttribute("data-tags").split(",").includes(_tag)  ? "flex" : "none";        
    });
}

function createFilterBar(_tags){
    let filterBar = document.getElementById("filter-bar");
    // filterBar.innerHTML = "";

    // Добавление кнопки "Все"
    let allFiltersBtn = document.createElement("button");
    allFiltersBtn.setAttribute("class", "filter-btn active");
    allFiltersBtn.innerText = "Все";
    allFiltersBtn.onclick = () => setFilter(null, allFiltersBtn);
    filterBar.appendChild(allFiltersBtn);

    // Добавление тегов
    console.log(Object.keys(_tags));
    Object.keys(_tags).forEach((key) => {
        let filter_btn = document.createElement("button");
        filter_btn.setAttribute("class", "filter-btn");
        filter_btn.innerText = _tags[key];
        filter_btn.onclick = () => setFilter(_tags[key], filter_btn);
        filterBar.appendChild(filter_btn);
    });

}

document.addEventListener(
    "DOMContentLoaded", () => {
        let worksList = document.getElementById("works-list");
        let noResult = document.getElementById("no-results");
        
        createFilterBar(WORK_TAGS);
        
        

        worksList.innerHTML = "";
        MY_WORKS.forEach((_work) => {
            createProjectItem(_work);
        })
        noResult.style.visibility = MY_WORKS.length ? "hidden" : "none";
    });