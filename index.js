import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function request(question) {
  const body = JSON.stringify({
    messages: [
      {
        content: question,
        role: 'user',
      }
    ],
    model: "gpt-3.5-turbo",
  });

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ process.env.OPENAI_SECRET_KEY }`,
    },
    body,
  })

  const data = await res.json();

  return data.choices[0].message;
}

async function main() {
  rl.question('You: ', async (answer) => {
    if(answer === 'exit'){
      rl.close();
      return;
    }

    const response = await request(answer);
    console.log(`chatGPT: ${response.content}`);
    main();
  })
}

main();
