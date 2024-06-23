import { ScoredVector } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";

export function getSynthesisPrompt(messages: { name: string, message: string }[]) {
    const userResponses = messages.filter(({ name }) => name === 'user');
    return `
Using the provided conversation surveying a user for their ideas, write a detailed summary for a new U.S. Senate bill that would address the user's desires. The input consists of a series of questions from the system and responses from the user. The questions aim to gather information about the problem the bill intends to address, the target beneficiaries, desired outcomes, specific motivations, existing rules or programs, potential supporters and opponents, ideas for solutions, implementation timeline, key contributors, and enforcement mechanisms.

Here is the list of questions and responses:

1. System: What is the main problem you want to fix?
   For example: healthcare, education, environment, etc.
   User: ${userResponses[0].message}

3. System: Who do you want to help with this bill?
   System: For example: children, elderly, families, businesses, etc.
   User: ${userResponses[1].message}


5. System: What do you want to happen because of this bill?
   System: For example: cleaner air, better schools, healthier people, etc.
   User: ${userResponses[2].message}


7. System: Is there something specific that made you think this bill is needed?
   System: For example: a recent event, a news story, something you saw, etc.
   User: ${userResponses[3].message}


9. System: Do you know if there are already rules or programs about this?
   System: If you're not sure, that's okay. We can find out.
   User: ${userResponses[4].message}


11. System: Who do you think will like this bill and who might not?
    System: For example: certain groups, organizations, businesses, etc.
    User: ${userResponses[5].message}


13. System: Do you have any ideas on how to fix the problem?
    System: For example: new rules, more money for programs, tax breaks, etc.
    User: ${userResponses[6].message}


15. System: When do you want the changes to start?
    System: For example: right away, over time, start with a small test, etc.
    User: ${userResponses[7].message}


17. System: Are there any people or groups you think should help make this bill work?
    System: For example: experts, community groups, organizations, etc.
    User: ${userResponses[8].message}


19. System: How do you think the new rules should be checked or enforced?
    System: For example: new government office, existing office, local groups, etc.
    User: ${userResponses[9].message}

Based on these interactions, generate a summary that captures the user's main objectives, specific motivations, target beneficiaries, and proposed solutions for the senate bill, including key contributors and enforcement mechanisms. The summary should be structured and concise, providing a clear overview of the user's proposed bill.
Output just the summary in plain text, without any headers or labels.
`;
}


export function getLLMPrompt(context: string | ScoredVector[]) {
    return (`You are an expert legislative assistant. Your task is to create a new bill based on the following information:
        INFORMATION START
      ${context}
        INFORMATION END
      Using the existing legislation as reference, considering the current events, and addressing the user's query, draft a new bill that addresses
      the user's concerns.
      Ensure that the new bill is relevant to the user's query and takes into account the current events provided.
      The structure of the bill should follow the exact format of the official bills created in the House of Representatives and Senate.
      Output the bill in HTML which can be inserted inside another document, avoiding any <style>, <script>, or <img> tags.
      It should be wrapped in a <div> and not contain <html> or <body>.
      `)
}
