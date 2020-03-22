describe('Page: Roulette|Kekazino, test: Default without uploaded image', () => {
    it('open', () => {
        cy.visit('/roulette');
    });

    it('Is roll empty', () => {
        cy.get('[data-test-id="roulette-counts-container"]').should('not.exist');
    });

    it('Default message for not uploaded image', () => {
        cy.get('[data-test-id="roulette-without-image"]').contains('Oops, we did not find saved image.')
    });

    it('Is button to Upload page with default message exist', () => {
        cy.get('[data-test-id="roulette-button-without-image-to-upload-page"]').contains('Back to image upload page');
    });

    it('Is Image upload page exist after back-button without image', () => {
        cy.get('[data-test-id="roulette-button-without-image-to-upload-page"]').click();
        cy.get('[data-test-id="image-upload-container"]');
        cy.get('[data-test-id="button-save-image"]').should('not.exist');
        cy.get('[data-test-id="button-delete-image"').should('not.exist');
        cy.get('[data-test-id="file-uploader-icon"]');
        cy.get('[data-test-id="file-uploader-button"]').contains('Choose your best photo!');
    });

    it('Reload', () => {
        cy.reload();
    })
});
