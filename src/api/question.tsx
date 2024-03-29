import axios from "axios";
import {
    IAddComment,
    IAddQuestion,
    IEditQuestion,
} from "../interface/IQuestion";

export const getQuestions = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_EVENT}/questions`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getQuesByEId = async (eventId: string) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_EVENT}/questionByEId/${eventId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getQuesById = async (questionId: string) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_EVENT}/questionById/${questionId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const getQuesByOwnerId = async (ownerId: string) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_EVENT}/getQuestionsByOwnerId/${ownerId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const saveQuestion = async (questionId: string) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_EVENT}/saveQuestion/${questionId}`
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const unSaveQuestion = async (questionId: string) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_EVENT}/unSaveQuestion/${questionId}`
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const readQuestion = async (questionId: string) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_EVENT}/readQuestion/${questionId}`
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const deleteQuestionById = async (questionId: string) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_EVENT}/deleteQuestionById/${questionId}`
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createQuestion = async (question: IAddQuestion) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_EVENT}/createQuestion`,
            question
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const likeQuestion = async (questionId: string, userId: string) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_EVENT}/likeQuestion/${questionId}/${userId}`
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const unlikeQuestion = async (questionId: string, userId: string) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_EVENT
            }/unlikeQuestion/${questionId}/${userId}`
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addComment = async (comment: IAddComment, questionId: string) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_EVENT}/addcomment/${questionId}`,
            comment
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateQuestion = async (
    questionId: string,
    question: IEditQuestion
) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_EVENT}/updateQuestion/${questionId}`,
            question
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteComment = async (commentId: string, questionId: string) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_EVENT
            }/deleteComment/${commentId}/${questionId}`
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const likeComment = async (questionId: string, userId: string, commentId: string) => {
    try {
        console.log(questionId);
        return await axios.post(
            `${import.meta.env.VITE_EVENT}/likecomment/${questionId}/${userId}/${commentId}`
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const unLikeComment = async (questionId: string, userId: string, commentId: string) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_EVENT}/unLikecomment/${questionId}/${userId}/${commentId}`
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};
