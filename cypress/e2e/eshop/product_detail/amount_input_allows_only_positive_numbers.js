import generalPage from "../../../support/pages/generalPage"
import productPage from "../../../support/pages/productPage";
import { products } from "../../../fixtures/products";

//preconditions
before(() => {
      cy.visit('/')
      cy.get(generalPage.txtSearchProduct).type(products.barbell.name.toLowerCase())
      cy.get(generalPage.btnSearchProduct).click()
      cy.get(generalPage.lblLoading).should('not.exist')
      cy.get(productPage.pageProductDetailLanding).should('be.visible')
    })

describe('Quantity input should allow only positive numbers', () => {
    it('should not allow writing "XYZ" to quantity input', () => {
      cy.get(productPage.txtProductQuantity).should('have.value', 1).and('be.visible')
      
      cy.get(productPage.txtProductQuantity).type('XYZ')

      cy.get(productPage.txtProductQuantity).should('have.value', 1).and('be.visible')
    });

    it('should not allow writing "-1" to amount inputquantity ', () => {
        cy.get(productPage.txtProductQuantity).type('-1').blur()
  
        cy.get(productPage.txtProductQuantity).should('have.value', 1).and('be.visible')
    });

    it('should not allow writing "0" to quantity input', () => {
        cy.get(productPage.txtProductQuantity).type('-1').blur()
  
        cy.get(productPage.txtProductQuantity).should('have.value', 1).and('be.visible')
    });

    it('should not allow writing "e" to quantity input', () => {
        //e can be considered a number
        cy.get(productPage.txtProductQuantity).type('e')

        cy.get(productPage.txtProductQuantity).should('have.value', 1).and('be.visible')
    });

  });
  