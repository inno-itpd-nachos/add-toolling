const { analyzeDiagram } = require("../../src/analysis/analyzeDiagram");

describe("analyzeDiagram", () => {
  test("3 components with 2 relations", () => {
    // Arrange
    const parsed = [
      {
        elements: [
          { name: "WebUI", title: "Web UI" },
          { name: "ApiGateway", title: "API Gateway" },
          { name: "ScoringService", title: "Scoring Service" },
          {
            left: "WebUI",
            right: "ApiGateway",
            leftType: "Unknown",
            rightType: "Unknown",
            leftArrowHead: "",
            rightArrowHead: ">",
            leftArrowBody: "-",
            rightArrowBody: "-",
            leftCardinality: "",
            rightCardinality: "",
            label: "",
            hidden: false,
          },
          {
            left: "ApiGateway",
            right: "ScoringService",
            leftType: "Unknown",
            rightType: "Unknown",
            leftArrowHead: "",
            rightArrowHead: ">",
            leftArrowBody: "-",
            rightArrowBody: "-",
            leftCardinality: "",
            rightCardinality: "",
            label: "",
            hidden: false,
          },
        ],
      },
    ];

    // Act
    const result = analyzeDiagram(parsed);

    // Assert
    expect(result.componentCount).toBe(3);
    expect(result.relationCount).toBe(2);
    expect(result.isolatedComponents).toEqual([]);
    expect(result.hasCycles).toBe(false);
  });

  test("components without relations", () => {
    // Arrange
    const parsed = [
      {
        elements: [
          { name: "UserService", title: "User Service" },
          { name: "OrderService", title: "Order Service" },
          { name: "BillingService", title: "Billing Service" },
        ],
      },
    ];

    // Act
    const result = analyzeDiagram(parsed);

    // Assert
    expect(result.componentCount).toBe(3);
    expect(result.relationCount).toBe(0);
    expect(result.isolatedComponents.sort()).toEqual(
      ["UserService", "OrderService", "BillingService"].sort(),
    );
    expect(result.hasCycles).toBe(false);
  });

  test("diagram with an isolated component", () => {
    // Arrange
    const parsed = [
      {
        elements: [
          { name: "Frontend", title: "Frontend" },
          { name: "Backend", title: "Backend" },
          { name: "Reporting", title: "Reporting" },
          {
            left: "Frontend",
            right: "Backend",
            leftType: "Unknown",
            rightType: "Unknown",
            leftArrowHead: "",
            rightArrowHead: ">",
            leftArrowBody: "-",
            rightArrowBody: "-",
            leftCardinality: "",
            rightCardinality: "",
            label: "",
            hidden: false,
          },
        ],
      },
    ];

    // Act
    const result = analyzeDiagram(parsed);

    // Assert
    expect(result.componentCount).toBe(3);
    expect(result.relationCount).toBe(1);
    expect(result.isolatedComponents).toEqual(["Reporting"]);
    expect(result.hasCycles).toBe(false);
  });

  test("components and interface with relations", () => {
    // Arrange
    const parsed = [
      {
        elements: [
          { name: "AuthService", title: "Auth Service" },
          {
            name: "PaymentAPI",
            title: "Payment API",
            members: [],
            extends_: [],
            implements_: [],
            generics: [],
            stereotypes: [],
          },
          { name: "OrderProcessor", title: "Order Processor" },
          {
            left: "AuthService",
            right: "PaymentAPI",
            leftType: "Unknown",
            rightType: "Unknown",
            leftArrowHead: "",
            rightArrowHead: ">",
            leftArrowBody: "-",
            rightArrowBody: "-",
            leftCardinality: "",
            rightCardinality: "",
            label: "",
            hidden: false,
          },
          {
            left: "OrderProcessor",
            right: "PaymentAPI",
            leftType: "Unknown",
            rightType: "Unknown",
            leftArrowHead: "",
            rightArrowHead: ">",
            leftArrowBody: "-",
            rightArrowBody: "-",
            leftCardinality: "",
            rightCardinality: "",
            label: "",
            hidden: false,
          },
        ],
      },
    ];

    // Act
    const result = analyzeDiagram(parsed);

    // Assert
    expect(result.componentCount).toBe(3);
    expect(result.relationCount).toBe(2);
    expect(result.isolatedComponents).toEqual([]);
    expect(result.hasCycles).toBe(false);
  });

  test("broken diagram (no relations)", () => {
    // Arrange
    const parsed = [
      {
        elements: [{ name: "Broken", title: "Broken Service" }],
      },
    ];

    // Act
    const result = analyzeDiagram(parsed);

    // Assert
    expect(result.componentCount).toBe(1);
    expect(result.relationCount).toBe(0);
    expect(result.isolatedComponents).toEqual(["Broken"]);
    expect(result.hasCycles).toBe(false);
  });
});
