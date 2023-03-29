# "Demo AI Chat App" - Using React 18 Concurrent Rendering features:

Demonstrate new React 18 concurrent rendering hooks:
- **useTransition**
- **useDeferredValue**

## Setup
Add a .env file to the root of the project that contains:
```
REACT_APP_CHAT_SERVER_PROTOCOL=http
REACT_APP_CHAT_SERVER_HOST=localhost
REACT_APP_CHAT_SERVER_PORT=300
```

## "Talk" tab

Send messages to an AI language model and get responses. Messages and responses will be stored in a "conversation" on the server.

## "Search" tab

Search all the conversations (ids and messages content) for your input. *Note: the search function is dramatically inefficient in order to demonstrate the rendering behavior*

### "Render Options": React Concurrent Rendering Hooks Demonstration

Select any of:
    - **Standard**: search input is immediately used to search conversations.
    - **Deferred**: uses the **useDeferredValue** React 18 hook instead of the current search input value to search for results. The deferred value is the value used for the last completed render result. The deferred value eventually "catches up" to the current value. This obviates the need for a clunkier debounce function and keeps the UI responsive.
    - **Transition**: uses the **useTransition** React 18 hook to define the search function as "low priority" - causing it to be performed after other state updates and keep UI responsive.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
