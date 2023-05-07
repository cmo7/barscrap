oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g barscrap
$ barscrap COMMAND
running command...
$ barscrap (--version)
barscrap/0.6.0 linux-x64 node-v18.15.0
$ barscrap --help [COMMAND]
USAGE
  $ barscrap COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`barscrap help [COMMANDS]`](#barscrap-help-commands)
* [`barscrap scrape FILE OUT [INSTANCES]`](#barscrap-scrape-file-out-instances)

## `barscrap help [COMMANDS]`

Display help for barscrap.

```
USAGE
  $ barscrap help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for barscrap.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `barscrap scrape FILE OUT [INSTANCES]`

Intenta descargar los datos de una serie de productos.

```
USAGE
  $ barscrap scrape FILE OUT [INSTANCES] [-f <value>]

ARGUMENTS
  FILE       Archivo de entrada con formato de un codigo de barras por línea
  OUT        Archivo de salida, con formato de un producto por fila en CSV
  INSTANCES  [default: 5] Número máximo de búsquedas simultaneas (por defecto 5)

FLAGS
  -f, --failFile=<value>  Fichero donde guardar registros no encontrados

DESCRIPTION
  Intenta descargar los datos de una serie de productos.
```

_See code: [dist/commands/scrape/index.ts](https://github.com/cmo7/barscrap/blob/v0.6.0/dist/commands/scrape/index.ts)_
<!-- commandsstop -->
