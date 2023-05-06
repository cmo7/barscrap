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
barscrap/0.4.0 linux-x64 node-v18.15.0
$ barscrap --help [COMMAND]
USAGE
  $ barscrap COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`barscrap help [COMMANDS]`](#barscrap-help-commands)
* [`barscrap plugins`](#barscrap-plugins)
* [`barscrap plugins:install PLUGIN...`](#barscrap-pluginsinstall-plugin)
* [`barscrap plugins:inspect PLUGIN...`](#barscrap-pluginsinspect-plugin)
* [`barscrap plugins:install PLUGIN...`](#barscrap-pluginsinstall-plugin-1)
* [`barscrap plugins:link PLUGIN`](#barscrap-pluginslink-plugin)
* [`barscrap plugins:uninstall PLUGIN...`](#barscrap-pluginsuninstall-plugin)
* [`barscrap plugins:uninstall PLUGIN...`](#barscrap-pluginsuninstall-plugin-1)
* [`barscrap plugins:uninstall PLUGIN...`](#barscrap-pluginsuninstall-plugin-2)
* [`barscrap plugins update`](#barscrap-plugins-update)
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

## `barscrap plugins`

List installed plugins.

```
USAGE
  $ barscrap plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ barscrap plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/index.ts)_

## `barscrap plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ barscrap plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ barscrap plugins add

EXAMPLES
  $ barscrap plugins:install myplugin 

  $ barscrap plugins:install https://github.com/someuser/someplugin

  $ barscrap plugins:install someuser/someplugin
```

## `barscrap plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ barscrap plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ barscrap plugins:inspect myplugin
```

## `barscrap plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ barscrap plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ barscrap plugins add

EXAMPLES
  $ barscrap plugins:install myplugin 

  $ barscrap plugins:install https://github.com/someuser/someplugin

  $ barscrap plugins:install someuser/someplugin
```

## `barscrap plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ barscrap plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ barscrap plugins:link myplugin
```

## `barscrap plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ barscrap plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ barscrap plugins unlink
  $ barscrap plugins remove
```

## `barscrap plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ barscrap plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ barscrap plugins unlink
  $ barscrap plugins remove
```

## `barscrap plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ barscrap plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ barscrap plugins unlink
  $ barscrap plugins remove
```

## `barscrap plugins update`

Update installed plugins.

```
USAGE
  $ barscrap plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `barscrap scrape FILE OUT [INSTANCES]`

Intenta descargar los datos de una serie de productos.

```
USAGE
  $ barscrap scrape FILE OUT [INSTANCES]

ARGUMENTS
  FILE       Archivo de entrada con formato de un codigo de barras por línea
  OUT        Archivo de salida, con formato de un producto por fila en CSV
  INSTANCES  [default: 5] Número máximo de búsquedas simultaneas (por defecto 5)

DESCRIPTION
  Intenta descargar los datos de una serie de productos.
```

_See code: [dist/commands/scrape/index.ts](https://github.com/cmo7/barscrap/blob/v0.4.0/dist/commands/scrape/index.ts)_
<!-- commandsstop -->
