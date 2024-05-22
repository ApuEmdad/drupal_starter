# Drupal Starter Pack

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

Run the following commands in your root directory:

```
composer install
```

```
yarn
```

Import the database from the `db` in your **MySQL** server and name it `my_drupal_starter`

## **Start (Development)**

Go to the `web` directory

```
cd web
```

Run the following command to run your drupal project:

```
php -S localhost:8888 .ht.router.php
```

Starts the server in `http://localhost:8888/`.

## **Prettier**

```
yarn prettier
```

Runs Prettier to format source files according to defined rules.
