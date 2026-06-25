import practiceRepo from "../repository/practice.repo";
import practice from "../repository/practice.repo";

export default function practiceService() {
    return {
        getQuestion: async (id:number[],inggris:boolean=true) => {
            const data = await practiceRepo().getQuestionQuery(id,inggris)
            
        },
        checkAnswer: async () => {

        }
    }
}