import generalPage from "../../../support/pages/generalPage"
import productPage from "../../../support/pages/productPage";
import { products } from "../../../fixtures/products";

//preconditions
before(() => {
    cy.visit('/')
    })

describe('Search for an existing product', () => {
    it('should enter the name of an existing product in the search bar in lower case', () => {
      cy.get(generalPage.txtSearchProduct).type(products.barbell.name.toLowerCase())
      cy.get(generalPage.cardSearchDropdown).contains(products.barbell.name).should('be.visible')
      
    });

    it('should click on the Search button.', () => {
      cy.get(generalPage.btnSearchProduct).click()
      cy.get(generalPage.lblLoading).should('not.exist')
      cy.get(productPage.pageProductDetailLanding).should('be.visible')
      cy.get(productPage.lblProductName).should('be.visible').and('have.text', products.barbell.name)
      cy.get(productPage.lblProductDescription).should('be.visible').and('have.text', products.barbell.description)
      cy.get(productPage.lblProductPrice).should('be.visible').and('have.text', products.barbell.price)
    });

    it('should return to landing page.', () => {
        cy.get(productPage.btnBackToShopping).click()
        cy.get(generalPage.lblLoading).should('not.exist')
        cy.get(generalPage.pageLanding).should('be.visible')
      });

    it('should enter the name of an existing product in the search bar in upper case', () => {
      cy.get(generalPage.txtSearchProduct).type(products.barbell.name.toUpperCase())
      cy.get(generalPage.cardSearchDropdown).contains(products.barbell.name).should('be.visible')
      
    });

    it('should click on the Search button.', () => {
      cy.get(generalPage.btnSearchProduct).click()
      cy.get(generalPage.lblLoading).should('not.exist')
      cy.get(productPage.pageProductDetailLanding).should('be.visible')
      cy.get(productPage.lblProductName).should('be.visible').and('have.text', products.barbell.name)
      cy.get(productPage.lblProductDescription).should('be.visible').and('have.text', products.barbell.description)
      cy.get(productPage.lblProductPrice).should('be.visible').and('have.text', products.barbell.price)
    });
  });
  