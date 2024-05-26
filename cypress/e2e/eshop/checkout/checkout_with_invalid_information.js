import cartPage from "../../../support/pages/cartPage"
import checkoutPage from "../../../support/pages/checkoutPage"
import generalPage from "../../../support/pages/generalPage"
import { products } from "../../../fixtures/products"

//preconditions
before(() => {
    cy.addProduct(products.barbell.name, 1, true)

    cy.get(cartPage.btnCheckout).click();
    cy.get(generalPage.lblLoading).should('not.exist')
    cy.get(checkoutPage.pageCheckoutLanding).should('be.visible')
  })

describe('Checkout with invalid information should not be possible', () => {
    it('should highlight address input with invalid values in red', () => {
      cy.get(checkoutPage.txtAddress).type('Invalid Address').blur()
      cy.get(checkoutPage.txtAddress).should('have.class', generalPage.attNegative)
    });

    it('should display negative toast when trying to submit', () => {
        cy.get(checkoutPage.btnConfirmAndPay).click()
        cy.get(generalPage.lblNegativeToast).should('be.visible').and('have.text', 'Given address is not supported, please review and change details.')
        cy.get(checkoutPage.txtAddress).should('have.class', generalPage.attNegative)
      });


    it('should not display validation errors for valid address', () => {
        cy.get(checkoutPage.txtAddress).clear().type('934 Kings Cross, London, United Kingdom').blur();
        cy.get(checkoutPage.txtAddress).should('not.have.class', generalPage.attNegative)
      });

    it('should display validation errors for invalid card details', () => {
        cy.get(checkoutPage.txtCardNumber).type('Invalid Card Number').blur();
        cy.get(checkoutPage.txtCardNumber).should('have.class', generalPage.attNegative)

        cy.get(checkoutPage.txtCardHolder).type('12345').blur();
        cy.get(checkoutPage.txtCardHolder).should('have.class', generalPage.attNegative)

        cy.get(checkoutPage.txtSecurityCode).type('12').blur()
        cy.get(checkoutPage.txtSecurityCode).should('have.class', generalPage.attNegative)
      });

      it('should not allow user to continue without valid card details', () => {
        cy.get(checkoutPage.btnConfirmAndPay).click()
        cy.get(generalPage.lblNegativeToast).should('be.visible').and('have.text', 'Given card details are not valid, please review and change details.')
        cy.get(checkoutPage.txtCardNumber).should('have.class', generalPage.attNegative)
        cy.get(checkoutPage.txtCardHolder).should('have.class', generalPage.attNegative)
        cy.get(checkoutPage.txtSecurityCode).should('have.class', generalPage.attNegative)
      });
  });
  