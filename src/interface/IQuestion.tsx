export interface IAddQuestion {
    questionText: string;
    ownerId: string;
    name: string;
    eventId: string;
    timestamp: Date;
}

export interface IEditQuestion {
    questionText: string;
    timestamp: Date;
}

export interface IComment {
    commentId: string;
    ownerId: string;
    name: string;
    context: string;
    timestamp: Date;
    likeNumber: { userLikeId: string; }[];
}

export interface IAddComment {
    ownerId: string;
    name: string;
    context: string;
    timestamp: Date;
}

export interface IQuestion {
    questionId: string;
    questionText: string;
    ownerId: string;
    name: string;
    eventId: string;
    isRead: boolean;
    isSave: boolean;
    isEdit: boolean;
    timestamp: Date;
    likeNumber: { userLikeId: string; }[];
    comment: IComment[];
}
