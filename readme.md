# aws-user

## Description

This is a simple command utility to mange and switch between multiple AWS users.

Use aws-user help to get all available commands.

Can be helpful if you have more than one user with diffrent permissions, or users in multiple organizations.

The storage is done locally in the same place where aws credentials are stored, you need to have AWS CLI installed as it assumes the credentials folder exists.

**Note:**

## Install

```bash
yarn global add aws-user
```

## Usage

Get commands:

```bash
aws-user help
```

Add User:

```bash
aws-user add <user>:<access-key>:<secret-key>
```

Example:

```bash
aws-user add john22:ASIARNQFX7RWNRAAI2VVO:TTgFyl0p/2kxXa/uJ9i9sabBn22b2sewLXjaXPPY
```

## Notes

It has commands to switch between users, add users, remove users, wipe local storage, list all users, and loggout from AWS.

## Visual Demo

Example of using `aws-user` comand util
![aws-user Demo](/demo-aws-user.gif?raw=true "aws-user Demo")

## Contributing

Issues and pull requests are welcome.

## License

MIT
