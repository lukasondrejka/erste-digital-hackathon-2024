/**
 * Note: Mistral is called directly from the browser for this hackathon demo.
 * The API key is therefore exposed to clients and can be inspected by users.
 * In a production application, the key should be kept on a backend server,
 * which would make the Mistral API calls on behalf of the client.
 */

export const environment = {
  mistralaiApiKey: '',
  mistralaiModel: 'mistral-large-latest',
};
