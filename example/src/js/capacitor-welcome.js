import { P2PProvider, ProtocolRequestHandlerResponse, StreamDirection, VersionHandlerEventType } from "@frontend/p2p"

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

    const group = await P2PProvider.createGroupFactory({ value: "echo" })
    group.generateVersionHandler('1.0.0', (versionHandler) => {
        versionHandler.on(VersionHandlerEventType.all, async (event, content) => {

            if (content.stream.getStreamDirection() === StreamDirection.Outbound) {
                return ProtocolRequestHandlerResponse.Close;
            }

            switch(event.type) {
                case VersionHandlerEventType.closed:
                case VersionHandlerEventType.error:
                    return ProtocolRequestHandlerResponse.Close;
                case VersionHandlerEventType.ready:
                    return ProtocolRequestHandlerResponse.StayOpen;
                case VersionHandlerEventType.data:
                    await content.stream.send(content.stream.getContent());
                    return ProtocolRequestHandlerResponse.Close;
            }

            // Should never end up here, since all cases are handled. (its a binary mask and all just resembles all the options)
        })
    })


    const connectionHandler = await P2PProvider.createConnectionHandler({ groups: [await group.generate()] });

    const input = createElement('input', undefined, (content) => content.type = "text");
    const button = createElement('button', 'Start client', (content) => content.type = "button");


    button.addEventListener('click', async () => {
        connectionHandler.
    });
})();

