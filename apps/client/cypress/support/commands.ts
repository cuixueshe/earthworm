/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add(
  "login",
  function ({ username, password }: { username: string; password: string }) {
    const user = {
      phone: "",
      username: "13812345678",
      nickname: "acui",
      userId: 1,
    };
    cy.intercept("POST", "/auth/login", (req) => {
      expect(req.body.username).to.eq(username);
      expect(req.body.password).to.eq(password);

      // 继续允许请求到达服务器或返回模拟的响应
      req.reply({
        statusCode: 200,
        body: {
          // 模拟的登录成功响应数据
          token: "faketoken",
          user,
        },
      });
    }).as("login");

    cy.visit("/auth/login");

    cy.get('input[type="text"]').as("phoneInput").type("13812345678");
    cy.get('input[type="password"]')
      .as("passwordInput")
      .type("yourPassword{enter}");
    cy.wait("@login");

    cy.window().then((win) => {
      const tokenInStorage = win.localStorage.getItem("token");
      expect(tokenInStorage).to.eq("faketoken");
    });

    // we should be redirected to /
    cy.wait(1000); // 等待 1 秒，确保页面加载完成
    cy.url().should("eq", Cypress.config("baseUrl"));

    cy.contains(user.nickname).should("be.visible"); // 然后检查 "User Info" 是否可见
  }
);
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(params: { username: string; password: string }): Chainable<void>;
      //       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}

export { };

