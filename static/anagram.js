function Anagrams() {

    // Define hooks
    const [input, setInput] = React.useState("");
    const [results, setResults] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [complete, setComplete] = React.useState(false);

    // Search for anagrams
    const findAnagrams = () => {

        // Reset results
        setResults([]);
        setLoading(false);
        setComplete(false);

        // Check if input is empty
        if (input.trim() === "") {
            return;
        } else {
            // Set loading to true
            setLoading(true);

            // List all combinations of characters 
            const combinations = listCombinations(input.trim());

            // Find valid words and set results
            validateWords(combinations)
            .then(validatedList => {
                setResults(validatedList);
            })
            .then(() => {
                // Set loading to false and complete to true
                setLoading(false);
                setComplete(true);
            })
        }
    };

    // Define HTML content
    return (
        <div>
            {/* Add input fields */}
            <div className="container" id="search">
                <input autoFocus autoComplete="off" type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add letters here..." maxlength="6"/>
                <button className="btn" onClick={findAnagrams}>Search</button>
            </div>

            {/* If search not completed and results are empty, add message */}
            {!loading && !complete && results.length === 0 && <h1>Waiting...</h1>}

            {/* If loading, add message */}
            {loading && <h1>Loading...</h1>}

            {/* If search completed and results are empty, add message */}
            {!loading && complete && results.length === 0 && <h1>No anagrams found.</h1>}

            {/* If search completed and results are available, list results */}
            {complete && results.length > 0 && (
                <div class="container" id="results">
                    {results.map((result) => (
                        <div className="row">
                            <p className="word">{result.word.charAt(0).toUpperCase() + result.word.slice(1)}</p>
                            <ul className="definitions">
                                {result.definitions.map((definition) => (
                                    <li><strong>{definition.partOfSpeech}:</strong> {definition.definitions[0].definition}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>    
            )}
        </div>
    );

    // Define recurring function to list all combinations of characters
    function listCombinations(query) {

        // Create empty list of combinations
        let unvalidated = [];

        // Get length of query
        const n = query.length;

        // Check if query is one character
        if (n === 1) {
            return query;
        } else {
            // Take each character and append the remaining characters in lower cases
            for (let i = 0; i < n; i++) {
                const char = query[i].toLowerCase();
                const remainingChars = query.slice(0, i).toLowerCase() + query.slice(i + 1).toLowerCase();
                const permutations = listCombinations(remainingChars);
                for (let permutation of permutations) { 
                    unvalidated.push(char + permutation);
                }
            }
            // Return list of character combinations
            return unvalidated;
        }
    }

    // Define an asynchronous function to validate set of words
    async function validateWords(list) {

        // Create empty list for validated words and definitions
        let validatedList = [];

        // Search for each word in JSON dictionary
        for (let i = 0; i < list.length; i++) {
            const word = list[i];
            const response = await fetch(`validate/${word}`);
            const data = await response.json();

            // Get definitions for valid words, excluding original input
            if (data.valid === true && word != input.trim()) {
                const dictResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

                // List words and definitions if found
                if (dictResponse.ok) {
                    const dictData = await dictResponse.json();
                    const definitions = dictData[0].meanings
                    validatedList.push({ word, definitions });
                }
            }
        }
        // Return validated list of words and definitions
        return validatedList;
    }
}
// Render view via Anagrams function
ReactDOM.render(<Anagrams />, document.querySelector("#view"));