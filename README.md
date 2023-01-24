# Just-Sail-It-service

## Installation

1. Clone this repository
2. ใช้คำสั่ง `yarn` เพื่อติดตั้ง depedencies
3. สร้างไฟล์ `.env` สามารถก๊อปมาจาก `.env.example` 
3. Run `yarn dev` 

## Usage
เซิฟเวอร์ของระบบอยู่บน Port 3333 


## For Contributors

this section is for contributors only and describes the workflow for contributing to this project.

### Git Workflow

1. Create a new branch for your feature
2. Commit your changes
3. Push your branch to the remote repository
4. Create a pull request
5. Wait for review and merge

### Git Commit Messages

Please use the following format for your commit messages:

```
[<type>] <scope>: <message>
```

> this project use git commit message tools (cz-git) to generate commit message It can configure the commit message format and the commit message type in .czrc file. You can use `yarn cm` to generate commit message after `git add .`

The following types are allowed:

- `feat`: new feature
- `fix`: bug fix
- `docs`: documentation
- `style`: changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: a code change that neither fixes a bug nor adds a feature
- `test`: adding missing tests or correcting existing tests
- `chore`: other changes that don't modify src or test files
- `revert`: revert to a commit
- `init`:  init base project environment
- `build`: everything about build project process

The scope types are:

- `app`: changes to the app such as new config database
- `account`: changes to the account module or account related components


