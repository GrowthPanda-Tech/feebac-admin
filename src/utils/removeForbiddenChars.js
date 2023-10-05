export default function removeForbiddenChars(event) {
    const type = event.type;
    const key = event.key;

    const forbiddenChars = ["e", "E", "+", "-", ".", " "];

    if (type === "keydown") {
        if (forbiddenChars.includes(key)) {
            event.preventDefault();
        }

        if (key === "ArrowDown") {
            event.preventDefault();
        }

        return;
    }

    if (type === "paste") {
        event.preventDefault();

        return;
    }
}
