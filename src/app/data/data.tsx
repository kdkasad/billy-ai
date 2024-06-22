export const userData = [
    {
        id: 1,
        avatar: '/User1.png',
        messages: [
            {
                id: 1,
                avatar: '/User1.png',
                name: 'system',
                message: 'What is the main problem you want to fix?',
            },
        ],
        name: 'system',
    },
];

export const systemQuestions = 
    [
        {
            "question": "What is the main problem you want to fix?",
            "example": "For example: healthcare, education, environment, etc."
        },
        {
            "question": "Who do you want to help with this bill?",
            "example": "For example: children, elderly, families, businesses, etc."
        },
        {
            "question": "What do you want to happen because of this bill?",
            "example": "For example: cleaner air, better schools, healthier people, etc."
        },
        {
            "question": "Is there something specific that made you think this bill is needed?",
            "example": "For example: a recent event, a news story, something you saw, etc."
        },
        {
            "question": "Do you know if there are already rules or programs about this?",
            "example": "If you're not sure, that's okay. We can find out."
        },
        {
            "question": "Who do you think will like this bill and who might not?",
            "example": "For example: certain groups, organizations, businesses, etc."
        },
        {
            "question": "Do you have any ideas on how to fix the problem?",
            "example": "For example: new rules, more money for programs, tax breaks, etc."
        },
        {
            "question": "When do you want the changes to start?",
            "example": "For example: right away, over time, start with a small test, etc."
        },
        {
            "question": "Are there any people or groups you think should help make this bill?",
            "example": "For example: experts, community groups, organizations, etc."
        },
        {
            "question": "How do you think the new rules should be checked or enforced?",
            "example": "For example: new government office, existing office, local groups, etc."
        }
    ]    

export type UserData = (typeof userData)[number];

export const loggedInUserData = {
    id: 5,
    avatar: '/LoggedInUser.jpg',
    name: 'user',
};

export type LoggedInUserData = (typeof loggedInUserData);

export interface Message {
    id: number;
    avatar: string;
    name: string;
    message: string;
}

export interface User {
    id: number;
    avatar: string;
    messages: Message[];
    name: string;
}