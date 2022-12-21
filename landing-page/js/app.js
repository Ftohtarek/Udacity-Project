//  Define Global Variables
const sections = document.querySelectorAll('section')
const navbarListElement = document.getElementById("navbar__list")
const navbarListFragment = document.createDocumentFragment()
const sectionsViewPort = [];
const navList = []
let oldPointer = 0;
const header = {
    nav: document.querySelector('header'),
    show: () => { header.nav.classList.remove('hide') },
    hide: () => { header.nav.classList.add('hide') },
}
const scrollUp = {
    button: document.querySelector(".scroll-up"),
    show: () => { scrollUp.button.classList.remove('hide') },
    hide: () => { scrollUp.button.classList.add('hide') },
    fire: () => { window.scroll({ top: 0, behavior: "smooth", }); },
    setEvent: () => { scrollUp.button.addEventListener('click', scrollUp.fire) }
}

// bulid nav Bar
setNavItem()
// Helper Functions
getSectionsViewPort()
// active links and section on scrolling on them
onWindowsScroll()
// active event of scrollUp icon
scrollUp.setEvent()

function setNavItem() {
    // loop in section and send section info to bulid nav item and append them in frgment then append them to real dom
    sections.forEach(section => {
        navbarListFragment.appendChild(BulidNavItem(section))
    })
    navbarListElement.appendChild(navbarListFragment)
}

function BulidNavItem(section = new HTMLElement) {
    // generate nav item and nav link
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    // set link Value From data-nav attribute in section
    link.textContent = section.getAttribute('data-nav')
    // set class menu__link to link for active style
    link.classList.add("menu__link")
    // set link Event that move to section in scroll depend on the section offset from top
    link.addEventListener('click', () => {
        section.scrollIntoView({ behavior: "smooth", });
    });
    // append link to listItem
    listItem.appendChild(link)
    navList.push(listItem)
    return listItem

}

function getSectionsViewPort() {
    // set offsetTop and Height for All section 
    sections.forEach(section => {
        sectionsViewPort.push({ offset: section.offsetTop, height: section.offsetHeight })
    })
}

function onWindowsScroll() {
    window.addEventListener('scroll', () => {
        // active Section and navlink
        activeSectionAndNav();

        // toggle in scrollUp icon if u scroll down then make it appear
        scrollY > 100 ? scrollUp.show() : scrollUp.hide()

        // i sure that when scroll appear header and send information to check after 2s if this info the same  
        header.show()
        pageLoadState(scrollY)
    })
}

function activeSectionAndNav() {
    sectionsViewPort.forEach((viewport, index) => {
        let isInViewPort = (scrollY + 150) > viewport.offset && scrollY < (viewport.offset + viewport.height) - 150
        if (isInViewPort) {
            changeActivationPosition(index)
        }
    })
}

function changeActivationPosition(newPointer) {
    // this function if there's change in pointer indicatior then change active postion to new postion
    if (oldPointer !== newPointer || oldPointer == 0) {
        navList[oldPointer].classList.remove('active')
        sections[oldPointer].classList.remove('your-active-class')
        navList[newPointer].classList.add('active')
        sections[newPointer].classList.add('your-active-class')
        oldPointer = newPointer
    }
}

function pageLoadState(oldScrollY) {
    // it's active after 2s if old distance to top still the same as know then that mean u stop scroll or load and hide navbar
    setTimeout(() => { if (scrollY == oldScrollY && scrollY > 100) { header.hide() } }, 5000)
}
