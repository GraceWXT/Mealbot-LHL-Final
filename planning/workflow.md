# Team Workflow
## Git
1. General Workflow
  - Pull latest version of master to your local machine:
  `git checkout master`, `git pull`
  - Merge master into your local working branch:
  `git checkout feature/example-branch`, `git merge master`
  - (Fix merge issues on the local working branch if any.) Work on the local working branch. Once done push to remote working branch:
  `git push origin feature/example-branch`
  - Open a pull request for your branch
    - Get reviewed and approved by other team members
    - Merge into master to close the pull request
    - go back to step one (pull from master)

2. Golden Rules of Merging:
  - Always merge the lastest version of master into your working branch
    - Never work on outdated branches
  - Always use Github pull request to merge local changes to remote master
    - Never merge to local master directly (or push local master to remote master directly)

3. Convention
- Branch Naming
  - feature/example-branch
  - fix/example-branch
  - component/example-branch
  - routes/example-branch
  - styling/example-branch

- Commit Message: present tense

## Coding Styles
- Component function convention:
  - `export default function ExampleComponent() {}`
  - destructure the props in the first line of the funciton body
  - try to put all the logic & data processing before `return`
- Quote convention: double quote

## Task Distribution
- Github project

## Meeting Schedule
- 9AM PST / 10AM MST / 12 PM EST
