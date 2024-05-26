import cartPage from "./pages/cartPage"
import productPage from "./pages/productPage"
import generalPage from "./pages/generalPage"

Cypress.Commands.add('processPayment', () => { 
    //to be implemented
 })

Cypress.Commands.add('addProduct', (product, amount = 1, viewCart = false) => { 
    cy.visit('/')
    cy.get(generalPage.txtSearchProduct).type(product)
    cy.get(generalPage.btnSearchProduct).click()
    cy.get(generalPage.lblLoading).should('not.exist')
    cy.get(productPage.pageProductDetailLanding).should('be.visible')
    cy.get(productPage.txtProductQuantity).clear().type(amount).should('have.value', amount)
    cy.get(productPage.btnAddToCart).click()
    cy.get(generalPage.lblPositiveToast).should('be.visible').and('have.text', 'Product was added to cart.')
    cy.get(generalPage.cardDialogModalWindowGeneric).should('be.visible')
        .within(($dialog)=>{
            if (viewCart) {
                cy.get(generalPage.btnViewCart).click()
                cy.get(generalPage.cardDialogModalWindowGeneric).should('not.exist')
                cy.get(generalPage.lblLoading).should('not.exist')
                cy.get(cartPage.pageCartLanding).should('be.visible')
            } else {
                cy.get(generalPage.btnProceed).click()
                cy.get(generalPage.cardDialogModalWindowGeneric).should('not.exist')
                cy.get(generalPage.lblLoading).should('not.exist')
                cy.get(generalPage.pageLanding).should('be.visible')
            }
        })   
})