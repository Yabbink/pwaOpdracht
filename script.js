const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

function openDrawer()
{
    drawer.open = true
}

function closeDrawer()
{
    drawer.open = false
}

const hamburger = document.querySelector('.mdc-top-app-bar__navigation-icon')

hamburger.addEventListener('click', () => {
    openDrawer()
})

const tabBarElement = document.querySelector('.mdc-tab-bar')
const tabBar = new MDCTabBar(tabBarElement);

const title = document.querySelector('.mdc-top-app-bar__title')
const item = document.querySelectorAll('.mdc-tab')
const item2 = document.querySelectorAll('.mdc-tab-indicator')
const placeholder = document.querySelectorAll('.mdc-image-list__item');
const body = document.querySelector('body')
const sheet = document.querySelector('.sheet')
const closeBtn = document.querySelector('.sheet .mdc-icon-button')
const sheetTitle = document.querySelector('.sheet .mdc-top-app-bar__title')
const sheetImg = document.querySelector('.sheet main img')

title.addEventListener('click', () => {
    item.forEach(function(element){
        element.classList.remove('mdc-tab--active')
    })
    item2.forEach(function(element){
        element.classList.remove('mdc-tab-indicator--active')
    })
    placeholder.forEach(function(element){
        element.classList.remove('hidden')
    })
})

item.forEach(function(button){
    button.addEventListener('click', () => {
        const text = button.querySelector('.mdc-tab__text-label').textContent
        placeholder.forEach(function(element){
            element.classList.add('hidden')
            if(element.classList.contains(text.toLowerCase())) {
               element.classList.remove('hidden');
            }
            element.addEventListener('click', () => {
                sheet.classList.remove('sheet-out-of-view')
            })
        })
    })
})
let altTekst = "";
placeholder.forEach(function(element){
    element.addEventListener('click', () => {
        sheet.classList.remove('sheet-out-of-view')
        body.classList.add('active')
        altTekst = element.getElementsByTagName('img')[0].alt
        sheetTitle.textContent = altTekst
        sheetImg.src = element.querySelector('img').src
        window.scrollTo({
            top: 0
        })
        const state = { page_id: 1, user_id: 1 };
        const url = location.pathname + "?" + altTekst;
        history.pushState(state, "", url);
    })
})

function back()
{
    const state = { page_id: 1, user_id: 1 };
    const url = location.pathname;
    history.pushState(state, "", url);
    sheet.classList.add('sheet-out-of-view')
    body.classList.remove('active')
}

closeBtn.addEventListener("click", () => {
    back()
})

window.addEventListener("popstate", (event) => {
    back()
});
