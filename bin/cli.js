#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import {
  listUsers,
  createUser,
  deleteUser,
  switchUser,
  showUser,
  wipeStore,
  logout,
  showHelp
} from "./../lib/index.js";

yargs(hideBin(process.argv))
  .scriptName('aws-user')
  .command({
    command: "add <loginString>",
    desc: "This command will add an AWS user to the store",
    handler: (argv) => {
      createUser(argv.loginString);
    },
  })
  .command({
    command: "remove <user>",
    desc: "This command will remove an AWS user from the store if found",
    handler: (argv) => {
      deleteUser(argv.user);
    },
  })
  .command({
    command: "switch <user>",
    desc: "This command will switch login to the user specified",
    handler: (argv) => {
      switchUser(argv.user);
    },
  })
  .command({
    command: "list",
    desc: "This will show all users",
    handler: (argv) => {
      listUsers();
    },
  })
  .command({
    command: "show <user>",
    desc: "This will show the user specified",
    handler: (argv) => {
      showUser(argv.user);
    }
  })
  .command({
    command: "wipe",
    desc: "This will wipe the local store of this lib located at ~/.aws/store.json",
    handler: (argv) => {
      wipeStore();
    },
  })
  .command({
    command: "loggout",
    desc: "This command will logout current AWS user",
    handler: (argv) => {
      logout();
    },
  })
  .command({
    command: "help",
    desc: "This command will show a detalied help message",
    handler: (argv) => {
      showHelp();
    },
  })
  .demandCommand(1, "You need to invoke a command use help to see commands")
  .parse();
