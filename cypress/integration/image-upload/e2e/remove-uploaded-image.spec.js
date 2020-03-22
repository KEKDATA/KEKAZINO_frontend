describe('Page: Upload image, test: remove uploaded image', () => {
    it('open', () => {
        cy.visit('/');
    })

    it('Is exist file uploader button', () => {
        cy.get('[data-test-id="file-uploader-button"]').contains('Choose your best photo!');
    })

    it('Is exist file uploader icon before upload image', () => {
        cy.get('[data-test-id="file-uploader-icon"]')
    })

    it('Upload image', async () => {
        const fileName = 'testFace.png';
        const fileContent = await cy.fixture(fileName, 'base64');

        cy.get('[data-test-id="file-uploader-input"]').upload({ fileContent, fileName, mimeType: 'image/png' });
    })

    it('Is image src exist', () => {
        cy.get('[data-test-id="image-upload-container"]').find('img').should('have.attr', 'src')
    })

    it('Is button save exist', () => {
        cy.get('[data-test-id="button-save-image"]').contains('Save it!')
    })

    it('Is button delete exist', () => {
        cy.get('[data-test-id="button-delete-image"]').contains('Nah, delete it')
    })

    it('onClick button delete', () => {
        cy.get('[data-test-id="button-delete-image"]').contains('Nah, delete it').click();
    })

    it('Is image src not exist', () => {
        cy.get('[data-test-id="image-upload-container"]').find('img').should('not.have.attr', 'src')
    })

    it('Is button save not exist', () => {
        cy.get('[data-test-id="button-save-image"]').should('not.be.exist');
    })

    it('Is button delete not exist', () => {
        cy.get('[data-test-id="button-delete-image"]').should('not.be.exist')
    })

    it('Reload', () => {
        cy.reload();
    })
})
