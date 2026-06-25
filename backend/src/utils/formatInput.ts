export default function formatInput(input: string) {
    let result = ""
    input = input.trim().toLowerCase()
    const formatedInput: string[] = input.split('')
    formatedInput[0] = formatedInput[0]?.toUpperCase() as string
    formatedInput.forEach(i => {
        result += i
    });
    return result
}