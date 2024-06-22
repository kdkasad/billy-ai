require('dotenv/config');

const ydc_api_key = process.env.YDC_API_KEY;

const options = {
    method: 'POST',
    headers: {
      'X-API-Key': '82de127e-12cb-49c3-bf3e-60ffc9e2a2cb<__>1PTsFeETU8N2v5f4qmtDZVGS',
      'Content-Type': 'application/json'
    },
    body: '{"query":"Give top 5 relevant pieces of NEW news with regards to this subject: Abortion"}'
  };
  
  fetch('https://chat-api.you.com/smart', options)
    .then(response => response.json())
    .then(response => console.log(response['answer']))
    .catch(err => console.error(err));