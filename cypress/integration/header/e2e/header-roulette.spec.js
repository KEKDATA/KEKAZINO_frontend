describe('Page: Roulette|Kekazino Page, test: check header-drawer UI options', () => {
    it('open', () => {
        cy.visit('/roulette');
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
        cy.get('[data-test-id="drawer-page-kekazino"]').click();

        cy.get('[data-test-id="roulette-counts-container"]').should('not.exist');
        cy.get('[data-test-id="roulette-without-image"]').contains('Oops, we did not find saved image.')
        cy.get('[data-test-id="roulette-button-without-image-to-upload-page"]').contains('Back to image upload page');
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
