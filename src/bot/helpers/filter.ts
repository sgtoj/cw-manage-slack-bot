const CWMANAGE_TICKET_PATTERN = /#[0-9]{6,8}/;

export function extractCWManageTicketNumber (message: string | undefined): Array<string> | null {
    if (!message)
        return null;

    let matches = message.match(CWMANAGE_TICKET_PATTERN);

    if (!matches)
        return null;

    let numbers = [];
    for (let match of matches) {
        numbers.push(match.replace("#", ""));
    }

    return numbers;
}