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

const errorToString = (error) => {
    if (error.stack) {
        return `${error.toString()} \n\n ${error.stack.toString()}`;
    }

    return error.toString();
}


let parentLogElement = undefined;
const ensureParentLogElement = () => {
    parentLogElement ||= createElement('div', '', (modifier) => {
        modifier.style.width = "100%";
        modifier.style.display = "flex";
        modifier.style.flexDirection = "column";
    });

    return parentLogElement;
}

const showError = (error) => {

    createElement('code', errorToString(error), (element) => {
        element.style.display = "block";
        element.style.width = "100%";
        element.style.color = 'white';
        element.style.borderRadius = '10px';
        element.style.backgroundColor = 'red';
        element.style.whiteSpace = "pre";
        element.style.borderBottom = "1px solid black";
    }, ensureParentLogElement());

    console.trace();
    console.error("error: ", error);
}

const showMessage = (message) => {
    createElement('code', message, (element) => {
        element.style.display = "block";
        element.style.width = "100%";
        element.style.borderRadius = '10px';
        element.style.whiteSpace = "pre";
        element.style.backgroundColor = 'grey';
        element.style.color = "black";
        element.style.borderBottom = "1px solid black";
    })
}


(async () => {

    showMessage("Initializing modules...");

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


    showMessage("Generating group...");
    const myGroup = await myGroupFactory.generate();
    showMessage("Creating connection handler...");
    const connectionHandler = await P2PProvider.createConnectionHandler({ groups: [myGroup] });
    
    showMessage("Starting connection handler...");
    await connectionHandler.start();
    
    // On new connection or other events?
    connectionHandler.on('connection', () => {
    });

    const input = createElement('input', undefined, (content) => content.type = "text");
    const button = createElement('button', 'Start client', (content) => content.type = "button");

    const execute = async () => {
        showMessage(`Trying to connect to "${input.value}"`);
        const connection = await connectionHandler.dial(input.value);
        const stream = await connectionHandler.getStreamForProtocol(input.value, { group: myGroup, version: versionHandler }); // Can throw exception, when group(protocol) or version are not found.
        stream.on(VersionHandlerEventType.data, (event, content) => {
            try {
                showMessage(`Got response from "{${content.source.address}}" value: "${P2PProvider.transformer.string.from(content.stream)}"`);
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
})().catch(showError);
