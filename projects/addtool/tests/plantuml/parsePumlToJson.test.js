
const { parsePumlToJson } = require("../../src/plantuml/parsePumlToJson");
describe("parsePumlToJson", () => {
  test("parses 3 components with 2 relations", () => {
    // Arrange
    const puml = `
    @startuml
component "Web UI" as WebUI
component "API Gateway" as ApiGateway
component "Scoring Service" as ScoringService

WebUI --> ApiGateway
ApiGateway --> ScoringService
@enduml
    `;

    const expected = [
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
            hidden: false
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
            hidden: false
          }
        ]
      }
    ];

    // Act
    const result = parsePumlToJson(puml);
    console.log("RESULT:", JSON.stringify(result, null, 2));
    // Assert
    expect(result).toEqual(expected);
  });

  test("parses components without relations", () => {
    // Arrange
    const puml = `
    @startuml
component "User Service" as UserService
component "Order Service" as OrderService
component "Billing Service" as BillingService
@enduml

    `;

    const expected = [
      {
        elements: [
          { name: "UserService", title: "User Service" },
          { name: "OrderService", title: "Order Service" },
          { name: "BillingService", title: "Billing Service" }
        ]
      }
    ];

    // Act
    const result = parsePumlToJson(puml);

    // Assert
    expect(result).toEqual(expected);
  });

  test("parses diagram with an isolated component", () => {
    // Arrange
    const puml = `
    @startuml
component "Frontend" as Frontend
component "Backend" as Backend
component "Reporting" as Reporting

Frontend --> Backend
@enduml
    `;

    const expected = [
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
            hidden: false
          }
        ]
      }
    ];

    // Act
    const result = parsePumlToJson(puml);

    // Assert
    expect(result).toEqual(expected);
  });

  test("parses components and interface with relations", () => {
    // Arrange
    const puml = `
    @startuml
component "Auth Service" as AuthService
interface "Payment API" as PaymentAPI
component "Order Processor" as OrderProcessor

AuthService --> PaymentAPI
OrderProcessor --> PaymentAPI
@enduml
    `;

    const expected = [
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
            stereotypes: []
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
            hidden: false
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
            hidden: false
          }
        ]
      }
    ];

    // Act
    const result = parsePumlToJson(puml);

    // Assert
    expect(result).toEqual(expected);
  });

  test("parses broken diagram into partial result", () => {
    // Arrange
    const puml = `
    @startuml
component "Broken Service" as Broken
Broken --> 
@enduml
    `;

    const expected = [
      {
        elements: [
          { name: "Broken", title: "Broken Service" }
        ]
      }
    ];

    // Act
    const result = parsePumlToJson(puml);

    // Assert
    expect(result).toEqual(expected);
  });
});
