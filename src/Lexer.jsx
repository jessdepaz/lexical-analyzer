import React, { useState } from 'react';

// Define token types
const TOKEN_SPECIFICATION = [
  ['KEYWORD', /\b(int|bool|float|char|if|else|while|return|true|false)\b/],
  ['BOOLEAN', /\b(true|false)\b/],
  ['FLOAT', /\b\d+\.\d+\b/],
  ['INTEGER', /\b\d+\b/],
  ['IDENTIFIER', /\b[a-zA-Z_][a-zA-Z0-9_]*\b/],
  ['CHAR', /'[^']'/],
  ['OPERATOR', /==|!=|<=|>=|[+\-*/%<>&|!=]/],
  ['DELIMITER', /[;(),{}\[\]]/],
  ['STRING', /".*?"/],
  ['WHITESPACE', /\s+/],
  ['COMMENT', /\/\/.*/],
  ['UNKNOWN', /./]
];
// The lexer function in JavaScript
function lexer(code) {
  const tokens = [];
  let position = 0;

  while (position < code.length) {
    let matched = false;
    
    for (const [type, regex] of TOKEN_SPECIFICATION) {
      const match = code.slice(position).match(regex);
      if (match && match.index === 0) { // Ensure the match is at the current position
        matched = true;
        if (type !== 'WHITESPACE' && type !== 'COMMENT') {
          tokens.push([type, match[0]]);
        }
        position += match[0].length;
        break;
      }
    }

    if (!matched) {
      position++; // Skip over unmatched characters
    }
  }

  return tokens;
}

const Lexer = () => {
  const [code, setCode] = useState('');
  const [tokens, setTokens] = useState([]);

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Handles the submission of the form, calls the lexer with the code entered,
   * and updates the tokens state with the result.
   * @param {Event} e The form submission event
   */
/******  efb82b74-ed83-4410-ac3f-6087de2d4a67  *******/
  const handleSubmit = (e) => {
    e.preventDefault();
    const tokens = lexer(code);
    setTokens(tokens);
  };

  console.log(tokens); // Logging tokens for debugging

  return (
    <div className="App">
      <h1>Clite Lexer</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="10"
          cols="50"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter Clite code here..."
        />
        <br />
        <button type="submit">Analyze</button>
      </form>
      <h2>Lexer Output</h2>
      <ul>
        {tokens.length > 0 ? (
          tokens.map((token, idx) => (
            <li key={idx}>
              <strong>{token[0]}</strong>: {token[1]}
            </li>
          ))
        ) : (
          <li>No tokens generated yet.</li>
        )}
      </ul>
    </div>
  );
};

export default Lexer;
