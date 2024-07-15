beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests, created by Rimma', () => {

   it('User can use only same both first and validation passwords', ()=>{
        cy.log('Username will be filled')
        cy.get('input[data-testid="user"]').type('RiA')
        cy.get('#email').type('ria@test.com')
        cy.get('[data-cy="name"]').type('Rimma')
        cy.get('#lastName').type('Adamson')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#password').type('Perfectpass')
        cy.get('#confirm').type('Perfectpass')
        cy.get('h2').contains('Password').click()
        cy.get('[name="confirm"]').type('{enter}')
        cy.window().scrollTo('bottom')
        cy.get('#password_error_message').should('not.be.visible').should('contain', 'Passwords do not match!')
        cy.get('#success_message').should('be.visible');
        cy.get('button.submit_button').should('be.enabled')
        cy.get('input[name="confirm"]').should('not.have.attr', 'title', 'Both passwords should match')
        
        
    })
    
    it('User can submit form with all fields added', ()=>{
        inputValidData('RiA')
        cy.get('#username').type('RiA')
        cy.get('#email').type('ria@test.com')
        cy.get('[data-cy="name"]').type('Rimma')
        cy.get('#lastName').type('Adamson')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#password').type('Perfectpass')
        cy.get('[name="confirm"]').type('Perfectpass')
        cy.get('#htmlFavLanguage').type("radio")
        cy.get('#vehicle1').type("checkbox")
        cy.get('#cars').type('label')
        cy.get('#animal').type('label')
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#success_message').should('be.visible').should("contain", "User successfully submitted registration")
        cy.get('#success_message').should('have.css', 'display', 'block')

     
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        inputValidData('Ria')
        cy.get('#username').type('RiA')
        cy.get('#email').type('ria@test.com')
        cy.get('[data-cy="name"]').type('Rimma')
        cy.get('#lastName').type('Adamson')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#password').type('Perfectpass')
        cy.get('[name="confirm"]').type('Perfectpass')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'none')
        cy.get('#success_message').should('be.visible').should("contain", "User successfully submitted registration")
        cy.get('#success_message').should('have.css', 'display', 'block')
       
       
    
    })

    it('User can not submit form when mandatory field absent', ()=>{
        cy.get('#username').type('RiA')
        cy.get('#email').type('ria@test.com')
        cy.get('[data-cy="name"]').type('Rimma')
        cy.get('#lastName').clear()
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#password').type('Perfectpass')
        cy.get('[name="confirm"]').type('Perfectpass')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#success_message').should('not.be.visible')
       
       
    })

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests, created by Rimma', () => {
    it('Check that Cerebrum hub logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('Check that Cypress logo is correct and has correct size', () => {
        cy.log('Will check cypress_logo source and size')
        cy.get('img').eq(1).should('have.attr', 'src').should('include', 'cypress_logo')
        // get element and check its parameter height
        // it should be less than 116 and greater than 80
        cy.get('img').eq(1).invoke('height').should('be.lessThan', 116)
            .and('be.greaterThan', 80) 
        
    });

    it('Check navigation part for Registration form 1', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check navigation part for Registration form 3', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_3.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })


    it('Check that radio button of Favourite language list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that checkboxes of Favourite transport list is correct', () => {
        // Array of found elements with given selector has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)

        // Verify labels of the checkboxes
        cy.get('input[id="vehicle1"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[id="vehicle2"]').next().eq(0).should('have.text','I have a car')
        cy.get('input[id="vehicle3"]').next().eq(0).should('have.text','I have a boat')
        

        //Verify default state of checkboxes
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        

        // Selecting one will remove selection from the other checkboxes
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
     
    })


    it('Car dropdown is correct', () => {
        // Here is just an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area or full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        // Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Animal dropdown is correct', () => {
        // Here is just an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area or full page
        cy.get('#animal').select(1).screenshot('Animal drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Animal dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').should('have.length', 6)
        
        // Check  that first element in the dropdown has text Dog
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')

        
        // Advanced level how to check the content of the Animal dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])
        })
    })




})

function inputValidData(johnDoe) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(johnDoe)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}