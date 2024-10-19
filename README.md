# automate-accmate
An implementation of the Cypress framework automating certain modules of the accmate accounting system


#Install node modules
Run `npm install`

#Execute tests
To run all tests and generate reports run `npm run execute-tests-and-compile-reports` (this is a custom command)
To run all tests at once run `npx cypress run`
To open the Cypress Test tray run `npx cypress open` then proceed to the test spec you want to execute
To run a test spec headlessly run `npx cypress run --spec cypress/e2e/path-to-spec`

#Generate reports
Combine individual test reports with `npm run combine-reports`
Convert the combined report to html with `npm run convert-to-html`
