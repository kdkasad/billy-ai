import { ScoredVector } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";

export const SYNTHESIS_PROMPT = `
Using the provided structured messages and example questions, synthesize a coherent summary detailing the type of senate bill a user would like to propose. The input consists of a series of questions from the system and responses from the user. The questions aim to gather information about the problem the bill intends to address, the target beneficiaries, desired outcomes, specific motivations, existing rules or programs, potential supporters and opponents, ideas for solutions, implementation timeline, key contributors, and enforcement mechanisms.

Here is the list of questions and responses:

1. **System:** What is the main problem you want to fix?
   **User:** [User's Response]
   
2. **System:** For example: healthcare, education, environment, etc.
   
3. **System:** Who do you want to help with this bill?
   **User:** [User's Response]
   
4. **System:** For example: children, elderly, families, businesses, etc.
   
5. **System:** What do you want to happen because of this bill?
   **User:** [User's Response]
   
6. **System:** For example: cleaner air, better schools, healthier people, etc.
   
7. **System:** Is there something specific that made you think this bill is needed?
   **User:** [User's Response]
   
8. **System:** For example: a recent event, a news story, something you saw, etc.
   
9. **System:** Do you know if there are already rules or programs about this?
   **User:** [User's Response]
   
10. **System:** If you're not sure, that's okay. We can find out.
    
11. **System:** Who do you think will like this bill and who might not?
    **User:** [User's Response]
    
12. **System:** For example: certain groups, organizations, businesses, etc.
    
13. **System:** Do you have any ideas on how to fix the problem?
    **User:** [User's Response]
    
14. **System:** For example: new rules, more money for programs, tax breaks, etc.
    
15. **System:** When do you want the changes to start?
    **User:** [User's Response]
    
16. **System:** For example: right away, over time, start with a small test, etc.
    
17. **System:** Are there any people or groups you think should help make this bill work?
    **User:** [User's Response]
    
18. **System:** For example: experts, community groups, organizations, etc.
    
19. **System:** How do you think the new rules should be checked or enforced?
    **User:** [User's Response]
    
20. **System:** For example: new government office, existing office, local groups, etc.
    
Based on these interactions, generate a synthesis that captures the user's main objectives, specific motivations, target beneficiaries, and proposed solutions for the senate bill, including key contributors and enforcement mechanisms. The synthesis should be structured and concise, providing a clear overview of the user's proposed bill.
`;


export function getLLMPrompt(context: string | ScoredVector[]) {
    
}