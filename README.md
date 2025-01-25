# ANAGRAMMER SLAMMER
#### Video Demo: https://youtu.be/
#### Description: A simple anagram solver, validating each input via JSON and API dictionaries to provide anagrmas and their definitions
#### Command: flask run

This Anagrammer Slammer is a simple anagram solver. The user can input any combination of characters, up to a maximum of 13, and within 2 seconds the results, if any, will be listed alongside the top selection of their dictionary definitions.

This was a personal project to utilise React and JSX in a simple web application, whilst also applying well-considered logic to reduce running times to O(1). As well as featuring use of React hooks and states to define the page content, the styling is written in a Sass file (.scss) to allow for clean code and efficient changes. Given the light-weight nature of the web application I have used Flask as the framework. 

Key files in this application are as follows:

* index.html - Simple index file with no layout file required given single-page appliation and majority of content handled by React and JSX
* anagram.js - Defines the React hooks and states, including the default, loading and results views, and features an asyncronous JavaScript to fetch definitions from a dictionary API 
* app.py - Reads dictionary.json and defines routes for index page and the API for searching the dictionary for anagrams by compared the ordered characters of the query and each word  
* styles.scss - Uses features only available in Sass such as variables, nesting and inheritance to keep styling code conscise and easy to maintain
* dictionary.json - JSON file containing list of English words, performance times could be improved further by grouping sets of anagrams in advance
