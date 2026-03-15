describe('Login Form E2E Testleri', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.contains('Sign In').should('be.visible');

    // sayfa render olana kadar bekle
    cy.get('input[name="email"]', { timeout: 10000 }).should('be.visible');
  });

  // -----------------------------
  // a) Başarılı form doldurulduğunda
  // -----------------------------
  it('Başarılı form doldurulduğunda submit edebiliyorum', () => {
    cy.get('input[name="email"]').type('ceylan@gmail.com');
    cy.get('input[name="password"]').type('12345Cey.');
    cy.get('input[name="terms"]').check(); // checkbox işaretle

    // Giriş butonuna tıkla
    cy.get('.login-btn').should('be.enabled').click();

    // Success sayfasına yönlendirme kontrolü
    cy.url().should('include', '/success');

    // Success mesajları görünüyor mu
    cy.contains('Giriş Başarılı 🎉').should('be.visible');
    cy.contains('Hoş geldiniz! Giriş işleminiz başarıyla tamamlandı.').should('be.visible');

    // Success sayfasındaki buton
    cy.get('.success-btn').should('be.visible').click();

    // Ana sayfaya dönüldü mü
    cy.url().should('include', '/');
    cy.contains('Sign In').should('be.visible');
  });

  // -----------------------------
  // b) Hatalı durumlar
  // -----------------------------
  context('Hatalı durumlarda hata mesajları ve buton kontrolü', () => {

    it('Email yanlış girildiğinde', () => {
      cy.get('input[name="email"]').type('invalidemail'); // geçersiz email
      cy.get('input[name="password"]').type('Test1234');
      cy.get('input[name="terms"]').check();

      // Giriş butonu disabled mı?
      cy.get('.login-btn').should('be.disabled');

      // Hata mesajı
      cy.get('.error')
        .should('have.length', 1)
        .and('contain', 'Geçerli bir email giriniz');
    });

    it('Email ve password kurallara uymadığında', () => {
      cy.get('input[name="email"]').type('invalidemail');
      cy.get('input[name="password"]').type('123');
      cy.get('input[name="terms"]').check();

      // Buton disabled mı?
      cy.get('.login-btn').should('be.disabled');

      // 2 hata mesajı kontrolü
      cy.get('.error').should('have.length', 2);
      cy.get('.error').eq(0).should('contain', 'Geçerli bir email giriniz');
      cy.get('.error').eq(1).should('contain', 'Şifre en az 4 karakter, büyük harf ve sayı içermelidir');
    });

    it('Email ve password doğru ama kuralları kabul etmedim', () => {
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('Test1234');
      // checkbox işaretlenmedi

      // Buton disabled mı?
      cy.get('.login-btn').should('be.disabled');
    });

  });
});