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

    interface Vocab{
        user_id : number;
        id: number;
        indonesia: string;
        english: string;
        added_at: Date;
    }

    interface Pagination{
        page: number
        limit:number
        totalPage: number
        totalItem:number
    }

    interface ResBody {
        success: boolean;
        message: string;
        data?: any
        status?: number
        token?: string
    }


}

export = {}