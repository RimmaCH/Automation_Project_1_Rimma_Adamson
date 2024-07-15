// Before each test (it...) open .html page
beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_1.html')
})

/*
Assignment 2:

 1. Update the name of test suite by adding you name: “This is first test suite, John Smith”
 2. Replace text ‘Password123’ in the first test with your own chosen password (2 places) - passwords should match
 3. Change phone number in the first test to 555666777
 4. Change the order of steps in the first test:
      -first set phone number
      -then 2 password fields
      -then username
 5. Add comment to the first test containing today’s date
 */

describe('This is first test suite, Rimma Adamson',  () => {
   it('User can submit data only when valid mandatory values are added', () => {
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('#firstName').type('Rimma')
        cy.get('#lastName').type('Adamson')
        cy.get('input[name="password"]').type('Perfectpass')
        cy.get('[name="confirm"]').type('Perfectpass')
        cy.get('#username').type('Ria')
        // 3 July 2024

        //in order to activate submit button, user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // Assert that both input and password error messages are not shown
        // next 2 lines check exactly the same, but using different approach
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'none')

        // Assert that success message is visible
        // next 2 lines check exactly the same, but using different approach
        cy.get('#success_message').should('be.visible')
        cy.get('#success_message').should('have.css', 'display', 'block')
    });


    it('User can use only same both first and validation passwords', () => {
        cy.get('#username').type('RiA')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type('Perfectpass')
        cy.get('[name="confirm"]').type('Perfectpass')
        
        // type('{enter}') is clicking native enter button from the keyboard
        // for example, to click backspace use '{backspace}'
        cy.get('[name="confirm"]').type('{enter}')

        // Scroll to bottom of the page
        cy.window().scrollTo('bottom')

        // Assert that password error message is visible, and message should contain 'Passwords do not match!
         cy.get('#password_error_message').should('not.be.visible').should('contain', 'Passwords do not match!')
        // Assert that success message is not visible
        cy.get('#success_message').should('be.visible');
        // Asserting that Submit button is disabled
        cy.get('button.submit_button').should('not.be.disabled')
        // Assert that password confirmation input fields has attribute 'title' with text stating 'Both passwords should match'
        cy.get('input[name="confirm"]').should('not.have.attr', 'title', 'Both passwords should match')
        
    })

    it('User cannot submit data when username is absent', () => {
        cy.get('#username').type('RiA')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get("input[name='password']").type('Perfectpass')
        cy.get('[name="confirm"]').type('Perfectpass')

        // Scroll back to username input field
        cy.get('#username').scrollIntoView()
        cy.get('#username').clear()
        cy.get('h2').contains('Password').click()

        // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Assert that correct error message is visible and contain given text
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')

        // Assert that username has tooltip with error message
        cy.get('input[name="username"]').should('have.attr', 'title').should('contain', 'Input field')

        // There are 2 options how to check error message visibility: using CSS or simply be.visible
        // none = not visible; block = visible
        cy.get('#input_error_message').should('be.visible')
        cy.get('#input_error_message').should('have.css', 'display', 'block')
    })

    /*
    Assignment 3: add the content to the following tests
    */

    it('User cannot submit data when phone number is absent', () => {
        cy.get('#username').type('RiA')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get("input[name='password']").type('Perfectpass')
        cy.get('[name="confirm"]').type('Perfectpass')

        // Scroll back to phone number input field
        cy.get('#phoneNumber').scrollIntoView()
        cy.get('#phoneNumber').clear()
        cy.get('h2').contains('Password').click()

        // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Assert that correct error message is visible and contain given text
        cy.get('#input_error_message').should('not.be.visible').should('contain', 'Mandatory input field is not valid or empty!')

        // Assert that phone number has tooltip with error message
        cy.get('input#phoneNumber').should('have.attr', 'title').should('contain', 'Add phone number')

        // There are 2 options how to check error message visibility: using CSS or simply be.visible
        // none = not visible; block = visible
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#input_error_message').should('have.css', 'display', 'none')
    })

   
 it('User cannot submit data when password and/or confirmation password is absent', () => {
        cy.get('#username').type('RiA')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get("input[name='password']").type('Perfectpass')
        cy.get('[name="confirm"]').type('Perfectpass')

        // Scroll back to password input field
        cy.get("input[name='password']").scrollIntoView()
        cy.get("input[name='password']").clear()
        cy.get('h2').contains('Password').click()

      // Scroll back to confirm input field
        cy.get('[name="confirm"]').scrollIntoView()
        cy.get('[name="confirm"]').clear()
        cy.get('h2').contains('Password').click()

        // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Assert that correct error message is visible and contain given text
        cy.get('#input_error_message').should('not.be.visible').should('contain', 'Mandatory input field is not valid or empty!')

        // Assert that password and confirmation has tooltip with error message
        cy.get('input[name="password"]').should('not.have.attr', 'title', 'Input field')
        cy.get('input[name="confirm"]').should('not.have.attr', 'title', 'Both passwords should match')

        // There are 2 options how to check error message visibility: using CSS or simply be.visible
        // none = not visible; block = visible
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#input_error_message').should('have.css', 'display', 'none')
    })

    it('User cannot add letters to phone number', () => {
        cy.get('#username').type('RiA')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get("input[name='password']").type('Perfectpass')
        cy.get('[name="confirm"]').type('Perfectpass')
    
        // Scroll back to phone number input field
        cy.get('#phoneNumber').scrollIntoView()
        cy.get('#phoneNumber').clear()
        cy.get('h2').contains('Password').click()
    
        // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')
    
        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')
    
        // Assert that phone number has tooltip with error message
        cy.get('input#phoneNumber').should('have.attr', 'title').should('contain', 'Add phone number')
        cy.get('[data-testid="phoneNumberTestId"]').should('have.attr', 'type', 'number')
    
        // There are 2 options how to check error message visibility: using CSS or simply be.visible
        // none = not visible; block = visible
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#input_error_message').should('have.css', 'display', 'none')
        })
    })
   
