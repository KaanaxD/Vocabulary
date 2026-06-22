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

    interface ResBody {
        success: boolean;
        message: string;
        data?: any
        status?: number
        token?: string
    }


}

export = {}