declare global {
    interface Err extends Error {
        status: number;
    }

    interface User {
        id: number;
        username: string;
        password: string;
        created_at: Date;
    }

    interface Vocab {
        user_id: number;
        id: number;
        indonesia: string;
        english: string;
        category: string|null
        added_at: Date;
    }

    interface Pagination {
        page: number
        limit: number
        totalPage: number
        totalItem: number
    }

    interface Category {
        id: number;
        user_id?: number;
        name: string;
        created_at: Date;
    }
    

    interface ResBody {
        success: boolean;
        message: string;
        data?: any
        status?: number
        token?: string
    }

    interface UserHeader {
        id: number
        name: string
    }

    namespace Express {
        interface Request {
            user: UserHeader
        }
    }

}

export = {}