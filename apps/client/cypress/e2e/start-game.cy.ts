describe("start game", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("navigates to the game scene as a guest", () => {
    cy.intercept("GET", "/courses/try", {
      statusCode: 200,
      body: {
        id: "1",
        title: "Bài 1",
        statements: [
          {
            nativeText: "我",
            english: "I",
            id: 30725,
            soundmark: "/aɪ/",
          },
        ],
      },
    }).as("getTryCourse");

    cy.contains("Bắt đầu Earthworm").click();
    cy.wait("@getTryCourse").its("request.method").should("equal", "GET");
    cy.url().should("include", "/main/1");
  });

  it("navigates to the game scene and shows course for logged-in users", () => {
    cy.login({
      phone: "13812345678",
      password: "yourPassword",
    });

    cy.intercept("POST", "/game/start", {
      statusCode: 200,
      body: {
        cId: 2,
      },
    }).as("fetchGameStart");

    cy.intercept("GET", "/courses/2", {
      statusCode: 200,
      body: {
        id: "2",
        title: "Bài 2",
        statements: [
          {
            nativeText: "我",
            english: "I",
            id: 30725,
            soundmark: "/aɪ/",
          },
        ],
      },
    }).as("getCourse");

    cy.contains("Bắt đầu Earthworm").click(); // Click the Get Started button
    cy.wait("@fetchGameStart"); // 等待拦截的请求
    cy.wait("@getCourse"); // 等待拦截的请求

    cy.url().should("include", "/main/2");
  });
});
