beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

    describe('Section 1: Visual tests, created by Rimma', () => {
   
        it('Test 1. Check that Cerebrum hub logo is correct and has correct size', () => {
            cy.log('Will check logo source and size')
            cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
            cy.get('img').invoke('height').should('be.lessThan', 107)
                .and('be.greaterThan', 80)   
        })

        it('Test 2. Check that email format is correct', () => {
            cy.get('[name="email"]').type('ria@test.com')
            cy.get('[id="emailAlert"]').should('not.be.visible')
            cy.get('[name="email"]').clear()
            cy.get('[name="email"]').type('invalid-email')
            cy.get('[id="emailAlert"]').scrollIntoView().should('be.visible').should('contain', 'Invalid email address.')
            cy.get('input[type="submit"]').should('be.disabled')

            })

            it('Test 3. Check that radio button of receiving our newsletter is correct', () => {
                
                cy.get('input[type="radio"]').should('have.length', 4)
                cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
                cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
                cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
                cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')
        
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

            it('Test 4. Check that checkboxes of acceptance list is correct', () => {
                // Array of found elements with given selector has 2 elements in total
                cy.get('input[type="checkbox"]').should('have.length', 2)
        
                // Verify labels of the checkboxes
                cy.get('input[type="checkbox"]').click({ multiple: true }).eq(0)
               
                //Verify state of checkboxes
                cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
               
             
            })

            it('Test 5. Country dropdown is correct', () => {
                // Here is just an example how to explicitely create screenshot from the code
                // Select second element and create screenshot for this area or full page
                cy.get('[id="country"]').select(0).screenshot('Country drop-down')
                cy.screenshot('Full page screenshot')
        
                // Here are given different solutions how to get the length of array of elements in Country dropdown
                // Next 2 lines of code do exactly the same!
                cy.get('#country').children().should('have.length', 4)
                cy.get('#country').find('option').should('have.length', 4)
                
                // Check  that first element in the dropdown has text Spain
                cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
                cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
                cy.get('#country').find('option').eq(3).should('have.text', 'Austria')
                
            })

            it('Test 6. Check that list of cities changes depending on the choice of country', () => {
                cy.get('#country').select('Spain'); 
                cy.get('#city').should('contain', 'Malaga');
                cy.get('#city').should('contain', 'Madrid');
                cy.get('#city').should('contain', 'Valencia');
                cy.get('#city').should('not.contain', 'Vienna');
                
                cy.get('#country').select('Estonia'); 
                cy.get('#city').should('contain', 'Tallinn');
                cy.get('#city').should('contain', 'Haapsalu');
                cy.get('#city').should('contain', 'Tartu');
                cy.get('#city').should('not.contain', 'Madrid');
                
                cy.get('#country').select('Austria'); 
                cy.get('#city').should('contain', 'Vienna');
                cy.get('#city').should('contain', 'Salzburg');
                cy.get('#city').should('contain', 'Innsbruck');
                cy.get('#city').should('not.contain', 'Tallinn');

                cy.get('#country').select('Spain').should('have.value', 'object:3')
                cy.get('#city').find('option').should('not.contain', 'Tallinn')
                const expectedCityOptions = [ '', 'Malaga', 'Madrid', 'Valencia', 'Corralejo']
                cy.get('#city').find('option').then(($options) => {
                const actualCityOptions = [...$options].map((option) => option.text);expect(actualCityOptions).to.deep.eq(expectedCityOptions); });
                cy.get('#city').select('Valencia');
                cy.get('#city').should('contain', 'Valencia')

            })
        
            it('Test 7. Check that the city selection is clear when the country is updated', () => {
                cy.get('#country').select('Spain')
                cy.get('#city').select('Madrid').should('contain', 'Madrid')
                cy.get('#country').select('Estonia')
                cy.get('#city').should('contain', '')
        })
    })



    describe('Section 2: Functional tests, created by Rimma', () => {
   
        it('Test 1. Check that all fields are filled in', () => {
            cy.get('#name').type('Ria');
            cy.get('input[name="email"]').type('ria@test.com');
            cy.get('#emailAlert span[ng-show="myForm.email.$error.email"]').should('not.be.visible')
            cy.get("#emailAlert").should('not.be.visible')
            cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')

        })

        it('Test 2. Check that all mandatory fields are filled in', () => {
            cy.get('#name').type('Ria')
            cy.get('input[name="email"]').type('ria@test.com')
            cy.get('#emailAlert span[ng-show="myForm.email.$error.email"]').should('not.be.visible')
            cy.get('#emailAlert').should('not.be.visible')
            cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
            cy.get('#birthday').type('1987-06-19')
            cy.get('input[type="checkbox"]').eq(0).check()
            cy.get('input[type="checkbox"]').eq(0).should('be.checked')
            cy.get("#checkboxAlert").should('not.be.visible')
            cy.get('button[type="submit"]').last().click()
            cy.go('back')
            cy.log('Back again in Registration form 3')
        
        })

        it('Test 3. Check the right behavior when mandatory fields are absent', () => {
            inputEmptyMandatoryFields();
        });
            function inputEmptyMandatoryFields() {
            cy.log('Leaving mandatory fields empty');
            cy.get('input[name="email"]').clear().type('a').clear().blur();
            cy.get('#name').clear().type('a').clear().blur()

            cy.get('div#emailAlert').should('be.visible')
            cy.get('div#emailAlert span[ng-show="myForm.email.$error.required"]').should('be.visible')
            .and('contain', 'Email is required')
            cy.get('input[ng-model="checkbox"]').uncheck()
            cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
            cy.get('button[type="submit"]').last().click()
           
          }          


        it('Test 4. Check the add file functionality', () => {

            // Uploading a file
            const fileName = "myFile";
            cy.get("#myFile").attachFile(fileName);
            cy.get('button[type="submit"]').click();
            cy.go("back");
            cy.log("Back again in Registration form 3");
          })

            })

        
