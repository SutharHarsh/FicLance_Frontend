import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  UnderlineType,
  BorderStyle,
} from "docx";
import { saveAs } from "file-saver";

export const generateRequirementsDocument = async (conversation) => {
  const {
    projectName = "Project",
    clientName = "Client",
    requirements,
    deadline,
  } = conversation || {};

  // Handle different requirement structures
  let description = "No description provided";
  let tech_stack = [];
  let expertise = "Not specified";
  let duration = "Not specified";
  let requirementsList = [];
  let acceptance_criteria = [];

  const cleanLine = (value = "") => {
    if (typeof value !== "string") return String(value || "");
    return value
      .replace(/^\s*[\d]+[.)]\s+/, "") // remove leading numbering like "1. " or "2) "
      .replace(/^\s*[-•]\s+/, "") // remove leading dash or bullet
      .trim();
  };

  // If requirements is an object with message property
  if (requirements && requirements.message) {
    const message = requirements.message;
    description =
      message.description ||
      message.project_description ||
      "No description provided";
    tech_stack = (message.tech_stack || message.technologies || []).map(
      cleanLine
    );
    expertise = message.expertise || message.Expertise || "Not specified";
    duration = message.duration || message.Duration || "Not specified";

    // Extract acceptance criteria - this is the main requirements data
    if (Array.isArray(message.acceptance_criteria)) {
      acceptance_criteria = message.acceptance_criteria.map(cleanLine);
      requirementsList = [...acceptance_criteria];
    }

    // Also support generic requirements field
    if (Array.isArray(message.requirements)) {
      const cleanedReqs = message.requirements.map(cleanLine);
      requirementsList = requirementsList.length
        ? requirementsList.concat(cleanedReqs)
        : cleanedReqs;
    } else if (
      message.requirements &&
      typeof message.requirements === "object"
    ) {
      const entries = Object.entries(message.requirements).map(
        ([key, value]) =>
          `${key}: ${typeof value === "object" ? JSON.stringify(value) : value}`
      );
      requirementsList = requirementsList.length
        ? requirementsList.concat(entries.map(cleanLine))
        : entries.map(cleanLine);
    }
  } else if (requirements) {
    // Direct requirements object
    description =
      requirements.description ||
      requirements.project_description ||
      "No description provided";
    tech_stack = (
      requirements.tech_stack ||
      requirements.technologies ||
      []
    ).map(cleanLine);
    expertise =
      requirements.expertise || requirements.Expertise || "Not specified";
    duration =
      requirements.duration || requirements.Duration || "Not specified";
    
    // Extract acceptance criteria from direct requirements
    if (Array.isArray(requirements.acceptance_criteria)) {
      acceptance_criteria = requirements.acceptance_criteria.map(cleanLine);
      requirementsList = [...acceptance_criteria];
    }
  }

  // Format deadline
  let formattedDeadline = "Not set";
  if (deadline) {
    const date = new Date(deadline);
    formattedDeadline = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Create document
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title
          new Paragraph({
            text: "Project Requirements Document",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 400,
            },
          }),

          // Project Name
          new Paragraph({
            children: [
              new TextRun({
                text: "Project Name: ",
                bold: true,
                size: 24,
              }),
              new TextRun({
                text: projectName,
                size: 24,
              }),
            ],
            spacing: {
              after: 200,
            },
          }),

          // Client Name
          new Paragraph({
            children: [
              new TextRun({
                text: "Client: ",
                bold: true,
                size: 24,
              }),
              new TextRun({
                text: clientName,
                size: 24,
              }),
            ],
            spacing: {
              after: 200,
            },
          }),

          // Deadline
          new Paragraph({
            children: [
              new TextRun({
                text: "Deadline: ",
                bold: true,
                size: 24,
              }),
              new TextRun({
                text: formattedDeadline,
                size: 24,
              }),
            ],
            spacing: {
              after: 400,
            },
          }),

          // Divider
          new Paragraph({
            text: "",
            spacing: {
              after: 200,
            },
            border: {
              bottom: {
                color: "CCCCCC",
                space: 1,
                style: BorderStyle.SINGLE,
                size: 6,
              },
            },
          }),

          // Project Description Section
          new Paragraph({
            text: "Project Description",
            heading: HeadingLevel.HEADING_2,
            spacing: {
              before: 400,
              after: 200,
            },
          }),

          new Paragraph({
            text: description,
            spacing: {
              after: 400,
            },
          }),

          // Tech Stack Section
          new Paragraph({
            text: "Technology Stack",
            heading: HeadingLevel.HEADING_2,
            spacing: {
              before: 400,
              after: 200,
            },
          }),

          // Tech stack items
          ...tech_stack.map(
            (tech) =>
              new Paragraph({
                text: tech,
                spacing: {
                  after: 100,
                },
                bullet: {
                  level: 0,
                },
              })
          ),

          // If no tech stack
          ...(tech_stack.length === 0
            ? [
                new Paragraph({
                  text: "No specific technologies specified",
                  spacing: {
                    after: 400,
                  },
                }),
              ]
            : []),

          // Requirements Details
          new Paragraph({
            text: "Detailed Requirements",
            heading: HeadingLevel.HEADING_2,
            spacing: {
              before: 400,
              after: 200,
            },
          }),

          // Add numbered requirements from the requirements list
          ...(requirementsList.length > 0
            ? requirementsList.map(
                (req, index) =>
                  new Paragraph({
                    text: `${index + 1}. ${
                      typeof req === "object" ? JSON.stringify(req) : req
                    }`,
                    spacing: {
                      after: 200,
                    },
                  })
              )
            : [
                new Paragraph({
                  text: "No specific requirements listed",
                  spacing: {
                    after: 200,
                  },
                }),
              ]),

          // Footer
          new Paragraph({
            text: "",
            spacing: {
              before: 400,
              after: 200,
            },
            border: {
              top: {
                color: "CCCCCC",
                space: 1,
                style: BorderStyle.SINGLE,
                size: 6,
              },
            },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Generated on: ",
                italics: true,
                size: 20,
              }),
              new TextRun({
                text: new Date().toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                }),
                italics: true,
                size: 20,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),

          // new Paragraph({
          //   children: [
          //     new TextRun({
          //       text: "Project Submission Process",
          //       bold: true,
          //       size: 24,
          //     }),
          //     new TextRun({
          //       text: "After completing your project copy your github repo url then click on the github icon and paste the link there for submission.",
          //       size: 24,
          //     }),
          //   ],
          //   spacing: {
          //     brefore: 200,
          //     after: 200,
          //   },
          // }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.HEADING_1,
            spacing: {
              before: 400,
              after: 200,
            },
            children: [
              new TextRun({
                text: "Project Submission Process",
                bold: true,
                size: 48, // docx size is in HALF-POINTS (24pt × 2)
                color: "FF5733", // Hex color WITHOUT #
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 200,
            },
            children: [
              new TextRun({
                text: "⚠️  ",
                size: 28,
              }),
              new TextRun({
                text: "Once your project is complete, copy the GitHub repository URL. Click the GitHub icon below the message input field in the chat, paste the link, and submit your project.",
                size: 28,
                bold: true,
                color: "B45309",
              }),
            ],
          }),
        ],
      },
    ],
  });

  return doc;
};

export const downloadDocument = async (conversation) => {
  try {
    const doc = await generateRequirementsDocument(conversation);
    const blob = await Packer.toBlob(doc);
    const fileName = `${
      conversation?.projectName || "Project"
    }_Requirements.docx`;
    saveAs(blob, fileName);
  } catch (error) {
    console.error("Error generating document:", error);
    throw error;
  }
};
