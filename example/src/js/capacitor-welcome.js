import { P2PProvider } from "@frontend/p2p"

const createElement = (element, content, elementModifier = undefined) => {
    const createdElement = document.createElement(element);
    if (elementModifier) {
        elementModifier(createdElement);
    }
    createdElement.innerHTML = content;
    window.document.body.appendChild(createdElement);

    return createdElement;
}

(async () => {

    const input = createElement('input', undefined, (content) => content.type = "text");
    const button = createElement('button', 'Start client', (content) => content.type = "button");


    button.addEventListener('click', async () => {
        await P2PProvider.echo({ value: input.value })
    });
})();

