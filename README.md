# MTRPZ-LAB-4 Recepies service

## About

**Recepies service** - is a service which helps with saving and finding recipes which you like by providing easy functionality without authorization which allows to start using service immediately.

### Prerequisites

**Node.js 18.x+** version

### Installation

1. Clone the repository

2. Install dependencies

```shell
$ npm install
```

### Deployment

* From source code to production

  ```shell
  $ npm run build
  $ npm run start:prod
  ```
  
 * From source code to development

  ```shell
  $ npm run start:dev
  ```

* From docker
  ```shell
  $ docker build -t recepies .
  $ docker run -p 3000:3000 recepies
  ```

### [API instructions](https://andrew2831.github.io/mtrpz-lab-4/API.html)

### Running tests

```shell
$ yarn test
```

watch mode

```shell
$ yarn test:watch
```

### [Link to design document](https://andrew2831.github.io/mtrpz-lab-4/API.html)