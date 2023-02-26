const getKey = async () => {
    let final_key = ''
    chrome.storage.local.get(['openai-key'], (result) => {
        if (result['openai-key']) {
            const decodedKey = atob(result['openai-key']);
            final_key = decodedKey;
            return decodedKey;
        }
    });
    return final_key
}

const generate = async (prompt) => {
    const key = await getKey();
    const url = 'https://api.openai.com/v1/completions';
    console.log("request prompt: ", prompt);
    // Call completions endpoint
    const completionResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 1250,
        temperature: 0.7,
      }),
    });
      
    // Select the top choice and send back
    const completion = await completionResponse.json();
    return completion.choices.pop();
}

const generateCompletionAction = async (doubt) => {
    try {
        const { selectionText } = doubt;
        const basePromptPrefix =
          `
          Write me a detailed table of contents for a blog post with the title below.
    
          Title:
          `;
    
            // Add this to call GPT-3
        const baseCompletion = await generate(`${basePromptPrefix}${selectionText}`);
    
        // Let's see what we get!
        console.log(baseCompletion.text)	
      } catch (error) {
        console.log(error);
      }
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'context-run',
      title: 'Generate blog post',
      contexts: ['selection'],
    });
  });
  
chrome.contextMenus.onClicked.addListener(generateCompletionAction);