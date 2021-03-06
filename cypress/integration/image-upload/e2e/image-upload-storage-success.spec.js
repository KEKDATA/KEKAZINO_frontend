describe('Page: Image upload, test: success uploaded image with Local Storage', () => {
    it('open', () => {
        cy.visit('/');
    });

    it('Is exist file uploader button', () => {
        cy.get('[data-test-id="file-uploader-button"]').contains('Choose your best photo!');
    });

    it('Is exist file uploader icon before upload image', () => {
        cy.get('[data-test-id="file-uploader-icon"]')
    });

    it('Upload image', async () => {
        const fileName = 'testFace.png';
        const fileContent = await cy.fixture(fileName, 'base64');

        cy.get('[data-test-id="file-uploader-input"]').upload({ fileContent, fileName, mimeType: 'image/png' });
    });

    it('Is image src exist', () => {
        cy.get('[data-test-id="image-upload-container"]').find('img').should('have.attr', 'src')
    });

    it('Is button save exist', () => {
        cy.get('[data-test-id="button-save-image"]').contains('Save it!')
    });

    it('Is button delete exist', () => {
        cy.get('[data-test-id="button-delete-image"]').contains('Nah, delete it')
    });

    it('Is checkbox Local Storage exist', () => {
        cy.get('.image-uploader__storage-desc').contains('Would you like to save the image inside Storage?')
    });

    it('Set images to Local Storage', () => {
        cy.get('.image-uploader__storage-desc').click();
    })

    it('onClick button save with Saved image to Local Storage', () => {
        cy.get('[data-test-id="button-save-image"]').contains('Save it!').click().should(() => {
            expect(localStorage.getItem('image')).to.be.exist
        });
    });

    it('Is roulette container exist', () => {
        cy.get('[data-test-id="roulette-counts-container"]').should('be.exist');
    })

    it('Reload', () => {
        cy.reload();
    })
});
