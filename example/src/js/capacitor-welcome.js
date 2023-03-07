import { P2PProvider, ProtocolRequestHandlerResponse, StreamDirection, VersionHandlerEventType } from "@frontend/p2p"

const createElement = (element, content, elementModifier = undefined, parentElement = undefined) => {
    const createdElement = document.createElement(element);
    
    if (elementModifier) {
        elementModifier(createdElement);
    }
    
    if (content) {
        createdElement.innerHTML = content;
    }

    (parentElement ?? window.document.body).appendChild(createdElement);

    return createdElement;
}


let parentErrorElement = undefined;

const errorToString = (error) => {
    if (error.stack) {
        return `${error.toString()} \n\n ${error.stack.toString()}`;
    }

    return error.toString();
}

const showError = window.error = (error) => {
    if (!parentErrorElement) {
        parentErrorElement = createElement('div', '', (modifier) => {
            modifier.style.backgroundColor = 'red';
            modifier.style.color = 'white';
            modifier.style.display = "flex"
            modifier.style.flexDirection = "column";
        })
    }

    createElement('code', errorToString(error), (element) => {
        element.style.whiteSpace = "pre";
        element.style.borderBottom = "1px solid black";
    }, parentErrorElement);

    console.trace();
    console.error("error: ", error);
}


(async () => {

    const myGroupFactory = await P2PProvider.createGroupFactory({ value: "echo" })
    const versionHandler = myGroupFactory.generateVersionHandler('1.0.0', (versionHandler) => {
        versionHandler.on(VersionHandlerEventType.all, async (event, content) => {

            if (content.stream.getStreamDirection() === StreamDirection.Outbound) {
                return ProtocolRequestHandlerResponse.Close;
            }

            switch(event.type) {
                case VersionHandlerEventType.ready:
                    return ProtocolRequestHandlerResponse.StayOpen;
                case VersionHandlerEventType.data:
                    await content.stream.send(content.stream.getContent());
                case VersionHandlerEventType.error:
                    // TODO: Handle your error here.
                default:
                    return ProtocolRequestHandlerResponse.Close;
            }
        }, P2PProvider.packageSeparator.Delimiter("\n"))
    })


    const myGroup = await myGroupFactory.generate();
    const connectionHandler = await P2PProvider.createConnectionHandler({ groups: [myGroup] });
    
    await connectionHandler.start();
    
    // On new connection or other events?
    connectionHandler.on('connection', () => {
    });

    const input = createElement('input', undefined, (content) => content.type = "text");
    const button = createElement('button', 'Start client', (content) => content.type = "button");

    const execute = async () => {
        const connection = await connectionHandler.dial(input.value);
        const stream = await connectionHandler.getStreamForProtocol(input.value, { group: myGroup, version: versionHandler }); // Can throw exception, when group(protocol) or version are not found.
        stream.on(VersionHandlerEventType.data, (event, content) => {
            try {
                P2PProvider.transformer.string.from(content.stream)
            } catch (error) {
                showError(error);
            }
        });
        
        // Peer discorvery events & others?
        connection.on('event', () => {
        });

        await stream.send(P2PProvider.transformer.string.to("hello-world\n"));
    }


    button.addEventListener('click', async () => {
        try {
            await execute();
        } catch (error) {
            showError(error);
        }
    });
})().catch((error) => {
    showError(error);
});

