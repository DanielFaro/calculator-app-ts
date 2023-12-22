# SFX Calculator

## Summary - 
After looking at the different API's and being a dog lover, I thought I would use the DogAPI to create a compendium of dog breeds. I had once heard that dog life expectancy often decreases with weight, so I decided to show this in a scatter plot. It is interesting to see the differences when sorting by breed. 

## Instructions - 
To run the codebase, clone the repo and type 'npm run start' or try it on the linked github pages.
[Try Me](https://danielfaro.github.io/calculator-app-ts/)

You can sort the table data by simply clicking on

## App Structure - 
I created 3 separate components which are used by the main App component. 
1. Chart - Shows scatterplot of life_span vs weight. 
2. Table - Shows dog breed list and takes care of sorting.
3. SearchBar - allows user to enter text and search any text related data within the table.
   It will return data where any cell text includes the searced string, even if a user searches
   an incomplete word.
   
## Library choices

### State Management - 

**Zustand** - Redux seemed like overkill for a small application and I wantedt to challenge myself by trying a new library. I chose zustand due to the small boilerplate and straightforward usage. Some local state was used e.g. the search bar uses a searchValue for the input, which is then sent to the store and set in global state as 'searchTerm'. 

### Visualization - 

**ChartJS with recharts** - I had used ChartJS in the past and with some minor research was able to implement a scatter plot. It also seemed more straight forward than d3, which I don't have much experience with.

### Styling - 

**Styled-Components** - I decided to use styled-components for all accept the table component,
which had a more complicated structure. I decided to create a separate css file for the table to 
not end up with an enormous main Table component which would decrease readability. Styled-components
provided me with enough functionality without having to rely on prebuilt component libraries and global themes as with e.g. MaterialUI.
