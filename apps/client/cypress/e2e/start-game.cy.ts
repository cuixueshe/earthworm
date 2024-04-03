describe("start game", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("navigates to the game scene as a guest", () => {
    cy.intercept("GET", "/courses/try", {
      statusCode: 200,
      body: {
        id: "1",
        title: "第一课",
        statements: [
          {
            chinese: "我",
            english: "I",
            id: 30725,
            soundmark: "/aɪ/",
          },
        ],
      },
    }).as("getTryCourse");

    cy.contains("开启Earthworm").click();
    // 目前对于游客来讲 是写死的 course id 为 1 ，所以这里暂时只验证是否有调用 try course 接口即可
    // 后面如果 try course 的 id 是基于后端接口返回的话 那么在修改此处的测试写法
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
        title: "第二课",
        statements: [
          {
            chinese: "我",
            english: "I",
            id: 30725,
            soundmark: "/aɪ/",
          },
        ],
      },
    }).as("getCourse");

    cy.contains("开启Earthworm").click(); // 点击 Get Started 按钮
    cy.wait("@fetchGameStart"); // 等待拦截的请求
    cy.wait("@getCourse"); // 等待拦截的请求

    cy.url().should("include", "/main/2");
  });
});
