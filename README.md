Pokedex – Technical dokumentation

Overwiew:

Application can:

    • Display specific information about pokemon
    
    • Search for the pokemon by name
    
    • Search for multiple pokemons in set scope (max 12 pokemons)
    
    • Display all pokemons names (that are also links to their specific information)


AllPokemons, Pokemon and App components have independent data from each other in state.

AllPokemons component uses .getPokemonsList() pokeapi method to get names of all pokemons, each div with a pokemon’s name have an onClick function that changes route to /pokemon/pokemonName.

Pokemon component uses .getPokemonByName() pokeapi method to get specific data about the pokemon, and then displays chosen information in render method.

App component uses .getPokemonsList() pokeapi method to allow searching pokemons from chosen range, Each pokemon is downloaded by .getPokemonByName(), and then displayed with a Tile component. Specific data must be downloaded to get images of pokemons.

Technical choices:

    • App created with boilerplate "create-react-app".
    
    • Added dev-dependencies "parallelshell" and "node-sass"  to compile styles (SCSS) on file save and run react-scripts concurrently.
    
    • Ajax requests will be handled with pokeapi-js-wrapper that delivers needed methods for searching data and supports storing downloaded data in localForage
    
    • Styling written in one SCSS file and imported to main JS file (instead of styling each component), because the app will not have to be maintained in the long term.
    
    • App styled with Bootstrap.
    
    • When the application is launched it downloads names of all available pokemons. This data and specific data about pokemons is then stored in browser’s cache, so all requests are made only once.
    

I would implement those features if I had more time:

    • Button for removing pokemons would also remove current Ajax requests
    
    • Pokemon could be searched by other parameters, like type or ability
    
    • Account authorization with username and password
    
    • Registration by Twitter / Github / Facebook account (and then logging by those services)
    
    • In every account we could add pokemons to "Favourites" tab
    
    • Above features with registration would be handled by Firebase

Encountered problems:

    • Problem with compiling SCSS files to CSS on file change (Node-sass) with Visual Studio Code
    
        ◦ Description: After every file save node-sass threw error "File to read not found or unreadable".
        
        ◦ Cause: VS Code sometimes does not keep up closing a file, while Node-sass triggers it’s compiling function and can not access the file
        
        ◦ Solutions:
        
            ▪ Use another editor
            
            ▪ Use another transpiler like Stylus / Less
            
            ▪ Wrap node-sass render function in setTimeout, so it runs a little later, while Visual Studio Code closes the file. (Node_modules/node-sass/lib/render.js)
            
            ▪ Change node-sass render function so it tries to access the file for a few times - USED - WORKING 
            (https://github.com/marcosbozzani/node-sass/blob/bug-vscode-watch/lib/render.js)
            
        ◦ Problem solutions source: https://github.com/sass/node-sass/issues/1894
        
    • "Background-size" attribute has no effect in CSS (even with !important flag), but when passed in-line in React component it works (but "background-repeat" works in CSS).
    
        ◦ Possible cause: "background-size" must be applied after applying "background".
        
        ◦ Solution: Pass "background-size" with "background: url()" in-line in React component.
        
    • Problem with AJAX requests, server sometimes needs very long time (>1 min) when asking for more then 10 resources
    
        ◦ Solution:
        
            ▪ Increased time after which Ajax requests are cancelled to 120 seconds.
            
            ▪ Limit amount of pokemons that can be downloaded at once to 12
            
            ▪ Once downloaded resources are store in the browser's Cache.
            
            ▪ That is why when I download multiple pokemons I make multiple Ajax requests which update state adding their pokemon, when I made one Ajax request for pokemons I had to wait until last pokemon is downloaded (and sometimes Ajax requests were rejected so it would not render anything at all)
            
    • Problem with compiling an app to production
    
        ◦ Cause: pokeapi-js-wrapper that handles AJAX requests is written in ES6, react-scripts can not compile it because it is a node_module
        
        ◦ Solution: Import pokeapi-js-wrapper code to App/src and treat it as application code

Live - http://nodetest.ct8.pl/ (not HTTPS)

Github repositorium - https://github.com/marcinw99/Pokedex
