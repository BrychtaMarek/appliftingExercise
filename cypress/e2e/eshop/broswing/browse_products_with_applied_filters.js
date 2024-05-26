import categories from "../../../support/enums/categories"
import generalPage from "../../../support/pages/generalPage"
import productPage from "../../../support/pages/productPage"

before(() => { 
    cy.visit('/')
  });

describe('Browse product with applied filters (default sorting applied)', () => {   
    it('should check the sidebar', () => {
     cy.get(generalPage.cardSidebar).should('be.visible')
     .within(($sidebar)=>{
         cy.get(generalPage.lblCategory).contains(categories.Outdoor).should('be.visible').and('not.have.class', generalPage.attActiveFilter)
         cy.get(generalPage.lblCategory).contains(categories.Fitness).should('be.visible').and('not.have.class', generalPage.attActiveFilter)
     })
    })

    it('should click on the category name and apply filter', () => {
        cy.get(generalPage.lblCategory).contains(categories.Fitness).click().should('have.class', generalPage.attActiveFilter)
        cy.get(generalPage.lblLoading).should('be.visible')
        cy.get(generalPage.lblLoading).should('not.exist')
    })

    it('should check the header above products', () => {
        cy.get(generalPage.cardHeader).should('be.visible')
        .within(($header)=>{
            cy.get(generalPage.btnSortByPopularity).should('be.visible').and('have.class', generalPage.attActiveFilter)
            cy.get(generalPage.btnSortByPrice).should('be.visible').and('not.have.class', generalPage.attActiveFilter)
        })
    })

    it('should check the products section', () => {
        cy.get(generalPage.cardItemsRow).should('have.length', 5)
        cy.get(generalPage.lblProductItem).should('have.length', 30).and('be.visible')
    })

    it('should check the actual products', () => {
        cy.get(generalPage.lblProductItem)
        .each(($product)=>{
            cy.wrap($product)
            .within(()=>{
                cy.get(productPage.lblProductCategory).should('have.text', categories.Fitness)
                cy.get(productPage.lblProductName).should('be.visible')
                cy.get(productPage.lblProductImage).should('be.visible')
                cy.get(productPage.lblProductPrice).should('be.visible')
                cy.get(productPage.btnAddToCart).should('be.visible')
            })
        })
    })
});
  