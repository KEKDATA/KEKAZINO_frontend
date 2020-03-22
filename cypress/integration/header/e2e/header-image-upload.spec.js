describe('Page: Upload Page, test: check header-drawer UI options', () => {
    it('open', () => {
        cy.visit('/');
    });

    it('Is exist header toggle button', () => {
        cy.get('[data-test-id="header-drawer-toggle-button"]');
        cy.get('[data-test-id="drawer-menu-icon"]');
    });

    it('Open drawer', () => {
        cy.get('[data-test-id="header-drawer-toggle-button"]').click();
    });

    it('Check is Upload button exist', () => {
        cy.get('[data-test-id="drawer-page-upload"]').contains('Upload');
    });

    it('Check is Kekazio|Roulette button exist', () => {
        cy.get('[data-test-id="drawer-page-kekazino"]').contains('Kekazino');
    });

    it('is Upload Page have actual skeleton - UI', () => {
        cy.get('[data-test-id="drawer-page-upload"]').click();
        cy.get('[data-test-id="image-upload-container"]');
        cy.get('[data-test-id="button-save-image"]').should('not.exist');
        cy.get('[data-test-id="button-delete-image"').should('not.exist');
        cy.get('[data-test-id="file-uploader-icon"]');
        cy.get('[data-test-id="file-uploader-button"]').contains('Choose your best photo!');
    });

    it('Open drawer', () => {
        cy.get('[data-test-id="header-drawer-toggle-button"]').click();
    });

    it('Click outside from drawer', () => {
        cy.get('[data-test-id="drawer"]').click('center');
    })

    it('Reload', () => {
        cy.reload();
    })
});
