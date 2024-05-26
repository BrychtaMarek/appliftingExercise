import cartPage from "../../../support/pages/cartPage";
import checkoutPage from "../../../support/pages/checkoutPage";
import generalPage from "../../../support/pages/generalPage"
import productPage from "../../../support/pages/productPage"
import { products } from "../../../fixtures/products";

let secondProductName, secondProductPrice;

before(() => {
  cy.visit('/')
});

describe('Google Chrome E2E flow', () => {
    it('should display eshop landing page', () => {
      cy.get(generalPage.pageLanding).should('be.visible')
      cy.get(generalPage.cardItemsRow).should('have.length', 5)
      cy.get(generalPage.lblProductItem).should('have.length', 30)
      .each(($product)=>{
        cy.wrap($product)
        .should('be.visible')
        .find(productPage.lblProductImage)
        .should('be.visible')

        cy.wrap($product)
        .find(productPage.lblProductPrice)
        .should('be.visible')

        cy.wrap($product)
        .find(productPage.lblProductName)
        .should('be.visible')
      })
    });
  
    it('should search for an existing product', () => {
      cy.get(generalPage).type(products.barbell.name)
      cy.get(generalPage.btnSearchProduct).click()
      cy.get(generalPage.lblLoading).should('not.exist')
      cy.get(productPage.pageProductDetailLanding).should('be.visible')
    });
  
    it('should add product to cart and continue shopping', () => {
      cy.get(productPage.btnAddToCart).click();
      cy.get(generalPage.lblCartQuantity).should('have.text', '1')
      cy.get(generalPage.lblPositiveToast).should('be.visible').and('have.text', 'Product was added to cart.');
      cy.get(generalPage.cardDialogModalWindowGeneric).should('be.visible')
      .within(($dialog)=>{
        cy.get(generalPage.btnViewCart).should('be.visible')
        cy.get(generalPage.btnProceed).should('be.visible').click()
      })
      cy.get(generalPage.cardDialogModalWindowGeneric).should('not.exist')
      cy.get(generalPage.lblLoading).should('not.exist')
      cy.get(generalPage.pageLanding).should('be.visible')
    });
  
    it('should switch to the second page in pagination', () => {
      cy.scrollTo('bottom'); //or cy.scrollIntoView() after getting pagination
      cy.get(generalPage.lblPagination).contains('2').click()
      cy.get(generalPage.lblLoading).should('not.exist')
      cy.get(generalPage.cardItemsRow).should('have.length', 5)
      cy.get(generalPage.lblProductItem).should('have.length', 30)
    });
  
    it('should add a product from page 2 to cart and view cart', () => {
      cy.get(generalPage.lblProductItem).first().within(($product)=>{
        cy.get(productPage.lblProductName).then(($name)=>{
          secondProductName = $name.text()
        })

        cy.get(productPage.lblProductPrice).then(($price)=>{
          secondProductPrice = $price.text()
        })
      })
  
      cy.get(productPage.btnAddToCart).first().click()
      cy.get(generalPage.lblCartQuantity).should('have.text', '2')
      cy.get(generalPage.lblPositiveToast).should('be.visible').and('have.text', 'Product was added to cart.');
      cy.get(generalPage.cardDialogModalWindowGeneric).should('be.visible')
      .within(($dialog)=>{
        cy.get(generalPage.btnProceed).should('be.visible')
        cy.get(generalPage.btnViewCart).should('be.visible').click()
      })
      cy.get(generalPage.cardDialogModalWindowGeneric).should('not.exist')
      cy.get(generalPage.lblLoading).should('not.exist')
      cy.get(cartPage.pageCartLanding).should('be.visible')
    });
  
    it('should check the cart page', () => {
      cy.get(cartPage.lblAddedProduct).should('have.length', 2).first().should('contain.text', products.barbell.name).and('contain.text', products.barbell.price)
      cy.get(cartPage.lblAddedProduct).eq(1).should('contain.text', secondProductName).and('contain.text', secondProductPrice)
      let total = parseFloat(products.barbell.price) + parseFloat(secondProductPrice)
      total = toString(total).toFixed(2)
      cy.get(cartPage.lblTotalPrice).should('have.text', `Total: $${total}`)
    });
  
    it('should increase product quantity for one product', () => {
      cy.get(productPage.btnIncreaseQuantity).first().click()
      cy.get(cartPage.lblProductQuantity).first().should('have.text', '2')
      let total = (parseFloat(products.barbell.price)* 2) + parseFloat(secondProductPrice)
      total = toString(total).toFixed(2)
      cy.get(cartPage.lblTotalPrice).should('have.text', `Total: $${total}`)
    });
  
    it('should proceed to checkout', () => {
      cy.get(cartPage.btnCheckout).click();
      cy.get(generalPage.lblLoading).should('not.exist')
      cy.get(checkoutPage.pageCheckoutLanding).should('be.visible')
    });
  
    it('should enter valid shipping and payment details', () => {
      cy.get(checkoutPage.txtAddress).type('934 Kings Cross, London, United Kingdom').should('not.have.class', generalPage.attNegative)
      cy.get(checkoutPage.txtCardNumber).type('1234567812345678').should('not.have.class', generalPage.attNegative)
      cy.get(checkoutPage.txtCardHolder).type('Foo Bar').should('not.have.class', generalPage.attNegative)
      cy.get(checkoutPage.txtSecurityCode).type('666').should('not.have.class', generalPage.attNegative)
      
    });
  
    it('should complete the order', () => {
      cy.get(checkoutPage.btnConfirmAndPay).click();
      cy.get(generalPage.lblLoading).should('not.exist')
      cy.processpayment()
      cy.get(checkoutPage.pageOrderSummaryLanding).should('be.visible')
    });
  });
  