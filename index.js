const encode = (input) => {
    return btoa(input);
  };

const saveKey = () => {
    const input = document.getElementById('key_input');

    if (input) {
      const { value } = input;
  
      // Encode String
      const encodedValue = encode(value);
  
      // Save to google storage
      localStorage['openai-key'] = encodedValue;
      
      document.getElementById('key_needed').style.display = 'none';
      document.getElementById('key_entered').style.display = 'block';
    }
};
const changeKey = () => {
    document.getElementById('key_needed').style.display = 'block';
    document.getElementById('key_entered').style.display = 'none';
};

const checkForKey = () => {
    return new Promise((resolve, reject) => {
        if (localStorage['openai-key']) {
            resolve(localStorage['openai-key']);
        }
    });
};

checkForKey().then((response) => {
    if (response) {
      document.getElementById('key_needed').style.display = 'none';
      document.getElementById('key_entered').style.display = 'block';
    }
  });
document.getElementById('save_key_button').addEventListener('click', saveKey);
document
  .getElementById('change_key_button')
  .addEventListener('click', changeKey);