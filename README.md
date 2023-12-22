# SFX Calculator

## Summary - 
This is a calculator built in TypeScript and React with an added drum effects library. On display of the result, the sounds associated with each number are looped over and played in succession, creating a drum beat.
My goal was to add a little more fun and interactivity to a classic programming exercise. I decided to use plain CSS and the JS Audio interface to get better acquainted with native JS tools and styling that would both work in any browser today.

## Instructions - 
To run the codebase, clone the repo and type 'npm run start' or try it on the linked github pages.
[Try Me](https://danielfaro.github.io/calculator-app-ts/)

### State Management - 

**useState** - Redux seemed like overkill for a small application and I wantedt to challenge myself by trying a new library. I chose zustand due to the small boilerplate and straightforward usage. Some local state was used e.g. the search bar uses a searchValue for the input, which is then sent to the store and set in global state as 'searchTerm'. 


### Styling - 

**CSS** - I wanted to create a project using 
