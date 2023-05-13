function encode() {
  let key = document.getElementById("key").value;
  let plaintext = document.getElementById("plaintext").value;

  let ciphertext = playfair(key, plaintext, "encode");
  
  document.getElementById("ciphertext").value = ciphertext;
}

function decode() {
  let key = document.getElementById("key-decrypt").value;
  let ciphertext = document.getElementById("ciphertext-decrypt").value;

  let plaintext = playfair(key, ciphertext, "decode");

  document.getElementById("plaintext-decrypt").value = plaintext;
}
function playfair(key, text, mode) {
  // Remove any spaces from the key and convert to uppercase
  key = key.replace(/ /g, "").toUpperCase();

  // Create the Playfair matrix
  let matrix = createMatrix(key);

  // Remove any spaces from the text and convert to uppercase
  text = text.replace(/ /g, "").toUpperCase();

  // Split the text into pairs of

  // letters
  let pairs = splitPairs(text);

  // Apply the Playfair cipher to each pair of letters
  let result = "";

  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i];
    let row1, col1, row2, col2;

    // Find the positions of the two letters in the matrix
    for (let j = 0; j < 5; j++) {
      for (let k = 0; k < 5; k++) {
        if (matrix[j][k] === pair.charAt(0)) {
          row1 = j;
          col1 = k;
        }

        if (matrix[j][k] === pair.charAt(1)) {
          row2 = j;
          col2 = k;
        }
      }
    }

    let newPair = "";

    if (row1 === row2) {
      // Same row
      if (mode === "encode") {
        // Move to the right, wrapping around if necessary
        newPair += matrix[row1][(col1 + 1) % 5];
        newPair += matrix[row2][(col2 + 1) % 5];
      } else {
        // Move to the left, wrapping around if necessary
        newPair += matrix[row1][(col1 + 4) % 5];
        newPair += matrix[row2][(col2 + 4) % 5];
      }
    } else if (col1 === col2) {
      // Same column
      if (mode === "encode") {
        // Move down, wrapping around if necessary
        newPair += matrix[(row1 + 1) % 5][col1];
        newPair += matrix[(row2 + 1) % 5][col2];
      } else {
        // Move up, wrapping around if necessary
        newPair += matrix[(row1 + 4) % 5][col1];
        newPair += matrix[(row2 + 4) % 5][col2];
      }
    } else {
      // Different row and column
      newPair += matrix[row1][col2];
      newPair += matrix[row2][col1];
    }

    result += newPair;
  }

  return result;
}

function createMatrix(key) {
  let matrix = [];

  // Initialize the matrix with the key
  for (let i = 0; i < 5; i++) {
    matrix[i] = [];
  }

  let index = 0;

  for (let i = 0; i < key.length; i++) {
    let letter = key.charAt(i);

    // Check if the letter has already been added to the matrix
    if (matrix.flat().indexOf(letter) === -1 && letter !== "J") {
      matrix[Math.floor(index / 5)][index % 5] = letter;
      index++;
    }
  }

  // Fill the rest of the matrix with the remaining letters of the alphabet
  for (let i = 0; i < 26; i++) {
    let letter = String.fromCharCode(65 + i);

    if (letter !== "J" && matrix.flat().indexOf(letter) === -1) {
      matrix[Math.floor(index / 5)][index % 5] = letter;
      index++;
    }
  }

  return matrix;
}

function splitPairs(text) {
  let pairs = [];

  for (let i = 0; i < text.length; i += 2) {
    let pair = text.charAt(i);

    if (i + 1 < text.length) {
      // Add the

      let second = text.charAt(i + 1);
      // If the two letters are the same, add an "X" after the first letter
      if (pair === second) {
        second = "X";
        i--;
      }

      pair += second;
    } else {
      // If there's an odd number of letters, add an "X" to the last letter
      pair += "X";
    }

    pairs.push(pair);
  }

  return pairs;
}


function validateKey(key) {
    // Remove spaces and convert to uppercase
    key = key.replace(/ /g, "").toUpperCase();
    
    // Remove any non-letter characters
    key = key.replace(/[^A-Z]/g, "");
    
    // Replace any "J" with "I"
    key = key.replace(/J/g, "I");
    
    return key;
    }
    
    // Event listener for the "Encode" button
    document.getElementById("encode-btn").addEventListener("click", () => {
    let plaintext = document.getElementById("plaintext").value;
    let key = document.getElementById("key").value;
    let validatedKey = validateKey(key);
    
    if (validatedKey === "") {
    alert("Please enter a valid key.");
    return;
    }
    
    let encodedText = playfairCipher(plaintext, validatedKey, "encode");
    document.getElementById("ciphertext").value = encodedText;
    });
    
    // Event listener for the "Decode" button
    document.getElementById("decode-btn").addEventListener("click", () => {
    let ciphertext = document.getElementById("ciphertext-decrypt").value;
    let key = document.getElementById("key-decrypt").value;
    let validatedKey = validateKey(key);
    
    if (validatedKey === "" || ciphertext==="") {
    alert("không được để trống trường dữ liệu !!!");
    return;
    }
    
 playfair(ciphertext, validatedKey, "decode");

    });
    
    // Event listener for the "Reset" button
    document.getElementById("reset-btn").addEventListener("click", () => {
    document.getElementById("plaintext").value = "";
    document.getElementById("ciphertext").value = "";
    document.getElementById("key").value = "";
    });
	    document.getElementById("reset-decrypt-btn").addEventListener("click", () => {
    document.getElementById("plaintext-decrypt").value = "";
    document.getElementById("ciphertext-decrypt").value = "";
    document.getElementById("key-decrypt").value = "";
    });