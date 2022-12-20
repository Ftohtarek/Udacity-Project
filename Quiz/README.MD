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
        > Section NO    // To Detect No of Nav Item
          Section HtmlElements
    + Section metaData
        > name (data-nav)
    + Nav 
      > List Container to Set dynamicall nav on it
    + Fragment 
      > For High Perfomance

    - implemntaion
    - ![implemntaion of dynamically Navigation](img/setNavItem.png)
      * setNavItem()    
          > Loop Throw Sections  
      * BulidNavItem ()     
          > return with bulid list Item  
          > 
            + add returned Item To Fragment 
            + then Add Fragment To Nav Container

## active section and nav Item when scrolling in viewport of this section
    - requirment
        - section position 
        - real position while Scrolling
        - navItems
        - Sections
    
    implemntaion 
        --> getSectionsViewPort() -----------> loop IN Section and return with object contain required info of viewport 
                                                {offsetTop,offsetHight} add it to SectionsViewPort[]
        --> oldPointer //refer to Active Element Number ------------------------------\___
        --> onWindowsScroll()                                                             |
            --> addEventScroll()                                                          |
                --> activeSectionAndNav()                                                 |
                    -->loop Throw sectionsViewPort to detect which section Iam in         |
                        -->changeActivationPosition(NewPointer)                           |
                            newPointer isEqual(oldPointer) _______________________________|      
                                                |
        sectionNotChange Do Nothin<--\___true___|___false____/----->\___ 
                                                                        |
                                                                        |__/--> add active [newPointer]  
                                                                        |__/--> remove active [oldPointer]  
                                                                        |__/--> oldPointer assign [newPointer]  


    3-
        - Proplem
            - add arrow scroll up when u scroll down

        - requirment 
            - scrollUp button 
            - method to hide and show and active event on click
        
        - implementaion
            - scrollUpObject -->|____/--> get element by dom
                                |____/--> hide() remove class show
                                |____/--> show() add class show
                                |____/--> setEvent() add event click with method scroll up
            - scrollupObject.setEvent()
            - show and hide in onWindowScroll()