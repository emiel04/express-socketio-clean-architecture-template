# Express + Socket.io Clean Architecture Template

This is a template project for quickly setting up a web server using **Express** and **Socket.io**, following **Clean Architecture** principles. The project also includes configuration for **formatting**, **linting**, **unit testing**, and **path aliases**, along with an easy-to-use development workflow.

### Key Features:

- **Clean Architecture**: A modular structure that separates concerns and makes the code easier to maintain.
- **Socket.io**: Built-in support for real-time WebSocket communication.
- **Formatting & Linting**: Automatic formatting and linting using [Prettier](https://prettier.io/docs/) and [ESLint](https://eslint.org/docs/latest/use/getting-started).
- **Unit Testing**: Preconfigured testing setup with [Jest](https://jestjs.io/) to easily write and run unit tests.
- **Path Aliases**: Use of path aliases to simplify imports and make the code cleaner and more readable.

---

## Installation

To set up the project, follow these steps:

1. Clone this repository:

    ```bash
    git clone https://github.com/emiel04/express-socketio-clean-architecture-template
    cd express-socketio-clean-architecture-template
    ```

2. Install dependencies:
    - Using **npm**:
        ```bash
        npm install
        ```
    - Or using **pnpm** (recommended for faster installation):
        ```bash
        pnpm install
        ```

---

## Running the Project

Once the dependencies are installed, you can start the server in development mode with the following command:

- Using **npm**:

    ```bash
    npm run dev
    ```

- Using **pnpm**:
    ```bash
    pnpm run dev
    ```

This will start the Express server with **TypeScript** support and auto-reloading, and the WebSocket server using **Socket.io**. The server will be accessible at `http://localhost:3000`.

---

## Testing

The project is set up with [Jest](https://jestjs.io/) for unit testing.

To run the tests, use the following command:

```bash
 pnpm run test
```

Jest will automatically find all test files and run them, providing feedback on the test results.

---

## Linting and Formatting

This project uses **Prettier and ESLint** for linting and formatting to ensure code quality and consistency.

### To lint your code:

```bash
pnpm run lint
```

### To format your code:

```bash
pnpm run format
```

---

## Scripts

- **dev**: Starts the development server with hot reloading.
    ```bash
    pnpm run dev
    ```
- **build**: Builds the project using TypeScript.
    ```bash
    pnpm run build
    ```
- **start**: Starts the application in production mode.
    ```bash
    pnpm run start
    ```
- **test**: Runs unit tests.
    ```bash
    pnpm run test
    ```
- **bs**: Runs both build and start in sequence
    ```bash
    pnpm run bs
    ```
- **format**: Formats the project files using Prettier.
    ```bash
    pnpm run format
    ```
- **lint**: Lints the source code with ESLint.
    ```bash
    pnpm run lint
    ```
- **qa**: Runs the full QA pipeline, including formatting, linting, and testing.
    ```bash
    pnpm run qa
    ```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
