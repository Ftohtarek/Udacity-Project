# Project Structure 
- css
    > styles.css
- js
    > app.js
- img
    > imgs
- index.html

# Aim
  - Apply JavaScript conspet
  - Apply Dom Structur Rection
  - Apply High Performance Implemntation
  - Apply Basic writing and formatting syntax

# System digram
## built dynamically Navigation     
- requirment 
    + Sections 
        > select all html element Section  
        >
            const sections = document.querySelectorAll('section')
    + Nav 
        > List Container to Set dynamicall nav on it
        >  
            const navbarListElement = document.getElementById("navbar__list")
    + Fragment 
        > For High Perfomance
        >
            const navbarListFragment = document.createDocumentFragment()

- implemntaion
    ![implemntaion of dynamically Navigation](img/setNavItem.png)
    ```mermaid
    graph TD;
        setNavItem-->loopThrowSection;
        loopThrowSection-->addToFrgment;
        addToFrgment-->bulidNavItem;
        bulidNavItem-->addToFrgment;
    ```
    ```mermaid
    graph TD;
        addToFrgment-->AddToNavBar;
    ```

  + setNavItem Function    
      > Loop Throw All Sections to implement dynamic buliding then add the result to navbar
      > 
        sections.forEach(section => {
            navbarListFragment.appendChild(BulidNavItem(section))
        })
        navbarListElement.appendChild(navbarListFragment)  
  + BulidNavItem ()     
    > return with list Item 
    >   
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

## active section and nav Item when scrolling in viewport of this section
- requirment
    + scrolling Event 
        ```window.addEventListener('scroll',()=>{})```
- implemntaion
```mermaid
graph TD;
    whileScrolling-->activeSectionAndNav;
    whileScrolling-->toggleOnScrollUpIcon;
    whileScrolling-->toggleOnNavbar;
    whileScrolling-->CheckLastTimeUserScrollPage;
    activeSectionAndNav-->True;
    True-->changeActivationPosition;
    changeActivationPosition-->removeOldActivation;
    changeActivationPosition-->AddNewActivation;
    changeActivationPosition-->AssignToNewPointer;
```

